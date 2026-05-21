import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  BookOpen, 
  Briefcase,
  GraduationCap,
  Save,
  X,
  ArrowRight,
  Image as ImageIcon,
  Zap,
  Microchip,
  Cog,
  Star
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentService } from '../../api';

const DepartmentManager = () => {
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState('list'); // list, create, edit
  const [selectedDept, setSelectedDept] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    short_name: '',
    description: '',
    image: '',
    student_count: 0,
    course_count: 0,
    placement_rate: '',
    faculty_count: 0,
    lab_count: 0,
    established: 2008,
    highlights: [],
    link: '',
    is_active: true
  });
  const [highlightInput, setHighlightInput] = useState('');

  const { data: departments = [], isLoading: loading } = useQuery({
    queryKey: ['departments-admin'],
    queryFn: async () => {
      const response = await departmentService.getAllAdmin();
      return Array.isArray(response.data) ? response.data : (response.data?.data || []);
    }
  });

  const createMutation = useMutation({
    mutationFn: (data) => departmentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['departments-admin']);
      setViewMode('list');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => departmentService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['departments-admin']);
      setViewMode('list');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => departmentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['departments-admin']);
    }
  });

  // fetchDepartments is replaced by useQuery

  const handleEdit = (dept) => {
    setSelectedDept(dept);
    setFormData({
      ...dept,
      highlights: Array.isArray(dept.highlights) ? dept.highlights : JSON.parse(dept.highlights || '[]')
    });
    setViewMode('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, highlightInput.trim()]
      }));
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (viewMode === 'create') {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate({ id: selectedDept.id, data: formData });
    }
  };

  if (loading) return <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Synchronizing Departments...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
            <Building className="w-8 h-8 text-blue-600" />
            Academic Departments
          </h1>
          <p className="text-slate-500 text-sm font-medium">Manage institutional programs, stats, and departmental content.</p>
        </div>
        <div className="flex items-center gap-3">
          {viewMode === 'list' ? (
            <button 
              onClick={() => {
                setFormData({
                  name: '',
                  short_name: '',
                  description: '',
                  image: '',
                  student_count: 0,
                  course_count: 0,
                  placement_rate: '',
                  faculty_count: 0,
                  lab_count: 0,
                  established: 2008,
                  highlights: [],
                  link: '',
                  is_active: true
                });
                setViewMode('create');
              }}
              className="flex items-center gap-3 bg-blue-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              New Department
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={dept.image} 
                  alt={dept.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
                    {dept.short_name}
                  </span>
                  <h3 className="text-xl font-black text-white tracking-tight">{dept.name}</h3>
                </div>
                <div className="absolute top-6 right-6 flex gap-2">
                  <button 
                    onClick={() => handleEdit(dept)}
                    className="p-2.5 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-blue-600 rounded-xl transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(dept.id)}
                    className="p-2.5 bg-white/10 backdrop-blur-md text-white hover:bg-red-500 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Students</span>
                    </div>
                    <p className="text-lg font-black text-slate-900 tabular-nums">{dept.student_count}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Placement</span>
                    </div>
                    <p className="text-lg font-black text-slate-900 tabular-nums">{dept.placement_rate}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(dept.highlights) ? dept.highlights : JSON.parse(dept.highlights || '[]')).slice(0, 3).map((h, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {h}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => handleEdit(dept)}
                  className="w-full py-4 border-2 border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-blue-200 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  Manage Content
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <button 
            onClick={() => setViewMode('create')}
            className="border-4 border-dashed border-slate-100 rounded-[2.5rem] p-12 flex flex-col items-center justify-center gap-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl shadow-slate-100">
              <Plus className="w-8 h-8" />
            </div>
            <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Add New Department</p>
          </button>
        </div>
      )}

      {(viewMode === 'create' || viewMode === 'edit') && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Core Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. Civil Engineering"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Short Identifier</label>
                  <input 
                    type="text" 
                    value={formData.short_name}
                    onChange={e => setFormData({...formData, short_name: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. CIVIL"
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Public Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-medium text-slate-700"
                    placeholder="Describe the department's mission and goals..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Departmental Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    Students
                  </label>
                  <input 
                    type="number" 
                    value={formData.student_count}
                    onChange={e => setFormData({...formData, student_count: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-green-600" />
                    Courses
                  </label>
                  <input 
                    type="number" 
                    value={formData.course_count}
                    onChange={e => setFormData({...formData, course_count: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                    Placement %
                  </label>
                  <input 
                    type="text" 
                    value={formData.placement_rate}
                    onChange={e => setFormData({...formData, placement_rate: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. 95%"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
                    Faculty
                  </label>
                  <input 
                    type="number" 
                    value={formData.faculty_count}
                    onChange={e => setFormData({...formData, faculty_count: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Cog className="w-3.5 h-3.5 text-slate-600" />
                    Labs
                  </label>
                  <input 
                    type="number" 
                    value={formData.lab_count}
                    onChange={e => setFormData({...formData, lab_count: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-yellow-500" />
                    Established
                  </label>
                  <input 
                    type="number" 
                    value={formData.established}
                    onChange={e => setFormData({...formData, established: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Program Highlights</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={highlightInput}
                    onChange={e => setHighlightInput(e.target.value)}
                    className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800 text-sm"
                    placeholder="Enter a program highlight or specialization..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHighlight())}
                  />
                  <button 
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-6 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                  >
                    Add
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formData.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                      <div className="flex items-center gap-3">
                        <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
                        <span className="text-sm font-bold text-slate-700">{h}</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
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
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Cover Media</h3>
              <div className="space-y-4">
                <div className="w-full aspect-video rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden group relative">
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-[10px] font-black uppercase tracking-widest">Change Banner</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-10 h-10 text-slate-200 mb-2" />
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No Banner Set</p>
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
                    placeholder="/dep/cse.jpeg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Navigation Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Routing Link</label>
                  <input 
                    type="text" 
                    value={formData.link}
                    onChange={e => setFormData({...formData, link: e.target.value})}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-[12px]"
                    placeholder="/departments/cse"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Visible on Site</label>
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
              {viewMode === 'create' ? 'Save Department' : 'Update Registry'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DepartmentManager;
