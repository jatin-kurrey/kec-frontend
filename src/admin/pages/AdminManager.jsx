import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Trash2, 
  Shield, 
  UserCheck, 
  Calendar, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Plus, 
  X,
  CheckCircle2
} from 'lucide-react';
import { adminAccountService } from '../../api';

const AdminManager = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'GALLERY_ADMIN'
  });

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await adminAccountService.getAll();
      setAdmins(response.data || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch admin accounts. You may not have permission.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setModalError('');
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setModalError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setModalError('Password must be at least 6 characters long');
      return;
    }

    try {
      await adminAccountService.create({
        username: formData.username,
        password: formData.password,
        role: formData.role
      });

      setSuccess('Administrator account created successfully!');
      setShowModal(false);
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        role: 'GALLERY_ADMIN'
      });
      fetchAdmins();
    } catch (err) {
      setModalError(err.response?.data?.error || 'Failed to create administrator account.');
    }
  };

  const handleDeleteAdmin = async (id, username) => {
    if (!window.confirm(`Are you sure you want to delete the admin account for "${username}"?`)) {
      return;
    }

    setError('');
    setSuccess('');
    try {
      await adminAccountService.delete(id);
      setSuccess(`Admin account "${username}" deleted successfully.`);
      fetchAdmins();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete administrator account.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
            System Administrators
          </h1>
          <p className="text-slate-500 font-medium">
            Manage administrative access levels and role-based accounts.
          </p>
        </div>
        <button
          onClick={() => {
            setModalError('');
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/10 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Administrator</span>
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-bold text-sm">Action Failed</p>
            <p className="text-xs font-semibold opacity-90 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 flex items-start gap-3.5">
          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-bold text-sm">Success</p>
            <p className="text-xs font-semibold opacity-90 mt-0.5">{success}</p>
          </div>
        </div>
      )}

      {/* Admin List Grid */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm overflow-hidden">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-blue-950" />
          <span>Active Accounts</span>
        </h2>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-900/10 border-t-blue-900 rounded-full animate-spin"></div>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Loading Accounts...</p>
          </div>
        ) : admins.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <Shield className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="font-bold">No active administrator accounts found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 font-black text-[11px] text-slate-400 uppercase tracking-widest">Administrator</th>
                  <th className="pb-4 font-black text-[11px] text-slate-400 uppercase tracking-widest">Role</th>
                  <th className="pb-4 font-black text-[11px] text-slate-400 uppercase tracking-widest">Created Date</th>
                  <th className="pb-4 text-right font-black text-[11px] text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {admins.map((admin) => (
                  <tr key={admin.id} className="group">
                    <td className="py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-lg ${
                          admin.role === 'SUPER_ADMIN' 
                            ? 'bg-blue-950 shadow-blue-950/10' 
                            : 'bg-indigo-600 shadow-indigo-600/10'
                        }`}>
                          {admin.username.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 tracking-tight">{admin.username}</p>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">ID: {admin.id.substring(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide uppercase ${
                        admin.role === 'SUPER_ADMIN'
                          ? 'bg-blue-50 text-blue-950 border border-blue-100/50'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-100/50'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          admin.role === 'SUPER_ADMIN' ? 'bg-blue-950' : 'bg-indigo-600'
                        }`}></span>
                        {admin.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>{new Date(admin.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </td>
                    <td className="py-5 text-right">
                      <button
                        onClick={() => handleDeleteAdmin(admin.id, admin.username)}
                        className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Delete administrator account"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden animate-scale-up">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Create Account</h3>
                <p className="text-xs font-semibold text-slate-400 mt-1">Configure administrator security credentials.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="p-8 space-y-6">
              {modalError && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-start gap-3.5">
                  <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Action Failed</p>
                    <p className="text-xs font-semibold opacity-90 mt-0.5">{modalError}</p>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Username</label>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold placeholder:text-slate-300"
                  placeholder="e.g. gallery_admin"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Role Access Privilege</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold"
                >
                  <option value="GALLERY_ADMIN">Gallery Administrator (Only Gallery Access)</option>
                  <option value="SUPER_ADMIN">Super Administrator (Full System Access)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 border border-slate-100 hover:bg-slate-50 hover:text-slate-900 text-slate-500 rounded-2xl font-bold text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/10 transition-all"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManager;
