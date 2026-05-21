import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  Microscope, 
  BookOpen, 
  Users, 
  Award,
  Calendar,
  BarChart3,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Zap,
  Cpu,
  Atom,
  Dna,
  Database,
  Network,
  FlaskRound,
  Lightbulb,
  BookText,
  GraduationCap,
  Target,
  Eye,
  Building
} from 'lucide-react';
import { researchService } from '../api';

const iconMap = {
  Cpu: Cpu,
  Zap: Zap,
  Dna: Dna,
  Atom: Atom,
  Database: Database,
  Network: Network,
  FlaskRound: FlaskRound,
  BookOpen: BookOpen,
  GraduationCap: GraduationCap,
  Award: Award,
  Building: Building,
  Microscope: Microscope,
  Target: Target,
  Eye: Eye,
  Lightbulb: Lightbulb
};

const Research = () => {
  const [activeDepartment, setActiveDepartment] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  
  const { data: researchData, isLoading: loading } = useQuery({
    queryKey: ['researchData'],
    queryFn: async () => {
      const [areasRes, projectsRes, facilitiesRes, statsRes] = await Promise.all([
        researchService.getAreas(),
        researchService.getProjects(),
        researchService.getFacilities(),
        researchService.getStats()
      ]);
      return {
        areas: areasRes.data,
        projects: projectsRes.data,
        facilities: facilitiesRes.data,
        stats: statsRes.data
      };
    }
  });

  const researchAreas = researchData?.areas || [];
  const researchProjects = researchData?.projects || [];
  const researchFacilities = researchData?.facilities || [];
  const stats = researchData?.stats || [];

  const departments = ["all", ...new Set(researchProjects.map(p => p.department))];

  const filteredProjects = researchProjects.filter(project => {
    const matchesDepartment = activeDepartment === 'all' || project.department === activeDepartment;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-blue-900 font-bold uppercase tracking-widest animate-pulse">Initializing Research Portal...</p>
      </div>
    </div>
  );

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const renderIcon = (iconName, className) => {
    const IconComponent = iconMap[iconName] || Microscope;
    return <IconComponent className={className} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full -translate-y-36 translate-x-36 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full translate-y-48 -translate-x-48 opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Innovation Through Research
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Research & Innovation at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Krishna College</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl max-w-3xl mx-auto mb-8 text-blue-100"
          >
            Advancing knowledge through cutting-edge research, innovation, and collaboration across disciplines
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-50 transition-all flex items-center"
            >
              Explore Research Opportunities <ExternalLink className="ml-2 w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center"
            >
              <BookText className="mr-2 w-5 h-5" /> View Publications
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl font-bold text-center mb-12 text-blue-900"
          >
            Research Excellence
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-4 shadow-md`}>
                  {renderIcon(stat.icon, "w-8 h-8")}
                </div>
                <div className="text-3xl font-bold text-blue-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl font-bold text-center mb-12 text-blue-900"
          >
            Key Research Areas
          </motion.h2>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {researchAreas.map((area) => (
              <motion.div
                key={area.id}
                variants={fadeIn}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 group cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">
                  {renderIcon(area.icon, "w-8 h-8 text-blue-600")}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {area.title}
                </h3>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <Target className="w-4 h-4 mr-1" /> {area.projects} Projects
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" /> {area.publications} Publications
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tabs for Projects and Facilities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-xl p-1 inline-flex">
              {[
                { id: 'projects', label: 'Research Projects', icon: <FlaskRound className="w-5 h-5" /> },
                { id: 'facilities', label: 'Research Facilities', icon: <Building className="w-5 h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium flex items-center transition-all ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-blue-700'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'projects' && (
            <>
              {/* Filters and Search for Projects */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50 rounded-2xl p-6 mb-8 shadow-sm border border-gray-200"
              >
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-gray-200 w-full md:w-96">
                    <Search size={20} className="text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search research projects..."
                      className="bg-transparent outline-none w-full placeholder-gray-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <Filter size={20} />
                      <span>Filter by:</span>
                    </div>
                    {departments.map((dept) => (
                      <motion.button
                        key={dept}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          activeDepartment === dept 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveDepartment(dept)}
                      >
                        {dept === 'all' ? 'All Departments' : dept}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Projects List */}
              <motion.div 
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
                className="grid gap-6"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={fadeIn}
                    className="bg-white rounded-2xl shadow-md overflow-hidden border-l-4 border-blue-500 hover:shadow-xl transition-all"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                          <div className="rounded-xl overflow-hidden shadow-md">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-40 object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                              {project.department}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              project.status === 'Ongoing' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-blue-900 mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
                            <span className="flex items-center">
                              <Award className="w-4 h-4 mr-1" /> {project.funding}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" /> {project.duration}
                            </span>
                          </div>

                          <AnimatePresence>
                            {expandedProject === project.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 text-sm text-gray-700 space-y-3"
                              >
                                <div>
                                  <span className="font-medium">Research Team:</span>
                                  <div className="mt-1">
                                    {Array.isArray(project.team) ? project.team.join(', ') : project.team}
                                  </div>
                                </div>
                                <div>
                                  <span className="font-medium">Outcomes:</span>
                                  <div className="mt-1">{project.outcomes}</div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                          className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-800 transition-colors"
                        >
                          {expandedProject === project.id ? (
                            <>
                              <ChevronUp size={18} /> Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown size={18} /> View Details
                            </>
                          )}
                        </button>
                        
                        <button className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-800 transition-colors">
                          <Eye size={18} /> View Project
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}

          {activeTab === 'facilities' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {researchFacilities.map((facility, index) => (
                <motion.div
                  key={facility.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={facility.image} 
                      alt={facility.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm">Capacity: {facility.capacity}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">{facility.name}</h3>
                    <p className="text-gray-600 mb-4">{facility.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-800 text-sm">Key Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(facility.features) && facility.features.map((feature, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="mt-4 text-blue-600 font-medium flex items-center gap-2 hover:text-blue-800 transition-colors">
                      <Eye size={16} /> View Facility
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
     
    </div>
  );
};

export default Research;