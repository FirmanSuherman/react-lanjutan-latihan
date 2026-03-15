import Navbar from '../components/Navbar';
import { LayoutDashboard } from 'lucide-react';

function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="bg-black w-full h-screen items-center justify-center mx-auto px-6 py-16 text-center pt-50">
                <div className="flex justify-center mb-4">
                    <LayoutDashboard size={48} className="text-blue-600" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                    Selamat Datang
                </h1>
                <p className="text-gray-500 text-lg">
                    Gunakan menu di atas untuk mengelola data client Anda.
                </p>
            </div>
        </div>
    );
}

export default Home;
