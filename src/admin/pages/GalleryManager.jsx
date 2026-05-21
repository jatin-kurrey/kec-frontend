import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  MapPin, 
  Users, 
  Save, 
  ArrowRight,
  Clock,
  Heart,
  Download,
  Palette
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contentService } from '../../api';

const GalleryManager = () => {
  const [viewMode, setViewMode] = useState('list'); // list, create, edit
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Cultural',
    description: '',
    image_url: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    location: 'Main Campus',
    likes: 0,
    downloads: 0,
    attendees: 0,
    color: '#3B82F6'
  });

  const categories = ["Cultural", "Academic", "Religious", "National"];

  const queryClient = useQueryClient();
  const { data: galleryItems = [], isLoading: loading } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const response = await contentService.getGallery();
      return Array.isArray(response.data) ? response.data : (response.data?.data || []);
    }
  });

  const createMutation = useMutation({
    mutationFn: (data) => contentService.addToGallery(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      setViewMode('list');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => contentService.updateGallery(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      setViewMode('list');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => contentService.deleteGallery(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    }
  });

  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1514525253361-bee438d59ef7?q=80&w=1000';
    if (url.startsWith('http')) return url;
    const baseUrl = contentService.getBaseUrl ? contentService.getBaseUrl() : 'http://localhost:8080';
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      ...item,
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setViewMode('edit');
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      date: new Date(formData.date).toISOString(),
      likes: parseInt(formData.likes),
      downloads: parseInt(formData.downloads),
      attendees: parseInt(formData.attendees)
    };

    if (viewMode === 'create') {
      createMutation.mutate(payload);
    } else {
      updateMutation.mutate({ id: selectedItem.id, data: payload });
    }
  };

  if (loading) return <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Synchronizing Visual Archives...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-purple-600" />
            Gallery Manager
          </h1>
          <p className="text-slate-500 text-sm font-medium">Curate and manage campus memories, events, and visual milestones.</p>
        </div>
        <div className="flex items-center gap-3">
          {viewMode === 'list' ? (
            <button 
              onClick={() => {
                setFormData({
                  title: '',
                  category: 'Cultural',
                  description: '',
                  image_url: '',
                  date: new Date().toISOString().split('T')[0],
                  time: '10:00 AM',
                  location: 'Main Campus',
                  likes: 0,
                  downloads: 0,
                  attendees: 0,
                  color: '#3B82F6'
                });
                setViewMode('create');
              }}
              className="flex items-center gap-3 bg-purple-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-purple-900/20 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Add New Memory
            </button>
          ) : (
            <button 
              onClick={() => setViewMode('list')}
              className="flex items-center gap-3 bg-white border border-slate-200 text-slate-500 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to Gallery
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
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Visual Memory</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Context & Category</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Engagement</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {galleryItems.map((item) => (
                  <tr key={item.id} className="hover:bg-purple-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                          <img 
                            src={getImageUrl(item.image_url)} 
                            alt="" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1514525253361-bee438d59ef7?q=80&w=1000';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-sm tracking-tight">{item.title}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-50 text-purple-600 border border-purple-100 w-fit">
                          {item.category}
                        </span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4 text-slate-400">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-red-400" />
                          <span className="text-xs font-black">{item.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-3.5 h-3.5 text-blue-400" />
                          <span className="text-xs font-black">{item.downloads}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-xs font-black">{item.attendees}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
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
          {galleryItems.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-200">
                <ImageIcon size={40} />
              </div>
              <p className="font-black text-slate-300 uppercase tracking-widest text-xs">No memories found in gallery</p>
            </div>
          )}
        </div>
      )}

      {(viewMode === 'create' || viewMode === 'edit') && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Event Context</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Memory Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-purple-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. Annual Cultural Fest 2024"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-purple-300 transition-all font-bold text-slate-800 appearance-none cursor-pointer"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-purple-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. Auditorium Hall"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-purple-300 transition-all font-bold text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</label>
                  <input 
                    type="text" 
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-purple-300 transition-all font-bold text-slate-800"
                    placeholder="e.g. 10:30 AM"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-purple-300 transition-all font-medium text-slate-700"
                    placeholder="Share the story behind this moment..."
                  />
                </div>
              </div>
            </div>

            {viewMode === 'edit' ? (
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-8">
                <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Real-time Student Engagement</h3>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Live metrics from the public student portal.</p>
                  </div>
                  <span className="px-3.5 py-1.5 bg-green-50 text-green-600 text-[10px] font-black rounded-full border border-green-100 uppercase tracking-widest animate-pulse">Live</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Likes Card */}
                  <div className="p-6 bg-red-50/40 border border-red-100/50 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:shadow-red-500/5">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                      <Heart className="w-6 h-6 fill-red-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Likes</p>
                      <p className="text-2xl font-black text-slate-800 mt-1">{formData.likes || 0}</p>
                    </div>
                  </div>

                  {/* Downloads Card */}
                  <div className="p-6 bg-blue-50/40 border border-blue-100/50 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/5">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                      <Download className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Downloads</p>
                      <p className="text-2xl font-black text-slate-800 mt-1">{formData.downloads || 0}</p>
                    </div>
                  </div>

                  {/* Attendees Card */}
                  <div className="p-6 bg-green-50/40 border border-green-100/50 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:shadow-green-500/5">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Attendees</p>
                      <p className="text-2xl font-black text-slate-800 mt-1">{formData.attendees || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm space-y-6">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-6">Engagement Metrics</h3>
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800">Dynamic Metrics Activated</p>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      New memories start with zero engagement. Student likes, image downloads, and attendance counters will update dynamically in real-time as users interact with this event on the public campus portal.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Primary Visual</h3>
              <div className="space-y-4">
                <div className="w-full aspect-video rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden group relative">
                  {formData.image_url ? (
                    <>
                      <img 
                        src={getImageUrl(formData.image_url)} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1514525253361-bee438d59ef7?q=80&w=1000';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-[10px] font-black uppercase tracking-widest">Change Image</p>
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
                    value={formData.image_url}
                    onChange={e => setFormData({...formData, image_url: e.target.value})}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:bg-white focus:border-purple-300 transition-all font-bold text-[11px] text-purple-600"
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Aesthetics</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Palette className="w-3.5 h-3.5 text-purple-600" />
                    Theme Color
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={formData.color}
                      onChange={e => setFormData({...formData, color: e.target.value})}
                      className="w-12 h-12 bg-transparent border-0 cursor-pointer"
                    />
                    <input 
                      type="text" 
                      value={formData.color}
                      onChange={e => setFormData({...formData, color: e.target.value})}
                      className="flex-1 px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:bg-white focus:border-purple-300 transition-all font-bold text-[12px] uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-purple-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-purple-900/30 hover:bg-slate-900 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            >
              <Save className="w-5 h-5" />
              {viewMode === 'create' ? 'Publish Memory' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default GalleryManager;
