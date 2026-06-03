import React from 'react';
import { BatteryCharging, CheckCircle, Clock, BookOpen, Award, Shield, ArrowRight, Zap } from 'lucide-react';

const FastChargingPage = () => {
  const handleEnroll = () => {
    const SUPER40_URL = import.meta.env.VITE_SUPER40_URL || 'http://localhost:5174';
    window.location.href = `${SUPER40_URL}/enroll/charging`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-50/30 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-yellow-500/20">
            <BatteryCharging className="w-4 h-4 animate-bounce" />
            Specialized Summer Program
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Fast Charging Station Technology
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Specialize in designing, deploying, and managing rapid EV charging infrastructure with smart grid integration and sustainable energy systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Columns - Course Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
              <img 
                src="/courses/FasT.jpg"
                alt="Fast Charging Station Technology Training"
                className="w-full h-80 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">What You Will Learn</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Power electronics for EV fast chargers",
                    "Smart grid integration & load balancing",
                    "Energy storage system design",
                    "DC fast charging protocols (CCS, CHAdeMO)",
                    "Renewable energy integration",
                    "Charging station management software"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-slate-600 text-sm font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Duration", val: "4 Weeks", icon: Clock },
                { label: "Level", val: "Intermediate", icon: BookOpen },
                { label: "Certificate", val: "KEC Certified", icon: Award }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 text-center shadow-sm">
                  <stat.icon className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">{stat.label}</div>
                  <div className="text-base font-extrabold text-slate-800 mt-1">{stat.val}</div>
                </div>
              ))}
            </div>

            {/* Highlights Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-500/10 rounded-xl">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Program Highlights</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Hands-on hardware prototyping sessions",
                  "Industry-standard EVSE installation training",
                  "Live project on campus charging station",
                  "Guest lectures from EV industry experts",
                  "Certification recognized by leading EV OEMs",
                  "Job placement assistance post completion"
                ].map((highlight, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Columns - Enrollment CTA Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 sticky top-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-yellow-500/10 rounded-2xl">
                  <Shield className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Secure Enrollment</h3>
                  <p className="text-xs text-slate-500">Managed via Super40 Portal</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-3">Program Admission Status</h4>
                  <ul className="space-y-3 text-slate-600 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Total Seats:</span>
                      <span className="font-bold text-slate-800">40 Seats Only</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Program Fee:</span>
                      <span className="font-bold text-yellow-600">₹13,999</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Selection Mode:</span>
                      <span className="font-bold text-slate-800">First Come, First Served</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Status:</span>
                      <span className="font-bold text-orange-500">Starting Soon</span>
                    </li>
                  </ul>
                </div>

                <div className="text-slate-600 text-sm leading-relaxed">
                  To maintain absolute transparency and control over registration windows, seat allocations, and dates, all student enrollments for KEC Summer Programs are processed exclusively through our centralized <strong className="text-slate-800 font-bold">Super40 Portal</strong>.
                </div>

                <button
                  type="button"
                  onClick={handleEnroll}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30 transform hover:-translate-y-0.5"
                >
                  <span>Go to Enrollment Portal</span>
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FastChargingPage;