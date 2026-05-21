import React, { useState } from 'react';
import { 
  Cpu, 
  Brain, 
  Shield, 
  Cloud, 
  Database, 
  Zap, 
  BatteryCharging, 
  Bot,
  BookOpen,
  Settings,
  Clock,
  Users,
  Award,
  BarChart3,
  Target,
  ChevronRight,
  CheckCircle,
  Calendar,
  MapPin,
  Star,
  Bookmark,
  GraduationCap
} from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { courseService } from "../api";

const iconMap = {
  Cpu: Cpu,
  Brain: Brain,
  Shield: Shield,
  Cloud: Cloud,
  Database: Database,
  Zap: Zap,
  BatteryCharging: BatteryCharging,
  Bot: Bot
};

const Courses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { data: courses = [], isLoading: loading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await courseService.getAll();
      return response.data;
    }
  });

  // Filter courses based on active tab
  const filteredCourses = activeTab === 'all' 
    ? courses 
    : courses.filter(course => 
        activeTab === 'cs' ? course.department === 'Computer Science' : 
        activeTab === 'mech' ? course.department === 'Mechanical Engineering' :
        course.department === 'Electrical Engineering'
      );

  const totalSeats = courses.reduce((sum, course) => sum + (course.seats || 0), 0);
  const avgCredits = courses.length > 0 ? courses[0].credits : 160;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Future-Ready <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Engineering Programs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge specializations designed to prepare you for the technologies of tomorrow
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-0 transition-all hover:shadow-xl">
            <BookOpen className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">{loading ? '...' : courses.length}</div>
            <div className="text-gray-600">Specializations</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-0 transition-all hover:shadow-xl">
            <Users className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">{loading ? '...' : totalSeats}</div>
            <div className="text-gray-600">Annual Seats</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-0 transition-all hover:shadow-xl">
            <Award className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">{loading ? '...' : avgCredits}</div>
            <div className="text-gray-600">Credits Each</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-0 transition-all hover:shadow-xl">
            <GraduationCap className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900">100%</div>
            <div className="text-gray-600">Placement Assistance</div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('all')}
            >
              <Target className="h-4 w-4 mr-2" />
              All Programs
            </button>
            <button
              className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center ${activeTab === 'cs' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('cs')}
            >
              <Cpu className="h-4 w-4 mr-2" />
              Computer Science
            </button>
            <button
              className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center ${activeTab === 'mech' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('mech')}
            >
              <Settings className="h-4 w-4 mr-2" />
              Mechanical
            </button>
            <button
              className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center ${activeTab === 'electrical' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('electrical')}
            >
              <Zap className="h-4 w-4 mr-2" />
              Electrical
            </button>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => {
              const CourseIcon = iconMap[course.icon] || Cpu;
              return (
                <div 
                  key={course.id} 
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${course.bg_color}`}>
                        <CourseIcon className={`h-8 w-8 ${course.icon_color}`} />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {course.department}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.seats} seats
                      </div>
                    </div>
                    
                    <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                      View Details <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className={`h-2 bg-gradient-to-r ${selectedCourse.color}`}></div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-xl ${selectedCourse.bg_color} mr-4`}>
                      {(() => {
                        const SelectedIcon = iconMap[selectedCourse.icon] || Cpu;
                        return <SelectedIcon className={`h-10 w-10 ${selectedCourse.icon_color}`} />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{selectedCourse.title}</h2>
                      <p className="text-gray-600">{selectedCourse.short_name} Program</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Program Overview</h3>
                    <p className="text-gray-700 mb-6">{selectedCourse.description}</p>
                    
                    <div className="bg-gray-50 p-5 rounded-xl mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{selectedCourse.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Credits:</span>
                          <span className="font-medium">{selectedCourse.credits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Seats:</span>
                          <span className="font-medium">{selectedCourse.seats}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Annual Fees:</span>
                          <span className="font-medium">{selectedCourse.fees}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Eligibility:</span>
                          <span className="font-medium text-right">{selectedCourse.eligibility}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Program Highlights</h3>
                    <ul className="space-y-3 mb-8">
                      {selectedCourse.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Opportunities</h3>
                    <p className="text-gray-700">{selectedCourse.career}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center">
                    Apply Now <ChevronRight className="h-5 w-5 ml-2" />
                  </button>
                  <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-xl font-medium transition-colors">
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shape the Future?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our innovative engineering programs and become a leader in emerging technologies
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-xl shadow-md transition-all flex items-center">
              Apply for Admission <ChevronRight className="h-5 w-5 ml-2" />
            </button>
            <button className="bg-transparent border border-white hover:bg-white hover:bg-opacity-10 font-medium py-3 px-8 rounded-xl transition-all">
              Contact Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;