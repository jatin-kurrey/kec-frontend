import React, { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { admissionService } from "../api";
import {
  Download,
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  User,
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Clock,
  Shield,
  Award,
  ChevronRight,
  Play,
  Building,
  Target,
  Users,
  Bookmark,
  Lightbulb,
  Eye
} from "lucide-react";

const iconMap = {
  FileText: FileText,
  Download: Download,
  User: User,
  DollarSign: DollarSign,
  CheckCircle: CheckCircle,
  BookOpen: BookOpen,
  Clock: Clock,
  Award: Award,
  Building: Building,
  Target: Target,
  Lightbulb: Lightbulb,
  Eye: Eye
};

const AdmissionKEC = () => {
  const [activeTab, setActiveTab] = useState("process");
  const { data: admissionData, isLoading: loading } = useQuery({
    queryKey: ['admission'],
    queryFn: async () => {
      const [guideRes, stepsRes, eligibilityRes, docsRes, feesRes] = await Promise.all([
        admissionService.getGuide(),
        admissionService.getSteps(),
        admissionService.getEligibility(),
        admissionService.getDocuments(),
        admissionService.getFees(),
      ]);
      return {
        guide: guideRes.data,
        steps: stepsRes.data || [],
        eligibility: eligibilityRes.data || [],
        documents: docsRes.data || [],
        fees: feesRes.data || []
      };
    }
  });

  const { guide, steps = [], eligibility = [], documents = [], fees = [] } = admissionData || {};

  const renderIcon = (iconName, className = "w-6 h-6") => {
    const Icon = iconMap[iconName] || FileText;
    return <Icon className={className} />;
  };

  const tabs = [
    { id: "process", label: "Admission Process", icon: FileText },
    { id: "eligibility", label: "Eligibility", icon: CheckCircle },
    { id: "documents", label: "Required Documents", icon: Download },
    { id: "fees", label: "Fee Structure", icon: DollarSign },
    { id: "apply", label: "Apply Now", icon: Calendar },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      <SEO 
        title="Admissions 2024-25" 
        description="Apply for admissions at Krishna Engineering College (KEC) Bhilai. Detailed information on eligibility, fee structure, and the admission process for B.Tech, M.Tech, and MBA."
        keywords="engineering admissions Bhilai, KEC fees, B.Tech eligibility, how to apply KEC, MBA admissions Chhattisgarh"
      />
      {/* Hero Section - Redesigned */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white overflow-hidden">
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-blue-950/50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDczZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzAgMTV2MzBNMTUgMzBoMzAiLz48L2c+PC9zdmc+')] opacity-10"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-24 translate-y-24"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-20">
          <div className="text-center">
            {/* College Logo/Badge */}

            {/* Admission Badge */}
            <motion.div
              className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-sm font-medium border border-white/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Admissions 2024-25 Open
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Welcome to{" "}
              <span className="text-yellow-400">
                Krishna Engineering College
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Excellence in Technical Education Since 2011. Approved by AICTE
              and Affiliated to CSVTU, Bhilai.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <motion.button
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold px-8 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("apply")}
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>

              <motion.button
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 border border-white/30 flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-950 to-transparent"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16 -mt-20 relative z-10">
        {/* Head of Admissions - Redesigned */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-blue-100/50 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-100 rounded-tr-full"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <User className="w-4 h-4 mr-2" />
                Meet Our Admission Head
              </motion.div>
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                Your Admission Guide
              </h2>
              <p className="text-blue-700 max-w-2xl mx-auto">
                Our dedicated admission team is here to help you navigate the
                application process and answer all your questions.
              </p>
            </div>

            {guide && (
              <div className="flex flex-col lg:flex-row items-center gap-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200/50">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                      <img
                        src={guide.image}
                        alt={guide.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-2">
                    {guide.name}
                  </h3>

                  <p className="text-blue-700 font-medium mb-4">
                    {guide.position}
                  </p>

                  <div className="mb-4 space-y-2">
                    <p className="text-gray-600 flex items-center justify-center lg:justify-start">
                      <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                      {guide.qualification}
                    </p>
                    <p className="text-gray-600 flex items-center justify-center lg:justify-start">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      {guide.experience}
                    </p>
                  </div>

                  <p className="text-blue-800 italic mb-6 border-l-4 border-blue-400 pl-4 py-2 bg-white/50 rounded-r-lg">
                    "{guide.message}"
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <motion.a
                      href={`mailto:${guide.email}`}
                      className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </motion.a>
                    <motion.a
                      href={`tel:${guide.phone}`}
                      className="flex items-center justify-center border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </motion.a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-900 text-white shadow-lg"
                    : "bg-white text-blue-900 hover:bg-blue-100 shadow-md"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent size={20} className="mr-2" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-blue-100/50"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Admission Process */}
          {activeTab === "process" && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">
                  Admission Process
                </h2>
                <p className="text-blue-700">
                  Follow these simple steps to join our engineering community
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200/50 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center mr-4">
                        {index + 1}
                      </div>
                      <div className="text-blue-900 p-2 bg-white rounded-lg shadow-sm">
                        {renderIcon(step.icon)}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-blue-700 text-sm">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Eligibility Criteria */}
          {activeTab === "eligibility" && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">
                  Eligibility Criteria
                </h2>
                <p className="text-blue-700">
                  Check if you meet the requirements for our programs
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200/50">
                <div className="grid md:grid-cols-2 gap-6">
                  {eligibility.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start p-4 bg-white rounded-lg shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle
                        className="text-green-600 mr-3 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-blue-800">{item.criteria}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Required Documents */}
          {activeTab === "documents" && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">
                  Required Documents
                </h2>
                <p className="text-blue-700">
                  Prepare these documents for a smooth application process
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {documents.map((doc, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200/50 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-blue-800">{doc.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Fee Structure */}
          {activeTab === "fees" && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">
                  Fee Structure (Per Year)
                </h2>
                <p className="text-blue-700">
                  Transparent and affordable education for all students
                </p>
              </div>
              <div className="overflow-x-auto rounded-xl border border-blue-200/50 shadow-sm">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
                      <th className="py-4 px-6 text-left font-semibold">
                        Program
                      </th>
                      <th className="py-4 px-6 text-center font-semibold">
                        Tuition Fee
                      </th>
                      <th className="py-4 px-6 text-center font-semibold">
                        Development Fee
                      </th>
                      <th className="py-4 px-6 text-center font-semibold">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map((fee, index) => (
                      <motion.tr
                        key={index}
                        className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="py-4 px-6 text-blue-900 font-medium">
                          {fee.program}
                        </td>
                        <td className="py-4 px-6 text-center text-blue-800">
                          {fee.tuitionFee}
                        </td>
                        <td className="py-4 px-6 text-center text-blue-800">
                          {fee.developmentFee}
                        </td>
                        <td className="py-4 px-6 text-center text-blue-900 font-semibold">
                          {fee.total}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-center">
                  <strong>Note:</strong> Additional one-time charges may include
                  registration fee, security deposit (refundable), and other
                  applicable charges.
                </p>
              </div>
            </div>
          )}

          {/* Apply Now Form */}
          {activeTab === "apply" && (
            <div>
              {/* Premium Super 40 CTA Banner */}
              <div className="mb-12 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-indigo-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-32 translate-x-32 blur-2xl"></div>
                <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-blue-950 uppercase tracking-widest mb-3 animate-pulse">
                      Special Opportunity
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                      Super 40 Entrance Evaluation
                    </h3>
                    <p className="text-blue-200 mt-2 max-w-xl text-sm md:text-base leading-relaxed">
                      Are you aspiring for elite technical education? Register and participate in our **Super 40 Entrance Program** to secure up to 100% scholarship, specialized mentorship, and advanced career placement training.
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-full md:w-auto">
                    <a
                      href="https://super40-frontend.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto text-center inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-blue-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Enter Exam Portal
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">
                  General B.Tech Application
                </h2>
                <p className="text-blue-700">
                  Fill out the registration details below to apply for general admissions
                </p>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-blue-900 mb-2 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2 font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2 font-medium">
                    Select Course *
                  </label>
                  <select className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent">
                    <option>Select Course</option>
                    <option>B.Tech - Computer Science & Engineering</option>
                    <option>
                      B.Tech - Artificial Intelligence & Machine Learning
                    </option>
                    <option>B.Tech - Information Technology</option>
                    <option>B.Tech - Mechanical Engineering</option>
                    <option>B.Tech - Civil Engineering</option>
                    <option>
                      B.Tech - Electronics & Communication Engineering
                    </option>
                    <option>
                      B.Tech - Electrical & Electronics Engineering
                    </option>
                    <option>M.Tech</option>
                    <option>MBA</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-blue-900 mb-2 font-medium">
                    Message (Optional)
                  </label>
                  <textarea
                    rows="4"
                    className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  ></textarea>
                </div>
                <div className="md:col-span-2 flex justify-center mt-4">
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText className="mr-2" size={20} />
                    Submit Application
                  </motion.button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdmissionKEC;
