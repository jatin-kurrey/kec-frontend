import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  Clock, 
  Award,
  CheckCircle,
  Save,
  X,
  ArrowRight,
  ChevronRight,
  Brain,
  Cpu,
  Shield,
  Cloud,
  Database,
  Zap,
  BatteryCharging,
  Bot,
  Palette,
  GraduationCap
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from '../../api';

const iconOptions = [
  { name: 'Brain', icon: Brain },
  { name: 'Cpu', icon: Cpu },
  { name: 'Shield', icon: Shield },
  { name: 'Cloud', icon: Cloud },
  { name: 'Database', icon: Database },
  { name: 'Zap', icon: Zap },
  { name: 'BatteryCharging', icon: BatteryCharging },
  { name: 'Bot', icon: Bot },
];

const CourseManager = () => {
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState('list'); // list, create, edit
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    short_name: '',
    icon: 'Brain',
    duration: '4 years',
    seats: 60,
    credits: 160,
    description: '',
    highlights: [],
    career: '',
    color: 'from-blue-500 to-purple-500',
    icon_color: 'text-blue-500',
    bg_color: 'bg-blue-50',
    department: 'Computer Science',
    eligibility: '10+2 with Physics, Chemistry, and Mathematics',
    fees: '₹95,000 per year',
    is_active: true
  });
  const [highlightInput, setHighlightInput] = useState('');

  const { data: courses = [], isLoading: loading } = useQuery({
    queryKey: ['courses-admin'],
    queryFn: async () => {
      const response = await courseService.getAllAdmin();
      return Array.isArray(response.data) ? response.data : (response.data?.data || []);
    }
  });

  const createMutation = useMutation({
    mutationFn: (data) => courseService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses-admin']);
      setViewMode('list');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => courseService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses-admin']);
      setViewMode('list');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => courseService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses-admin']);
    }
  });

  // fetchCourses is replaced by useQuery

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setFormData({
      ...course,
      highlights: Array.isArray(course.highlights) ? course.highlights : JSON.parse(course.highlights || '[]')
    });
    setViewMode('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
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
      updateMutation.mutate({ id: selectedCourse.id, data: formData });
    }
  };

  if (loading) return <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Synchronizing Programs...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Engineering Programs
          </h1>
          <p className="text-slate-500 text-sm font-medium">Manage specializations, curriculum highlights, and career paths.</p>
        </div>
        <div className="flex items-center gap-3">
          {viewMode === 'list' ? (
            <button 
              onClick={() => {
                setFormData({
                  title: '',
                  short_name: '',
                  icon: 'Brain',
                  duration: '4 years',
                  seats: 60,
                  credits: 160,
                  description: '',
                  highlights: [],
                  career: '',
                  color: 'from-blue-500 to-purple-500',
                  icon_color: 'text-blue-500',
                  bg_color: 'bg-blue-50',
                  department: 'Computer Science',
                  eligibility: '10+2 with Physics, Chemistry, and Mathematics',
                  fees: '₹95,000 per year',
                  is_active: true
                });
                setViewMode('create');
              }}
              className="flex items-center gap-3 bg-blue-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              New Program
            </button>
          ) : (
            <button 
              onClick={() => setViewMode('list')}
              className="flex items-center gap-3 bg-white border border-slate-200 text-slate-500 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to Catalog
            </button>
          )}
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const IconComp = iconOptions.find(o => o.name === course.icon)?.icon || Brain;
            return (
              <div key={course.id} className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500">
                <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl ${course.bg_color}`}>
                      <IconComp className={`w-8 h-8 ${course.icon_color}`} />
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(course)}
                        className="p-2.5 bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(course.id)}
                        className="p-2.5 bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1 block">
                      {course.department}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">{course.title}</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{course.short_name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Seats</span>
                      </div>
                      <p className="text-sm font-black text-slate-900">{course.seats}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
                      </div>
                      <p className="text-sm font-black text-slate-900">{course.duration}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(Array.isArray(course.highlights) ? course.highlights : JSON.parse(course.highlights || '[]')).slice(0, 3).map((h, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[9px] font-bold uppercase tracking-wider border border-slate-100">
                        {h}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleEdit(course)}
                    className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    Manage Specialization
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <button 
            onClick={() => setViewMode('create')}
            className="border-4 border-dashed border-slate-100 rounded-[2.5rem] p-12 flex flex-col items-center justify-center gap-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl shadow-slate-100">
              <Plus className="w-8 h-8" />
            </div>
            <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Add New Program</p>
          </button>
        </div>
      )}

      {(viewMode === 'create' || viewMode === 'edit') && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
          <div className="lg:col-span-2 space-y-8">
            {/* Core Info */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Core Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Full Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. Artificial Intelligence"
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
                    placeholder="e.g. AI"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</label>
                  <select 
                    value={formData.department}
                    onChange={e => setFormData({...formData, department: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Program Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-medium text-slate-700"
                    placeholder="Describe the specialization and its relevance..."
                  />
                </div>
              </div>
            </div>

            {/* Program Details */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Program Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    Duration
                  </label>
                  <input 
                    type="text" 
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-green-600" />
                    Annual Seats
                  </label>
                  <input 
                    type="number" 
                    value={formData.seats}
                    onChange={e => setFormData({...formData, seats: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-purple-600" />
                    Total Credits
                  </label>
                  <input 
                    type="number" 
                    value={formData.credits}
                    onChange={e => setFormData({...formData, credits: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-orange-600" />
                    Eligibility Criteria
                  </label>
                  <input 
                    type="text" 
                    value={formData.eligibility}
                    onChange={e => setFormData({...formData, eligibility: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. 10+2 with PCM"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Palette className="w-3.5 h-3.5 text-yellow-500" />
                    Annual Fees
                  </label>
                  <input 
                    type="text" 
                    value={formData.fees}
                    onChange={e => setFormData({...formData, fees: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. ₹95,000"
                  />
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Program Highlights</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={highlightInput}
                    onChange={e => setHighlightInput(e.target.value)}
                    className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-bold text-slate-800 text-sm"
                    placeholder="Enter a curriculum highlight..."
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
                        <CheckCircle className="w-4 h-4 text-green-500" />
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

            {/* Career Opportunities */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Career Opportunities</h3>
              <textarea 
                value={formData.career}
                onChange={e => setFormData({...formData, career: e.target.value})}
                rows={3}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-300 transition-all font-medium text-slate-700"
                placeholder="e.g. AI Engineer, Data Scientist, ML Specialist..."
              />
            </div>
          </div>

          <div className="space-y-8">
            {/* Visual Settings */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Visual Aesthetics</h3>
              
              {/* Icon Selection */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Representation Icon</label>
                <div className="grid grid-cols-4 gap-2">
                  {iconOptions.map((opt) => (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setFormData({...formData, icon: opt.name})}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-center ${formData.icon === opt.name ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100'}`}
                    >
                      <opt.icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gradient Theme (Tailwind classes)</label>
                  <input 
                    type="text" 
                    value={formData.color}
                    onChange={e => setFormData({...formData, color: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-mono text-[10px] text-blue-600"
                    placeholder="from-purple-500 to-pink-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Icon Color Class</label>
                  <input 
                    type="text" 
                    value={formData.icon_color}
                    onChange={e => setFormData({...formData, icon_color: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-mono text-[10px] text-blue-600"
                    placeholder="text-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Background Color Class</label>
                  <input 
                    type="text" 
                    value={formData.bg_color}
                    onChange={e => setFormData({...formData, bg_color: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-mono text-[10px] text-blue-600"
                    placeholder="bg-purple-50"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${formData.is_active ? 'bg-green-500' : 'bg-slate-300'} animate-pulse`} />
                  <label className="text-xs font-black text-slate-900 uppercase tracking-widest">Active Status</label>
                </div>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, is_active: !formData.is_active})}
                  className={`w-12 h-6 rounded-full transition-all relative ${formData.is_active ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.is_active ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <button 
              type="submit"
              className="w-full py-6 bg-blue-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/30 hover:bg-slate-900 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            >
              <Save className="w-5 h-5" />
              {viewMode === 'create' ? 'Register Program' : 'Update Specialization'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CourseManager;
