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
  CheckCircle2,
  KeyRound,
  User,
  Settings,
  Upload,
  Sliders,
  BookOpen,
  Sparkles,
  Award,
  FileText,
  Loader2
} from 'lucide-react';
import { adminAccountService, settingsService, uploadService } from '../../api';

const AdminManager = () => {
  const [activeTab, setActiveTab] = useState('accounts'); // 'accounts' or 'profile'
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Create Account Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [createError, setCreateError] = useState('');
  const [createForm, setCreateForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: 'GALLERY_ADMIN'
  });

  // Reset Password Modal state
  const [showResetModal, setShowResetModal] = useState(false);
  const [resettingUser, setResettingUser] = useState(null); // { id, username }
  const [resetPassword, setResetPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetError, setResetError] = useState('');

  // Self Profile Change Password state
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profileForm, setProfileForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // Super 40 Configurations state
  const [systemSettings, setSystemSettings] = useState({
    super40_exam_year: '2024',
    super40_seats: '40',
    super40_acceptance_rate: '2%',
    super40_placement_record: '100%',
    super40_application_start: 'Jan 15, 2024',
    super40_last_date: 'Mar 30, 2024',
    super40_admit_card: 'Apr 15, 2024',
    super40_exam_date: 'Apr 28, 2024',
    super40_results_date: 'May 15, 2024',
    super40_features: '',
    super40_eligibility: '',
    super40_brochure_url: '',
    super40_total_marks: '180',
    super40_duration_hours: '3',
    super40_question_type: 'MCQ'
  });

  const [settingsLoading, setSettingsLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  useEffect(() => {
    if (activeTab === 'super40') {
      setSettingsLoading(true);
      settingsService.get()
        .then(res => {
          if (res.data) {
            setSystemSettings(prev => ({
              ...prev,
              ...res.data
            }));
          }
        })
        .catch(err => {
          console.error("Failed to load settings:", err);
        })
        .finally(() => {
          setSettingsLoading(false);
        });
    }
  }, [activeTab]);

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

  // Creation logic
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setCreateError('');
    setError('');
    setSuccess('');

    if (createForm.password !== createForm.confirmPassword) {
      setCreateError('Passwords do not match');
      return;
    }

    if (createForm.password.length < 6) {
      setCreateError('Password must be at least 6 characters long');
      return;
    }

    try {
      await adminAccountService.create({
        username: createForm.username,
        password: createForm.password,
        role: createForm.role
      });

      setSuccess(`Administrator account "${createForm.username}" created successfully!`);
      setShowCreateModal(false);
      setCreateForm({
        username: '',
        password: '',
        confirmPassword: '',
        role: 'GALLERY_ADMIN'
      });
      fetchAdmins();
    } catch (err) {
      setCreateError(err.response?.data?.error || 'Failed to create administrator account.');
    }
  };

  // Delete account logic
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

  // Reset external password logic
  const handleOpenResetModal = (admin) => {
    setResettingUser(admin);
    setResetPassword('');
    setResetError('');
    setShowResetModal(true);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError('');
    setError('');
    setSuccess('');

    if (resetPassword.length < 6) {
      setResetError('Password must be at least 6 characters long');
      return;
    }

    try {
      await adminAccountService.updatePassword(resettingUser.id, resetPassword);
      setSuccess(`Password for administrator "${resettingUser.username}" reset successfully!`);
      setShowResetModal(false);
      setResettingUser(null);
      setResetPassword('');
    } catch (err) {
      setResetError(err.response?.data?.error || 'Failed to update user password.');
    }
  };

  // Change self password logic
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelfPasswordUpdate = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    setSuccess('');
    setError('');

    if (profileForm.newPassword !== profileForm.confirmNewPassword) {
      setProfileError('New passwords do not match');
      return;
    }

    if (profileForm.newPassword.length < 6) {
      setProfileError('New password must be at least 6 characters long');
      return;
    }

    setProfileLoading(true);
    try {
      await adminAccountService.changeSelfPassword(
        profileForm.currentPassword,
        profileForm.newPassword
      );
      setProfileSuccess('Your profile password has been successfully updated!');
      setProfileForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (err) {
      setProfileError(err.response?.data?.error || 'Failed to update profile password. Verify current password.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setSystemSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleBrochureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadLoading(true);
    setUploadError('');
    setUploadSuccess('');
    try {
      const response = await uploadService.upload(file);
      const url = response.data.url;
      setSystemSettings(prev => ({ ...prev, super40_brochure_url: url }));
      setUploadSuccess('Brochure uploaded successfully!');
    } catch (err) {
      setUploadError('Failed to upload brochure. Please try again.');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaveLoading(true);

    try {
      for (const [key, value] of Object.entries(systemSettings)) {
        await settingsService.update(key, value);
      }
      setSuccess('Super 40 configurations synchronized successfully!');
    } catch (err) {
      setError('Failed to save settings. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
          Settings & Security Dashboard
        </h1>
        <p className="text-slate-500 font-medium">
          Manage system administrative access levels, credentials control, and profile security.
        </p>
      </div>

      {/* Tabs Layout */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => {
            setActiveTab('accounts');
            setSuccess('');
            setError('');
          }}
          className={`pb-4 px-2 font-black text-sm uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'accounts' 
              ? 'border-blue-900 text-blue-900 font-extrabold' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Accounts Manager</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('profile');
            setSuccess('');
            setError('');
          }}
          className={`pb-4 px-2 font-black text-sm uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'profile' 
              ? 'border-blue-900 text-blue-900 font-extrabold' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>My Profile Settings</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('super40');
            setSuccess('');
            setError('');
          }}
          className={`pb-4 px-2 font-black text-sm uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'super40' 
              ? 'border-blue-900 text-blue-900 font-extrabold' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Super 40 Config</span>
        </button>
      </div>

      {/* Global Notifications */}
      {error && (
        <div className="p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-start gap-3.5 animate-shake">
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

      {/* Tab Contents: Accounts Manager */}
      {activeTab === 'accounts' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-6 rounded-3xl">
            <div>
              <h3 className="font-bold text-slate-800">Administrator Accounts List</h3>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Add accounts, delete accounts, or override/reset passwords.</p>
            </div>
            <button
              onClick={() => {
                setCreateError('');
                setShowCreateModal(true);
              }}
              className="flex items-center gap-2 px-5 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl font-bold text-sm shadow-md shadow-blue-900/10 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Administrator</span>
            </button>
          </div>

          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm overflow-hidden">
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
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenResetModal(admin)}
                              className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center gap-1"
                              title="Reset account password"
                            >
                              <KeyRound className="w-4 h-4" />
                              <span>Reset Password</span>
                            </button>
                            <button
                              onClick={() => handleDeleteAdmin(admin.id, admin.username)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                              title="Delete administrator account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab Contents: My Profile Settings */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <KeyRound className="w-5 h-5 text-blue-900" />
              <span>Change Password</span>
            </h3>
            <p className="text-xs font-semibold text-slate-400 mt-1">Change your profile security password credentials.</p>
          </div>

          {profileError && (
            <div className="p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-start gap-3.5 animate-shake">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-sm">Update Failed</p>
                <p className="text-xs font-semibold opacity-90 mt-0.5">{profileError}</p>
              </div>
            </div>
          )}

          {profileSuccess && (
            <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 flex items-start gap-3.5">
              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-sm">Security Restored</p>
                <p className="text-xs font-semibold opacity-90 mt-0.5">{profileSuccess}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSelfPasswordUpdate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  required
                  value={profileForm.currentPassword}
                  onChange={handleProfileChange}
                  className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold placeholder:text-slate-300"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    required
                    value={profileForm.newPassword}
                    onChange={handleProfileChange}
                    className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold placeholder:text-slate-300"
                    placeholder="Min 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  required
                  value={profileForm.confirmNewPassword}
                  onChange={handleProfileChange}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold placeholder:text-slate-300"
                  placeholder="Re-enter new password"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={profileLoading}
                className="px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/10 transition-all disabled:opacity-60 flex items-center gap-2"
              >
                {profileLoading ? 'Updating credentials...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'super40' && (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
          <div className="mb-8 border-b border-slate-100 pb-6 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Super 40 Configurations</h3>
              <p className="text-sm text-slate-400 font-medium">Manage admissions, important dates, eligibility, and prospectus brochure uploads.</p>
            </div>
            <div className="flex items-center gap-2 text-xs bg-blue-50 text-blue-900 font-black uppercase tracking-widest px-3 py-1.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-blue-900" />
              Live Sync
            </div>
          </div>

          {settingsLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-900/10 border-t-blue-900 rounded-full animate-spin"></div>
              <p className="text-slate-400 font-bold text-sm">Loading settings from database...</p>
            </div>
          ) : (
            <form onSubmit={handleSettingsSubmit} className="space-y-8">
              {/* Stats Grid */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Exam Parameters & Stats
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Exam Year</label>
                    <input
                      type="text"
                      name="super40_exam_year"
                      value={systemSettings.super40_exam_year}
                      onChange={handleSettingChange}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Seats Count</label>
                    <input
                      type="text"
                      name="super40_seats"
                      value={systemSettings.super40_seats}
                      onChange={handleSettingChange}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Acceptance Rate</label>
                    <input
                      type="text"
                      name="super40_acceptance_rate"
                      value={systemSettings.super40_acceptance_rate}
                      onChange={handleSettingChange}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Placement Record</label>
                    <input
                      type="text"
                      name="super40_placement_record"
                      value={systemSettings.super40_placement_record}
                      onChange={handleSettingChange}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule Dates */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Important Dates Schedule
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Application Start</label>
                    <input
                      type="text"
                      name="super40_application_start"
                      value={systemSettings.super40_application_start}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Last Date to Apply</label>
                    <input
                      type="text"
                      name="super40_last_date"
                      value={systemSettings.super40_last_date}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Admit Card available</label>
                    <input
                      type="text"
                      name="super40_admit_card"
                      value={systemSettings.super40_admit_card}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Entrance Exam</label>
                    <input
                      type="text"
                      name="super40_exam_date"
                      value={systemSettings.super40_exam_date}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Results Declaration</label>
                    <input
                      type="text"
                      name="super40_results_date"
                      value={systemSettings.super40_results_date}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Pattern and Brochure PDF Upload */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Brochure and Exam Pattern
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total Marks</label>
                    <input
                      type="text"
                      name="super40_total_marks"
                      value={systemSettings.super40_total_marks}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Duration Hours</label>
                    <input
                      type="text"
                      name="super40_duration_hours"
                      value={systemSettings.super40_duration_hours}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Question Type</label>
                    <input
                      type="text"
                      name="super40_question_type"
                      value={systemSettings.super40_question_type}
                      onChange={handleSettingChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="mt-4 p-6 bg-slate-50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">Prospectus Brochure PDF</h5>
                    <p className="text-xs font-semibold text-slate-400 mt-1">Upload the dynamic brochure PDF directly to KEC storage.</p>
                    {systemSettings.super40_brochure_url && (
                      <span className="text-xs font-bold text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-lg inline-block mt-3 border border-blue-100/50 break-all">
                        Active PDF Path: {systemSettings.super40_brochure_url}
                      </span>
                    )}
                  </div>
                  <div className="shrink-0 w-full md:w-auto">
                    <input
                      type="file"
                      accept=".pdf"
                      id="kec-brochure-file"
                      className="hidden"
                      onChange={handleBrochureUpload}
                    />
                    <label
                      htmlFor="kec-brochure-file"
                      className="px-6 py-3.5 bg-white border border-slate-200 hover:border-blue-900 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 hover:text-blue-900 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {uploadLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-blue-900" />
                          Uploading PDF...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload PDF
                        </>
                      )}
                    </label>
                  </div>
                </div>
                {uploadError && <p className="text-xs font-bold text-red-600 mt-1">{uploadError}</p>}
                {uploadSuccess && <p className="text-xs font-bold text-emerald-600 mt-1">{uploadSuccess}</p>}
              </div>

              {/* Lists */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                  <Sliders className="w-4 h-4" />
                  Eligibility & Features List (separated by |)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Core Features</label>
                    <textarea
                      name="super40_features"
                      value={systemSettings.super40_features}
                      onChange={handleSettingChange}
                      rows="4"
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white text-sm text-slate-900 font-bold"
                      placeholder="Feature 1|Feature 2|Feature 3"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Eligibility Bullet Points</label>
                    <textarea
                      name="super40_eligibility"
                      value={systemSettings.super40_eligibility}
                      onChange={handleSettingChange}
                      rows="4"
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white text-sm text-slate-900 font-bold"
                      placeholder="Eligibility 1|Eligibility 2"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/10 flex items-center gap-2.5 disabled:opacity-60"
                >
                  {saveLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Synchronizing configurations...
                    </>
                  ) : (
                    'Save Settings & Sync Live'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* System Admin Account Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden animate-scale-up">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Create Account</h3>
                <p className="text-xs font-semibold text-slate-400 mt-1">Configure administrator security credentials.</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="p-8 space-y-6">
              {createError && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-start gap-3.5 animate-shake">
                  <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Action Failed</p>
                    <p className="text-xs font-semibold opacity-90 mt-0.5">{createError}</p>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Username</label>
                <input
                  type="text"
                  name="username"
                  required
                  value={createForm.username}
                  onChange={handleCreateChange}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold placeholder:text-slate-300"
                  placeholder="e.g. gallery_admin"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Role Access Privilege</label>
                <select
                  name="role"
                  value={createForm.role}
                  onChange={handleCreateChange}
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
                    type={showCreatePassword ? "text" : "password"}
                    name="password"
                    required
                    value={createForm.password}
                    onChange={handleCreateChange}
                    className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCreatePassword(!showCreatePassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {showCreatePassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={createForm.confirmPassword}
                  onChange={handleCreateChange}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
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

      {/* Force-Reset Other Administrator's Password Modal */}
      {showResetModal && resettingUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden animate-scale-up">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-blue-900" />
                  <span>Reset Admin Password</span>
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  Overriding credentials for: <span className="text-blue-900 font-extrabold">@{resettingUser.username}</span>
                </p>
              </div>
              <button 
                onClick={() => setShowResetModal(false)}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="p-8 space-y-6">
              {resetError && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex items-start gap-3.5 animate-shake">
                  <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Action Failed</p>
                    <p className="text-xs font-semibold opacity-90 mt-0.5">{resetError}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">New Administrator Password</label>
                <div className="relative">
                  <input
                    type={showResetPassword ? "text" : "password"}
                    required
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-200 focus:ring-8 focus:ring-blue-500/5 transition-all text-sm text-slate-900 font-bold"
                    placeholder="Min 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowResetPassword(!showResetPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {showResetPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 py-4 border border-slate-100 hover:bg-slate-50 hover:text-slate-900 text-slate-500 rounded-2xl font-bold text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/10 transition-all"
                >
                  Update Credentials
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
