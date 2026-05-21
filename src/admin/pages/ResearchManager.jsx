import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  FlaskRound, 
  Building, 
  Target, 
  BarChart3,
  Loader2,
  AlertCircle,
  ChevronRight,
  Eye
} from 'lucide-react';
import { researchService } from '../../api';

const ResearchManager = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  const { data: researchData = { areas: [], projects: [], facilities: [], stats: [] }, isLoading: loading } = useQuery({
    queryKey: ['research-admin'],
    queryFn: async () => {
      const [areasRes, projectsRes, facilitiesRes, statsRes] = await Promise.all([
        researchService.getAllAreasAdmin(),
        researchService.getAllProjectsAdmin(),
        researchService.getAllFacilitiesAdmin(),
        researchService.getStatsAdmin()
      ]);
      return {
        areas: Array.isArray(areasRes.data) ? areasRes.data : (areasRes.data?.data || []),
        projects: Array.isArray(projectsRes.data) ? projectsRes.data : (projectsRes.data?.data || []),
        facilities: Array.isArray(facilitiesRes.data) ? facilitiesRes.data : (facilitiesRes.data?.data || []),
        stats: Array.isArray(statsRes.data) ? statsRes.data : (statsRes.data?.data || [])
      };
    }
  });

  const data = researchData;

  const saveMutation = useMutation({
    mutationFn: async (entry) => {
      if (activeTab === 'projects') {
        if (entry.id) return researchService.updateProject(entry.id, entry);
        return researchService.createProject(entry);
      } else if (activeTab === 'areas') {
        if (entry.id) return researchService.updateArea(entry.id, entry);
        return researchService.createArea(entry);
      } else if (activeTab === 'facilities') {
        if (entry.id) return researchService.updateFacility(entry.id, entry);
        return researchService.createFacility(entry);
      } else if (activeTab === 'stats') {
        if (entry.id) return researchService.updateStat(entry.id, entry);
        return researchService.createStat(entry);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['research-admin']);
      setIsModalOpen(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (activeTab === 'projects') return researchService.deleteProject(id);
      else if (activeTab === 'areas') return researchService.deleteArea(id);
      else if (activeTab === 'facilities') return researchService.deleteFacility(id);
      else if (activeTab === 'stats') return researchService.deleteStat(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['research-admin']);
    }
  });

  // fetchData is replaced by useQuery

  const handleOpenModal = (entry = null) => {
    if (entry) {
      setCurrentEntry({ ...entry });
    } else {
      // Initialize with defaults based on tab
      const defaults = {
        projects: { title: '', department: '', funding: '', duration: '', status: 'Ongoing', description: '', team: [], outcomes: '', image: '' },
        areas: { title: '', description: '', icon: 'Cpu', projects: 0, publications: 0, color: 'from-blue-500 to-blue-700' },
        facilities: { name: '', description: '', image: '', features: [], capacity: '' },
        stats: { label: '', value: '', icon: 'FlaskRound', color: 'from-blue-500 to-blue-600', sort_order: 0 }
      };
      setCurrentEntry(defaults[activeTab]);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveMutation.mutate(currentEntry);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    deleteMutation.mutate(id);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Research Management</h1>
          <p className="text-gray-600 text-sm">Manage research projects, areas, facilities and stats</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md"
        >
          <Plus size={20} /> Add New {activeTab.slice(0, -1)}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {[
          { id: 'projects', label: 'Projects', icon: FlaskRound },
          { id: 'areas', label: 'Areas', icon: Target },
          { id: 'facilities', label: 'Facilities', icon: Building },
          { id: 'stats', label: 'Stats', icon: BarChart3 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-600 bg-blue-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-semibold">
                {activeTab === 'projects' || activeTab === 'areas' ? 'Title' : activeTab === 'facilities' ? 'Name' : 'Label'}
              </th>
              <th className="px-6 py-4 font-semibold">
                {activeTab === 'projects' ? 'Department' : activeTab === 'areas' ? 'Icon' : activeTab === 'facilities' ? 'Capacity' : 'Value'}
              </th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {data[activeTab].map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {item.title || item.name || item.label}
                  </div>
                  {item.description && (
                    <div className="text-gray-500 text-xs mt-1 truncate max-w-xs">
                      {item.description}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {item.department || item.icon || item.capacity || item.value}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.is_active !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.is_active !== false ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data[activeTab].length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No entries found in this category.
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                <h2 className="text-xl font-bold text-gray-900">
                  {currentEntry.id ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dynamic Fields based on activeTab */}
                  {activeTab === 'projects' && (
                    <>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.title}
                          onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.department}
                          onChange={(e) => setCurrentEntry({...currentEntry, department: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Funding</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.funding}
                          onChange={(e) => setCurrentEntry({...currentEntry, funding: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.duration}
                          onChange={(e) => setCurrentEntry({...currentEntry, duration: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                        <select 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.status}
                          onChange={(e) => setCurrentEntry({...currentEntry, status: e.target.value})}
                        >
                          <option value="Ongoing">Ongoing</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.image}
                          onChange={(e) => setCurrentEntry({...currentEntry, image: e.target.value})}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Research Team (comma separated)</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={Array.isArray(currentEntry.team) ? currentEntry.team.join(', ') : currentEntry.team}
                          onChange={(e) => setCurrentEntry({...currentEntry, team: e.target.value.split(',').map(s => s.trim())})}
                          placeholder="Dr. John Doe, Jane Smith, 5 Research Scholars"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Outcomes</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.outcomes}
                          onChange={(e) => setCurrentEntry({...currentEntry, outcomes: e.target.value})}
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'areas' && (
                    <>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Area Title</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.title}
                          onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Icon (Lucide name)</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.icon}
                          onChange={(e) => setCurrentEntry({...currentEntry, icon: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Color (Gradient)</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.color}
                          onChange={(e) => setCurrentEntry({...currentEntry, color: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Projects Count</label>
                        <input 
                          type="number"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.projects}
                          onChange={(e) => setCurrentEntry({...currentEntry, projects: parseInt(e.target.value)})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Publications Count</label>
                        <input 
                          type="number"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.publications}
                          onChange={(e) => setCurrentEntry({...currentEntry, publications: parseInt(e.target.value)})}
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'facilities' && (
                    <>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Facility Name</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.name}
                          onChange={(e) => setCurrentEntry({...currentEntry, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.image}
                          onChange={(e) => setCurrentEntry({...currentEntry, image: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.capacity}
                          onChange={(e) => setCurrentEntry({...currentEntry, capacity: e.target.value})}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Key Features (comma separated)</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={Array.isArray(currentEntry.features) ? currentEntry.features.join(', ') : currentEntry.features}
                          onChange={(e) => setCurrentEntry({...currentEntry, features: e.target.value.split(',').map(s => s.trim())})}
                          placeholder="HPC Clusters, GPU Workstations, Cloud Computing"
                        />
                      </div>
                    </>
                  )}

                  {activeTab === 'stats' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Label</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.label}
                          onChange={(e) => setCurrentEntry({...currentEntry, label: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Value</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.value}
                          onChange={(e) => setCurrentEntry({...currentEntry, value: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Icon</label>
                        <input 
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.icon}
                          onChange={(e) => setCurrentEntry({...currentEntry, icon: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Sort Order</label>
                        <input 
                          type="number"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          value={currentEntry.sort_order}
                          onChange={(e) => setCurrentEntry({...currentEntry, sort_order: parseInt(e.target.value)})}
                        />
                      </div>
                    </>
                  )}

                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                      value={currentEntry.description || ''}
                      onChange={(e) => setCurrentEntry({...currentEntry, description: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveMutation.isPending}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    {saveMutation.isPending ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Save size={20} />
                    )}
                    {currentEntry.id ? 'Update Entry' : 'Create Entry'}
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

export default ResearchManager;
