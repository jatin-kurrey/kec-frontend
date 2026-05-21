import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Beaker, 
  Wrench, 
  Building, 
  Wifi, 
  BookOpen, 
  Shield, 
  ParkingCircle,
  GraduationCap,
  Filter,
  Search,
  ChevronDown,
  MapPin,
  Users,
  Library,
  Microscope,
  Cpu,
  Zap,
  Settings,
  Grid,
  Eye,
  BarChart3,
  Calendar,
  Clock,
  BookText,
  Server,
  Network,
  Database,
  Cloud,
  Bookmark,
  Award,
  Target
} from 'lucide-react';

import { useQuery } from "@tanstack/react-query";
import { facilityService } from '../api';

const EnhancedFacilities = () => {
  const [activeTab, setActiveTab] = useState('amenities');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [expandedLab, setExpandedLab] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); 

  const { data: facilitiesData, isLoading: loading } = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      const [facRes, statsRes] = await Promise.all([
        facilityService.getAll(),
        facilityService.getStats()
      ]);
      return {
        facilities: facRes.data || [],
        stats: statsRes.data || []
      };
    }
  });

  const { facilities = [], stats = [] } = facilitiesData || {};

  const essentialAmenities = facilities.filter(f => f.category === 'Essential');
  const desirableAmenities = facilities.filter(f => f.category === 'Desirable');
  const laboratories = facilities.filter(f => f.category === 'Lab');
  const infrastructure = facilities.filter(f => f.category === 'Infrastructure');

  // Get unique departments for filter
  const departments = [...new Set(laboratories.map(lab => lab.department))];
  
  // Filter laboratories based on department
  const filteredLabs = laboratories.filter(lab => 
    departmentFilter === 'all' || lab.department === departmentFilter
  ).filter(lab => 
    lab.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (iconName) => {
    const icons = { 
      CheckCircle, XCircle, Beaker, Wrench, Building, Wifi, BookOpen, 
      Shield, ParkingCircle, GraduationCap, Filter, Search, ChevronDown, 
      MapPin, Users, Library, Microscope, Cpu, Zap, Settings, Grid, 
      Eye, BarChart3, Calendar, Clock, BookText, Server, Network, 
      Database, Cloud, Bookmark, Award, Target 
    };
    return icons[iconName] || Grid;
  };

  const getStatIcon = (iconName) => {
    const Icon = getIcon(iconName);
    return <Icon className="h-7 w-7" />;
  };

  const getStatColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Campus Facilities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            State-of-the-art infrastructure and amenities at Krishna Engineering College, Bhilai
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 shadow-lg text-center border-0 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-3 ${getStatColor(stat.color)}`}>
                {getStatIcon(stat.icon)}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden border-0">
          <div className="flex flex-wrap border-b border-gray-200">
            <button
              className={`px-8 py-5 font-medium text-sm flex items-center ${activeTab === 'amenities' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('amenities')}
            >
              <Wifi className="h-5 w-5 mr-3" />
              Amenities
            </button>
            <button
              className={`px-8 py-5 font-medium text-sm flex items-center ${activeTab === 'labs' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('labs')}
            >
              <Beaker className="h-5 w-5 mr-3" />
              Laboratories & Workshops
            </button>
          </div>

          {/* Amenities Tab Content */}
          {activeTab === 'amenities' && (
            <div className="p-8">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={28} />
                  Essential Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {essentialAmenities.map(amenity => {
                    const Icon = getIcon(amenity.icon);
                    return (
                      <div key={amenity.id} className={`flex items-start p-5 rounded-xl border ${amenity.available ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'} transition-all hover:shadow-md`}>
                        <Icon className={`h-6 w-6 mr-4 mt-1 flex-shrink-0 ${amenity.available ? 'text-green-600' : 'text-red-600'}`} />
                        <div>
                          <span className={`font-medium ${amenity.available ? 'text-gray-800' : 'text-gray-600'}`}>{amenity.name}</span>
                          <div className={`text-sm mt-1 ${amenity.available ? 'text-green-600' : 'text-red-600'}`}>
                            {amenity.available ? 'Available' : 'Not Available'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Award className="text-blue-500 mr-3" size={28} />
                  Desirable Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {desirableAmenities.map(amenity => {
                    const Icon = getIcon(amenity.icon);
                    return (
                      <div key={amenity.id} className={`flex items-start p-5 rounded-xl border ${amenity.available ? 'border-blue-100 bg-blue-50' : 'border-red-100 bg-red-50'} transition-all hover:shadow-md`}>
                        <Icon className={`h-6 w-6 mr-4 mt-1 flex-shrink-0 ${amenity.available ? 'text-blue-600' : 'text-red-600'}`} />
                        <div>
                          <span className={`font-medium ${amenity.available ? 'text-gray-800' : 'text-gray-600'}`}>{amenity.name}</span>
                          <div className={`text-sm mt-1 ${amenity.available ? 'text-blue-600' : 'text-red-600'}`}>
                            {amenity.available ? 'Available' : 'Not Available'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Laboratories Tab Content */}
          {activeTab === 'labs' && (
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search laboratories by name..."
                    className="pl-12 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-3">
                  <div className="relative w-full md:w-48">
                    <select
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                    >
                      <option value="all">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button 
                      onClick={() => setViewMode('grid')} 
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                    >
                      <Grid size={20} />
                    </button>
                    <button 
                      onClick={() => setViewMode('list')} 
                      className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                    >
                      <BarChart3 size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLabs.map(lab => (
                    <div 
                      key={lab.id} 
                      className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => setExpandedLab(expandedLab === lab.id ? null : lab.id)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-gray-900">{lab.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
                          <MapPin className="h-4 w-4 mr-1" />
                          {lab.area} sq.m
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {lab.department}
                        </span>
                        
                        {lab.available ? (
                          <span className="inline-flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Fully Equipped
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">
                            <XCircle className="h-4 w-4 mr-1" />
                            Not Equipped
                          </span>
                        )}
                      </div>

                      {expandedLab === lab.id && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-gray-600 text-sm">{lab.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Laboratory Name</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredLabs.map(lab => (
                        <tr key={lab.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{lab.name}</div>
                            <div className="text-sm text-gray-500">{lab.description?.substring(0, 60)}...</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {lab.department}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lab.area} sq.m</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {lab.available ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Equipped
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <XCircle className="h-4 w-4 mr-1" />
                                Not Equipped
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {filteredLabs.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No laboratories found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">Try adjusting your search query or changing department filters</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Additional Information Section */}
        {infrastructure.length > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-10 mb-12 text-white">
            <h2 className="text-3xl font-bold mb-2 text-center">World-Class Infrastructure</h2>
            <p className="text-blue-100 text-center mb-10 max-w-3xl mx-auto">
              Our campus is designed to provide the best learning environment with modern facilities and cutting-edge technology
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {infrastructure.map((item, idx) => {
                const Icon = getIcon(item.icon);
                return (
                  <div key={idx} className="text-center p-6 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white bg-opacity-20 mb-5">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-white text-lg mb-3">{item.name}</h3>
                    <p className="text-blue-100 text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to see our facilities in person?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Schedule a campus tour to experience our state-of-the-art laboratories and amenities firsthand</p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all">
            Schedule a Campus Tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFacilities;