import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Drone, 
  Car, 
  Code2, 
  Zap, 
  Users, 
  Trophy, 
  Calendar,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  PlayCircle,
  BookOpen,
  GraduationCap,
  Target,
  TrendingUp
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TechPrograms = () => {
  const sectionRef = useRef(null);
  const programsRef = useRef([]);
  const headerRef = useRef(null);
  const statsRef = useRef([]);
  const featureRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { 
            opacity: 0, 
            y: 80,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Enhanced programs animation with stagger
      const validPrograms = programsRef.current.filter(Boolean);
      validPrograms.forEach((program, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: program,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        tl.fromTo(program,
          { 
            opacity: 0, 
            y: 100,
            rotationY: 15,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.15
          }
        );

        // Animate inner elements sequentially
        const icon = program.querySelector('.program-icon');
        const title = program.querySelector('h3');
        const features = program.querySelectorAll('.feature-item');

        if (icon) {
          tl.fromTo(icon,
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
            "-=0.4"
          );
        }

        if (title) {
          tl.fromTo(title,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3"
          );
        }

        if (features && features.length > 0) {
          tl.fromTo(features,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
            "-=0.2"
          );
        }
      });

      // Stats counter animation
      const validStats = statsRef.current.filter(Boolean);
      validStats.forEach((stat, index) => {
        gsap.fromTo(stat,
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
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animate numbers counting up
        const number = stat.querySelector('.stat-number');
        if (number) {
          const target = parseInt(number.textContent);
          if (!isNaN(target)) {
            gsap.to({}, {
              duration: 2,
              delay: 0.5 + index * 0.2,
              onUpdate: function() {
                const progress = this.progress();
                number.textContent = Math.floor(target * progress) + (stat.textContent.includes('%') ? '%' : '+');
              },
              scrollTrigger: {
                trigger: stat,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            });
          }
        }
      });

      // Hover animations
      validPrograms.forEach((program) => {
        const handleEnter = () => {
          gsap.to(program, {
            y: -10,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
          });
          
          const icon = program.querySelector('.program-icon');
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        };

        const handleLeave = () => {
          gsap.to(program, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
          
          const icon = program.querySelector('.program-icon');
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3
            });
          }
        };

        program.addEventListener('mouseenter', handleEnter);
        program.addEventListener('mouseleave', handleLeave);
        
        // Clean up listeners is handled by ctx.revert()
      });

    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const programs = [
    {
      id: 1,
      title: "Drone Technology",
      icon: Drone,
      description: "Master the fundamentals of drone technology, from assembly to flight programming.",
      duration: "4 Weeks",
      level: "Beginner to Intermediate",
      features: [
        "Hands-on drone assembly workshop",
        "Flight simulation training",
        "Aerial photography & videography",
        "Drone programming with Python"
      ],
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1000&q=80",
      price: "₹12,999",
      originalPrice: "₹16,999",
      discount: "23% off",
      color: "#00BA59",
      status: "Enrolling Now",
      students: "124",
      iconBg: "from-green-500 to-emerald-600"
    },
    {
      id: 2,
      title: "EV Manufacturing & Embedded Systems",
      icon: Car,
      description: "Comprehensive training in electric vehicle technology and embedded systems design.",
      duration: "4 Weeks",
      level: "Intermediate to Advanced",
      features: [
        "EV architecture & components",
        "Battery management systems",
        "Embedded C programming",
        "PCB design & fabrication"
      ],
      image: "https://images.unsplash.com/photo-1593941707882-a5bba53377fe?auto=format&fit=crop&w=1000&q=80",
      price: "₹14,999",
      originalPrice: "₹19,999",
      discount: "25% off",
      color: "#1D78FD",
      status: "Starting Soon",
      students: "89",
      iconBg: "from-blue-500 to-cyan-600"
    },
    {
      id: 3,
      title: "Advanced Coding Program",
      icon: Code2,
      description: "Intensive coding bootcamp focusing on advanced algorithms and modern development practices.",
      duration: "4 Weeks",
      level: "Intermediate to Advanced",
      features: [
        "Data structures & algorithms",
        "Web & mobile app development",
        "Cloud deployment & DevOps",
        "AI & machine learning basics"
      ],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
      price: "₹11,999",
      originalPrice: "₹15,999",
      discount: "25% off",
      color: "#FF6463",
      status: "Limited Seats",
      students: "156",
      iconBg: "from-red-500 to-pink-600"
    }
  ];

  const stats = [
    { number: "2500", label: "Students Trained", icon: Users, color: "#00BA59" },
    { number: "94", label: "Placement Rate", icon: Trophy, color: "#FECF54" },
    { number: "50", label: "Industry Partners", icon: Target, color: "#1D78FD" },
    { number: "100", label: "Projects Completed", icon: CheckCircle, color: "#8B5CF6" }
  ];

  const addToRefs = (el) => {
    if (el && !programsRef.current.includes(el)) {
      programsRef.current.push(el);
    }
  };

  const addToStatsRefs = (el) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Enhanced Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-500/30">
            <Zap className="w-4 h-4" />
            Future-Ready Tech Education
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
              Advanced Tech Programs
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Intensive, project-based programs designed to accelerate your career in emerging technologies. 
            Learn from industry experts and build real-world projects.
          </p>
        </div>

        {/* Main Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <div
              key={program.id}
              ref={addToRefs}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 hover:from-gray-700 hover:to-gray-800 transition-all duration-500 border border-gray-700/50 hover:border-gray-600/50 cursor-pointer"
            >
              {/* Program Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${program.iconBg}  program-icon`}>
                    <program.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span 
                      className="text-xs font-semibold px-3 py-1 rounded-full border"
                      style={{ 
                        color: program.color,
                        borderColor: `${program.color}40`,
                        backgroundColor: `${program.color}10`
                      }}
                    >
                      {program.status}
                    </span>
                  </div>
                </div>
               
              </div>

              {/* Program Content */}
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                {program.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {program.description}
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                {program.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 feature-item">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: program.color }} />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Program Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-700/50">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {program.duration}
                  </div>
                 
                </div>
                
                <button 
                  className="group/btn flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:gap-3"
                  style={{ backgroundColor: program.color }}
                >
                  Enroll Now
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover Effect */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ 
                  background: `linear-gradient(45deg, ${program.color}10, transparent)`,
                  boxShadow: `0 20px 40px ${program.color}20`
                }}
              />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={addToStatsRefs}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-center border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              
              <div className="stat-number text-3xl font-bold text-white mb-2">
                {stat.number}{stat.label.includes('Rate') ? '%' : '+'}
              </div>
              
              <div className="text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
       
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
  );
};

export default TechPrograms;