import Navbar from '../components/Navbar';
import { Code, Server, Layout, Database } from 'lucide-react';

function About() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="bg-black h-screen flex w-full mx-auto px-6 py-12">
                <div className="p-10 w-1/4text-center mb-10 justify-center items-center pt-50">
                    <h1 className="text-3xl font-bold text-white mb-2">About</h1>
                    <p className="text-white">Tentang aplikasi Client Management ini</p>
                </div>
                <div className="w-3/4 drop-shadow-[0_5px_10px_rgba(0,0,255,0.6)]">
                    <div className="bg-white rounded-xl shadow p-8 mb-8 bg-gradient-to-l from-blue-900  to-black">
                        <h2 className="text-xl font-semibold text-blue-900 mb-4">Deskripsi Aplikasi</h2>
                        <p className="text-gray-600 leading-relaxed hover:text-white">
                            Aplikasi <strong>Client Management</strong> adalah sebuah aplikasi web full-stack
                            yang dibangun untuk latihan UTS mata pelatihan <strong>React Lanjutan</strong>.
                            Aplikasi ini memungkinkan pengguna untuk mengelola data client secara lengkap
                            dengan fitur CRUD (Create, Read, Update, Delete), autentikasi pengguna,
                            serta toggle status active/inactive pada setiap client.
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold text-blue-500 mb-4">Tech Stack</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 drop-shadow-[0_1px_2px_rgba(0,0,255,0.6)]">
                        <div className="rounded-xl shadow p-5 flex items-start gap-4 bg-black">
                            <div className="bg-blue-100 p-2.5 rounded-lg">
                                <Layout size={22} className="text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Frontend</h3>
                                <p className="text-gray-500 text-sm">React 19, Vite, Tailwind CSS v4, React Router</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-5 flex items-start gap-4 bg-gradient-to-l from-blue-900  to-black">
                            <div className="bg-green-100 p-2.5 rounded-lg">
                                <Server size={22} className="text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Backend</h3>
                                <p className="text-gray-500 text-sm">Node.js, Express 5, JWT, Argon2</p>
                            </div>
                        </div>
                        <div className="rounded-xl shadow p-5 flex items-start gap-4 bg-black">
                            <div className="bg-purple-100 p-2.5 rounded-lg">
                                <Database size={22} className="text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Database</h3>
                                <p className="text-gray-500 text-sm">PostgreSQL</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-5 flex items-start gap-4 bg-gradient-to-l from-blue-900  to-black">
                            <div className="bg-orange-100 p-2.5 rounded-lg">
                                <Code size={22} className="text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Tools</h3>
                                <p className="text-gray-500 text-sm">pnpm, Nodemon, Axios, Lucide Icons</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
