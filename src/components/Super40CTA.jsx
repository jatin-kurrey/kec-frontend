import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Award, Users, Star, BookOpen, Target, Zap, CheckCircle, ArrowRight, Shield, Rocket, GraduationCap } from 'lucide-react';
import axios from 'axios';

const Super40EntranceExam = () => {
  const [settings, setSettings] = useState({
    super40_exam_year: '2024',
    super40_seats: '40',
    super40_acceptance_rate: '2%',
    super40_placement_record: '100%',
    super40_application_start: 'Jan 15, 2024',
    super40_last_date: 'Mar 30, 2024',
    super40_admit_card: 'Apr 15, 2024',
    super40_exam_date: 'Apr 28, 2024',
    super40_results_date: 'May 15, 2024',
    super40_total_marks: '180',
    super40_duration_hours: '3',
    super40_question_type: 'MCQ',
    super40_features: "40 Seats Only - Elite Program|Merit-based Scholarships|1:10 Faculty-Student Ratio|100% Placement Guarantee|Industry-focused Curriculum|Accelerated Learning Path",
    super40_eligibility: "Minimum 85% in 12th Grade|Mathematics & Physics compulsory|Age limit: 17-20 years|Valid JEE/CET score accepted",
    super40_brochure_url: ""
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/settings')
      .then(res => {
        if (res.data) {
          setSettings(prev => ({
            ...prev,
            ...res.data
          }));
        }
      })
      .catch(err => {
        console.warn("Using static settings fallback for Super 40", err);
      });
  }, []);

  const featuresList = settings.super40_features.split('|').filter(Boolean);
  const featureIcons = [Award, Star, Users, Target, BookOpen, Rocket];
  const featureColors = ["text-blue-400", "text-green-400", "text-orange-400", "text-red-400", "text-blue-400", "text-green-400"];
  const features = featuresList.map((text, idx) => ({
    text,
    icon: featureIcons[idx % featureIcons.length],
    color: featureColors[idx % featureColors.length]
  }));

  const importantDates = [
    { date: settings.super40_application_start, event: "Application Start", color: "bg-green-500", icon: Calendar },
    { date: settings.super40_last_date, event: "Last Date to Apply", color: "bg-orange-500", icon: Clock },
    { date: settings.super40_admit_card, event: "Admit Card Available", color: "bg-blue-500", icon: Shield },
    { date: settings.super40_exam_date, event: "Entrance Exam", color: "bg-red-500", icon: Target },
    { date: settings.super40_results_date, event: "Results Declaration", color: "bg-green-500", icon: Award }
  ];

  const eligibilityList = settings.super40_eligibility.split('|').filter(Boolean);
  const eligibilityColors = ["border-l-blue-400", "border-l-green-400", "border-l-orange-400", "border-l-red-400"];
  const eligibilityCriteria = eligibilityList.map((text, idx) => ({
    text,
    color: eligibilityColors[idx % eligibilityColors.length]
  }));

  const stats = [
    { number: settings.super40_seats, label: "Seats Only", color: "bg-blue-500/20 text-blue-400" },
    { number: settings.super40_acceptance_rate, label: "Acceptance Rate", color: "bg-green-500/20 text-green-400" },
    { number: settings.super40_placement_record, label: "Placement Record", color: "bg-orange-500/20 text-orange-400" }
  ];

  const examPattern = [
    { value: settings.super40_total_marks, label: "Total Marks", color: "from-blue-500 to-blue-600" },
    { value: settings.super40_duration_hours, label: "Hours Duration", color: "from-green-500 to-green-600" },
    { value: settings.super40_question_type, label: "Question Type", color: "from-orange-500 to-orange-600" }
  ];

  const handleDownloadBrochure = () => {
    if (settings.super40_brochure_url) {
      window.open(settings.super40_brochure_url, '_blank');
    } else {
      alert("Brochure is being prepared. Please check back soon or contact administration!");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-semibold mb-4 shadow-lg">
                <Zap className="w-4 h-4 mr-2" />
                Limited Seats Available
              </span>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white font-playfair mb-4">
                Super 40 
                <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 bg-clip-text text-transparent">
                  Entrance Exam {settings.super40_exam_year}
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-6 max-w-2xl">
                Join the most prestigious engineering program. Only {settings.super40_seats} exceptional students 
                will be selected for this transformative journey towards excellence.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className={`text-center p-4 rounded-lg backdrop-blur-sm border ${stat.color} border-opacity-30`}>
                    <div className="text-2xl font-bold">{stat.number}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                  <feature.icon className={`w-5 h-5 ${feature.color} flex-shrink-0`} />
                  <span className="text-gray-200 text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://super40-frontend.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 text-center"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 border-2 border-white/30 rounded-lg opacity-0 group-hover:opacity-100 animate-pulse"></div>
              </a>
              
              <button 
                onClick={handleDownloadBrochure}
                className="group border-2 border-white/20 hover:border-orange-400 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 backdrop-blur-sm hover:bg-orange-500/10 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Download Brochure
              </button>
            </div>

            {/* Quick Info */}
            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{settings.super40_duration_hours} Hour Exam</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-400" />
                <span>10,000+ Applicants</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-orange-400" />
                <span>Elite Faculty</span>
              </div>
            </div>
          </div>

          {/* Right Content - Important Dates */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-red-500/30">
                <Calendar className="w-4 h-4" />
                Important Dates
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Exam Schedule</h3>
              <p className="text-gray-400">Mark your calendar for these key dates</p>
            </div>

            <div className="space-y-4">
              {importantDates.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/5 hover:border-white/20 transition-all duration-300 group hover:scale-102">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{item.event}</div>
                      <div className="text-gray-300 text-sm font-medium">{item.date}</div>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-green-500 animate-pulse' : 
                    index === 1 ? 'bg-orange-500' : 
                    index === 2 ? 'bg-blue-500' : 'bg-red-500'
                  }`}></div>
                </div>
              ))}
            </div>

            {/* Eligibility Criteria */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 via-green-500/10 to-orange-500/10 rounded-lg border border-blue-500/20">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Eligibility Criteria
              </h4>
              <div className="space-y-3">
                {eligibilityCriteria.map((criteria, index) => (
                  <div key={index} className={`flex items-center gap-3 text-sm text-gray-300 pl-3 border-l-4 ${criteria.color} bg-white/5 rounded-r-lg p-2`}>
                    <div className="w-2 h-2 bg-current rounded-full"></div>
                    {criteria.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Pattern */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              {examPattern.map((item, index) => (
                <div key={index} className="p-3 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/10">
                  <div className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-bold text-lg`}>
                    {item.value}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold animate-pulse shadow-lg">
            <Clock className="w-4 h-4" />
            Early Application Deadline: {settings.super40_last_date} - Apply Now!
          </div>
        </div>

      </div>
    </section>
  );
};

export default Super40EntranceExam;
