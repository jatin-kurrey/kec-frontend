"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Eye, BookOpen, Users, Globe, Star, ArrowRight, ChevronLeft, ChevronRight, Award, Heart, Lightbulb } from "lucide-react";

const MissionVision = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const items = [
    {
      id: 1,
      title: "Our Vision",
      desc: "KEC Bhilai aims to be an extraordinary and exemplary institution — a centre of excellence in engineering and technology. We strive to produce technically competent and employable students with high expectations, strong knowledge creation, skill development, and ethical values.",
      icon: <Eye className="w-10 h-10 text-pink-600" />,
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-pink-500 to-pink-700",
      details: [
        "Be an extraordinary and exemplary institution",
        "Act as a centre of excellence in engineering & technology",
        "Produce technically competent and employable students",
        "Uphold high expectations, strong knowledge creation, and ethical values"
      ]
    },
    {
      id: 2,
      title: "Our Mission",
      desc: "We are committed to creating awareness among youth and nurturing a cutting-edge entrepreneurial mindset, offering equal opportunities and full support for start-ups to grow into global companies.",
      icon: <Target className="w-10 h-10 text-indigo-600" />,
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-indigo-500 to-indigo-700",
      details: [
        "Create awareness among youth",
        "Render cutting-edge entrepreneurial mindset",
        "Nurture young talents with equal opportunities",
        "Provide end-to-end assistance to start-ups for global growth"
      ]
    },
    {
      id: 3,
      title: "Quality Policy",
      desc: "We follow a quality-driven approach in teaching-learning, research, and administration through regular audits, empathetic teaching, and a commitment to integrity, discipline, and holistic development.",
      icon: <Star className="w-10 h-10 text-amber-600" />,
      image: "https://images.unsplash.com/photo-1524178232400-38d816f003ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-amber-500 to-amber-600",
      details: [
        "Quality-driven teaching, learning, research, and admin processes",
        "Regular audits and standardized procedures",
        "Empathetic teaching, integrity, teamwork, and discipline",
        "Focus on overall holistic development",
        "Student and faculty skill development",
        "Interdisciplinary research and academic rigor",
        "Commitment to ethics, honesty, and innovation",
        "Innovation in teaching, research, and business processes"
      ]
    }
  ];
  

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30 blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-30 blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-100 rounded-full opacity-20 blur-xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Award className="w-4 h-4 mr-2" />
            Our Guiding Principles
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Shaping <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">Tomorrow's</span> Innovators
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the core values that drive Krishna Engineering College towards excellence in education and innovation
          </p>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.3, duration: 0.7 }}
              className={`grid grid-cols-2 gap-12 mb-24 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <motion.div 
                className="w-full h-96 relative rounded-3xl overflow-hidden shadow-2xl group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <span className="text-white text-lg font-medium">Explore {item.title.toLowerCase()}</span>
                </div>
                <div className={`absolute top-6 right-6 px-4 py-2 rounded-full text-white text-sm font-medium bg-gradient-to-r ${item.color} shadow-lg`}>
                  {index + 1}/{items.length}
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <motion.div 
                  className="flex items-center mb-6"
                  whileInView={{ x: 0, opacity: 1 }}
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="p-3 bg-white rounded-xl shadow-lg border border-gray-100">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 ml-4">
                    {item.title}
                  </h3>
                </motion.div>
                
                <motion.p 
                  className="text-gray-700 text-lg mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  {item.desc}
                </motion.p>
                
                <motion.ul 
                  className="mb-8 space-y-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                >
                  {item.details.map((detail, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-white transition-colors duration-200 cursor-default"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mt-0.5 mr-4 flex-shrink-0 shadow-sm">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}></div>
                      </div>
                      <span className="text-gray-700">{detail}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 w-max bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center group"
                >
                  Learn More 
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8"
            >
              <div className="w-full h-56 relative overflow-hidden">
                <img
                  src={items[activeIndex].image}
                  alt={items[activeIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-medium bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-lg">
                  {activeIndex + 1}/{items.length}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                    {items[activeIndex].icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 ml-4">
                    {items[activeIndex].title}
                  </h3>
                </div>
                
                <p className="text-gray-700 mb-6">
                  {items[activeIndex].desc}
                </p>
                
                <ul className="mb-6 space-y-3">
                  {items[activeIndex].details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                      </div>
                      <span className="text-gray-600 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="px-5 py-3 w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center group">
                  Learn More 
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex justify-between items-center px-4">
            <motion.button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>
            
            <div className="flex space-x-2">
              {items.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? 'bg-indigo-600 scale-125' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            
            <motion.button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
        >
          <motion.div 
            className="text-center p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">5000+</h3>
            <p className="text-gray-600 font-medium">Successful Alumni</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-white border border-pink-100"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          >
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <BookOpen className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
            <p className="text-gray-600 font-medium">Programs Offered</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Globe className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
            <p className="text-gray-600 font-medium">Global Partnerships</p>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-20 text-center bg-gradient-to-r from-indigo-700 to-indigo-800 text-white p-12 rounded-3xl shadow-xl"
        >
          <Lightbulb className="w-12 h-12 text-amber-300 mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join Our Community?</h3>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg">
            Become part of an institution that values innovation, excellence, and transformative education.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button 
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-indigo-900 font-semibold rounded-lg transition-colors duration-300 flex items-center shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now <ArrowRight className="ml-2 w-4 h-4" />
            </motion.button>
            <motion.button 
              className="px-6 py-3 bg-transparent hover:bg-indigo-600 border-2 border-white text-white font-semibold rounded-lg transition-colors duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVision;