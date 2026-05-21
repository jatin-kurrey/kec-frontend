import React, { useState } from 'react';
import { 
  Search, 
  User ,
  Building2, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Mail, 
  Phone, 
  Link, 
  X,
  Calendar,
  ChevronDown,
  Users,
  Award,
  BookOpen,
  HeartHandshake,
  Network,
  Star,
  Linkedin,
  Github,
  Twitter,
  Filter,
  ExternalLink
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { alumniService } from '../api';

const AlumniPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [batchFilter, setBatchFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch alumni data with TanStack Query
  const { data: alumniData = [], isLoading: loading } = useQuery({
    queryKey: ['alumni'],
    queryFn: async () => {
      const response = await alumniService.getAll();
      return response.data?.data || [];
    }
  });

  // Fetch alumni stats
  const { data: alumniStats } = useQuery({
    queryKey: ['alumni-stats'],
    queryFn: async () => {
      const response = await alumniService.getStats();
      return response.data?.data || [];
    }
  });

  // Get unique values for filters
  const batches = [...new Set(alumniData.map(a => a.batch))].sort((a, b) => +b - +a);
  const branches = [...new Set(alumniData.map(a => a.branch))].sort();
  const companies = [...new Set(alumniData.map(a => a.company.split(';')[0].split(',')[0].trim()))].filter(c => c).sort();
  // Filter alumni based on active filters
  // Filter alumni based on active filters
const filteredAlumni = alumniData.filter(alumni => {
    const currentPosition = alumni.currentPosition || '';
    const company = alumni.company || '';
    
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'corporate' && !currentPosition.toLowerCase().includes('government')) ||
      (activeTab === 'government' && currentPosition.toLowerCase().includes('government')) ||
      (activeTab === 'higherStudies' && currentPosition.toLowerCase().includes('studies'));
  
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesBatch = batchFilter === 'all' || alumni.batch === batchFilter;
    const matchesBranch = branchFilter === 'all' || alumni.branch === branchFilter;
    const matchesCompany = companyFilter === 'all' || company.includes(companyFilter);
  
    return matchesTab && matchesSearch && matchesBatch && matchesBranch && matchesCompany;
  });
  // Stats for the header
  const stats = {
    totalAlumni: alumniStats?.find(s => s.label.toLowerCase().includes('alumni'))?.value || alumniData.length,
    batches: alumniStats?.find(s => s.label.toLowerCase().includes('batches'))?.value || batches.length,
    companies: alumniStats?.find(s => s.label.toLowerCase().includes('companies'))?.value || companies.length,
    branches: alumniStats?.find(s => s.label.toLowerCase().includes('branches'))?.value || branches.length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">KEC Bhilai Alumni Network</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting past and present students of Krishna Engineering College, Bhilai. Together we grow, achieve, and give back.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <Users className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">{stats.totalAlumni}+</div>
            <div className="text-gray-600">Alumni Members</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <GraduationCap className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">{stats.batches}</div>
            <div className="text-gray-600">Batches</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <Briefcase className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">{stats.companies}+</div>
            <div className="text-gray-600">Companies</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <Award className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">{stats.branches}</div>
            <div className="text-gray-600">Branches</div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search alumni by name, company, or degree"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Batch Year</label>
                <select
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={batchFilter}
                  onChange={(e) => setBatchFilter(e.target.value)}
                >
                  <option value="all">All Batches</option>
                  {batches.map(batch => (
                    <option key={batch} value={batch}>{batch} Batch</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-9 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <select
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                >
                  <option value="all">All Branches</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-9 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <select
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                >
                  <option value="all">All Companies</option>
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-9 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('all')}
            >
              All Alumni
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'corporate' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('corporate')}
            >
              Corporate
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'government' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('government')}
            >
              Government
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'higherStudies' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('higherStudies')}
            >
              Higher Studies
            </button>
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAlumni.map(alumni => (
            <div key={alumni.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={alumni.photo} 
                  alt={alumni.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-1/2" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl">{alumni.name}</h3>
                  <p className="text-sm">{alumni.batch} Batch • {alumni.branch}</p>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <Briefcase className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-700">{alumni.currentPosition}</span>
                </div>
                
                <div className="flex items-center mb-3">
                  <Building2 className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-700 text-sm">{alumni.company.split(';')[0]}</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-700 text-sm">{alumni.location}</span>
                </div>
                
                <div className="flex space-x-2 mb-4 flex-wrap gap-2">
                  {alumni.achievements.slice(0, 2).map((achievement, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {achievement}
                    </span>
                  ))}
                  {alumni.achievements.length > 2 && (
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      +{alumni.achievements.length - 2} more
                    </span>
                  )}
                </div>
                
                <button
                  onClick={() => setSelectedAlumni(alumni)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  View Profile <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredAlumni.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No alumni found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Alumni Engagement Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get Involved</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <HeartHandshake className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Mentorship Program</h3>
              <p className="text-gray-600">Guide current students and share your industry experience</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Network className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Alumni Events</h3>
              <p className="text-gray-600">Connect with fellow alumni at reunions and networking events</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Guest Lectures</h3>
              <p className="text-gray-600">Share your expertise with current students through talks</p>
            </div>
          </div>
        </div>

        {/* Alumni Modal */}
        {selectedAlumni && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-64">
                <img 
                  src={selectedAlumni.photo} 
                  alt={selectedAlumni.name} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedAlumni(null)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-1/2" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-2xl font-bold">{selectedAlumni.name}</h2>
                  <p>{selectedAlumni.batch} Batch • {selectedAlumni.degree}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Current Position</p>
                      <p className="font-medium">{selectedAlumni.currentPosition}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Company</p>
                      <p className="font-medium">{selectedAlumni.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{selectedAlumni.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Batch</p>
                      <p className="font-medium">{selectedAlumni.batch}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Success Story</h3>
                  <p className="text-gray-700">{selectedAlumni.story}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Achievements</h3>
                  <ul className="space-y-2">
                    {selectedAlumni.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <Award className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
               
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniPage;