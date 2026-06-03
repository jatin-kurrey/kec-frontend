import React, { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { admissionService, applicationService } from "../api";
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
  Eye,
  Star,
  Car
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

  const [appForm, setAppForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [appSubmitting, setAppSubmitting] = useState(false);

  const handleAppChange = (e) => setAppForm({ ...appForm, [e.target.name]: e.target.value });

  const handleAppSubmit = async (e) => {
    e.preventDefault();
    setAppSubmitting(true);
    try {
      await applicationService.submit({ form_type: "admission", name: appForm.name, email: appForm.email, phone: appForm.phone, data: { course: appForm.course, message: appForm.message } });
      setAppForm({ name: "", email: "", phone: "", course: "", message: "" });
      alert("Application submitted successfully!");
    } catch (err) { alert("Failed to submit. Please try again."); }
    setAppSubmitting(false);
  };

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
        title="Admissions 2025-26" 
        description="Apply for admissions at Krishna Engineering College (KEC) Bhilai. Detailed information on eligibility, fee structure, and the admission process for B.Tech, M.Tech, and MBA."
        keywords="engineering admissions Bhilai, KEC fees, B.Tech eligibility, how to apply KEC, MBA admissions Chhattisgarh"
      />
      {/* Hero / Header Section - Brochure Style */}
      <section className="relative bg-gradient-to-br from-[#0c1530] via-[#111e47] to-[#0c1530] text-white overflow-hidden py-16 border-b-4 border-amber-500">
        {/* Background Decorative patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmYWNjMTUiIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNMzAgMTV2MzBNMTUgMzBoMzAiLz48L2c+PC9zdmc+')]"></div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-x-12 translate-y-12"></div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            {/* Department Badge */}
            <motion.div
              className="inline-flex items-center bg-amber-500/15 border border-amber-500/30 px-5 py-2 rounded-full mb-6 text-sm font-semibold tracking-wider text-amber-400 uppercase backdrop-blur-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Building className="w-4 h-4 mr-2" />
              Department of Admission & Marketing
            </motion.div>

            {/* Main Header Text */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-none text-white uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Admission & <span className="text-amber-400">Marketing</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-slate-300 font-medium italic mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              "Guiding Futures. Building Careers."
            </motion.p>

            {/* Quick Action CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                onClick={() => setActiveTab("apply")}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-base"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 text-blue-950" />
              </button>
              <a
                href="/PROSPECTUS_26-27%20KEC%20Bhilai.pdf"
                download
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/30 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
              >
                <Download className="w-5 h-5" />
                Download Brochure
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Core Brochure Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column - Core Philosophy & Why Choose KEC */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Sub-grid of Quote & Philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* APJ Abdul Kalam Quote */}
              <motion.div 
                className="bg-[#111e47]/5 border-l-4 border-amber-500 bg-white/60 backdrop-blur-sm p-6 rounded-r-2xl shadow-md flex flex-col justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl text-amber-500/20 font-serif leading-none -mb-2">“</div>
                <p className="text-slate-800 font-medium italic text-base leading-relaxed relative z-10 -mt-2">
                  Education is not just about learning, it's about building a better tomorrow.
                </p>
                <div className="mt-4 border-t border-slate-200 pt-3">
                  <span className="text-slate-500 text-xs font-bold tracking-wide block text-right">— A.P.J. Abdul Kalam</span>
                </div>
              </motion.div>

              {/* Core Philosophy Highlights */}
              <motion.div 
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-100/80 flex flex-col justify-between"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="text-blue-900 font-extrabold text-sm uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  Our core approach
                </h4>
                <div className="space-y-3">
                  {[
                    { text: "Student First Approach", color: "text-amber-500" },
                    { text: "Transparent & Ethical Process", color: "text-emerald-500" },
                    { text: "Career Oriented Guidance", color: "text-blue-500" },
                    { text: "Committed to Excellence", color: "text-purple-500" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-current ${item.color}`}></div>
                      <span className="text-slate-700 font-bold text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Why Choose KEC List */}
            <motion.div 
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-black text-blue-950 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                <Target className="text-amber-500 w-6 h-6 flex-shrink-0" />
                Why Choose Krishna Engineering College?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    text: "48 Years of Educational Experience (KPS GROUP)",
                    icon: <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-extrabold text-[10px] flex items-center justify-center border border-purple-500 shadow-sm flex-shrink-0">48</div>
                  },
                  {
                    text: "AICTE Approved and ISO Certified",
                    icon: <Shield className="text-purple-600 w-5 h-5 flex-shrink-0" />
                  },
                  {
                    text: "Affiliated to CSVTU (Govt. Undertaking)",
                    icon: <Building className="text-purple-600 w-5 h-5 flex-shrink-0" />
                  },
                  {
                    text: "In Campus Drone Piloting Training Courses with DGCA Certification",
                    icon: <Target className="text-purple-600 w-5 h-5 flex-shrink-0" />
                  },
                  {
                    text: "Dedicated Drone and Electric Vehicle Lab",
                    icon: <Car className="text-purple-600 w-5 h-5 flex-shrink-0" />
                  },
                  {
                    text: "Experienced Faculty & Industry Mentors",
                    icon: <Users className="text-purple-600 w-5 h-5 flex-shrink-0" />
                  },
                  {
                    text: "Modern Infrastructure & Advanced Laboratories",
                    icon: <Building className="text-purple-600 w-5 h-5 flex-shrink-0" />
                  },
                  {
                    text: "High-Tech AI LABS (in Collaboration with RIT EUROPE)",
                    icon: <div className="w-6 h-5 rounded bg-purple-600 text-white font-extrabold text-[9px] flex items-center justify-center tracking-tighter shadow-sm flex-shrink-0">AI</div>
                  },
                  {
                    text: "Start-up and Innovation Cell",
                    icon: <Lightbulb className="text-purple-600 w-5 h-5 flex-shrink-0" />
                  },
                  {
                    text: "Strong Industry Connect & Placement Support",
                    icon: <Target className="text-purple-600 w-5 h-5 flex-shrink-0" />
                  },
                  {
                    text: "Holistic Development & Innovation Driven Culture",
                    icon: <Lightbulb className="text-purple-600 w-5 h-5 flex-shrink-0" />
                  },
                  {
                    text: "Best in Class Cricket Academy and Sports Clubs",
                    icon: <Award className="text-purple-600 w-5 h-5 flex-shrink-0" />
                  },
                  {
                    text: "Only College in Chhattisgarh having Pink Platform for Girls Safety and Wellness",
                    icon: <div className="px-1.5 py-0.5 rounded bg-pink-500 text-white font-extrabold text-[6px] leading-none flex flex-col items-center justify-center tracking-tighter shadow-sm flex-shrink-0"><span className="block">PINK</span><span className="block">PLATFORM</span></div>
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-2.5 rounded-xl hover:bg-slate-50 transition-colors duration-300">
                    <div className="p-1 rounded-lg mt-0.5 flex-shrink-0 flex items-center justify-center w-8 h-8 bg-purple-50">
                      {item.icon}
                    </div>
                    <span className="text-slate-700 text-sm font-semibold leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column - Premium Profile of Mr. Durga Prasanna Das */}
          <div className="lg:col-span-4 lg:self-start">
            <motion.div 
              className="bg-gradient-to-b from-[#111e47] to-[#0c1530] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-500 relative flex flex-col"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Elegant header badge */}
              <div className="absolute top-4 left-4 z-20 bg-amber-500 text-blue-950 text-xs font-black px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                Admission Head
              </div>

              {/* Photo Area */}
              <div className="relative aspect-[3/4] bg-[#0c1530] overflow-hidden flex items-center justify-center">
                <img 
                  src="/D,P,DAS 11.png" 
                  alt="Mr. Durga Prasanna Das" 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                
                {/* Custom Diagonal Cut/Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1530] via-transparent to-transparent opacity-80 pointer-events-none"></div>
              </div>

              {/* Designation Banner exactly like the brochure */}
              <div className="bg-[#0c1530] border-t border-amber-500/30 p-6 text-center">
                <h3 className="text-2xl font-black text-white tracking-wide">
                  Mr. Durga Prasanna Das
                </h3>
                <p className="text-amber-400 font-extrabold text-sm tracking-wider uppercase mt-1">
                  HEAD - ADMISSION & MARKETING
                </p>
                <p className="text-slate-400 text-xs font-semibold mt-1">
                  Krishna Engineering College, Bhilai
                </p>

                {/* Experience Badge */}
                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="text-slate-300 text-xs font-bold">15+ Years Experience</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span className="text-slate-300 text-xs font-bold">Industry Mentor</span>
                  </div>
                </div>

                {/* Direct Actions */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <a 
                    href="tel:+919244005187"
                    className="flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-black py-2.5 px-4 rounded-xl shadow-md transition-all duration-300 text-sm gap-2"
                  >
                    <Phone className="w-4 h-4 text-blue-950" />
                    Call Now
                  </a>
                  <a 
                    href="mailto:admissions@kecbhilai.com"
                    className="flex items-center justify-center bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/30 font-bold py-2.5 px-4 rounded-xl shadow-md transition-all duration-300 text-sm gap-2"
                  >
                    <Mail className="w-4 h-4 text-amber-500" />
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Super 40 Scholarship Section - Redesigned to exact Brochure Layout */}
        <motion.div 
          className="bg-gradient-to-br from-[#0c1530] via-[#111e47] to-[#0c1530] text-white rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-amber-500 mb-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Diagonal glowing beam */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>

          <div className="relative z-10">
            {/* Header Banner */}
            <div className="text-center mb-8 pb-6 border-b border-white/10">
              <span className="inline-block bg-amber-500 text-[#0c1530] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-md animate-pulse">
                National Level Evaluation
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
                Super 40 <span className="text-amber-400">Scholarship</span> Examination
              </h2>
              <p className="text-amber-400 font-extrabold text-sm md:text-lg tracking-widest uppercase mt-2">
                YOUR TALENT. OUR REWARD.
              </p>
              <p className="text-slate-300 max-w-3xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
                Super 40 is a prestigious scholarship examination designed for bright and deserving students aspiring to pursue B.Tech at Krishna Engineering College. It rewards exceptional merit and supports future technical innovators.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Side: Highlights */}
              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-amber-400 font-black text-sm uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  Key Highlights
                </h4>
                <div className="space-y-3">
                  {[
                    "Open for students of Class 12 (All Streams - PCM preferred)",
                    "Attractive Scholarships up to 100% on Tuition Fees",
                    "Merit Based - Fair and Transparent Process",
                    "A Gateway to Quality Engineering Education",
                    "Shape your future with the right start"
                  ].map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-amber-500/20 p-0.5 rounded mt-0.5 flex-shrink-0">
                        <CheckCircle className="text-amber-400 w-4 h-4" />
                      </div>
                      <span className="text-slate-200 text-sm font-semibold">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <a 
                    href="https://super40-frontend.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-black px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 gap-2 text-sm uppercase tracking-wider w-full justify-center sm:w-auto"
                  >
                    Enter Exam Portal
                    <ArrowRight className="w-4 h-4 text-blue-950" />
                  </a>
                </div>
              </div>

              {/* Right Side: Benefits Grid */}
              <div className="lg:col-span-7">
                <h4 className="text-amber-400 font-black text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  Scholarship Benefits
                </h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { pct: "100%", label: "Scholarship", sub: "for Top Rankers", color: "from-amber-400 to-yellow-500" },
                    { pct: "75%", label: "Scholarship", sub: "for Outstanding", color: "from-slate-200 to-slate-400" },
                    { pct: "50%", label: "Scholarship", sub: "for High Achievers", color: "from-amber-600 to-amber-800" },
                    { pct: "25%", label: "Scholarship", sub: "for Meritorious", color: "from-blue-400 to-blue-600" }
                  ].map((benefit, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <span className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                          {benefit.pct}
                        </span>
                        <p className="text-white font-extrabold text-xs uppercase tracking-wider mt-2">
                          {benefit.label}
                        </p>
                      </div>
                      <p className="text-slate-300 text-[10px] md:text-xs font-semibold mt-2 border-t border-white/5 pt-2">
                        {benefit.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
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
              <form onSubmit={handleAppSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-blue-900 mb-2 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text" name="name" value={appForm.name} onChange={handleAppChange}
                    required
                    className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2 font-medium">
                    Email *
                  </label>
                  <input
                    type="email" name="email" value={appForm.email} onChange={handleAppChange}
                    required
                    className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel" name="phone" value={appForm.phone} onChange={handleAppChange}
                    required
                    className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2 font-medium">
                    Select Course *
                  </label>
                  <select name="course" value={appForm.course} onChange={handleAppChange} className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent">
                    <option value="">Select Course</option>
                    <option>B.Tech - Computer Science & Engineering</option>
                    <option>B.Tech - Artificial Intelligence & Machine Learning</option>
                    <option>B.Tech - Information Technology</option>
                    <option>B.Tech - Mechanical Engineering</option>
                    <option>B.Tech - Civil Engineering</option>
                    <option>B.Tech - Electronics & Communication Engineering</option>
                    <option>B.Tech - Electrical & Electronics Engineering</option>
                    <option>M.Tech</option>
                    <option>MBA</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-blue-900 mb-2 font-medium">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message" value={appForm.message} onChange={handleAppChange}
                    rows="4"
                    className="w-full p-4 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  ></textarea>
                </div>
                <div className="md:col-span-2 flex justify-center mt-4">
                  <motion.button
                    type="submit"
                    disabled={appSubmitting}
                    className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 flex items-center disabled:opacity-60"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText className="mr-2" size={20} />
                    {appSubmitting ? "Submitting..." : "Submit Application"}
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
