import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  GraduationCap,
  BookOpen, 
  Briefcase,
  Save,
  X,
  ArrowRight,
  Image as ImageIcon,
  Award,
  Mail,
  User
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { facultyService } from '../../api';

const FacultyManager = () => {
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState('list'); // list, create, edit
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    sno: 1,
    name: '',
    role: '',
    dept: '',
    image: '',
    qualification: '',
    experience: '',
    specialization: '',
    publications: 0,
    projects: 0,
    bio: '',
    email: '',
    is_active: true
  });

  const { data: faculty = [], isLoading: loading } = useQuery({
    queryKey: ['faculty-admin'],
    queryFn: async () => {
      const response = await facultyService.getAllAdmin();
      return Array.isArray(response.data) ? response.data : (response.data?.data || []);
    }
  });

  const createMutation = useMutation({
    mutationFn: (data) => facultyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['faculty-admin']);
      setViewMode('list');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => facultyService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['faculty-admin']);
      setViewMode('list');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => facultyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['faculty-admin']);
    }
  });

  // fetchFaculty is replaced by useQuery

  const handleEdit = (member) => {
    setSelectedMember(member);
    setFormData(member);
    setViewMode('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this faculty member?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (viewMode === 'create') {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate({ id: selectedMember.id, data: formData });
    }
  };

  if (loading) return <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Synchronizing Faculty Registry...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Faculty Management
          </h1>
          <p className="text-slate-500 text-sm font-medium">Manage institutional mentors, researchers, and academic staff.</p>
        </div>
        <div className="flex items-center gap-3">
          {viewMode === 'list' ? (
            <button 
              onClick={() => {
                setFormData({
                  sno: faculty.length + 1,
                  name: '',
                  role: '',
                  dept: '',
                  image: '',
                  qualification: '',
                  experience: '',
                  specialization: '',
                  publications: 0,
                  projects: 0,
                  bio: '',
                  email: '',
                  is_active: true
                });
                setViewMode('create');
              }}
              className="flex items-center gap-3 bg-blue-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Add Faculty Member
            </button>
          ) : (
            <button 
              onClick={() => setViewMode('list')}
              className="flex items-center gap-3 bg-white border border-slate-200 text-slate-500 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to Registry
            </button>
          )}
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Faculty Member</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Department & Role</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {faculty.map((member) => (
                  <tr key={member.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-100">
                          <img src={member.image || 'https://ui-avatars.com/api/?name=Faculty'} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-sm tracking-tight">{member.name}</p>
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{member.qualification || 'PhD Candidate'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-black text-slate-700 tracking-tight">{member.dept}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.role}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${member.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {member.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(member)}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(member.id)}
                          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
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
          {faculty.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-200">
                <Users size={40} />
              </div>
              <p className="font-black text-slate-300 uppercase tracking-widest text-xs">No faculty found in registry</p>
            </div>
          )}
        </div>
      )}

      {(viewMode === 'create' || viewMode === 'edit') && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Personal & Professional Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. Dr. Jane Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</label>
                  <input 
                    type="text" 
                    value={formData.dept}
                    onChange={e => setFormData({...formData, dept: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. COMPUTER SCIENCE"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Designation / Role</label>
                  <input 
                    type="text" 
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. ASST PROFESSOR"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qualifications</label>
                  <input 
                    type="text" 
                    value={formData.qualification}
                    onChange={e => setFormData({...formData, qualification: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. PhD, M.Tech"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional Bio</label>
                  <textarea 
                    value={formData.bio}
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                    rows={4}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-medium text-slate-700"
                    placeholder="Write a brief professional background..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Academic Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Publications
                  </label>
                  <input 
                    type="number" 
                    value={formData.publications}
                    onChange={e => setFormData({...formData, publications: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-orange-600" />
                    Research Projects
                  </label>
                  <input 
                    type="number" 
                    value={formData.projects}
                    onChange={e => setFormData({...formData, projects: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                    Years Experience
                  </label>
                  <input 
                    type="text" 
                    value={formData.experience}
                    onChange={e => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. 15 Years"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Portrait Media</h3>
              <div className="space-y-4">
                <div className="w-full aspect-square rounded-[3rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden group relative">
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-[10px] font-black uppercase tracking-widest">Change Photo</p>
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
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Image URL</label>
                  <input 
                    type="text" 
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-[11px] text-blue-600"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    Institutional Email
                  </label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-[12px]"
                    placeholder="jane.doe@kec.edu"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Registry Visibility</label>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, is_active: !formData.is_active})}
                    className={`w-12 h-6 rounded-full transition-all relative ${formData.is_active ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.is_active ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-blue-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/30 hover:bg-slate-900 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            >
              <Save className="w-5 h-5" />
              {viewMode === 'create' ? 'Onboard Faculty' : 'Update Profile'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FacultyManager;
