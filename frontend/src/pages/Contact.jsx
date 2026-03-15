import Navbar from '../components/Navbar';
import { User, Calendar, BookOpen, GraduationCap } from 'lucide-react';

function Contact() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="bg-black px-6 py-12 flex gap-4 h-screen ">
                <div className="w-3/4 text-center mb-10 pt-50">
                    <h1 className="text-3xl font-bold text-white mb-2">Contact</h1>
                    <p className="text-gray-500">Informasi kontak dan identitas</p>
                </div>

                <div className=" bg-black rounded-xl shadow overflow-hidden w-1/4 drop-shadow-[0_5px_10px_rgba(0,0,255,0.6)]">
                    <div className="bg-gradient-to-b from-blue-900  to-black px-6 py-8 text-center">
                        <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <User size={36} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Firman Suherman</h2>
                        <p className="text-blue-200 text-sm mt-1">Peserta Pelatihan</p>
                    </div>

                    <div className="divide-y bg-black text-blue-500">
                        <div className="flex items-center gap-4 px-6 py-4">
                            <div className="bg-blue-100 p-2.5 rounded-lg">
                                <User size={20} className="" />
                            </div>
                            <div>
                                <p className="text-xs text-blue-600 uppercase tracking-wide font-medium">Nama</p>
                                <p className="text-white font-semibold">Firman</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-6 py-4">
                            <div className="bg-green-100 p-2.5 rounded-lg">
                                <Calendar size={20} className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-blue-600 uppercase tracking-wide font-medium">Tempat, Tanggal Lahir</p>
                                <p className="text-white font-semibold">-</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-6 py-4">
                            <div className="bg-purple-100 p-2.5 rounded-lg">
                                <BookOpen size={20} className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-blue-600 uppercase tracking-wide font-medium">Pelatihan</p>
                                <p className="text-white font-semibold">React Lanjutan</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-6 py-4">
                            <div className="bg-orange-100 p-2.5 rounded-lg">
                                <GraduationCap size={20} className="text-orange-600" />
                            </div>
                            <div>
                                <p className="text-xs text-blue-600 uppercase tracking-wide font-medium">Instruktur</p>
                                <p className="text-white font-semibold">Eka Rahma</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
