import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const API = import.meta.env.VITE_API_URL;

function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post(`${API}/api/auth/login`, form, { withCredentials: true });
            Cookies.set('user', JSON.stringify(data.user), { expires: 1 });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black min-h-screen flex items-center justify-center ">
            <div className="text-blue-500 drop-shadow-[0_5px_10px_rgba(0,0,255,0.6)] bg-gradient-to-l from-blue-900  to-black p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-2 text-center text-blue-700">Login</h2>
                <p className="text-center text-gray-500 text-sm mb-6">Masuk ke akun Anda</p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded px-4 py-2 mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Masukkan password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                <p className="mt-5 text-center text-sm text-gray-600">
                    Belum punya akun?{' '}
                    <Link to="/register" className="text-blue-600 font-medium hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;