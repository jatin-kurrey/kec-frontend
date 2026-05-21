import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { facilityService } from "../../api";
import { 
  Wifi, 
  Beaker, 
  BarChart3, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  CheckCircle,
  AlertCircle,
  Building,
  Shield,
  MapPin,
  Search,
  Grid,
  Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FacilityManager = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("stats");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data: facilityData = { facilities: [], stats: [] }, isLoading: loading } = useQuery({
    queryKey: ['facilities-admin'],
    queryFn: async () => {
      const [facRes, statsRes] = await Promise.all([
        facilityService.getAll(),
        facilityService.getStats(),
      ]);
      return {
        facilities: Array.isArray(facRes.data) ? facRes.data : (facRes.data?.data || []),
        stats: Array.isArray(statsRes.data) ? statsRes.data : (statsRes.data?.data || [])
      };
    }
  });

  const { facilities, stats } = facilityData;

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (activeTab === "stats") {
        if (editingItem) return facilityService.updateStat(editingItem.id, data);
        return facilityService.createStat(data);
      } else {
        const payload = { ...data, category: activeTab };
        if (editingItem) return facilityService.update(editingItem.id, payload);
        return facilityService.create(payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['facilities-admin']);
      setIsModalOpen(false);
      setEditingItem(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (activeTab === "stats") return facilityService.deleteStat(id);
      return facilityService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['facilities-admin']);
    }
  });

  // fetchData is replaced by useQuery

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Convert boolean and numeric fields
    if (data.available !== undefined) data.available = data.available === "true";
    if (data.area !== undefined) data.area = parseInt(data.area);
    if (data.sort_order !== undefined) data.sort_order = parseInt(data.sort_order);

    saveMutation.mutate(data);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate(id);
  };

  const tabs = [
    { id: "stats", label: "Overview Stats", icon: BarChart3 },
    { id: "Essential", label: "Essential Amenities", icon: CheckCircle },
    { id: "Desirable", label: "Desirable Amenities", icon: Wifi },
    { id: "Infrastructure", label: "Infrastructure", icon: Building },
    { id: "Lab", label: "Labs & Workshops", icon: Beaker },
  ];

  const currentData = activeTab === "stats" 
    ? stats 
    : facilities.filter(f => f.category === activeTab);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Campus Facility Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage infrastructure, amenities, and laboratories.</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 font-bold text-sm"
        >
          <Plus size={18} /> Add New {activeTab === "stats" ? "Stat" : "Facility"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-5 py-2.5 rounded-xl gap-2.5 transition-all text-sm font-bold ${
              activeTab === tab.id 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-slate-100 border-b-slate-900"></div>
          <p className="mt-4 text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Repository...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentData.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
              <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold">No items found in this category.</p>
            </div>
          ) : (
            currentData.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={item.id}
                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                      {/* We'd normally resolve the icon string here */}
                      <Grid size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{item.name || item.label}</h3>
                      <p className="text-xs text-slate-400 font-medium">{item.department || item.value || "Facility Item"}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {activeTab === "stats" ? (
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Sort: {item.sort_order}</span>
                    </div>
                  ) : (
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${item.available ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {item.available ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.available ? 'Available' : 'Unavailable'}</span>
                    </div>
                  )}
                  {item.area > 0 && (
                    <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {item.area} sq.m
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden border border-white"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {editingItem ? "Refine" : "Establish"} {tabs.find(t => t.id === activeTab).label}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">Configure entry parameters below.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-all"><X size={20}/></button>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-6">
                {activeTab === "stats" ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Statistic Label</label>
                        <input name="label" defaultValue={editingItem?.label} placeholder="e.g. Total Area" className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" required />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Value</label>
                        <input name="value" defaultValue={editingItem?.value} placeholder="e.g. 5000+" className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" required />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Sort Order</label>
                        <input name="sort_order" type="number" defaultValue={editingItem?.sort_order || 0} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Facility Name</label>
                      <input name="name" defaultValue={editingItem?.name} placeholder="e.g. Applied Chemistry Lab" className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" required />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Status</label>
                        <select name="available" defaultValue={editingItem?.available ?? "true"} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold">
                          <option value="true">Available</option>
                          <option value="false">Unavailable</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Icon Reference</label>
                        <input name="icon" defaultValue={editingItem?.icon} placeholder="e.g. Wifi, Beaker" className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" />
                      </div>
                    </div>

                    {activeTab === "Lab" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Department</label>
                          <input name="department" defaultValue={editingItem?.department} placeholder="e.g. Mechanical" className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Area (sq.m)</label>
                          <input name="area" type="number" defaultValue={editingItem?.area || 0} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Sort Order</label>
                          <input name="sort_order" type="number" defaultValue={editingItem?.sort_order || 0} className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Description / Features</label>
                      <textarea name="description" defaultValue={editingItem?.description} placeholder="Provide details or features..." className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-100 rounded-2xl outline-none font-bold" rows="3" />
                    </div>
                  </>
                )}
                
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px]">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all uppercase tracking-widest text-[10px] shadow-xl shadow-slate-900/10">Synchronize Data</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FacilityManager;
