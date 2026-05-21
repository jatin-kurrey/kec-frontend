"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, BookOpen, Award, Shield, ExternalLink } from "lucide-react";

const AffiliationAccreditation = () => {
  const affiliations = [
    {
      title: "Approved by AICTE",
      subtitle: "All India Council for Technical Education",
      description: "Krishna Engineering College is approved by the national-level apex advisory body for technical education in India.",
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      link: "#",
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Affiliated to CSVTU",
      subtitle: "Chhattisgarh Swami Vivekanand Technical University",
      description: "Our programs are affiliated with the premier technical university of Chhattisgarh, ensuring quality education standards.",
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      link: "#",
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6 shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Award className="w-4 h-4 mr-2" />
            Quality Assurance
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Affiliation & <span className="text-blue-600">Accreditations</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Krishna Engineering College is recognized by statutory bodies and maintains 
            the highest standards in technical education as validated by our affiliations.
          </motion.p>
        </motion.section>

        {/* Main Affiliations Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {affiliations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border ${item.borderColor} hover:shadow-xl transition-all duration-300`}
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${item.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-lg mr-4 backdrop-blur-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-white/90 text-sm">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Approval Status: Active</span>
                  <motion.a
                    href={item.link}
                    className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    View Certificate
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quality Commitment</h2>
            <p className="text-gray-600">Our dedication to excellence in technical education</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Education</h3>
              <p className="text-sm text-gray-600">Maintaining highest academic standards</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Industry Relevant</h3>
              <p className="text-sm text-gray-600">Curriculum designed for industry needs</p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Infrastructure</h3>
              <p className="text-sm text-gray-600">State-of-the-art facilities</p>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Accreditation Documents
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AffiliationAccreditation;