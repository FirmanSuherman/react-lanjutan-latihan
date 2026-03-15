import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized, silakan login' });
 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token tidak valid atau sudah expired' });
    }
};
 
export default verifyToken;