import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, PlusCircle } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

function ClientModal({ client, onClose }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        job: '',
        rate: '',
        isactive: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (client) {
            setForm({
                name: client.name,
                email: client.email,
                job: client.job,
                rate: client.rate,
                isactive: client.isactive,
            });
        }
    }, [client]);

    const handleChange = (e) => {
        const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm({ ...form, [e.target.name]: val });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (client) {
                await axios.put(`${API}/api/clients/${client.id}`, form, { withCredentials: true });
            } else {
                await axios.post(`${API}/api/clients`, form, { withCredentials: true });
            }
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {client ? <><Pencil size={18} /> Edit Client</> : <><PlusCircle size={18} /> Tambah Client</>}
                </h2>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nama</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nama client"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email client"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Job</label>
                        <input
                            name="job"
                            value={form.job}
                            onChange={handleChange}
                            placeholder="Pekerjaan"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Rate (Rp)</label>
                        <input
                            name="rate"
                            type="number"
                            value={form.rate}
                            onChange={handleChange}
                            placeholder="Rate per jam"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="isactive"
                                checked={form.isactive}
                                onChange={handleChange}
                                className="w-4 h-4"
                            />
                            <span className="text-sm font-medium">Status Active</span>
                        </label>
                    </div>
                    <div className="flex gap-3 justify-end pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ClientModal;