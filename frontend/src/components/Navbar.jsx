import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Home, Users, Info, Mail, LogOut } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(Cookies.get('user') || '{}');

    const handleLogout = async () => {
        try {
            await axios.post(`${API}/api/auth/logout`, {}, { withCredentials: true });
        } catch (_) {}
        Cookies.remove('user');
        navigate('/login');
    };

    return (
        
        <nav class="bg-black flex w-full z-20 top-0 start-0 border-b border-default drop-shadow-[0_5px_10px_rgba(0,0,255,0.6)]">
        <div class="max-w-screen-xl w-full flex flex-wrap items-center justify-between mx-auto p-4 text-white">
            <Link to="/" class="mr-auto border-black flex items-center space-x-3 rtl:space-x-reverse hover:text-black">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-7" alt="Flowbite Logo"/>
                <span class="self-center text-xl text-heading font-semibold whitespace-nowrap">PhemountZhu</span>
            </Link>
            <div class="ml-auto md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse bg-black rounded-lg border-4 border-blue-900 hover:bg-blue-900 text-black">
                <button onClick={handleLogout} type="button" class="flex gap-5 text-blue-900 bg-brand hover:text-black bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"><LogOut size={20} />Log Out</button>
            </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
                <li>
                    <Link to="/" className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <Home size={16} /> Home
                    </Link>
                </li>
                <li>
                    <Link to="/clients" className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <Users size={16} /> Client List
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <Info size={16} /> About
                    </Link>
                </li>
                <li>   
                    <Link to="/contact" className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <Mail size={16} /> Contact
                    </Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>

        // <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
        //     <div className="flex gap-6 font-semibold text-sm">
        //         <Link to="/" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
        //             <Home size={16} /> Home
        //         </Link>
        //         <Link to="/clients" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
        //             <Users size={16} /> Client List
        //         </Link>
        //         <Link to="/about" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
        //             <Info size={16} /> About
        //         </Link>
        //         <Link to="/contact" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
        //             <Mail size={16} /> Contact
        //         </Link>
        //     </div>
        //     <div className="flex items-center gap-4 text-sm">
        //         <span className="text-blue-200">Halo, <strong className="text-white">{user.username}</strong></span>
        //         <button
        //             onClick={handleLogout}
        //             className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors"
        //         >
        //             <LogOut size={14} /> Logout
        //         </button>
        //     </div>
        // </nav>
    );
}

export default Navbar;