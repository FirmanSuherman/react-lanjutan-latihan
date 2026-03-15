import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname, join} from 'path';
import path from 'path';
import { sql } from './db.js';
import verifyToken from './middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));;
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ===== AUTH ROUTES =====

// Register
app.post('/api/auth/register', async (req, res) => {
    const { gmail, username, password } = req.body;
    if (!gmail || !username || !password)
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    try {
        const exists = await sql`
            SELECT id FROM users WHERE username = ${username}
        `;
    
        if (exists.length > 0)
            return res.status(400).json({ message: 'Username sudah digunakan' });
    
        const hashedPassword = await argon2.hash(password);
    
        const result = await sql`
            INSERT INTO users (gmail, username, password)
            VALUES (${gmail}, ${username}, ${hashedPassword})
            RETURNING id, gmail, username
        `;
    
        res.status(201).json({
            message: 'Register berhasil',
            user: result[0]
        });
    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: 'Username dan password wajib diisi' });
    try {
        const result = await sql`
            SELECT * FROM users WHERE username = ${username}
        `;
    
        if (result.length === 0)
            return res.status(400).json({ message: 'User tidak ditemukan' });
    
        const user = result[0];
    
        const valid = await argon2.verify(user.password, password);
        if (!valid)
            return res.status(400).json({ message: 'Password salah' });
    
        const token = jwt.sign(
            { id: user.id, username: user.username, gmail: user.gmail },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
    
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        });
    
        res.json({
            message: 'Login berhasil',
            user: {
                id: user.id,
                username: user.username,
                gmail: user.gmail
            }
        });
    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout berhasil' });
});

// Check auth
app.get('/api/auth/me', verifyToken, (req, res) => {
    res.json({ user: req.user });
});

// ===== CLIENT ROUTES (protected) =====

// Get all clients
app.get('/api/clients', verifyToken, async (req, res) => {
    try {
        const result = await sql`
            SELECT * FROM client_tb ORDER BY id ASC
        `;
    
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add client
app.post('/api/clients', verifyToken, async (req, res) => {
    const { name, email, job, rate, isactive } = req.body;
    try {
        const result = await sql`
            INSERT INTO client_tb (name, email, job, rate, isactive)
            VALUES (${name}, ${email}, ${job}, ${rate}, ${isactive ?? true})
            RETURNING *
        `;
    
        res.status(201).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update client
app.put('/api/clients/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { name, email, job, rate, isactive } = req.body;
    try {
        const result = await sql`
            UPDATE client_tb
            SET name=${name}, email=${email}, job=${job}, rate=${rate}, isactive=${isactive}
            WHERE id=${id}
            RETURNING *
        `;
    
        if (result.length === 0)
            return res.status(404).json({ message: 'Client tidak ditemukan' });
    
        res.json(result[0]);
    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Toggle status active/inactive
app.patch('/api/clients/:id/toggle', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql`
            UPDATE client_tb
            SET isactive = NOT isactive
            WHERE id = ${id}
            RETURNING *
        `;
    
        res.json(result[0]);
    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete client
app.delete('/api/clients/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await sql`
            DELETE FROM client_tb
            WHERE id = ${id}
        `;
    
        res.json({ message: 'Client berhasil dihapus' });
    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




// Inisialisasi Database
async function initDB() {
    try{
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        gmail VARCHAR(250),
        username VARCHAR(250),
        password VARCHAR(250)
      );
    `;

    // Client table
    await sql`
      CREATE TABLE IF NOT EXISTS client_tb (
        id SERIAL PRIMARY KEY,
        name VARCHAR(250),
        email VARCHAR(100),
        job VARCHAR(50),
        rate NUMERIC(10,2),
        isactive BOOLEAN DEFAULT TRUE
      );
    `;
        console.log("Database Sudah Siap");

    }catch(error){
        console.log("Error initDb", error);
    }
}
initDB().then(() => {
    app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
})