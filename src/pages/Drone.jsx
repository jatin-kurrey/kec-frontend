import React, { useState } from 'react';
import { Drone, CheckCircle } from 'lucide-react';
import { applicationService } from "../api";

const DroneTechnologyRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseLevel: 'beginner',
    department: '',
    semester: ''
  });

  // ... (courseLevels stays same)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        form_type: "DRONE_COURSE",
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        data: {
          course_level: formData.courseLevel,
          department: formData.department,
          semester: formData.semester
        }
      };
      
      await applicationService.submit(payload);
      alert('Registration submitted successfully! We will contact you soon.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        courseLevel: 'beginner',
        department: '',
        semester: ''
      });
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Centered Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-red-500 rounded-full">
              <Drone className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Drone Technology Course</h1>
          </div>
          <p className="text-lg text-gray-600">Master aerial photography and autonomous flight systems</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Image */}
          <div className="">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img 
                src="/courses/droneCourse.jpg"
                alt="Drone Technology"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Simple Registration Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Register Now</h2>
              <p className="text-gray-600">Join our drone technology course today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

             

              {/* Department and Semester */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Department</option>
                    <option value="mechanical">Mechanical Engineering</option>
                    <option value="electrical">Electrical Engineering</option>
                    <option value="computer">Computer Science</option>
                    <option value="civil">Civil Engineering</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semester
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                   <span>Registering...</span>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Register for Course
                  </>
                )}
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneTechnologyRegistration;