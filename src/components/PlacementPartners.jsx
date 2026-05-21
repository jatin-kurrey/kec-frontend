import React, { useRef, useEffect } from "react";
import {
  Trophy,
  Users,
  TrendingUp,
  Globe,
  Briefcase,
  Award,
  Star,
  Target,
  CheckCircle,
  Building2,
  GraduationCap,
  Zap,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { gsap } from "gsap";

const PartnerShowcase = () => {
  const containerRef = useRef(null);
  const marqueeUpRef = useRef(null);
  const marqueeDownRef = useRef(null);

  // Partner data with image URLs
  const partners = [
    {
      id: 1,
      name: "Tech Mahindra",
      logo: "https://www.kecbhilai.com/TPO/image003.png",
      category: "IT Services",
    },
    {
      id: 2,
      name: "IndiaMart",
      logo: "https://corporate.indiamart.com/wp-content/uploads/2022/06/corporate-website-no-images-profile-2.jpg",
      category: "E‑Commerce / Marketplace",
    },
    {
      id: 3,
      name: "Accenture",
      logo: "https://www.kecbhilai.com/TPO/image002.png",
      category: "Consulting & IT",
    },
    {
      id: 4,
      name: "TCS BPS",
      logo: "https://job4freshers.co.in/wp-content/uploads/2021/09/tcs-job4freshers.png",
      category: "Business Process Services",
    },
    {
      id: 5,
      name: "R.K.M Powergen Pvt. Ltd",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeHcGfsbUAi2voCJWpb8kh3u0tj8VxvAhc2A&s",
      category: "Power / Energy",
    },
    {
      id: 6,
      name: "Quess Corp",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Quessl.png",
      category: "Services / Staffing",
    },
    {
      id: 7,
      name: "Sony India",
      logo: "https://www.kecbhilai.com/TPO/image007.png",
      category: "Electronics / Consumer Goods",
    },
    {
      id: 8,
      name: "Solar Secure Solutions",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXixEeDpgzI9qHK7kH0DMUMVpefWA7dEdcFQ&s",
      category: "Renewables / Clean Energy",
    },
    {
      id: 9,
      name: "Codenicely",
      logo: "https://www.codenicely.in/assets/codenicely_logo_small%20(1)_1751731246795-BygAaJJK.png",
      category: "Software / Web Dev",
    },
  ];

  // Placement statistics data
  const placementStats = {
    totalStudents: 1200,
    placedStudents: 980,
    highestPackage: "42 LPA",
    averagePackage: "6.5 LPA",
    placementRate: "82%",
    recruitingCompanies: 150,
    internationalOffers: 45,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeUpRef.current) {
        gsap.to(marqueeUpRef.current, {
          yPercent: -50,
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }

      if (marqueeDownRef.current) {
        gsap.set(marqueeDownRef.current, { yPercent: -50 });
        gsap.to(marqueeDownRef.current, {
          yPercent: 0,
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-7xl w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3 md:mb-4 bg-blue-50 px-3 md:px-4 py-1 md:py-2 rounded-full">
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
            Placement Excellence
          </span>

          <h1 className="text-5xl md:text-6xl font-bold bg-gray-700 bg-clip-text text-transparent mb-6">
            Campus Placement
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming students into industry-ready professionals through
            strategic corporate partnerships and comprehensive placement
            training programs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Enhanced Placement Statistics */}
          <div className="lg:w-2/5">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20  p-4 h-full">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6" />
                    <span className="font-semibold text-blue-100">
                      Placement Rate
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {placementStats.placementRate}
                  </div>
                  <div className="text-blue-100 text-sm">
                    2023-24 Academic Year
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-6 h-6" />
                    <span className="font-semibold text-green-100">
                      Highest Package
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {placementStats.highestPackage}
                  </div>
                  <div className="text-green-100 text-sm">Multiple Offers</div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6" />
                    <span className="font-semibold text-orange-100">
                      Average Package
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {placementStats.averagePackage}
                  </div>
                  <div className="text-orange-100 text-sm">
                    Across All Branches
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Building2 className="w-6 h-6" />
                    <span className="font-semibold text-purple-100">
                      Companies
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {placementStats.recruitingCompanies}+
                  </div>
                  <div className="text-purple-100 text-sm">
                    Recruiting Partners
                  </div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-700">
                      Total Students
                    </span>
                  </div>
                  <span className="font-bold text-blue-600">
                    {placementStats.totalStudents}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-700">
                      Placed Students
                    </span>
                  </div>
                  <span className="font-bold text-green-600">
                    {placementStats.placedStudents}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-700">
                      CoreSectorOffers
                    </span>
                  </div>
                  <span className="font-bold text-purple-600">
                    {placementStats.internationalOffers}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Companies Showcase */}
          <div className="lg:w-3/5">
            <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl shadow-2xl overflow-hidden relative min-h-[600px]">
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
              </div>

              {/* Header */}
              <div className="relative z-10 pt-8 px-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Our Recruiting Partners
                    </h2>
                    <p className="text-blue-200">
                      150+ leading companies trust our talent
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span className="text-white text-sm font-medium">
                      Verified Partners
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrolling Companies */}
              <div className="relative z-10 h-[500px] overflow-hidden">
                {/* First Column - Scrolls Up */}
                <div className="absolute left-0 w-1/2 h-full">
                  <div ref={marqueeUpRef} className="space-y-4 px-4">
                    {[...partners, ...partners].map((partner, index) => (
                      <div key={index} className="group">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-lg">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md overflow-hidden p-2">
                                <img
                                  src={partner.logo}
                                  alt={partner.name}
                                  width="48"
                                  height="48"
                                  loading="lazy"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white group-hover:text-blue-200 transition-colors">
                                {partner.name}
                              </h3>
                              <p className="text-blue-200 text-sm">
                                {partner.category}
                              </p>
                            </div>
                            <CheckCircle className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Second Column - Scrolls Down */}
                <div className="absolute right-0 w-1/2 h-full">
                  <div ref={marqueeDownRef} className="space-y-4 px-4">
                    {[...partners, ...partners].map((partner, index) => (
                      <div key={index} className="group">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-lg">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md overflow-hidden p-2">
                                <img
                                  src={partner.logo}
                                  alt={partner.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white group-hover:text-teal-200 transition-colors">
                                {partner.name}
                              </h3>
                              <p className="text-blue-200 text-sm">
                                {partner.category}
                              </p>
                            </div>
                            <Zap className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 pb-6 px-8">
                <div className="flex items-center justify-center gap-6 text-blue-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Annual Recruitment Drives</span>
                  </div>
                  <div className="w-px h-4 bg-blue-400"></div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm">Diverse Job Roles</span>
                  </div>
                </div>
              </div>

              {/* Gradient Overlays */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900 to-transparent z-20"></div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent z-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerShowcase;
