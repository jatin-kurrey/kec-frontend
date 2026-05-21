import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Users, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  GraduationCap, 
  Award, 
  Briefcase,
  Star,
  Clock,
  Save,
  X,
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react';
import { leadershipService } from '../../api';

const LeadershipManager = () => {
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState('list'); // list, create, edit
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'HOD',
    department: '',
    image: '',
    qualification: '',
    experience: '',
    email: '',
    phone: '',
    specialization: '',
    bio: '',
    achievements: [],
    priority: 0
  });
  const [achievementInput, setAchievementInput] = useState('');

  const { data: members = [], isLoading: loading } = useQuery({
    queryKey: ['leadership-admin'],
    queryFn: async () => {
      const res = await leadershipService.getAllAdmin();
      return res.data || [];
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (viewMode === 'create') return leadershipService.create(data);
      return leadershipService.update(selectedMember.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['leadership-admin']);
      setViewMode('list');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => leadershipService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['leadership-admin']);
    }
  });

  // fetchMembers is replaced by useQuery

  const handleEdit = (member) => {
    setSelectedMember(member);
    setFormData({
      ...member,
      achievements: Array.isArray(member.achievements) ? member.achievements : JSON.parse(member.achievements || '[]')
    });
    setViewMode('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this leadership member?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddAchievement = () => {
    if (achievementInput.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()]
      }));
      setAchievementInput('');
    }
  };

  const handleRemoveAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  if (loading) return <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Initializing Leadership Module...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
            <Award className="w-8 h-8 text-blue-600" />
            Leadership & HODs
          </h1>
          <p className="text-slate-500 text-sm font-medium">Manage academic leadership, department heads, and key personnel.</p>
        </div>
        <div className="flex items-center gap-3">
          {viewMode === 'list' ? (
            <button 
              onClick={() => {
                setFormData({
                  name: '',
                  role: 'HOD',
                  department: '',
                  image: '',
                  qualification: '',
                  experience: '',
                  email: '',
                  phone: '',
                  specialization: '',
                  bio: '',
                  achievements: [],
                  priority: 0
                });
                setViewMode('create');
              }}
              className="flex items-center gap-3 bg-blue-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Add Leader
            </button>
          ) : (
            <button 
              onClick={() => setViewMode('list')}
              className="flex items-center gap-3 bg-white border border-slate-200 text-slate-500 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Return to List
            </button>
          )}
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-y border-slate-100">
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Department & Role</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Priority</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((member) => (
                  <tr key={member.id} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-14 h-14 rounded-2xl object-cover shadow-md ring-4 ring-slate-50 group-hover:ring-blue-100 transition-all"
                        />
                        <div>
                          <p className="text-sm font-black text-slate-900 tracking-tight">{member.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{member.qualification.split(',')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                          {member.role}
                        </span>
                        <p className="text-xs font-bold text-slate-600">{member.department}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Mail className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-medium lowercase tracking-tight">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Phone className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-medium">{member.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-sm font-black text-slate-300 tabular-nums">#{member.priority}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(member)}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          title="Edit Profile"
                        >
                          <Edit3 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(member.id)}
                          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Remove Member"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {members.length === 0 && (
            <div className="py-20 text-center">
              <Award className="w-16 h-16 text-slate-100 mx-auto mb-4" />
              <h3 className="text-slate-900 font-black tracking-tight">No Leadership data found</h3>
              <p className="text-slate-400 text-sm font-medium">Add your first HOD or academic leader to get started.</p>
            </div>
          )}
        </div>
      )}

      {(viewMode === 'create' || viewMode === 'edit') && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Member Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. Dr. John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Administrative Role</label>
                  <select 
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  >
                    <option value="HOD">HOD (Head of Department)</option>
                    <option value="Principal">Principal</option>
                    <option value="Director">Director</option>
                    <option value="Dean">Dean</option>
                    <option value="Registrar">Registrar</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</label>
                  <input 
                    type="text" 
                    value={formData.department}
                    onChange={e => setFormData({...formData, department: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort Priority</label>
                  <input 
                    type="number" 
                    value={formData.priority}
                    onChange={e => setFormData({...formData, priority: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Professional Credentials</h3>
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Qualifications</label>
                  <input 
                    type="text" 
                    value={formData.qualification}
                    onChange={e => setFormData({...formData, qualification: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. Ph.D. in Computer Science, M.Tech..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Years of Experience</label>
                    <input 
                      type="text" 
                      value={formData.experience}
                      onChange={e => setFormData({...formData, experience: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                      placeholder="e.g. 15 Years"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Specialization</label>
                    <input 
                      type="text" 
                      value={formData.specialization}
                      onChange={e => setFormData({...formData, specialization: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                      placeholder="e.g. Artificial Intelligence"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional Bio</label>
                  <textarea 
                    value={formData.bio}
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                    rows={4}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-medium text-slate-700"
                    placeholder="Brief description of professional background..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Achievements & Awards</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={achievementInput}
                    onChange={e => setAchievementInput(e.target.value)}
                    className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800 text-sm"
                    placeholder="Enter an achievement or award..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAchievement())}
                  />
                  <button 
                    type="button"
                    onClick={handleAddAchievement}
                    className="px-6 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {formData.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                      <div className="flex items-center gap-3">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold text-slate-700">{ach}</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleRemoveAchievement(idx)}
                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Member Media</h3>
              <div className="space-y-4">
                <div className="w-full aspect-square rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden group relative">
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-[10px] font-black uppercase tracking-widest">Update Image</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-10 h-10 text-slate-200 mb-2" />
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No Image Set</p>
                    </>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile Image URL</label>
                  <input 
                    type="text" 
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-[11px] text-blue-600"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Contact Gateway</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Official Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-12 pr-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-[12px]"
                      placeholder="hod@kec.edu"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Contact</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-12 pr-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-[12px]"
                      placeholder="+91 0000000000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-blue-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/30 hover:bg-slate-900 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            >
              <Save className="w-5 h-5" />
              {viewMode === 'create' ? 'Deploy Member' : 'Apply Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LeadershipManager;
