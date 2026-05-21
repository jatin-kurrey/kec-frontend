import React, { useEffect, useRef, useState } from "react";
import { Users, BookOpen, Trophy, Globe, GraduationCap, Building, Target, BarChart3, Briefcase, TrendingUp, Clock, Calendar, Award, Star } from "lucide-react";

const CollegeDashboard = () => {
  const [counters, setCounters] = useState({
    students: 0,
    faculty: 0,
    departments: 0,
    ranking: 0
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { 
      icon: GraduationCap, 
      label: "Total Students", 
      value: "1500+", 
      target: 1500,
      change: "+12%", 
      trend: "up", 
      color: "bg-blue-500",
      iconColor: "text-blue-600"
    },
    { 
      icon: Users, 
      label: "Faculty Members", 
      value: "1,200+", 
      target: 1200,
      change: "+8%", 
      trend: "up", 
      color: "bg-green-500",
      iconColor: "text-green-600"
    },
    { 
      icon: Building, 
      label: "Departments", 
      value: "45", 
      target: 45,
      change: "+2", 
      trend: "up", 
      color: "bg-orange-500",
      iconColor: "text-orange-600"
    },
    { 
      icon: Trophy, 
      label: "Ranking", 
      value: "#15", 
      target: 15,
      change: "National", 
      trend: "stable", 
      color: "bg-yellow-500",
      iconColor: "text-yellow-600"
    },
  ];

  const programs = [
    { name: "Engineering", students: 4500, growth: 15, color: "bg-blue-500", icon: Target },
  ];

  const achievements = [
  {
    icon: Trophy,
    title: "Research Grants",
    value: "₹1.2 Cr",
    subtitle: "Annual Funding",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Globe,
    title: "Industry Tie-ups",
    value: "25+",
    subtitle: "MoUs with Companies",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Target,
    title: "Placement Rate",
    value: "82%",
    subtitle: "2024 Batch",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: BarChart3,
    title: "Alumni Network",
    value: "10K+",
    subtitle: "Across India",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Clock,
    title: "Average Package",
    value: "₹4.8 LPA",
    subtitle: "2024 Placements",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Calendar,
    title: "Years Established",
    value: "41",
    subtitle: "Since 1984",
    color: "from-purple-500 to-purple-600",
  },
];


  const placementStats = [
    {
      company: "Codenicely",
      hires: 90,
      package: "6 LPA",
      trend: "+10%",
      logo: "C",
      color: "bg-blue-500",
      icon: TrendingUp,
    },
    {
      company: "Sthanve Software",
      hires: 85,
      package: "5 LPA",
      trend: "+8%",
      logo: "S",
      color: "bg-green-500",
      icon: Target,
    },
    {
      company: "Augtech Nextwealth",
      hires: 50,
      package: "7 LPA",
      trend: "+12%",
      logo: "A",
      color: "bg-orange-500",
      icon: Star,
    },
    {
      company: "Gravity Engineering Services",
      hires: 20,
      package: "6.5 LPA",
      trend: "+7%",
      logo: "G",
      color: "bg-yellow-500",
      icon: BarChart3,
    },
    {
      company: "IB Group",
      hires: 12,
      package: "5.5 LPA",
      trend: "+6%",
      logo: "I",
      color: "bg-blue-600",
      icon: TrendingUp,
    },
    {
      company: "Avinash Builders",
      hires: 18,
      package: "4.5 LPA",
      trend: "+5%",
      logo: "A",
      color: "bg-red-500",
      icon: Award,
    },
  ];
  

  const topRecruiters = [
    {
      name: "Codenicely",
      hires: 5,
      color: "bg-blue-500",
      progress: 100, // max hires
    },
    {
      name: "Sthanve Software",
      hires: 4,
      color: "bg-green-500",
      progress: 80,
    },
    {
      name: "Augtech Nextwealth",
      hires: 3,
      color: "bg-orange-500",
      progress: 60,
    },
  ];
  

  // Scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once triggered
        }
      },
      { threshold: 0.3 } // Trigger when 30% of component is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation - triggered only when component is visible
  useEffect(() => {
    if (!isVisible) return;

    const animateCounters = () => {
      stats.forEach((stat, index) => {
        if (stat.target) {
          let start = 0;
          const end = stat.target;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              start = end;
              clearInterval(timer);
            }
            
            setCounters(prev => ({
              ...prev,
              [stat.label.toLowerCase().replace(/\s+/g, '_')]: Math.floor(start)
            }));
          }, 16);
        }
      });
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, [isVisible]);

  // Progress bar animation
  const ProgressBar = ({ progress, color, animated = true }) => {
    const [width, setWidth] = useState(0);
    
    useEffect(() => {
      if (animated && isVisible) {
        setTimeout(() => {
          setWidth(progress);
        }, 300);
      } else {
        setWidth(progress);
      }
    }, [progress, animated, isVisible]);

    return (
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${width}%` }}
        />
      </div>
    );
  };

  const Counter = ({ value, suffix = "" }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isVisible) return;
      
      if (typeof value === 'number') {
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          setCount(Math.floor(start));
        }, 16);

        return () => clearInterval(timer);
      }
    }, [value, isVisible]);

    return <span>{typeof value === 'number' ? count.toLocaleString() + suffix : value}</span>;
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center lg:text-left">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider font-inter mb-2 block">
            University Dashboard
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 font-playfair mb-3">
            Krishna Engineering College
          </h1>
          <p className="text-slate-600 text-base font-inter max-w-3xl mx-auto lg:mx-0">
            Founded in 1984, KEC has been at the forefront of innovation, 
            research, and academic excellence. Our mission is to promote the public welfare 
            by exercising an influence on behalf of humanity and civilization.
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Stats & Programs */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    <Counter value={stat.target} suffix={stat.label === "Ranking" ? "" : "+"} />
                  </h3>
                  <p className="text-slate-600 text-xs font-inter">{stat.label}</p>
                  
                  {/* Progress indicator */}
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full ${stat.color} transition-all duration-2000`}
                      style={{ width: `${isVisible ? (counters[stat.label.toLowerCase().replace(/\s+/g, '_')] / stat.target) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Placement Success Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-playfair">Placement Success</h2>
                  <p className="text-slate-500 text-sm">Top recruiters & placement statistics</p>
                </div>
              </div>

              {/* Top Companies Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {placementStats.map((company, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-50 to-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl ${company.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {company.logo}
                      </div>
                      <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                        <company.icon className="w-3 h-3" />
                        {company.trend}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{company.company}</h3>
                    <div className="flex justify-between text-xs text-slate-600 mb-2">
                      <span>{company.hires} hires</span>
                      <span className="font-semibold">{company.package}</span>
                    </div>
                    <ProgressBar progress={(company.hires / 50) * 100} color={company.color} />
                  </div>
                ))}
              </div>

              {/* Top Recruiters Progress */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Top Recruiting Partners
                </h3>
                {topRecruiters.map((recruiter, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-3 h-3 rounded-full ${recruiter.color} shadow-sm`}></div>
                      <span className="font-medium text-slate-700 text-sm">{recruiter.name}</span>
                    </div>
                    <div className="flex items-center gap-4 flex-1 max-w-[200px]">
                      <ProgressBar progress={recruiter.progress} color={recruiter.color} />
                      <span className="text-xs text-slate-600 font-inter w-8 text-right">
                        {recruiter.hires}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programs Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 font-playfair mb-2 sm:mb-0 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Program Enrollment
                </h2>
                <span className="text-xs text-slate-500 font-inter">2024 Academic Year</span>
              </div>
              <div className="space-y-4">
                {programs.map((program, index) => (
                  <div key={index} className="flex items-center justify-between group hover:bg-slate-50 p-2 rounded-lg transition-all duration-300">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${program.color} bg-opacity-10`}>
                        <program.icon className={`w-4 h-4 ${program.color.replace('bg-', 'text-')}`} />
                      </div>
                      <span className="font-medium text-slate-700 text-sm font-inter min-w-[120px]">{program.name}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-1 max-w-[200px]">
                      <div className="w-full bg-gray-100 rounded-full h-2 shadow-inner">
                        <div 
                          className={`h-2 rounded-full ${program.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${isVisible ? (program.students / 5000) * 100 : 0}%` }}
                        />
                      </div>
                      <div className="flex gap-2 min-w-[80px] justify-end">
                        <span className="text-xs text-slate-600 font-inter">
                          <Counter value={program.students} />
                        </span>
                        <span className="text-xs text-green-600 font-inter flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +{program.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Info & Links */}
          <div className="space-y-6">
            
            {/* University Info Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
              <h2 className="text-xl font-bold font-playfair mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                At a Glance
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="font-inter text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Founded
                  </span>
                  <span className="font-medium">1984</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="font-inter text-sm flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Campus Size
                  </span>
                  <span className="font-medium">10 gacres</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="font-inter text-sm flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Endowment
                  </span>
                  <span className="font-medium">$36.3B</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-inter text-sm flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Acceptance Rate
                  </span>
                  <span className="font-medium">4.3%</span>
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color} shadow-md`}>
                      <achievement.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {achievement.value.includes('$') || achievement.value.includes('%') ? (
                          achievement.value
                        ) : (
                          <Counter value={parseInt(achievement.value.replace(/[^\d]/g, ''))} 
                                   suffix={achievement.value.includes('+') ? '+' : ''} />
                        )}
                      </h3>
                      <p className="text-slate-700 font-medium text-sm font-inter">{achievement.title}</p>
                      <p className="text-slate-500 text-xs font-inter">{achievement.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>     
      </div>
    </section>
  );
};

export default CollegeDashboard;