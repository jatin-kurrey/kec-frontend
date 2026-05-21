import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Award,
  Mail,
  Phone,
  Briefcase,
  Star,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Users,
  FileText,
  Calendar,
  MapPin
} from 'lucide-react';

import { leadershipService } from '../api';

const Hod = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const [hods, setHods] = useState([]);
  const [loading, setLoading] = useState(true);

  const INITIAL_HODS = [
    {
      id: "seed-1",
      name: "Ash Kumar Soni",
      department: "Mechanical Engineering",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      qualification: "M.Tech (Production Engg), B.E (Mechanical Engg)",
      experience: "14 years",
      email: "hod.mech.ash@kec.edu",
      phone: "+91 9876543214",
      specialization: "Production Engineering",
      achievements: [
        "5 publications",
        "Guided 5 student projects"
      ],
      bio: "An experienced mechanical engineering professional with expertise in production engineering. Committed to academic excellence and student development."
    },
    {
      id: "seed-2",
      name: "Prabhat Kumar Patel",
      department: "Civil Engineering",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      qualification: "B.E (Civil), M.Tech (CTM - Civil Engineering), MBA (Finance), MBA (HR & Marketing), Pursuing AMIE",
      experience: "7 years",
      email: "hod.civil.prabhat@kec.edu",
      phone: "+91 9876543215",
      specialization: "Construction Technology and Management",
      achievements: [
        "6 research papers published in UGC-approved journals",
        "Presented papers in peer-reviewed journals",
        "Best Young Faculty Award - Novel Research Academy",
        "Best Research Scholar Award - Bhartiya Vikas Sansthan",
        "Bharatiya Gaurav Samman - Bhartiya Kala Sanskriti Academy",
        "Best Young Researcher Award - Institute of Scholars",
        "Top 10 Motivated Faculty of India - Engineering Graphics with Timoshenko",
        "Featured on Health & Success Magazine cover (June 2020)"
      ],
      bio: "A highly accomplished academician with multiple qualifications and numerous awards. Passionate about research and student mentorship."
    },
    {
      id: "seed-3",
      name: "Dr. Joy Sonashalol",
      department: "Computer Science & Engineering",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      qualification: "Ph.D. in Artificial Intelligence",
      experience: "20 years",
      email: "hod.cse@kec.edu",
      phone: "+91 9876543212",
      specialization: "Artificial Intelligence, Machine Learning, Data Science",
      achievements: [
        "Developed AI-driven learning platforms",
        "Author of 3 textbooks in Machine Learning and AI",
        "Consultant for multiple software product companies"
      ],
      bio: "A leading academician in computer science, known for pioneering research in artificial intelligence and machine learning. Passionate about shaping future tech leaders through innovation and mentorship."
    },      
    {
      id: "seed-4",
      name: "Mr. Tarachand Sahu",
      department: "Electrical Engineering",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      qualification: "B.E. (Electrical & Electronics Engineering), M.Tech (Electrical Engineering)",
      experience: "—",
      email: "tarachand.sahu@kec.edu",
      phone: "+91 9876543216",
      specialization: "Electrical Machines, Power Systems",
      achievements: [
        "Published 2 research papers in reputed journals"
      ],
      bio: "Mr. Tarachand Sahu is an Assistant Professor in the Department of Electrical Engineering. His teaching and academic interests lie in the areas of power systems and electrical machines. He is committed to student development and technical excellence."
    }
  ];

  useEffect(() => {
    fetchHods();
  }, []);

  const fetchHods = async () => {
    setLoading(true);
    try {
      const res = await leadershipService.getAll();
      if (res.data && res.data.length > 0) {
        const processedData = res.data.map(hod => ({
          ...hod,
          achievements: typeof hod.achievements === 'string' ? JSON.parse(hod.achievements) : (hod.achievements || [])
        }));
        setHods(processedData);
      } else {
        setHods(INITIAL_HODS);
      }
    } catch (err) {
      console.error("Failed to fetch HODs, using static fallback:", err);
      setHods(INITIAL_HODS);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-900 font-bold animate-pulse tracking-widest uppercase text-xs">Syncing Academic Leadership...</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-16">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-teal-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-200 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Academic Leadership
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Leading <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Academic Excellence</span>
              </h1>

              {/* Decorative Line */}
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-8 rounded-full shadow-sm"></div>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                <div className="flex items-center gap-2 text-gray-500">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9V5.5L3 7V9L9 10.5V12L3 13.5V15.5L9 14V16L3 17.5V19.5L9 18V22H15V18L21 19.5V17.5L15 16V14L21 15.5V13.5L15 12V10.5L21 9Z" />
                  </svg>
                  <span className="font-medium">6+ Departments</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <span className="font-medium">50+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                  </svg>
                  <span className="font-medium">Industry Experts</span>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hods.map((hod) => (
                <div key={hod.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${expandedCards[hod.id] ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-md'}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={hod.image} 
                      alt={hod.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent w-full h-2/3" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-2xl">{hod.name}</h3>
                      <p className="text-sm opacity-90">{hod.department}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <GraduationCap className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Qualification</p>
                          <p className="font-medium text-sm line-clamp-1">{hod.qualification.split(',')[0]}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Experience</p>
                          <p className="font-medium text-sm">{hod.experience}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <Award className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Specialization</p>
                        <p className="font-medium text-sm">{hod.specialization}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleExpand(hod.id)}
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      {expandedCards[hod.id] ? (
                        <>
                          Show Less <ChevronUp className="h-4 w-4 ml-2" />
                        </>
                      ) : (
                        <>
                          View Full Profile <ChevronDown className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded Content - Only shows for the selected card */}
                  {expandedCards[hod.id] && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-blue-50 p-4 rounded-xl">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <BookOpen className="text-blue-600 mr-2" size={20} />
                              Qualifications
                            </h3>
                            <p className="text-gray-700 text-sm">{hod.qualification}</p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-xl">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                              <Users className="text-blue-600 mr-2" size={20} />
                              Bio
                            </h3>
                            <p className="text-gray-700 text-sm">{hod.bio}</p>
                          </div>
                        </div>
                        
                        {/* Achievements section */}
                        <div className="bg-yellow-50 rounded-xl p-5 mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Award className="text-yellow-600 mr-3" size={20} />
                            Achievements & Awards
                          </h3>
                          <div className="grid grid-cols-1 gap-3">
                            {hod.achievements.map((achievement, index) => (
                              <div key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center mr-3 mt-0.5">
                                  <Star className="h-4 w-4 text-yellow-600" />
                                </div>
                                <span className="text-gray-700 text-sm">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hod;