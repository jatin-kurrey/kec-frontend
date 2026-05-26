import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Star, 
  Award, 
  TrendingUp, 
  Users, 
  Briefcase, 
  MapPin, 
  Calendar,
  ArrowRight,
  ArrowLeft,
  Quote,
  GraduationCap,
  Building,
  FileText
} from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { alumniService } from "../api";

gsap.registerPlugin(ScrollTrigger);

const AlumniSuccessStories = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);
  const featuredRef = useRef(null);
  const statsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [visibleCards, setVisibleCards] = useState(2);

  const { data: alumniData } = useQuery({
    queryKey: ['alumni-stories'],
    queryFn: async () => {
      const response = await alumniService.getAll();
      return Array.isArray(response.data) ? response.data : (response.data?.data || []);
    },
    retry: 1
  });

  const { data: statsData } = useQuery({
    queryKey: ['alumni-stats'],
    queryFn: async () => {
      const response = await alumniService.getStats();
      return Array.isArray(response.data) ? response.data : (response.data?.data || []);
    },
    retry: 1
  });

  const fallbackAlumniStories = [
    {
      id: 1,
      name: "SAZIYA NAAZ",
      graduationYear: "2025",
      degree: "CSE",
      currentPosition: "Software Engineer at Codenicely",
      achievement: "Secured placement in Codenicely before graduation.",
      image: "/alumini/SAZIYA NAAZ.png",
      color: "#22c55e",
      quote: "My journey at KEC gave me confidence to crack Codenicely interviews.",
      stats: { year: "2025" },
      companyLogo: "💻",
      featured: true,
    },
    {
      id: 2,
      name: "TARA CHAND DEWANGAN",
      graduationYear: "2025",
      degree: "CSE",
      currentPosition: "Software Engineer at Sthanve Software",
      achievement: "Placed at Sthanve Software during campus drive.",
      image: "/alumini/TARA CHAND DEWANGAN.png",
      color: "#16a34a",
      quote: "Faculty guidance helped me grab a role at Sthanve Software.",
      stats: { year: "2025" },
      companyLogo: "🚀",
      featured: false,
    },
    {
      id: 3,
      name: "NIDHI CHANDRAWANDI",
      graduationYear: "2024",
      degree: "CSE",
      currentPosition: "Engineer at Nullclass Technology",
      achievement: "Started my professional journey at Nullclass Technology.",
      image: "/alumini/nidhi chandrawanshi.png",
      color: "#15803d",
      quote: "Hands-on projects at KEC shaped my problem-solving skills.",
      stats: { year: "2024" },
      companyLogo: "⚡",
      featured: false,
    },
    {
      id: 4,
      name: "BHUPENDRA",
      graduationYear: "2022",
      degree: "Civil",
      currentPosition: "Engineer at Bodex System Pvt Ltd",
      achievement: "Contributed to key projects at Bodex System Pvt Ltd after graduation.",
      image: "/alumini/bhupendra.png",
      color: "#166534",
      quote: "The Civil department gave me industry-level exposure.",
      stats: { year: "2022" },
      companyLogo: "🏗️",
      featured: false,
    },
    {
      id: 5,
      name: "NUPUR",
      graduationYear: "2022",
      degree: "CSE",
      currentPosition: "Consultant at Linterbiz Consulting Pvt Ltd",
      achievement: "Joined Linterbiz Consulting Pvt Ltd as a key team member.",
      image: "/alumini/nupur.png",
      color: "#14532d",
      quote: "The analytical skills I developed at KEC helped me excel in consulting.",
      stats: { year: "2022" },
      companyLogo: "💼",
      featured: false,
    },
    {
      id: 6,
      name: "TRILOK DHRUW",
      graduationYear: "2022",
      degree: "Electrical Engineering",
      currentPosition: "Software Developer at Prixso Software",
      achievement: "Transitioned from Electrical Engineering to a successful career in software development.",
      image: "/alumini/trilok dhruw.png",
      color: "#22c55e",
      quote: "KEC's strong technical foundation helped me pivot into the IT industry confidently.",
      stats: { year: "2022" },
      companyLogo: "💡",
      featured: false,
    },
    {
      id: 7,
      name: "YURAJ KHARE",
      graduationYear: "2020",
      degree: "Computer Science & Engineering",
      currentPosition: "Software Engineer at Empyra Software Solutions",
      achievement: "Started career as a full-stack developer at a reputed IT company.",
      image: "/alumini/yuraj Khare.png",
      color: "#16a34a",
      quote: "KEC gave me the technical foundation and confidence to thrive in the IT industry.",
      stats: { year: "2020" },
      companyLogo: "💻",
      featured: false,
    },
    {
      id: 8,
      name: "SANJAY KUMAR",
      graduationYear: "2022",
      degree: "Electrical Engineering",
      currentPosition: "Project Engineer at Kalpataru Power Transmission Ltd.",
      achievement: "Successfully contributed to multiple national infrastructure projects.",
      image: "/alumini/sanjay kumar.png",
      color: "#15803d",
      quote: "The practical training and industry exposure at KEC laid the foundation for my career.",
      stats: { year: "2022" },
      companyLogo: "🏗️",
      featured: false,
    }
  ];

  const alumniStories = Array.isArray(alumniData) && alumniData.length > 0
    ? alumniData.map((item, index) => {
        const branchColor = index % 5 === 0 ? "#22c55e" : index % 5 === 1 ? "#16a34a" : index % 5 === 2 ? "#15803d" : index % 5 === 3 ? "#166534" : "#14532d";
        const position = item.currentPosition || item.designation || "Software Engineer";
        const companyName = item.company || "Global";
        return {
          id: item.id || index + 1,
          name: item.name || "Alumni",
          graduationYear: item.batch || "2025",
          degree: item.degree || item.branch || "CSE",
          currentPosition: `${position} at ${companyName}`,
          achievement: item.story || (Array.isArray(item.achievements) && item.achievements.length > 0 ? item.achievements[0] : "Secured placement before graduation."),
          image: item.image_url || item.photo || item.image || "/alumini/SAZIYA NAAZ.png",
          color: branchColor,
          quote: item.story || "KEC gave me the foundation for success.",
          stats: { year: item.batch || "2025" },
          companyLogo: index % 3 === 0 ? "💻" : index % 3 === 1 ? "🚀" : "⚡",
          featured: item.is_featured,
        };
      })
    : fallbackAlumniStories;

  const targets = {
    alumni: parseInt(Array.isArray(statsData) && statsData.length > 0 ? statsData.find(s => s.label?.toLowerCase().includes('alumni'))?.value : 0) || 50000,
    satisfaction: parseInt(Array.isArray(statsData) && statsData.length > 0 ? statsData.find(s => s.label?.toLowerCase().includes('satisfaction'))?.value : 0) || 90,
    salary: parseInt(Array.isArray(statsData) && statsData.length > 0 ? statsData.find(s => s.label?.toLowerCase().includes('salary'))?.value : 0) || 85,
    countries: parseInt(Array.isArray(statsData) && statsData.length > 0 ? statsData.find(s => s.label?.toLowerCase().includes('countries'))?.value : 0) || 150
  };

  const [counters, setCounters] = useState({
    alumni: 0,
    satisfaction: 0,
    salary: 0,
    countries: 0
  });

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const featuredAlumni = alumniStories.find(alumni => alumni.featured) || alumniStories[0];
  const sliderAlumni = alumniStories;

  // Counter animation
  useEffect(() => {

    const animateCounters = () => {
      Object.keys(targets).forEach(key => {
        let start = 0;
        const end = targets[key];
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
            [key]: Math.floor(start)
          }));
        }, 16);
      });
    };

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: animateCounters,
      once: true
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with stagger letters
      const heading = headerRef.current?.querySelector('h2');
      if (heading && !heading.querySelector('.letter')) {
        const letters = heading.textContent.split('');
        heading.innerHTML = letters.map(letter => 
          `<span class="letter">${letter === ' ' ? '&nbsp;' : letter}</span>`
        ).join('');
      }
      
      const letters = heading?.querySelectorAll('.letter');
      if (heading && letters && letters.length > 0) {
        gsap.fromTo(letters,
          { 
            opacity: 0, 
            y: 60,
            rotationX: -90
          },
          { 
            opacity: 1, 
            y: 0,
            rotationX: 0,
            duration: 1,
            stagger: 0.03,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Featured card staggered animation
      const featuredElements = featuredRef.current?.querySelectorAll('.featured-element');
      if (featuredElements) {
        gsap.fromTo(featuredElements,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Enhanced hover animations for desktop only
      if (window.innerWidth >= 768) {
        const featuredCard = featuredRef.current;
        if (featuredCard) {
          featuredCard.addEventListener('mouseenter', () => {
            gsap.to(featuredCard, {
              y: -10,
              scale: 1.02,
              duration: 0.4,
              ease: "power2.out"
            });
            
            gsap.to(featuredCard.querySelectorAll('.stat-item'), {
              y: -5,
              scale: 1.05,
              duration: 0.3,
              stagger: 0.1,
              ease: "power2.out"
            });
          });

          featuredCard.addEventListener('mouseleave', () => {
            gsap.to(featuredCard, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
            
            gsap.to(featuredCard.querySelectorAll('.stat-item'), {
              y: 0,
              scale: 1,
              duration: 0.3,
              stagger: 0.1
            });
          });
        }

        // Enhanced slider card hover animations for desktop
        cardsRef.current.forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
              scale: 1.03,
              rotationY: 5,
              duration: 0.3,
              ease: "power2.out"
            });
            
            const image = card.querySelector('img');
            gsap.to(image, {
              scale: 1.1,
              duration: 0.4,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 0.3,
              ease: "power2.out"
            });
            
            const image = card.querySelector('img');
            gsap.to(image, {
              scale: 1,
              duration: 0.4
            });
          });
        });
      }

    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addToStatsRefs = (el) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % Math.ceil(sliderAlumni.length / visibleCards));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + Math.ceil(sliderAlumni.length / visibleCards)) % Math.ceil(sliderAlumni.length / visibleCards));
  };

  const getVisibleAlumni = () => {
    const startIndex = activeIndex * visibleCards;
    return sliderAlumni.slice(startIndex, startIndex + visibleCards);
  };

  const Counter = ({ value, suffix = "" }) => {
    return <span>{value.toLocaleString()}{suffix}</span>;
  };

  if (!featuredAlumni) return null;

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-8 md:py-16 px-4 bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-soft-light filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-soft-light filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-lime-500 rounded-full mix-blend-soft-light filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-green-300 uppercase tracking-widest mb-3 md:mb-4 bg-green-900/30 px-3 md:px-4 py-1 md:py-2 rounded-full border border-green-700/50">
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
            Trailblazers & Innovators
          </span>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4">
            <span className="bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
              Alumni Success 
            </span>
          </h2>
          
          <p className="text-base md:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed px-4">
            Discover how our graduates are making waves across industries worldwide. 
            Their journeys from campus to career inspire the next generation of leaders.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Left Side - Featured Alumni Card */}
          <div className="lg:w-2/5">
            <div 
              ref={featuredRef}
              className="featured-card group relative bg-slate-800 rounded-2xl md:rounded-3xl transition-all duration-500 overflow-hidden cursor-pointer h-full border border-green-800/30"
              style={{ 
                borderLeft: `6px solid ${featuredAlumni.color}`,
                background: `linear-gradient(135deg, rgb(30 41 59) 0%, ${featuredAlumni.color}15 100%)`
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: featuredAlumni.color }}
              />

              <div className="relative p-4 md:p-6 lg:p-8 z-10 h-full flex flex-col">
                {/* Header Section */}
                <div className="featured-element flex items-center justify-between mb-4 md:mb-6">
                  <div 
                    className="px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold text-white flex items-center gap-1 md:gap-2"
                    style={{ backgroundColor: featuredAlumni.color }}
                  >
                    <Star className="w-3 h-3 md:w-4 md:h-4" />
                    Featured Alumni
                  </div>
                  <div 
                    className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-lg"
                    style={{ backgroundColor: featuredAlumni.color }}
                  >
                    <Building className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Alumni Image & Info */}
                <div className="featured-element flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl md:rounded-2xl overflow-hidden border-4 border-slate-700">
                      <img
                        src={featuredAlumni.image}
                        alt={featuredAlumni.name}
                        width="96"
                        height="96"
                        loading="lazy"
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div 
                      className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                      style={{ backgroundColor: featuredAlumni.color }}
                    >
                      '{featuredAlumni.graduationYear.slice(2)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 truncate">{featuredAlumni.name}</h3>
                    <p className="text-green-200 text-sm md:text-base mb-2 truncate">{featuredAlumni.degree}</p>
                    <div 
                      className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-white truncate"
                      style={{ backgroundColor: featuredAlumni.color }}
                    >
                      <Briefcase className="w-3 h-3" />
                      <span className="truncate">{featuredAlumni.currentPosition.split(' at ')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Achievement */}
                <div className="featured-element mb-4 md:mb-6">
                  <p className="text-green-100 text-sm md:text-base leading-relaxed bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-3 md:p-4 rounded-xl border border-green-800/30">
                    {featuredAlumni.achievement}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="featured-element grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                  {Object.entries(featuredAlumni.stats).map(([key, value], index) => (
                    <div 
                      key={key} 
                      className="stat-item bg-slate-700/50 rounded-lg md:rounded-xl p-2 md:p-3 text-center shadow-sm border border-green-800/20"
                    >
                      <div 
                        className="text-base md:text-lg font-bold mb-1"
                        style={{ color: featuredAlumni.color }}
                      >
                        {value}{key === 'salary' ? 'K' : key === 'funding' ? 'M' : key === 'citations' ? 'K' : ''}
                      </div>
                      <div className="text-xs text-green-300 capitalize truncate">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Quote Section */}
                <div className="featured-element mt-auto">
                  <div className="relative bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl md:rounded-2xl p-4 md:p-6 border border-green-800/30">
                    <Quote className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-6 h-6 md:w-8 md:h-8 text-green-700" />
                    <p className="text-green-100 italic leading-relaxed text-sm md:text-base text-center">
                      "{featuredAlumni.quote}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Slider */}
          <div className="lg:w-3/5">
            <div ref={sliderRef} className="relative bg-slate-800 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 h-full border border-green-800/30">
              {/* Slider Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
                <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                  More Success Stories
                </h3>
                
                {/* Enhanced Slider Controls */}
                <div className="flex items-center space-x-3 md:space-x-4 w-full sm:w-auto justify-between sm:justify-normal">
                  <span className="text-sm text-green-300 font-medium whitespace-nowrap">
                    {activeIndex + 1} / {Math.ceil(sliderAlumni.length / visibleCards)}
                  </span>
                  <div className="flex space-x-2 md:space-x-3">
                    <button 
                      onClick={prevSlide}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border-2 border-green-700 flex items-center justify-center hover:border-green-400 hover:bg-green-900/30 transition-all duration-300 group"
                    >
                      <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-green-400 group-hover:text-green-300" />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border-2 border-green-700 flex items-center justify-center hover:border-emerald-400 hover:bg-emerald-900/30 transition-all duration-300 group"
                    >
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-green-400 group-hover:text-emerald-300" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Slider Content */}
              <div className="space-y-4 md:space-y-6">
                {getVisibleAlumni().map((alumni, index) => (
                  <div
                    key={alumni.id}
                    ref={addToRefs}
                    className="group relative bg-gradient-to-r from-slate-700/50 to-slate-800 rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-300 cursor-pointer border border-green-800/30 hover:border-green-500/50 shadow-sm"
                    style={{ borderLeft: `4px solid ${alumni.color}` }}
                  >
                    <div className="flex items-center space-x-3 md:space-x-4">
                      {/* Image */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden border-4 border-slate-700 shadow-lg">
                          <img
                            src={alumni.image}
                            alt={alumni.name}
                            width="64"
                            height="64"
                            loading="lazy"
                            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div 
                          className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 px-1 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-bold text-white shadow-md"
                          style={{ backgroundColor: alumni.color }}
                        >
                          '{alumni.graduationYear.slice(2)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 md:mb-3 gap-2">
                          <div className="min-w-0">
                            <h4 className="text-base md:text-lg font-bold text-white mb-1 truncate">{alumni.name}</h4>
                            <p className="text-xs md:text-sm text-green-200 flex items-center gap-1 truncate">
                              <GraduationCap className="w-3 h-3 flex-shrink-0" />
                              {alumni.degree}
                            </p>
                          </div>
                          <div 
                            className="px-2 md:px-3 py-1 rounded-full text-xs font-semibold text-white flex-shrink-0 self-start sm:self-center truncate max-w-[120px] md:max-w-none"
                            style={{ backgroundColor: alumni.color }}
                          >
                            <span className="truncate">{alumni.currentPosition.split(' at ')[0]}</span>
                          </div>
                        </div>
                        
                        <p className="text-xs md:text-sm text-green-100 mb-2 md:mb-3 line-clamp-2">{alumni.achievement}</p>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-xs text-green-300 flex items-center gap-1 whitespace-nowrap">
                            <Building className="w-3 h-3" />
                            {alumni.currentPosition.split(' at ')[1] || 'Global'}
                          </span>
                          <div className="flex space-x-1 md:space-x-2 flex-wrap gap-1">
                            {Object.entries(alumni.stats).slice(0, 2).map(([key, value]) => (
                              <div key={key} className="text-xs bg-slate-700/50 px-2 py-1 rounded-full border border-green-800/30 flex items-center gap-1">
                                <FileText className="w-3 h-3" style={{ color: alumni.color }} />
                                <span className="font-semibold" style={{ color: alumni.color }}>
                                  {value}{key === 'salary' ? 'K' : key === 'funding' ? 'M' : ''}
                                </span> 
                                <span className="hidden sm:inline text-green-200">{key}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Bar with Green Theme */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-8 md:mt-12">
          {[
    { value: counters.alumni, label: "Alumni Worldwide", color: "#22c55e", icon: Users },
    { value: counters.satisfaction, label: "Career Satisfaction", color: "#16a34a", icon: TrendingUp },
    { value: counters.salary, label: "Average Salary", color: "#15803d", icon: Award },
    { value: counters.countries, label: "Countries Represented", color: "#166534", icon: MapPin }
  ].map((stat, index) => (
            <div 
              key={index}
              ref={addToStatsRefs}
              className="group relative rounded-xl text-center p-4 md:p-5 border border-green-800/30 hover:border-green-600/50 transition-all duration-300 bg-slate-800/50 backdrop-blur-sm"
            >
              {/* Hover Effect Line */}
              <div 
                className="absolute top-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: stat.color }}
              />
              
              {/* Icon Container */}
              <div className="relative mb-3 md:mb-4">
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 mx-auto transition-transform duration-300 group-hover:scale-110 rounded-xl"
                  style={{ 
                    backgroundColor: `${stat.color}15`,
                    border: `2px solid ${stat.color}30`
                  }}
                >
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: stat.color }} />
                </div>
              </div>
              
              {/* Counter Value */}
              <div 
                className="text-2xl md:text-3xl font-bold mb-1 transition-colors duration-300"
                style={{ color: stat.color }}
              >
                <Counter value={stat.value} suffix={stat.label.includes('Salary') ? 'K' : stat.label.includes('Satisfaction') ? '%' : '+'} />
              </div>
              
              {/* Label */}
              <div className="text-xs md:text-sm text-green-300 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
              
              {/* Background Pattern on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-xl"
                style={{ backgroundColor: stat.color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      ` }} />
    </section>
  );
};

export default AlumniSuccessStories;