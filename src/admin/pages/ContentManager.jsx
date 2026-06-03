import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contentService } from "../../api";
import { 
  Megaphone, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  FileText, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Star, 
  ChevronRight,
  TrendingUp,
  Loader2
} from "lucide-react";

const ContentManager = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "general",
    image_url: "",
    link: "",
    important: false,
    is_active: true
  });

  // Fetch notices
  const { data: notices = [], isLoading } = useQuery({
    queryKey: ["admin-notices"],
    queryFn: async () => {
      const response = await contentService.getNotices();
      return Array.isArray(response.data) ? response.data : (response.data?.data || []);
    }
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (newNotice) => contentService.createNotice(newNotice),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-notices"]);
      queryClient.invalidateQueries(["notices"]);
      closeModal();
    },
    onError: (err) => {
      alert("Failed to create notice: " + (err.response?.data?.error || err.message));
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => contentService.updateNotice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-notices"]);
      queryClient.invalidateQueries(["notices"]);
      closeModal();
    },
    onError: (err) => {
      alert("Failed to update notice: " + (err.response?.data?.error || err.message));
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => contentService.deleteNotice(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-notices"]);
      queryClient.invalidateQueries(["notices"]);
    },
    onError: (err) => {
      alert("Failed to delete notice: " + (err.response?.data?.error || err.message));
    }
  });

  const openCreateModal = () => {
    setEditingNotice(null);
    setFormData({
      title: "",
      content: "",
      type: "academic",
      image_url: "",
      link: "",
      important: false,
      is_active: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title || "",
      content: notice.content || "",
      type: notice.type || "general",
      image_url: notice.image_url || "",
      link: notice.link || "",
      important: notice.important || false,
      is_active: notice.is_active !== false
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNotice(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingNotice) {
      updateMutation.mutate({ id: editingNotice.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "academic": return "bg-blue-50 text-blue-700 border-blue-200";
      case "placement": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "event": return "bg-orange-50 text-orange-700 border-orange-200";
      case "student": return "bg-purple-50 text-purple-700 border-purple-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Announcements & News</h1>
            <p className="text-slate-500 font-medium text-sm mt-0.5">Manage live academic announcements, notices, and institutional updates.</p>
          </div>
        </div>

        <button
          onClick={openCreateModal}
          className="relative z-10 flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-blue-950 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 duration-300"
        >
          <Plus className="w-4 h-4" />
          Create Announcement
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-900">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">Total Updates</p>
            <h3 className="text-2xl font-black text-slate-900 mt-2">{notices.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">Active Notices</p>
            <h3 className="text-2xl font-black text-slate-900 mt-2">{notices.filter(n => n.is_active !== false).length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">Important</p>
            <h3 className="text-2xl font-black text-slate-900 mt-2">{notices.filter(n => n.important).length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">Categories</p>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              {new Set(notices.map(n => n.type)).size || 0}
            </h3>
          </div>
        </div>
      </div>

      {/* Grid List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-[2rem] gap-4">
          <Loader2 className="w-10 h-10 text-blue-900 animate-spin" />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Announcement Data...</p>
        </div>
      ) : notices.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-100 rounded-[2rem]">
          <Megaphone className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">No Announcements Yet</h3>
          <p className="text-slate-400 font-medium text-sm mt-1 max-w-sm mx-auto">Generate dynamic alerts, principal updates, or academic schedules to present on the homepage.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div 
              key={notice.id}
              className={`bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group relative ${
                notice.important ? "ring-2 ring-amber-500/20 border-amber-300" : ""
              }`}
            >
              {/* Image Preview */}
              <div className="relative h-48 bg-slate-50 overflow-hidden">
                {notice.image_url ? (
                  <img 
                    src={notice.image_url} 
                    alt={notice.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2 bg-slate-50">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">No Image Asset</span>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getBadgeColor(notice.type)}`}>
                    {notice.type}
                  </span>
                  {notice.important && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-amber-500 text-white border-amber-500 flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-white" />
                      Important
                    </span>
                  )}
                </div>
              </div>

              {/* Notice Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(notice.created_at || new Date()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-tight group-hover:text-blue-900 transition-colors mb-3 line-clamp-2">
                  {notice.title}
                </h3>
                
                <p className="text-slate-500 font-medium text-sm line-clamp-3 mb-6">
                  {notice.content}
                </p>

                {notice.link && (
                  <div className="flex items-center gap-2 text-blue-900 font-semibold text-xs border border-blue-50 px-3 py-2 bg-blue-50/20 rounded-xl mb-6 truncate">
                    <LinkIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{notice.link}</span>
                  </div>
                )}

                {/* Operations Bar */}
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${notice.is_active !== false ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {notice.is_active !== false ? "Active live" : "Archived"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(notice)}
                      className="p-2.5 text-slate-400 hover:text-blue-900 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-xl transition-all"
                      title="Edit Notice"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id, notice.title)}
                      className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl transition-all"
                      title="Delete Notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modern Notice Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={closeModal}></div>
          
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-10 animate-in zoom-in-95 duration-300">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase tracking-wide">
              {editingNotice ? "Edit Announcement" : "Create Announcement"}
            </h2>
            <p className="text-slate-500 font-medium text-sm mb-8">Establish key news alerts, PDF brochure releases, or general advisories dynamically.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Notice Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter short, descriptive title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                    required
                  />
                </div>

                <div className="group">
                  <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Category Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                    required
                  >
                    <option value="academic">Academic Notice</option>
                    <option value="placement">Placement Notice</option>
                    <option value="event">Campus Event</option>
                    <option value="student">Student Portal Update</option>
                    <option value="general">General Notice</option>
                  </select>
                </div>
              </div>

              <div className="group">
                <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Notice Description / Content</label>
                <textarea
                  name="content"
                  placeholder="Draft full announcement summary..."
                  value={formData.content}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all resize-none"
                  required
                ></textarea>
              </div>

              <div className="group">
                <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Featured Image URL (Optional)</label>
                <div className="relative">
                  <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input
                    type="url"
                    name="image_url"
                    placeholder="https://example.com/images/notice.jpg"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="w-full p-4 pl-14 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Redirect Link (Optional)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input
                    type="url"
                    name="link"
                    placeholder="https://example.com/brochure.pdf"
                    value={formData.link}
                    onChange={handleChange}
                    className="w-full p-4 pl-14 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="important"
                    checked={formData.important}
                    onChange={handleChange}
                    className="w-5 h-5 rounded-md border-slate-300 text-blue-900 focus:ring-blue-900"
                  />
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900">Mark as Important</span>
                    <p className="text-[10px] text-slate-400 font-medium">Adds featured gold badging on home display.</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-5 h-5 rounded-md border-slate-300 text-blue-900 focus:ring-blue-900"
                  />
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900">Display Active Live</span>
                    <p className="text-[10px] text-slate-400 font-medium">Enable immediate live rendering on home pages.</p>
                  </div>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-4 border-2 border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-slate-50 transition-all text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isLoading || updateMutation.isLoading}
                  className="flex-1 py-4 bg-slate-900 hover:bg-blue-950 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {createMutation.isLoading || updateMutation.isLoading ? "Saving Data..." : "Publish Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManager;
