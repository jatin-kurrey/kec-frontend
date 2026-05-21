"use client";
import React, { useState, useRef, useEffect } from "react";
import { Cpu, Zap, Settings, GraduationCap, Users, BookOpen, Award, Calendar, Code, Network, Database, Cloud, ArrowRight, Play, Pause } from "lucide-react";
import { gsap } from "gsap";
import { useQuery } from "@tanstack/react-query";
import { departmentService, contentService } from "../api";

const EngineeringDepartments = () => {
  const [activeDepartment, setActiveDepartment] = useState(0);
  const [isHoverEnabled, setIsHoverEnabled] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef([]);
  const navItemsRef = useRef([]);
  
  const { data: departments = [], isLoading: loading } = useQuery({
    queryKey: ['departments-public'],
    queryFn: async () => {
      const res = await departmentService.getAll();
      const iconMap = {
        'CSE': Cpu,
        'MECH': Settings,
        'EEE': Zap,
        'CIVIL': GraduationCap,
        'DEFAULT': GraduationCap
      };
      
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      
      return data.map((dept, idx) => ({
        id: dept.id,
        number: (idx + 1).toString().padStart(2, '0'),
        title: dept.name,
        shortTitle: dept.short_name,
        description: dept.description,
        icon: iconMap[dept.short_name] || iconMap.DEFAULT,
        image: dept.image_url ? (dept.image_url.startsWith('http') ? dept.image_url : `${contentService.getBaseUrl()}${dept.image_url.startsWith('/') ? '' : '/'}${dept.image_url}`) : `/dep/${dept.short_name.toLowerCase()}.jpeg`,
        color: dept.color_from && dept.color_to ? `from-${dept.color_from} to-${dept.color_to}` : "from-blue-500 to-cyan-500",
        textColor: `text-${dept.color_from || 'blue'}-600`,
        bgColor: `bg-${dept.color_from || 'blue'}-500`,
        gradient: `bg-gradient-to-r from-${dept.color_from || 'blue'}-500 to-${dept.color_to || 'cyan'}-500`,
        stats: dept.stats || {
          alumni: "1000+",
          faculty: "45",
          labs: "15",
          placements: "98%",
        },
        features: dept.highlights || ["Advanced Research", "Industry Focus", "Modern Labs", "Global Placement"],
        icons: [Code, Network, Database, Cloud],
      }));
    }
  });

  // Enhanced GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.fromTo(sectionRef.current,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  // Enhanced department change animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { opacity: 0, scale: 1.1, x: 50 },
          { opacity: 1, scale: 1, x: 0, duration: 1, ease: "power3.out" }
        );
      }

      // Content animation
      const tl = gsap.timeline();
      
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { opacity: 0, x: -60, y: 20 },
          { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "back.out(1.7)" }
        );
      }

      if (descriptionRef.current) {
        tl.fromTo(descriptionRef.current,
          { opacity: 0, x: -40, y: 10 },
          { opacity: 1, x: 0, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      }

      const validFeatures = featuresRef.current.filter(Boolean);
      if (validFeatures.length > 0) {
        tl.fromTo(validFeatures,
          { opacity: 0, y: 30, stagger: 0.1 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
          "-=0.3"
        );
      }

      if (statsRef.current) {
        tl.fromTo(statsRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
          "-=0.2"
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, [activeDepartment]);

  const handleDepartmentChange = (index) => {
    if (index === activeDepartment) return;

    const tl = gsap.timeline();
    tl.to([imageRef.current, titleRef.current, descriptionRef.current, statsRef.current, ...featuresRef.current], {
      opacity: 0,
      x: -30,
      duration: 0.4,
      ease: "power3.in",
      stagger: 0.05
    })
    .add(() => {
      setActiveDepartment(index);
    });
  };

  // Disable hover on mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsHoverEnabled(window.innerWidth > 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (loading || departments.length === 0) return null;
  const activeDept = departments[activeDepartment];

  return (
    <section 
     
      className="relative w-full min-h-screen bg-white flex items-center px-4 lg:px-8 py-16 overflow-hidden"
    >
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100/20" />
      
      {/* Main Content Container - Reversed Layout */}
      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Right Content - Simplified */}
        <div ref={contentRef} className="relative z-10 space-y-6 lg:space-y-8 order-2 lg:order-1">
          {/* Section Header - Minimal */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${activeDept.gradient} flex items-center justify-center shadow-lg`}>
                <activeDept.icon size={20} className="text-white" />
              </div>
              <div>
                <span className="text-lg md:text-3xl font-medium uppercase tracking-widest text-gray-500">
                Engineering Departments
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${activeDept.bgColor} animate-pulse`} />
                  <span className="text-xs text-gray-400">Technical Excellence</span>
                </div>
              </div>
            </div>
            
            <div ref={titleRef}>
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight" >
                {activeDept.title}
              </h1>
            </div>
            
            <p ref={descriptionRef} className="text-base text-gray-600 leading-relaxed">
              {activeDept.description}
            </p>
          </div>

          {/* Simplified Features */}
          <div className="grid grid-cols-2 gap-3">
            {activeDept.features.map((feature, index) => {
              const IconComponent = activeDept.icons[index];
              return (
                <div 
                  key={feature}
                  ref={el => featuresRef.current[index] = el}
                  className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300"
                >
                  <div className={`p-1.5 rounded-md ${activeDept.bgColor} bg-opacity-10`}>
                    <IconComponent size={16} className={`${activeDept.textColor}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </div>
              );
            })}
          </div>

          {/* Compact Stats */}
          <div ref={statsRef} className="grid grid-cols-4 gap-4 p-4 bg-white border border-gray-100 rounded-xl">
            {Object.entries(activeDept.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className={`text-xl font-bold ${activeDept.textColor} mb-1`}>
                  {value}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-500">
                  {key}
                </div>
              </div>
            ))}
          </div>

          {/* Minimal Navigation */}
          <div className="flex gap-3">
            {departments.map((dept, index) => (
              <button
                key={dept.id}
                onClick={() => handleDepartmentChange(index)}
                className={`flex-1 p-3 rounded-lg transition-all duration-300 border ${
                  activeDepartment === index 
                    ? `${dept.bgColor} text-white border-transparent shadow-lg` 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-semibold">{dept.shortTitle}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Simple Controls */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Auto-play</span>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isAutoPlaying 
                  ? `${activeDept.bgColor} text-white` 
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>
        </div>

        {/* Enhanced Right Image - More Prominent */}
        <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden order-1 lg:order-2 group">
          <img
            ref={imageRef}
            src={activeDept.image}
            alt={activeDept.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent`} />
          
          {/* Department Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/90 shadow-lg`}>
            <span className={`text-xs font-bold ${activeDept.textColor}`}>
              {activeDept.shortTitle}
            </span>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className={`h-full ${activeDept.bgColor} transition-all duration-1000 ease-out`}
                style={{ width: isAutoPlaying ? '100%' : '0%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringDepartments;