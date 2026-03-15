import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

function Register() {
    const [form, setForm] = useState({ gmail: '', username: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post(`${API}/api/auth/register`, form);
            setSuccess('Register berhasil! Mengalihkan ke halaman login...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Register gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black min-h-screen flex items-center justify-center ">
            <div className="text-blue-500 drop-shadow-[0_5px_10px_rgba(0,0,255,0.6)] bg-gradient-to-l from-blue-900  to-black p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-2 text-center text-white">Register</h2>
                <p className="text-center text-gray-500 text-sm mb-6">Buat akun baru</p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded px-4 py-2 mb-4 text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="border border-blue-500 text-blue-900 rounded px-4 py-2 mb-4 text-sm">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gmail</label>
                        <input
                            type="email"
                            name="gmail"
                            value={form.gmail}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="example@gmail.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Masukkan password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </form>

                <p className="mt-5 text-center text-sm text-gray-600">
                    Sudah punya akun?{' '}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;