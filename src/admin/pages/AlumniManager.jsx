import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Users, Plus, Edit2, Trash2, Save, X, Search, Star,
  MapPin, Building2, Briefcase, GraduationCap, Award, CheckCircle
} from 'lucide-react';
import { alumniService } from '../../api';

const BRANCHES = ['CSE', 'Civil', 'EE', 'Mech', 'IT', 'ECE'];
const BATCHES = ['2021', '2022', '2023', '2024', '2025', '2026', '2027'];

const emptyForm = {
  name: '', batch: '2025', branch: 'CSE', degree: '', location: '',
  company: '', currentPosition: '', story: '', image_url: '',
  achievements: '', is_featured: false,
};

export default function AlumniManager() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const { data: alumniList = [], isLoading } = useQuery({
    queryKey: ['admin-alumni'],
    queryFn: async () => {
      const res = await alumniService.getAll();
      return res.data?.data || [];
    }
  });

  const createMutation = useMutation({
    mutationFn: (data) => alumniService.create(data),
    onSuccess: () => { qc.invalidateQueries(['admin-alumni']); closeForm(); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => alumniService.update(id, data),
    onSuccess: () => { qc.invalidateQueries(['admin-alumni']); closeForm(); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => alumniService.delete(id),
    onSuccess: () => qc.invalidateQueries(['admin-alumni']),
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (alum) => {
    setEditing(alum);
    let achievementsStr = '';
    try {
      const arr = typeof alum.achievements === 'string'
        ? JSON.parse(alum.achievements)
        : (Array.isArray(alum.achievements) ? alum.achievements : []);
      achievementsStr = arr.join('\n');
    } catch { achievementsStr = ''; }

    setForm({
      name: alum.name || '',
      batch: alum.batch || '2025',
      branch: alum.branch || 'CSE',
      degree: alum.degree || '',
      location: alum.location || '',
      company: alum.company || '',
      currentPosition: alum.currentPosition || '',
      story: alum.story || '',
      image_url: alum.image_url || alum.photo || '',
      achievements: achievementsStr,
      is_featured: alum.is_featured || false,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    setSaving(false);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    const achievementsArr = form.achievements
      .split('\n')
      .map(a => a.trim())
      .filter(a => a.length > 0);

    const payload = {
      ...form,
      achievements: JSON.stringify(achievementsArr),
      degree: form.degree || `B.Tech in ${form.branch}`,
    };

    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
    } catch (e) {
      setSaving(false);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const filtered = alumniList.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !q || a.name?.toLowerCase().includes(q) || a.company?.toLowerCase().includes(q) || a.branch?.toLowerCase().includes(q);
    const matchBranch = branchFilter === 'all' || a.branch === branchFilter;
    const matchBatch = batchFilter === 'all' || a.batch === batchFilter;
    return matchSearch && matchBranch && matchBatch;
  });

  const featuredCount = alumniList.filter(a => a.is_featured).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Alumni Manager</h1>
          <p className="text-slate-500 mt-1 font-medium">
            {alumniList.length} alumni · {featuredCount} featured
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-900/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Alumni
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Alumni', value: alumniList.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Featured', value: featuredCount, icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Branches', value: new Set(alumniList.map(a => a.branch)).size, icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Batches', value: new Set(alumniList.map(a => a.batch)).size, icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="text-2xl font-black text-slate-900">{value}</div>
            <div className="text-sm text-slate-500 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, company, branch..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={branchFilter}
            onChange={e => setBranchFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Branches</option>
            {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select
            value={batchFilter}
            onChange={e => setBatchFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Batches</option>
            {BATCHES.map(b => <option key={b} value={b}>{b} Batch</option>)}
          </select>
        </div>
      </div>

      {/* Alumni Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No alumni found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Alumni</th>
                  <th className="text-left px-4 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Branch</th>
                  <th className="text-left px-4 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Batch</th>
                  <th className="text-left px-4 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Company</th>
                  <th className="text-left px-4 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Location</th>
                  <th className="text-left px-4 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Featured</th>
                  <th className="text-right px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(alum => (
                  <tr key={alum.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={alum.photo || alum.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(alum.name)}&background=1e40af&color=fff&size=60`}
                          alt={alum.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{alum.name}</div>
                          <div className="text-xs text-slate-500">{alum.currentPosition}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold">
                        <GraduationCap className="w-3 h-3" />
                        {alum.branch}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold text-slate-700">{alum.batch}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span className="max-w-[150px] truncate">{alum.company}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        {alum.location}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {alum.is_featured ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-bold">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(alum)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(alum.id, alum.name)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete"
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
        )}
      </div>

      {/* Create/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-900">
                {editing ? 'Edit Alumni' : 'Add New Alumni'}
              </h2>
              <button onClick={closeForm} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Saziya Naaz"
                />
              </div>

              {/* Branch + Batch */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Branch</label>
                  <select
                    value={form.branch}
                    onChange={e => setForm({ ...form, branch: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Batch Year</label>
                  <select
                    value={form.batch}
                    onChange={e => setForm({ ...form, batch: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {BATCHES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {/* Company + Position */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Codenicely"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Current Position</label>
                  <input
                    type="text"
                    value={form.currentPosition}
                    onChange={e => setForm({ ...form, currentPosition: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Raipur, India"
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Photo URL</label>
                <input
                  type="text"
                  value={form.image_url}
                  onChange={e => setForm({ ...form, image_url: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://... or /alumini/name.png"
                />
                {form.image_url && (
                  <img src={form.image_url} alt="Preview" className="mt-2 w-16 h-16 rounded-xl object-cover border border-slate-200" />
                )}
              </div>

              {/* Story */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Success Story</label>
                <textarea
                  value={form.story}
                  onChange={e => setForm({ ...form, story: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Share their success journey at KEC..."
                />
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Achievements <span className="text-slate-400 font-normal">(one per line)</span>
                </label>
                <textarea
                  value={form.achievements}
                  onChange={e => setForm({ ...form, achievements: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Secured placement at Company&#10;Department Topper&#10;Active in College Events"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, is_featured: !form.is_featured })}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${form.is_featured ? 'bg-yellow-400' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${form.is_featured ? 'left-7' : 'left-1'}`} />
                </button>
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <Star className={`w-4 h-4 ${form.is_featured ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
                  {form.is_featured ? 'Featured on Alumni Page' : 'Not Featured'}
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
              <button
                onClick={closeForm}
                className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-blue-900/20"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editing ? 'Save Changes' : 'Add Alumni'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
