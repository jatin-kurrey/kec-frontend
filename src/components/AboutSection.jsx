import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CampusLife = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const headerRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation on scroll
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
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Card animations on scroll with stagger
      const validCards = cardRefs.current.filter(Boolean);
      if (validCards.length > 0) {
        validCards.forEach((card, index) => {
          gsap.fromTo(card,
            { 
              opacity: 0, 
              y: 100,
              rotationY: 20,
              scale: 0.8
            },
            {
              opacity: 1,
              y: 0,
              rotationY: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }

      // CTA button animation on scroll
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, 
          { 
            opacity: 0, 
            y: 60,
            scale: 0.8
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 0.8, 
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Hover animations with 3D effect (unchanged)
      cardRefs.current.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            rotationY: 5,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
          });
          
          const image = card.querySelector('img');
          const number = card.querySelector('.card-number');
          
          gsap.to(image, {
            scale: 1.1,
            duration: 0.4,
            ease: "power2.out"
          });
          
          gsap.to(number, {
            scale: 1.1,
            backgroundColor: card.dataset.color,
            duration: 0.3
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
          
          const image = card.querySelector('img');
          const number = card.querySelector('.card-number');
          
          gsap.to(image, {
            scale: 1,
            duration: 0.4
          });
          
          gsap.to(number, {
            scale: 1,
            duration: 0.3
          });
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const campusActivities = [
    {
      id: 1,
      title: "Student Clubs",
      image: "/campus/drone.jpeg",
      color: "#00BA59",
      description: "Join over 50 student-led organizations and clubs spanning various interests"
    },
    {
      id: 2,
      title: "Sports & Fitness",
      image: "/campus/sports.jpeg",
      color: "#FF6463",
      description: "State-of-the-art facilities for all athletic pursuits and wellness programs",
      featured: true
    },
    {
      id: 3,
      title: "Academic Events",
      image: "/campus/Academic.jpeg",
      color: "#FECF54",
      description: "Workshops, seminars, and academic conferences with industry leaders"
    },
    {
  id: 4,
  title: "Library",
  image: "/campus/Library.jpeg",
  color: "#1D78FD",
  description: "A vast collection of academic resources and quiet study spaces to support learning and research"
},

    {
      id: 5,
      title: "Cultural Festivals",
      image: "/campus/Cultural.jpeg",
      color: "#00BA59",
      description: "Celebrate diversity with cultural events and international festivals"
    }
  ];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const getGridClass = (index, featured) => {
    if (featured) return "lg:col-span-2 lg:row-span-2";
    if (index === 0 || index === 2) return "lg:col-span-1";
    return "lg:col-span-1";
  };

  const getHeightClass = (featured) => {
    return featured ? "h-full" : "h-80";
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-24 px-4 bg-white"
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      <div className="">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">

        <p className="text-sm text-blue-600 uppercase tracking-widest mb-2">
    Life at KEC
  </p>

  
          <h2 
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            style={{ fontFamily: "'Merriweather', serif" }}
            
          >
            Campus Life
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover a vibrant community where learning extends beyond the classroom. 
            Experience unforgettable moments and build lifelong connections.
          </p>
        </div>

        {/* Grid Layout - 2-1-2 Pattern */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {campusActivities.map((activity, index) => (
            <div
              key={activity.id}
              ref={addToRefs}
              data-color={activity.color}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer transform perspective-1000 ${getGridClass(index, activity.featured)}`}
            >
              <div className={`relative ${getHeightClass(activity.featured)} w-full`}>
                {/* Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transform transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: `linear-gradient(45deg, ${activity.color}20, transparent)` 
                    }}
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  {/* Number Badge */}
                  <div 
                    className="card-number absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white/20 transition-all duration-300"
                    style={{ backgroundColor: `${activity.color}80` }}
                  >
                    0{index + 1}
                  </div>

                  {/* Content */}
                  <div className="card-content transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center mb-3">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: activity.color }}
                      />
                      <span 
                        className="text-sm font-semibold tracking-wider uppercase"
                        style={{ color: activity.color }}
                      >
                        Campus Life
                      </span>
                    </div>
                    
                    <h3 
                      className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight"
                      style={{ fontFamily: "'Merriweather', serif" }}
                    >
                      {activity.title}
                    </h3>
                    
                    <p className="text-white/90 text-sm lg:text-base leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {activity.description}
                    </p>
                    
                    <button 
                      className="inline-flex items-center px-5 py-2.5 rounded-full font-semibold text-white border-2 border-white/30 hover:border-white/60 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 hover:pl-6"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      Explore
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Hover Border */}
                <div 
                  className="absolute inset-0 border-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{ 
                    borderColor: activity.color,
                    boxShadow: `inset 0 0 0 3px ${activity.color}`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      
        
      </div>



    </section>
  );
};

export default CampusLife;