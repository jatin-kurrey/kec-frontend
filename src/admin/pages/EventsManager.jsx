import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventService } from "../../api";
import {
  Calendar, Plus, Edit2, Trash2, Save, X, MapPin, Clock, Users, Image as ImageIcon, Link, Tag, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EventsManager = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { data: events = [], isLoading, error: queryError } = useQuery({
    queryKey: ['events-admin'],
    queryFn: async () => {
      const response = await eventService.getAllAdmin();
      return response.data || [];
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (editingEvent) {
        return eventService.update(editingEvent.id, data);
      }
      return eventService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events-admin']);
      setIsModalOpen(false);
      setEditingEvent(null);
    },
    onError: (err) => {
      alert("Failed to save event: " + (err.response?.data?.error || err.message));
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return eventService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events-admin']);
      setDeleteConfirm(null);
    },
    onError: (err) => {
      alert("Failed to delete event: " + (err.response?.data?.error || err.message));
    }
  });

  const openCreateModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
      category: formData.get("category"),
      description: formData.get("description"),
      image: formData.get("image"),
      attendees: parseInt(formData.get("attendees")) || 0,
      status: formData.get("status"),
      registration_link: formData.get("registration_link") || "#",
    };
    saveMutation.mutate(data);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const eventsList = Array.isArray(events) ? events : [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Events Manager</h1>
          <p className="text-slate-500 mt-2 font-medium">{eventsList.length} event(s) total</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-blue-900 text-white px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20"
        >
          <Plus size={18} />
          Create Event
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : queryError ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-red-100">
          <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
          <p className="text-red-600 text-lg font-medium">Failed to load events</p>
          <p className="text-red-400 text-sm mt-1 max-w-md mx-auto">
            {queryError?.response?.data?.error || queryError.message}
          </p>
        </div>
      ) : eventsList.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg font-medium">No events yet</p>
          <p className="text-slate-400 text-sm mt-1">Create your first event to get started</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {eventsList.map((event) => (
            <div key={event.id} className="bg-white rounded-3xl border border-slate-100 p-6 flex items-start gap-6 hover:shadow-md transition-all">
              <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0">
                {event.image ? (
                  <img src={event.image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Calendar size={32} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} /> {formatDate(event.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} /> {event.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={14} /> {event.attendees}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-blue-50 text-blue-700">
                        {event.category}
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                        event.status === "upcoming" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"
                      }`}>
                        {event.status || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(event)}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(event)}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { if (!saveMutation.isPending) { setIsModalOpen(false); setEditingEvent(null); } }}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">
                  {editingEvent ? "Edit Event" : "Create Event"}
                </h2>
                <button
                  onClick={() => { setIsModalOpen(false); setEditingEvent(null); }}
                  className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Event Title</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingEvent?.title || ""}
                      className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Date</label>
                    <input
                      type="date"
                      name="date"
                      defaultValue={editingEvent?.date ? editingEvent.date.split('T')[0] : ""}
                      className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Time</label>
                    <input
                      type="text"
                      name="time"
                      defaultValue={editingEvent?.time || ""}
                      placeholder="e.g. 10:00 AM"
                      className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Location</label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={editingEvent?.location || ""}
                      className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Category</label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={editingEvent?.category || ""}
                      placeholder="e.g. Workshop, Cultural, Technical"
                      className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Expected Attendees</label>
                    <input
                      type="number"
                      name="attendees"
                      defaultValue={editingEvent?.attendees || 0}
                      className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Status</label>
                    <select
                      name="status"
                      defaultValue={editingEvent?.status || "upcoming"}
                      className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Image URL</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                      <input
                        type="url"
                        name="image"
                        defaultValue={editingEvent?.image || ""}
                        placeholder="https://example.com/image.jpg"
                        className="w-full p-4 pl-14 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Registration Link</label>
                    <div className="relative">
                      <Link className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                      <input
                        type="url"
                        name="registration_link"
                        defaultValue={editingEvent?.registration_link || "#"}
                        placeholder="https://forms.google.com/..."
                        className="w-full p-4 pl-14 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingEvent?.description || ""}
                    rows="4"
                    className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-100 focus:bg-white text-slate-950 font-bold transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={saveMutation.isPending}
                    className="flex-1 bg-blue-900 text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50"
                  >
                    <Save size={18} />
                    {saveMutation.isPending ? "Saving..." : editingEvent ? "Update Event" : "Create Event"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsModalOpen(false); setEditingEvent(null); }}
                    className="px-6 py-4 rounded-2xl font-bold text-sm text-slate-500 hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-md w-full p-8 text-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Delete Event?</h3>
              <p className="text-slate-500 mb-6">Are you sure you want to delete "{deleteConfirm.title}"? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-slate-500 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteMutation.mutate(deleteConfirm.id)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 bg-red-600 text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-red-700 transition-all disabled:opacity-50"
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsManager;
