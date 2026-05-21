import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { 
  Image as ImageIcon, 
  LogOut, 
  Bell, 
  Search 
} from 'lucide-react';
import { authService } from '../api';

const getAdminUser = () => {
  const token = localStorage.getItem('kec_admin_token');
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const GalleryAdminLayout = () => {
  const navigate = useNavigate();

  const user = getAdminUser();
  const role = user?.role;
  const username = user?.username || 'Media Admin';

  // Check auth and redirect accordingly
  React.useEffect(() => {
    if (!user) {
      navigate('/gallery-admin/login', { replace: true });
    } else if (role !== 'GALLERY_ADMIN' && role !== 'SUPER_ADMIN') {
      navigate('/gallery-admin/login', { replace: true });
    }
  }, [user, role, navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/gallery-admin/login');
  };

  if (!user || (role !== 'GALLERY_ADMIN' && role !== 'SUPER_ADMIN')) {
    return null; // Don't render layout if not authorized
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
              <span className="font-bold text-xl">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-blue-950">
                KEC Gallery
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Media Portal
              </p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-5 space-y-1 overflow-y-auto">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 mt-4 opacity-50">Management</p>
          
          <Link
            to="/gallery-admin"
            className="flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group bg-indigo-600 text-white shadow-xl shadow-indigo-900/20 translate-x-1"
          >
            <div className="flex items-center gap-3.5">
              <ImageIcon className="w-5 h-5 text-indigo-200" />
              <span className="font-bold text-[14px] tracking-tight text-white">Gallery</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-200 shadow-[0_0_8px_rgba(165,180,252,0.6)]"></div>
          </Link>
        </nav>

        <div className="p-6 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 w-full px-5 py-4 rounded-2xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-black text-[12px] uppercase tracking-widest border border-transparent hover:border-red-100"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-900 transition-all duration-300" />
              <input 
                type="text" 
                placeholder="Search media files, folders, or tags..." 
                className="w-full pl-14 pr-6 py-3.5 bg-slate-50/50 border border-slate-100/50 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-indigo-200 focus:ring-8 focus:ring-indigo-500/5 transition-all duration-500 placeholder:text-slate-300 placeholder:font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button className="relative p-3 text-slate-400 hover:text-indigo-950 hover:bg-indigo-50 rounded-2xl transition-all duration-300">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-10 w-[1px] bg-slate-100"></div>

            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 group-hover:text-indigo-900 transition-colors leading-none mb-1.5 uppercase tracking-tighter">
                  {username}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none opacity-60">
                  Media Controller
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-900/20 group-hover:bg-indigo-700 transition-all duration-500 transform group-hover:-rotate-3">
                <span className="text-xs font-black tracking-tighter">
                  {role === 'SUPER_ADMIN' ? 'SA' : 'GA'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GalleryAdminLayout;
