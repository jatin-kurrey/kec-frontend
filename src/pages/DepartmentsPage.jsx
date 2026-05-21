import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Briefcase,
  ArrowRight,
  Search,
  Microchip,
  Building,
  Cpu,
  Zap,
  Cog
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { departmentService } from "../api";

const DepartmentsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const staticDepartments = [
    {
      name: "Computer Science & Engineering",
      shortName: "CSE",
      description: "Pioneering innovation in AI, Machine Learning, Data Science, and Software Development. Our CSE department equips students with cutting-edge skills for the digital era.",
      image: "/dep/cse.jpeg",
      students: 520,
      courses: 18,
      placement: "95%",
      established: 2008,
      highlights: ["AI & ML", "Cybersecurity", "Full Stack Development", "Data Science"],
      labs: 8,
      faculty: 45,
      link: "/departments/cse"
    },
    {
      name: "Civil Engineering",
      shortName: "CIVIL",
      description: "Shaping the world through innovative infrastructure, sustainable construction, and advanced structural design. Build the future with hands-on engineering excellence.",
      image: "/dep/civil.jpeg",
      students: 380,
      courses: 15,
      placement: "88%",
      established: 2008,
      highlights: ["Structural Design", "Environmental Engineering", "Transportation"],
      labs: 6,
      faculty: 32,
      link: "/departments/civil"
    },
    {
      name: "Mechanical Engineering",
      shortName: "ME",
      description: "A program focused on designing, analyzing, and manufacturing mechanical systems. Prepare for careers in robotics, aerospace, automotive, and manufacturing industries.",
      image: "/dep/mech.jpeg",
      students: 320,
      courses: 16,
      placement: "92%",
      established: 2010,
      highlights: ["Thermodynamics", "Fluid Mechanics", "Materials Science"],
      labs: 6,
      faculty: 35,
      link: "/departments/mech"
    },
    {
      name: "Electrical Engineering",
      shortName: "EE",
      description: "Powering the future with innovations in renewable energy, smart grids, and electronic systems. Master the fundamentals of electrical power and electronics.",
      image: "/dep/eee.jpeg",
      students: 400,
      courses: 16,
      placement: "90%",
      established: 2008,
      highlights: ["Power Systems", "Renewable Energy", "Control Systems", "Electronics"],
      labs: 7,
      faculty: 38,
      link: "/departments/eee"
    }
  ];

  const { data: departments = staticDepartments, isLoading: loading } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const response = await departmentService.getAll();
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        return data.map(d => ({
          ...d,
          students: d.student_count,
          courses: d.course_count,
          placement: d.placement_rate,
          faculty: d.faculty_count,
          labs: d.lab_count,
          shortName: d.short_name,
          highlights: typeof d.highlights === 'string' ? JSON.parse(d.highlights) : (d.highlights || [])
        }));
      }
      return staticDepartments;
    }
  });

  const getIcon = (shortName) => {
    switch (shortName) {
      case 'CSE': return <Microchip className="w-6 h-6" />;
      case 'CIVIL': return <Building className="w-6 h-6" />;
      case 'ME': return <Cog className="w-6 h-6" />;
      case 'EE': return <Zap className="w-6 h-6" />;
      default: return <GraduationCap className="w-6 h-6" />;
    }
  };

  const departmentFilters = [
    { id: "all", label: "All Departments" },
    { id: "cse", label: "Computer Science" },
    { id: "civil", label: "Civil Engineering" },
    { id: "electrical", label: "Electrical Engineering" }
  ];

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dept.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "cse") return matchesSearch && (dept.shortName === "CSE" || dept.shortName === "CSE-AI");
    if (activeFilter === "civil") return matchesSearch && dept.shortName === "CIVIL";
    if (activeFilter === "electrical") return matchesSearch && dept.shortName === "EE";
    
    return matchesSearch;
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="text-xl font-bold text-blue-900 animate-pulse tracking-widest uppercase">Initializing Departments...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4" />
            Explore Our Engineering Programs
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent mb-6">
            Academic Departments
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover our premier engineering departments offering state-of-the-art facilities, 
            experienced faculty, and exceptional career opportunities in technology and innovation.
          </p>
        </motion.div>

        {/* Enhanced Filters and Search */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6  border border-white/20 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search departments or programs..."
                  className="w-full pl-12 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-900 placeholder-blue-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Enhanced Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {departmentFilters.map((filter) => (
                <motion.button
                  key={filter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    activeFilter === filter.id 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-gray-200'
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Departments Grid */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {filteredDepartments.map((dept, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="group relative bg-white rounded-3xl overflow-hidden  transition-all duration-500 border border-gray-100"
              whileHover={{ y: -8 }}
            >
              {/* Department Header with Icon */}
              <div className="absolute top-6 left-6 z-10 bg-white p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <div className="text-blue-600">
                  {getIcon(dept.shortName)}
                </div>
              </div>

              {/* Department Image */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <button 
              className="text-white font-semibold flex items-center text-lg"
              onClick={() => navigate(dept.link)} // Use navigate() here
            >
              Explore Programs <ArrowRight size={20} className="ml-3" />
            </button>
                </div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-bold text-blue-900">{dept.shortName}</span>
                </div>
              </div>

              {/* Department Content */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                  {dept.name}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{dept.description}</p>
                
                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {dept.highlights.map((highlight, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">{dept.students}</div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-green-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">{dept.courses}</div>
                    <div className="text-xs text-gray-500">Courses</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Briefcase className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">{dept.placement}</div>
                    <div className="text-xs text-gray-500">Placement</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-orange-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">{dept.faculty}</div>
                    <div className="text-xs text-gray-500">Faculty</div>
                  </div>
                </div>
                
                {/* Action Button */}
                <button    onClick={() => navigate(dept.link)}  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center group">
                  Explore Department 
                  <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div 
          className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white p-12 rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="relative text-center">
            <h2 className="text-4xl font-bold mb-6">Begin Your Engineering Journey</h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect with our academic advisors to find the perfect program that aligns with your passion and career aspirations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Schedule Campus Tour
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                Download Course Catalog
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DepartmentsPage;