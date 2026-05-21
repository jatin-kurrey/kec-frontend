import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { admissionService } from "../../api";
import { 
  FileText, CheckCircle, Download, DollarSign, 
  Plus, Edit2, Trash2, Save, X, User,
  Mail, Phone, BookOpen, Clock, Award, Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdmissionManager = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("guide");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { data: admissionData = { guide: null, steps: [], eligibility: [], documents: [], fees: [] }, isLoading: loading } = useQuery({
    queryKey: ['admission-admin'],
    queryFn: async () => {
      const [guideRes, stepsRes, eligibilityRes, docsRes, feesRes] = await Promise.all([
        admissionService.getGuide(),
        admissionService.getSteps(),
        admissionService.getEligibility(),
        admissionService.getDocuments(),
        admissionService.getFees(),
      ]);
      const extractData = (res) => Array.isArray(res.data) ? res.data : (res.data?.data || []);
      return {
        guide: guideRes.data, // Guide is usually a single object, but keep it as is if backend returns it directly
        steps: extractData(stepsRes),
        eligibility: extractData(eligibilityRes),
        documents: extractData(docsRes),
        fees: extractData(feesRes),
      };
    }
  });

  const { guide, steps, eligibility, documents, fees } = admissionData;

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (activeTab === "guide") return admissionService.updateGuide(data);
      else if (activeTab === "steps") {
        if (editingItem) return admissionService.updateStep(editingItem.id, data);
        return admissionService.createStep(data);
      } else if (activeTab === "eligibility") {
        if (editingItem) return admissionService.updateEligibility(editingItem.id, data);
        return admissionService.createEligibility(data);
      } else if (activeTab === "documents") {
        if (editingItem) return admissionService.updateDocument(editingItem.id, data);
        return admissionService.createDocument(data);
      } else if (activeTab === "fees") {
        if (editingItem) return admissionService.updateFee(editingItem.id, data);
        return admissionService.createFee(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admission-admin']);
      setIsModalOpen(false);
      setEditingItem(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (activeTab === "steps") return admissionService.deleteStep(id);
      else if (activeTab === "eligibility") return admissionService.deleteEligibility(id);
      else if (activeTab === "documents") return admissionService.deleteDocument(id);
      else if (activeTab === "fees") return admissionService.deleteFee(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admission-admin']);
    }
  });

  // fetchData is replaced by useQuery

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    saveMutation.mutate(data);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate(id);
  };

  const renderGuideForm = () => (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input name="name" defaultValue={guide?.name} className="mt-1 block w-full p-2 border rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Position</label>
          <input name="position" defaultValue={guide?.position} className="mt-1 block w-full p-2 border rounded-md" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Qualification</label>
          <input name="qualification" defaultValue={guide?.qualification} className="mt-1 block w-full p-2 border rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Experience</label>
          <input name="experience" defaultValue={guide?.experience} className="mt-1 block w-full p-2 border rounded-md" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input name="email" defaultValue={guide?.email} className="mt-1 block w-full p-2 border rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input name="phone" defaultValue={guide?.phone} className="mt-1 block w-full p-2 border rounded-md" required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input name="image" defaultValue={guide?.image} className="mt-1 block w-full p-2 border rounded-md" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea name="message" defaultValue={guide?.message} className="mt-1 block w-full p-2 border rounded-md" rows="4" required />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Save Guide Info</button>
    </form>
  );

  const tabs = [
    { id: "guide", label: "Admission Guide", icon: User },
    { id: "steps", label: "Admission Steps", icon: FileText },
    { id: "eligibility", label: "Eligibility", icon: CheckCircle },
    { id: "documents", label: "Documents", icon: Download },
    { id: "fees", label: "Fee Structure", icon: DollarSign },
  ];

  const currentData = {
    steps, eligibility, documents, fees
  }[activeTab] || [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admission Management</h1>
        {activeTab !== "guide" && (
          <button 
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={20} /> Add Item
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-lg gap-2 transition-all ${
              activeTab === tab.id ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : activeTab === "guide" ? (
        <div className="max-w-2xl bg-white p-6 rounded-xl shadow-sm border">
          {renderGuideForm()}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === "fees" ? "Program" : "Title / Name"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === "fees" ? "Total Fee" : (activeTab === "steps" ? "Icon" : "Details")}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.title || item.name || item.program || item.criteria?.substring(0, 50) + "..."}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.total || item.icon || item.description?.substring(0, 50) + "..." || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="text-blue-600 hover:text-blue-900"><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-lg font-bold">
                  {editingItem ? "Edit" : "Add"} {tabs.find(t => t.id === activeTab).label}
                </h3>
                <button onClick={() => setIsModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                {activeTab === "steps" && (
                  <>
                    <input name="title" defaultValue={editingItem?.title} placeholder="Title" className="w-full p-2 border rounded" required />
                    <textarea name="description" defaultValue={editingItem?.description} placeholder="Description" className="w-full p-2 border rounded" rows="3" required />
                    <input name="icon" defaultValue={editingItem?.icon} placeholder="Icon Name (e.g. FileText)" className="w-full p-2 border rounded" required />
                    <input name="sort_order" type="number" defaultValue={editingItem?.sort_order || 0} placeholder="Sort Order" className="w-full p-2 border rounded" />
                  </>
                )}
                {activeTab === "eligibility" && (
                  <>
                    <textarea name="criteria" defaultValue={editingItem?.criteria} placeholder="Criteria Text" className="w-full p-2 border rounded" rows="3" required />
                    <input name="sort_order" type="number" defaultValue={editingItem?.sort_order || 0} placeholder="Sort Order" className="w-full p-2 border rounded" />
                  </>
                )}
                {activeTab === "documents" && (
                  <>
                    <input name="name" defaultValue={editingItem?.name} placeholder="Document Name" className="w-full p-2 border rounded" required />
                    <input name="sort_order" type="number" defaultValue={editingItem?.sort_order || 0} placeholder="Sort Order" className="w-full p-2 border rounded" />
                  </>
                )}
                {activeTab === "fees" && (
                  <>
                    <input name="program" defaultValue={editingItem?.program} placeholder="Program Name" className="w-full p-2 border rounded" required />
                    <input name="tuitionFee" defaultValue={editingItem?.tuitionFee} placeholder="Tuition Fee" className="w-full p-2 border rounded" required />
                    <input name="developmentFee" defaultValue={editingItem?.developmentFee} placeholder="Development Fee" className="w-full p-2 border rounded" required />
                    <input name="total" defaultValue={editingItem?.total} placeholder="Total Fee" className="w-full p-2 border rounded" required />
                    <input name="sort_order" type="number" defaultValue={editingItem?.sort_order || 0} placeholder="Sort Order" className="w-full p-2 border rounded" />
                  </>
                )}
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdmissionManager;
