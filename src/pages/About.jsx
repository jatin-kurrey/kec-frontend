import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookText, Award, MapPin, Calendar, Star, ChevronRight, Target, BookOpen, Heart, Lightbulb, Trophy } from 'lucide-react';

const About = () => (
  <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen">
    <SEO 
      title="About Us" 
      description="Learn about Krishna Engineering College (KEC) Bhilai. Founded in 2008, we are a leading technical institution focused on innovation, excellence, and industry-readiness."
      keywords="KEC Bhilai history, about Krishna Engineering College, engineering mission, vision, NAAC accredited college"
    />
    <div className="container mx-auto px-4 py-16 max-w-7xl">

      {/* Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div 
          className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-6 shadow-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Award className="text-blue-900 mr-2" size={28} />
          <span className="text-blue-900 font-semibold">NAAC Accredited</span>
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6 leading-tight">
          Krishna Engineering College
          <span className="block text-xl md:text-2xl text-blue-700 font-normal mt-2">Bhilai, Chhattisgarh</span>
        </h1>
        
        <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mb-6 rounded-full"></div>
        
        <p className="text-lg md:text-xl text-blue-800 max-w-4xl mx-auto leading-relaxed">
          Established in 2008 by the Krishna Education Society, KEC Bhilai is affiliated with 
          Chhattisgarh Swami Vivekanand Technical University (CSVTU). We foster technical excellence, 
          innovation, and holistic development to prepare students for real-world challenges.
        </p>
        
        <div className="flex flex-wrap justify-center mt-10 gap-6">
          {[
            { icon: MapPin, text: "Bhilai, Chhattisgarh" },
            { icon: Calendar, text: "Established 2008" },
            { icon: Star, text: "Affiliated to CSVTU" },
            { icon: Target, text: "Industry-Ready Graduates" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="flex items-center text-blue-800 bg-blue-50 px-4 py-2 rounded-full shadow-sm"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <item.icon size={18} className="mr-2 text-blue-700" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Stats */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        {[
         { icon: GraduationCap, number: "2500+", label: "Students", color: "from-blue-500 to-blue-700" },
         { icon: Users, number: "200+", label: "Faculty & Staff", color: "from-green-500 to-green-700" },
         { icon: BookText, number: "20+", label: "Programs", color: "from-purple-500 to-purple-700" },
         { icon: Award, number: "25+", label: "Years of Excellence", color: "from-orange-500 to-orange-700" },
        ].map((stat, index) => (
          <motion.div 
            key={index} 
            className="bg-white p-6 rounded-2xl shadow-lg text-center border-0 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-blue-50 mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="text-blue-900" size={28} />
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-1">{stat.number}</div>
              <div className="text-blue-700 font-medium">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        className="grid md:grid-cols-2 gap-8 mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center mb-6">
            <Target className="mr-3" size={28} />
            <h3 className="text-2xl font-bold">Our Mission</h3>
          </div>
          <p className="text-blue-100 leading-relaxed">
            To impart quality technical education that transforms students into skilled professionals, 
            innovators and responsible citizens through excellent teaching, research and industry collaboration 
            while upholding ethical values and serving society.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-blue-900 p-8 rounded-2xl shadow-lg">
          <div className="flex items-center mb-6">
            <Lightbulb className="mr-3" size={28} />
            <h3 className="text-2xl font-bold">Our Vision</h3>
          </div>
          <p className="leading-relaxed">
            To be a center of excellence in engineering education and research that nurtures talent 
            and innovation to meet global challenges and contribute to sustainable development of 
            the nation and society at large.
          </p>
        </div>
      </motion.div>

      {/* Campus & Facilities */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-2xl shadow-lg mb-20 border-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Campus & Infrastructure</h2>
          <p className="text-blue-800 text-lg max-w-3xl mx-auto">
            Our sprawling campus provides an ideal environment for academic excellence and personal growth with state-of-the-art facilities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <BookOpen className="text-blue-700 mr-3" size={28} />
              <h3 className="text-xl font-semibold text-blue-900">Academic Facilities</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Specialized laboratories for each department",
                "Central library with extensive collection",
                "High-speed internet connectivity across campus",
                "Seminar halls with audio-visual equipment",
                "Research centers with advanced equipment"
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start text-blue-700"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="text-yellow-500 mt-1 mr-2 flex-shrink-0" size={18} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className="flex items-center mb-6">
              <Heart className="text-blue-700 mr-3" size={28} />
              <h3 className="text-xl font-semibold text-blue-900">Student Amenities</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Hostel accommodation for boys and girls",
                "Cafeteria serving nutritious meals",
                "Sports facilities and playgrounds",
                "Medical facilities and counseling services",
                "Transportation services",
               
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start text-blue-700"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="text-yellow-500 mt-1 mr-2 flex-shrink-0" size={18} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Academic Excellence */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-white p-8 md:p-10 rounded-2xl shadow-lg mb-20 border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Academic Programs</h2>
          <p className="text-blue-800 text-lg max-w-3xl mx-auto">
            We offer a comprehensive range of programs designed to meet industry demands and foster innovation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <GraduationCap className="mr-2 text-blue-700" size={24} />
                Undergraduate Programs
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "Computer Science & Engineering",
                  "Mechanical Engineering",
                  "Civil Engineering",
                  "Electrical Engineering",
                ].map((program, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start text-blue-700 text-sm bg-blue-50 p-2 rounded-lg"
                    whileHover={{ scale: 1.03 }}
                  >
                    <ChevronRight className="text-yellow-500 mt-0.5 mr-1 flex-shrink-0" size={14} />
                    <span>{program}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <BookText className="mr-2 text-blue-700" size={24} />
                Courses Offered
              </h3>
              <div className="grid grid-cols-1  md:grid-cols-2 gap-2">
                {[
                 "Artificial Intelligence (AI)",
                 "Machine Learning (ML)",
                 "Cyber Security",
                 "Cloud Computing",
                 "Data Science",
                 "Electric Vehicle Technology",
                 "Fast Charging Station Infrastructure",
                 "Robotics"
                ].map((program, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start text-blue-700 bg-blue-50 p-3 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <ChevronRight className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
                    <span>{program}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
           
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="text-center bg-gradient-to-r from-blue-900 to-blue-800 text-white p-10 md:p-12 rounded-2xl shadow-lg mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Begin Your Engineering Journey With Us</h3>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
          Join our community of innovators, thinkers, and problem solvers. Discover your potential at Krishna Engineering College.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button 
            className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Admissions <ChevronRight className="ml-1" size={20} />
          </motion.button>
          <motion.button 
            className="bg-transparent hover:bg-blue-700 border-2 border-white text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Campus Tour <ChevronRight className="ml-1" size={20} />
          </motion.button>
        </div>
      </motion.div>

    </div>
  </div>
);

export default About;