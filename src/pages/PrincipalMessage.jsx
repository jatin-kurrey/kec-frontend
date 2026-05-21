"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, Award, GraduationCap, BookOpen, Mail, Calendar, ArrowRight, MapPin, Phone, User } from "lucide-react";
import { leadershipService } from "../api";

const PrincipalMessage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const controls = useAnimation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [principalData, setPrincipalData] = useState({
    name: "Dr. Ajay Tiwari",
    address: "203, 2nd floor, Bikshika Complex, Paradise Complex, Borsi Durg C.G. 491001",
    contact: "9893510942",
    email: "drajay2806@gmail.com",
    education: "PhD Mechanical (Robotics)",
    dob: "28-6-1962",
    joiningDate: "22-02-2021",
    experience: "33 years",
    specialization: "Mechanical (Robotics)",
    publications: {
      total: 21,
      national: 10,
      international: 7,
      journalsConferences: 8
    },
    phdGuided: 2,
    patents: 1,
    books: 0,
    image: "https://image-static.collegedunia.com/public/image/19-09:08-Ajay_Tiwari_01.jpeg",
    bio: "At Krishna Engineering College, our mission is to foster innovation, excellence, and ethical leadership in our students. We are committed to providing world-class education and nurturing future-ready engineers who will make a positive impact on society. Our institution stands as a beacon of knowledge, where we blend traditional values with modern technological advancements to create a holistic learning environment. Our dedicated faculty, state-of-the-art infrastructure, and industry partnerships ensure that our students receive not just education, but an experience that shapes their character and professional capabilities. We take pride in seeing our graduates excel in diverse fields across the globe, carrying forward the legacy of excellence that defines Krishna Engineering College. I invite you to join our vibrant academic community and embark on a journey of discovery, innovation, and personal growth."
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const fetchPrincipal = async () => {
      try {
        const res = await leadershipService.getAll();
        const principal = res.data.find(member => member.role === "Principal");
        if (principal) {
          setPrincipalData({
            ...principalData,
            name: principal.name,
            education: principal.qualification,
            experience: principal.experience,
            email: principal.email,
            contact: principal.phone,
            specialization: principal.specialization,
            image: principal.image,
            bio: principal.bio,
            achievementsList: typeof principal.achievements === 'string' ? JSON.parse(principal.achievements) : principal.achievements
          });
        }
      } catch (err) {
        console.error("Failed to fetch Principal data:", err);
      }
    };
    fetchPrincipal();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200 rounded-full translate-y-1/2 -translate-x-1/2 opacity-30"></div>
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
            <Quote className="w-8 h-8 text-blue-700" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
          >
            Message from the Principal
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-blue-700 max-w-3xl mx-auto"
          >
            Words of wisdom and guidance from our esteemed Principal
          </motion.p>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Principal Image */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={imageVariants}
            className="relative flex-shrink-0 w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl mx-auto lg:mx-0"
          >
            <img
              src={principalData.image}
              alt={`${principalData.name}, Principal`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white text-sm font-medium">{principalData.name}</span>
            </div>
            
            {/* Decorative badge */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2 mb-4">
                <Quote className="w-5 h-5 text-blue-700 mr-2" />
                <span className="text-blue-700 font-medium">Principal's Message</span>
              </div>
              
              <p className={`text-gray-800 text-lg leading-relaxed mb-4 ${isExpanded ? '' : 'line-clamp-5'}`}>
                "{principalData.bio}"
              </p>
              
              {!isExpanded && (
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-center lg:justify-start mx-auto lg:mx-0"
                >
                  Read more <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </motion.div>

            {/* Name & Designation */}
            <motion.div variants={itemVariants} className="mb-6">
              <h3 className="text-2xl font-bold text-blue-900 mb-1">{principalData.name}</h3>
              <p className="text-blue-800 font-medium mb-2">Principal, Krishna Engineering College</p>
              
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <div className="flex items-center text-sm text-blue-700">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  <span>{principalData.education}</span>
                </div>
                <div className="flex items-center text-sm text-blue-700">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{principalData.experience} of Experience</span>
                </div>
              </div>
            </motion.div>

            {/* Signature and CTA */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <motion.a
                href={`mailto:${principalData.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-5 py-2.5 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Principal
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Principal's Achievements */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {principalData.achievementsList ? (
            principalData.achievementsList.map((ach, idx) => (
              <motion.div key={idx} variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-blue-700" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">{ach}</h4>
              </motion.div>
            ))
          ) : (
            <>
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-700" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">{principalData.publications.total} Publications</h4>
                <p className="text-gray-600 text-sm">
                  {principalData.publications.national} National, {principalData.publications.international} International
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-blue-700" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">{principalData.phdGuided} PhD Guided</h4>
                <p className="text-gray-600 text-sm">Research scholars mentored</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-md border border-blue-100 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-blue-700" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-2">{principalData.experience}</h4>
                <p className="text-gray-600 text-sm">Of teaching experience</p>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Specialization Area */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mt-12 bg-blue-100 rounded-2xl p-8 text-center"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Area of Specialization</h3>
            <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <Award className="w-5 h-5 text-blue-700 mr-2" />
              <span className="text-blue-800 font-medium">{principalData.specialization}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrincipalMessage;