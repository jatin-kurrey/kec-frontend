import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  ArrowUpRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { applicationService, contentService } from '../api';

const StatCard = ({ title, value, change, icon: Icon, color }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  return (
    <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 group">
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-2xl ${colorMap[color] || 'bg-slate-50 text-slate-600'} transition-all duration-500 group-hover:bg-blue-900 group-hover:text-white`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <span className="flex items-center text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1.5">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { data: dashboardData, isLoading: loading, refetch } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [appsRes, noticesRes] = await Promise.all([
        applicationService.getAll(),
        contentService.getNotices()
      ]);
      
      const noticesData = Array.isArray(noticesRes.data) ? noticesRes.data : (noticesRes.data?.data || []);
      const appsData = Array.isArray(appsRes.data) ? appsRes.data : (appsRes.data?.data || []);
      
      // Filter out Super 40 applications completely (handling 'super40', 'super_40', etc.)
      const appsFiltered = appsData.filter(a => {
        const type = (a.form_type || '').toLowerCase();
        return !type.includes('super');
      });
      
      return {
        recentApps: appsFiltered.slice(0, 5),
        stats: {
          totalApps: appsFiltered.length,
          pendingApps: appsFiltered.filter(a => a.status?.toUpperCase() === 'PENDING').length,
          activeNotices: noticesData.length,
          placementRate: '89.6%'
        }
      };
    }
  });

  const { recentApps = [], stats = { totalApps: 0, pendingApps: 0, activeNotices: 0, placementRate: '89.6%' } } = dashboardData || {};

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-between flex-1">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Welcome Back, Admin</h1>
            <p className="text-slate-500 font-medium">Here's what's happening at Krishna Engineering College today.</p>
          </div>
          <button 
            onClick={() => refetch()}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95 disabled:opacity-50 ml-4"
          >
            <div className={`${loading ? 'animate-spin' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            Refresh Data
          </button>
        </div>
        <div className="flex items-center gap-3 text-[13px] font-bold text-slate-400 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <Clock className="w-4 h-4 text-blue-600" />
          <span className="uppercase tracking-widest">System Live</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Applicants" value={stats.totalApps} change="+14.2%" icon={Users} color="blue" />
        <StatCard title="Pending Review" value={stats.pendingApps} icon={Clock} color="amber" />
        <StatCard title="Active Notices" value={stats.activeNotices} icon={FileText} color="indigo" />
        <StatCard title="Placement Rate" value={stats.placementRate} change="+3.5%" icon={TrendingUp} color="emerald" />
      </div>

      {/* Recent Applications Table - Beautiful Full Width Layout */}
      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden w-full">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Recent Applications</h3>
            <p className="text-sm text-slate-400 font-medium">Latest student program submissions</p>
          </div>
          <Link to="/admin/admission" className="flex items-center gap-2 px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 rounded-xl font-bold transition-colors">
            View all
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-8 py-6">Applicant</th>
                <th className="px-8 py-6">Course / Program</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-sm font-bold text-blue-700 group-hover:scale-110 transition-transform">
                        {app.name[0]?.toUpperCase() || 'S'}
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-slate-900">{app.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[14px] font-semibold text-slate-600 capitalize">
                      {app.form_type?.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg ${
                        app.status?.toUpperCase() === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                        app.status?.toUpperCase() === 'REJECTED' ? 'bg-red-50 text-red-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {app.status || 'PENDING'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link to="/admin/admission" className="inline-flex p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                      <FileText className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentApps.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-slate-400 font-medium">No recent applications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
