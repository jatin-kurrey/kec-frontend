"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Award, 
  BookOpen, 
  Mail, 
  Linkedin, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  Calendar,
  GraduationCap,
  Target,
  Heart,
  Shield,
  Bookmark,
  ExternalLink
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { leadershipService } from "../api";

const staticGovernanceMembers = [
  {
    name: "Dr. Anand Kumar Tripathi",
    role: "Chairman & Managing Director",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    dept: "Board of Governors",
    bio: "Visionary educationist with 50 years of experience, guiding the institution towards excellence and innovation in technical education.",
    qualifications: "Ph.D. in Management, MBA from IIM Ahmedabad, B.Tech from IIT Bombay",
    achievements: [
      "50+ years in education sector leadership",
      "Founded 5 premier educational institutions",
      "Awarded 'Education Visionary' by Govt. of India (2019)",
      "Published 25+ research papers in international journals"
    ],
    email: "chairman@krishnaengineering.edu.in",
    linkedin: "#",
    tenure: "15 years",
    expertise: ["Strategic Planning", "Educational Leadership", "Institutional Development"]
  },
  {
    name: "Prof. Ramesh Verma",
    role: "Principal",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    dept: "Administration",
    bio: "Committed to academic excellence and student development across all departments with a focus on innovation and industry collaboration.",
    qualifications: "Ph.D. in Computer Science, M.Tech from IIT Delhi, B.E. in Computer Engineering",
    achievements: [
      "25+ research publications in Scopus-indexed journals",
      "15 years of academic leadership experience",
      "Patent holder in AI and Machine Learning technologies",
      "Lead 10+ industry-academia collaboration projects"
    ],
    email: "principal@krishnaengineering.edu.in",
    linkedin: "#",
    tenure: "8 years",
    expertise: ["AI Research", "Academic Administration", "Curriculum Development"]
  },
  {
    name: "Ms. Sita Sharma",
    role: "Director of Administration",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    dept: "Operations",
    bio: "Oversees operational efficiency and institutional governance, ensuring smooth functioning and continuous improvement across all departments.",
    qualifications: "MBA in Operations Management, Certified Administrative Professional, Six Sigma Black Belt",
    achievements: [
      "Streamlined operational processes reducing costs by 20%",
      "Led ISO 9001:2015 certification process",
      "Implemented ERP system across campus operations",
      "Awarded 'Best Administrator' by Education Excellence Forum"
    ],
    email: "admin@krishnaengineering.edu.in",
    linkedin: "#",
    tenure: "12 years",
    expertise: ["Operations Management", "Process Optimization", "Strategic Planning"]
  },
  {
    name: "Dr. Vikram Singh",
    role: "Dean of Academics",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    dept: "Academic Affairs",
    bio: "Ensures curriculum excellence and maintains high academic standards across all programs while fostering innovation in teaching methodologies.",
    qualifications: "Ph.D. in Education Technology, M.Ed from University of Delhi, B.Tech in Electronics",
    achievements: [
      "Curriculum development expert with 20+ years experience",
      "NAAC accreditation coordinator with 5 successful accreditations",
      "Pioneered blended learning initiatives across departments",
      "Mentored 100+ faculty members in teaching excellence"
    ],
    email: "dean@krishnaengineering.edu.in",
    linkedin: "#",
    tenure: "10 years",
    expertise: ["Education Technology", "Quality Assurance", "Faculty Development"]
  }
];

const Governance = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");

  const nextMember = () => {
    setActiveIndex((prev) => (prev + 1) % governanceMembers.length);
  };

  const prevMember = () => {
    setActiveIndex((prev) => (prev - 1 + governanceMembers.length) % governanceMembers.length);
  };

  const { data: governanceMembers = staticGovernanceMembers } = useQuery({
    queryKey: ['leadership'],
    queryFn: async () => {
      const response = await leadershipService.getAll();
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data.map(m => ({
          ...m,
          achievements: typeof m.achievements === 'string' ? JSON.parse(m.achievements) : (m.achievements || []),
          expertise: typeof m.expertise === 'string' ? JSON.parse(m.expertise) : (m.expertise || [])
        }));
      }
      return staticGovernanceMembers;
    }
  });

  const filteredMembers = activeFilter === "all" 
    ? governanceMembers 
    : governanceMembers.filter(member => member.dept === activeFilter);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full translate-x-1/3 translate-y-1/3 opacity-20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-2xl mb-6 shadow-sm"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <Shield className="w-10 h-10 text-blue-700" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-4">
            Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Leadership</span>
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
            Our visionary leadership team ensures strategic planning, academic excellence, and holistic development 
            through innovative governance and dedicated mentorship.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  className="flex justify-center mb-6 px-4"
>
  <div className="bg-white rounded-2xl shadow-md p-2 flex flex-wrap justify-center gap-2 border border-gray-200 w-full md:w-auto">
    {["all", "Board of Governors", "Administration", "Academic Affairs", "Operations"].map((filter) => (
      <button
        key={filter}
        onClick={() => setActiveFilter(filter)}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          activeFilter === filter 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
            : 'text-gray-600 hover:text-blue-700'
        }`}
      >
        {filter === "all" ? "All Leadership" : filter}
      </button>
    ))}
  </div>
</motion.div>


        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
  <AnimatePresence mode="wait">
    {filteredMembers.map((member, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        onClick={() => setSelectedMember(member)}
        className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 cursor-pointer transition-all overflow-hidden group relative hover:shadow-xl"
      >
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="flex items-start gap-6 relative z-10">
          {/* Image Container */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 ring-2 ring-white ring-offset-2 ring-offset-blue-50">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {/* Award Badge */}
            <motion.div 
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Award className="w-5 h-5 text-white" />
            </motion.div>
            
            {/* Online Status Indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Department Badge */}
            <motion.span 
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-sm"
              whileHover={{ scale: 1.05 }}
            >
              {member.dept}
            </motion.span>
            
            {/* Name and Role */}
            <h3 className="text-xl font-bold text-blue-900 mb-1 group-hover:text-indigo-700 transition-colors">
              {member.name}
            </h3>
            <p className="text-indigo-700 font-medium mb-3 flex items-center">
              {member.role}
              <span className="ml-2 text-blue-400">•</span>
              <span className="ml-2 text-sm text-gray-500">{member.tenure} with us</span>
            </p>
            
            {/* Bio Preview */}
            <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
              {member.bio}
            </p>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  background: "linear-gradient(135deg, #2563eb, #4f46e5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>View Profile</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <div className="flex items-center gap-2">
                <motion.a 
                  whileHover={{ scale: 1.2, y: -2, backgroundColor: "#3b82f6" }}
                  whileTap={{ scale: 0.9 }}
                  href={`mailto:${member.email}`} 
                  className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition-all duration-300 group/icon"
                  title="Send email"
                >
                  <Mail className="w-4 h-4 text-gray-600 group-hover/icon:text-white transition-colors" />
                </motion.a>
                
                <motion.a 
                  whileHover={{ scale: 1.2, y: -2, backgroundColor: "#0a66c2" }}
                  whileTap={{ scale: 0.9 }}
                  href={member.linkedin} 
                  className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition-all duration-300 group/icon"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-gray-600 group-hover/icon:text-white transition-colors" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Tenure Badge */}
        <motion.div 
          className="absolute top-4 right-4 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full flex items-center shadow-sm border border-blue-100"
          whileHover={{ scale: 1.05, backgroundColor: "#dbeafe" }}
        >
          <Calendar className="w-3 h-3 mr-1" />
          {member.tenure}
        </motion.div>

        {/* Expertise Tags */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
          {member.expertise.slice(0, 2).map((expertise, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + idx * 0.1 }}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100"
            >
              {expertise}
            </motion.span>
          ))}
          {member.expertise.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{member.expertise.length - 2} more
            </span>
          )}
        </div>

        {/* Hover Effect Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </motion.div>
    ))}
  </AnimatePresence>
</div>
        {/* Mobile Carousel */}
        <div className="md:hidden relative mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedMember(filteredMembers[activeIndex])}
              className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 cursor-pointer"
            >
              <div className="text-center">
                {/* Image */}
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-md mx-auto">
                    <img
                      src={filteredMembers[activeIndex].image}
                      alt={filteredMembers[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <span className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {filteredMembers[activeIndex].dept}
                </span>
                <h3 className="text-xl font-bold text-blue-900 mb-1">{filteredMembers[activeIndex].name}</h3>
                <p className="text-indigo-700 font-medium mb-3">{filteredMembers[activeIndex].role}</p>
                <p className="text-gray-600 text-sm mb-6">{filteredMembers[activeIndex].bio}</p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                >
                  View Profile
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <button 
            onClick={prevMember}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={nextMember}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {filteredMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeIndex === index ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Leadership Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
        >
          {[
            { icon: Users, value: "150+", label: "Years Combined Experience", color: "from-blue-500 to-blue-600" },
            { icon: BookOpen, value: "75+", label: "Research Publications", color: "from-purple-500 to-purple-600" },
            { icon: Award, value: "20+", label: "National Awards", color: "from-amber-500 to-amber-600" },
            { icon: Heart, value: "100%", label: "Student Satisfaction", color: "from-pink-500 to-pink-600" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4"
              whileHover={{ y: -5 }}
            >
              <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-4 shadow-md`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {selectedMember.dept}
                    </span>
                    <h3 className="text-2xl font-bold text-blue-900">{selectedMember.name}</h3>
                    <p className="text-indigo-700 font-medium">{selectedMember.role}</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    onClick={() => setSelectedMember(null)}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-shrink-0 lg:w-1/3">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-md mx-auto lg:mx-0">
                      <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex justify-center gap-3 mt-6">
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        href={`mailto:${selectedMember.email}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                      >
                        <Mail className="w-4 h-4 mr-2" /> Email
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        href={selectedMember.linkedin}
                        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center text-sm"
                      >
                        <Linkedin className="w-4 h-4 mr-2" /> Connect
                      </motion.a>
                    </div>

                    {/* Expertise */}
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2" /> Areas of Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.expertise.map((expertise, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {expertise}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2" /> Qualifications
                      </h4>
                      <p className="text-gray-700">{selectedMember.qualifications}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                        <Bookmark className="w-5 h-5 mr-2" /> Bio
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{selectedMember.bio}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                        <Star className="w-5 h-5 mr-2" /> Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {selectedMember.achievements.map((achievement, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start p-3 bg-blue-50 rounded-lg"
                          >
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                            </div>
                            <span className="text-gray-700">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Governance;