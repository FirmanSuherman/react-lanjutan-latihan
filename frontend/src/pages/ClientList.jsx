import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ClientModal from '../components/ClientModal';

const API = import.meta.env.VITE_API_URL;

function ClientList() {
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${API}/api/clients`, { withCredentials: true });
            setClients(data);
        } catch (err) {
            console.error('Gagal fetch clients:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Yakin ingin menghapus client ini?')) return;
        try {
            await axios.delete(`${API}/api/clients/${id}`, { withCredentials: true });
            fetchClients();
        } catch (err) {
            alert('Gagal menghapus client');
        }
    };

    const handleToggle = async (id) => {
        try {
            await axios.patch(`${API}/api/clients/${id}/toggle`, {}, { withCredentials: true });
            fetchClients();
        } catch (err) {
            alert('Gagal mengubah status');
        }
    };

    const handleEdit = (client) => {
        setSelectedClient(client);
        setShowModal(true);
    };

    const handleAdd = () => {
        setSelectedClient(null);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedClient(null);
        fetchClients();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="mx-auto px-6 py-8 bg-black w-full h-screen p-10">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Daftar Client</h1>
                        <p className="text-gray-500 text-sm">Total: {clients.length} client</p>
                    </div>
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        + Tambah Client
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-400">Memuat data...</div>
                ) : (
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 text-sm">
                                    <th className="px-4 py-3 text-left">No</th>
                                    <th className="px-4 py-3 text-left">Nama</th>
                                    <th className="px-4 py-3 text-left">Email</th>
                                    <th className="px-4 py-3 text-left">Job</th>
                                    <th className="px-4 py-3 text-left">Rate</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                                            Belum ada data client. Klik "+ Tambah Client" untuk menambahkan.
                                        </td>
                                    </tr>
                                ) : (
                                    clients.map((c, i) => (
                                        <tr key={c.id} className="border-t hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-sm text-gray-600">{i + 1}</td>
                                            <td className="px-4 py-3 font-medium">{c.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{c.email}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{c.job}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                Rp {Number(c.rate).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                                        c.isactive
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-600'
                                                    }`}
                                                >
                                                    {c.isactive ? '● Active' : '○ Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2 flex-wrap">
                                                    <button
                                                        onClick={() => handleEdit(c)}
                                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleToggle(c.id)}
                                                        className={`px-2 py-1 rounded text-xs font-medium text-white transition-colors ${
                                                            c.isactive
                                                                ? 'bg-orange-500 hover:bg-orange-600'
                                                                : 'bg-green-500 hover:bg-green-600'
                                                        }`}
                                                    >
                                                        {c.isactive ? 'Nonaktifkan' : 'Aktifkan'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(c.id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <ClientModal client={selectedClient} onClose={handleModalClose} />
            )}
        </div>
    );
}

export default ClientList;