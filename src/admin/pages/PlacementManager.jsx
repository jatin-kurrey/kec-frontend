import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { placementService } from "../../api";
import { 
  Briefcase, TrendingUp, Award, Users, GraduationCap, 
  Globe, Building2, Plus, Edit2, Trash2, Save, X, Link, Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PlacementManager = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("stats");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecruiter, setEditingRecruiter] = useState(null);

  // Fetch placement stats & recruiters
  const { data: stats = [], isLoading: statsLoading } = useQuery({
    queryKey: ['placement-stats-admin'],
    queryFn: async () => {
      const response = await placementService.getStats();
      return response.data?.data || [];
    }
  });

  const { data: recruiters = [], isLoading: recruitersLoading } = useQuery({
    queryKey: ['recruiters-admin'],
    queryFn: async () => {
      const response = await placementService.getRecruiters();
      return response.data?.data || [];
    }
  });

  const loading = statsLoading || recruitersLoading;

  // Mutations
  const updateStatsMutation = useMutation({
    mutationFn: async (updatedStats) => {
      return placementService.updateStats(updatedStats);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['placement-stats-admin']);
      alert("Placement statistics updated successfully!");
    },
    onError: (err) => {
      alert("Failed to update statistics: " + (err.response?.data?.error || err.message));
    }
  });

  const saveRecruiterMutation = useMutation({
    mutationFn: async (data) => {
      if (editingRecruiter) {
        return placementService.updateRecruiter(editingRecruiter.id, data);
      }
      return placementService.createRecruiter(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['recruiters-admin']);
      setIsModalOpen(false);
      setEditingRecruiter(null);
    },
    onError: (err) => {
      alert("Failed to save recruiter: " + (err.response?.data?.error || err.message));
    }
  });

  const deleteRecruiterMutation = useMutation({
    mutationFn: async (id) => {
      return placementService.deleteRecruiter(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['recruiters-admin']);
    },
    onError: (err) => {
      alert("Failed to delete recruiter: " + (err.response?.data?.error || err.message));
    }
  });

  const statsList = Array.isArray(stats) ? stats : [];
  const recruitersList = Array.isArray(recruiters) ? recruiters : [];

  const handleStatsSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedStats = statsList.map(stat => {
      const value = formData.get(`value_${stat.id}`);
      return {
        ...stat,
        value: value !== null ? value : stat.value
      };
    });
    updateStatsMutation.mutate(updatedStats);
  };

  const handleRecruiterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      logo_url: formData.get("logo_url"),
      category: formData.get("category"),
      website: formData.get("website"),
    };
    saveRecruiterMutation.mutate(data);
  };

  const handleDeleteRecruiter = (id) => {
    if (!window.confirm("Are you sure you want to delete this recruiting partner?")) return;
    deleteRecruiterMutation.mutate(id);
  };

  const getStatIcon = (iconName) => {
    const icons = {
      Users,
      Award,
      TrendingUp,
      Building2,
      GraduationCap,
      Briefcase,
      Globe
    };
    const FoundIcon = icons[iconName] || Briefcase;
    return <FoundIcon className="w-5 h-5 text-blue-600" />;
  };

  const formatLabel = (label) => {
    // Camel case to Title Case
    return label
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Placement Management</h1>
          <p className="text-slate-500 mt-1">Manage stats and corporate recruitment partners displayed on KEC website.</p>
        </div>
        {activeTab === "recruiters" && (
          <button 
            onClick={() => { setEditingRecruiter(null); setIsModalOpen(true); }}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-md font-semibold transition-all duration-300 transform hover:scale-[1.02]"
          >
            <Plus size={20} /> Add Recruiter
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex items-center px-6 py-3 rounded-xl gap-2 font-semibold transition-all ${
            activeTab === "stats" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-800"
          }`}
        >
          <TrendingUp size={18} />
          Placement Statistics
        </button>
        <button
          onClick={() => setActiveTab("recruiters")}
          className={`flex items-center px-6 py-3 rounded-xl gap-2 font-semibold transition-all ${
            activeTab === "recruiters" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-800"
          }`}
        >
          <Briefcase size={18} />
          Recruiting Partners
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : activeTab === "stats" ? (
        /* Statistics Editor */
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm max-w-4xl"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-6">Edit Placement Statistics</h2>
          <form onSubmit={handleStatsSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {statsList.map(stat => (
                <div key={stat.id} className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    {getStatIcon(stat.icon)}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      {formatLabel(stat.label)}
                    </label>
                    <input 
                      type="text"
                      name={`value_${stat.id}`}
                      defaultValue={stat.value} 
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                      placeholder="e.g. 82%"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100 mt-8">
              <button 
                type="submit" 
                disabled={updateStatsMutation.isPending}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg font-semibold transition-all duration-300 hover:shadow-blue-500/20 disabled:opacity-50"
              >
                <Save size={20} />
                {updateStatsMutation.isPending ? "Saving..." : "Save Statistics"}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        /* Recruiters List & Cards */
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recruitersList.map((recruiter) => (
            <div 
              key={recruiter.id} 
              className="bg-white p-6 border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group relative"
            >
              {/* Partner Logo & Information */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center p-2.5 overflow-hidden shadow-sm">
                  <img 
                    src={recruiter.logo || recruiter.logo_url} 
                    alt={recruiter.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 truncate text-lg">{recruiter.name}</h3>
                  <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                    {recruiter.category || "General"}
                  </span>
                </div>
              </div>

              {/* Website Link */}
              {recruiter.website && (
                <div className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm mt-auto mb-4 font-medium transition-colors">
                  <Link size={16} />
                  <a href={recruiter.website} target="_blank" rel="noopener noreferrer" className="truncate">
                    {recruiter.website.replace(/(^\w+:|^)\/\//, '')}
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 border-t border-slate-50 pt-4 mt-auto">
                <button 
                  onClick={() => { setEditingRecruiter(recruiter); setIsModalOpen(true); }} 
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  title="Edit Partner"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteRecruiter(recruiter.id)} 
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  title="Delete Partner"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Recruiter Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-100"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-800">
                  {editingRecruiter ? "Edit Recruiting Partner" : "Add Recruiting Partner"}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleRecruiterSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Name</label>
                  <input 
                    name="name" 
                    defaultValue={editingRecruiter?.name} 
                    placeholder="e.g. Sony India" 
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Logo Image URL</label>
                  <input 
                    name="logo_url" 
                    defaultValue={editingRecruiter?.logo_url || editingRecruiter?.logo} 
                    placeholder="e.g. https://www.kecbhilai.com/TPO/image007.png" 
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category / Sector</label>
                  <input 
                    name="category" 
                    defaultValue={editingRecruiter?.category} 
                    placeholder="e.g. Electronics / Consumer Goods" 
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Website URL</label>
                  <input 
                    name="website" 
                    defaultValue={editingRecruiter?.website} 
                    placeholder="e.g. https://www.sony.co.in" 
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="flex-1 px-5 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-semibold transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={saveRecruiterMutation.isPending}
                    className="flex-1 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md font-semibold transition-all duration-200 disabled:opacity-50"
                  >
                    {saveRecruiterMutation.isPending ? "Saving..." : "Save Partner"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlacementManager;
