"use client";
import React, { useState, useRef, useEffect ,forwardRef} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Colors from your brand palette
const colors = {
  green: "#00BA59",
  red: "#FF6463",
  yellow: "#FECF54",
  blue: "#1D78FD",
  dark: "#1a202c",
  light: "#f7fafc"
};

// Fonts
const headingFont = { fontFamily: "'Merriweather', serif" };
const bodyFont = { fontFamily: "'Lato', sans-serif" };

import { useQuery } from "@tanstack/react-query";
import { contentService } from "../api";

const NoticeBoard = forwardRef((props, ref) => {
  const { data: announcements = [], isLoading: loading } = useQuery({
    queryKey: ['notices'],
    queryFn: async () => {
      const res = await contentService.getNotices();
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      return data.map((n, idx) => ({
        img: n.image_url || "/events/event1.jpeg",
        title: n.title,
        date: new Date(n.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        description: n.content,
        color: [colors.green, colors.blue, colors.red, colors.yellow][idx % 4],
      }));
    }
  });

  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    if (announcements.length > 0 && !featured) {
      setFeatured(announcements[0]);
    }
  }, [announcements, featured]);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const dividerRef = useRef(null);
  const featuredRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRefs = useRef([]);

  useEffect(() => {
    if (!featured) return;
    const ctx = gsap.context(() => {
      // Section entrance animation
      if (sectionRef.current) {
        gsap.fromTo(sectionRef.current,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Subheading animation
      if (subheadingRef.current) {
        gsap.fromTo(subheadingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subheadingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Heading letters animation
      const letters = headingRef.current?.querySelectorAll(".letter");
      if (letters && letters.length > 0) {
        gsap.fromTo(letters,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.03,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Divider animation
      if (dividerRef.current) {
        gsap.fromTo(dividerRef.current,
          { width: 0, opacity: 0 },
          {
            width: "120px",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: dividerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Featured section animation
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Cards animation with stagger
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        validCards.forEach((card, index) => {
          gsap.fromTo(card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }

    }, sectionRef.current);

    return () => ctx.revert();
  }, [featured]);

  const splitLetters = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="letter inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  const handleCardHover = (e, item) => {
    gsap.to(e.currentTarget, {
      y: -5,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
    
    const image = e.currentTarget.querySelector('img');
    gsap.to(image, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
    
    const image = e.currentTarget.querySelector('img');
    gsap.to(image, {
      scale: 1,
      duration: 0.3
    });
  };

  const handleFeaturedClick = (item) => {
    // Animate out current featured
    gsap.to(featuredRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setFeatured(item);
        // Animate in new featured
        setTimeout(() => {
          gsap.fromTo(featuredRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out"
            }
          );
        }, 50);
      }
    });
  };

  if (loading || !featured) return null;

  return (
    <div ref={(el) => {
      sectionRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) ref.current = el;
    }} id="news-events" className="bg-white py-20 border-t border-b border-gray-100" style={bodyFont}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p 
            ref={subheadingRef}
            className="text-blue-600 uppercase tracking-widest text-sm font-semibold mb-4"
            style={{ color: colors.blue }}
          >
            Academic Calendar
          </p>

          <h2
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            style={headingFont}
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Announcements & News
            </span>
          </h2>

          <div 
            ref={dividerRef}
            className="w-32 h-0.5 bg-gray-300 mx-auto"
          ></div>
        </div>

        {/* Featured Section */}
        <div
          key={featured.title}
          ref={featuredRef}
          className="mb-16 border border-gray-200 "
        >
          <div className="flex flex-col lg:flex-row ">
            {/* Image Section */}
            <div className="lg:w-2/3 relative group">
              <div className="absolute top-6 left-6 z-20">
                <span 
                  className="text-5xl font-bold text-white px-4 py-3"
                  style={{ 
                    backgroundColor: featured.color,
                    fontFamily: "'Merriweather', serif"
                  }}
                >
                  01
                </span>
              </div>
              
              <div className="absolute top-6 right-6 z-20">
                <span 
                  className="text-white bg-black/40 px-3 py-1 text-sm font-semibold tracking-wide uppercase"
                  style={bodyFont}
                >
                  Featured
                </span>
              </div>
              
              <img
                src={featured.img}
                alt={featured.title}
                className="w-full h-80 lg:h-[500px] object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <div 
                    className="w-2 h-2 mr-2"
                    style={{ backgroundColor: featured.color }}
                  ></div>
                  <span className="text-sm font-semibold tracking-wider">Active Announcement</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/3 bg-white p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-gray-200">
              <div className="h-full flex flex-col justify-center">
                <div className="mb-4">
                  <span 
                    className="text-sm font-semibold tracking-wider uppercase px-2 py-1 border"
                    style={{ 
                      color: featured.color,
                      borderColor: featured.color
                    }}
                  >
                    Important Update
                  </span>
                </div>
                
                <h3
                  className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight"
                  style={headingFont}
                >
                  {featured.title}
                </h3>
                
                <div className="flex items-center mb-4 text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium" style={{ color: featured.color }}>
                    {featured.date}
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {featured.description}
                </p>
                
                <button 
                  className="inline-flex items-center px-5 py-2 font-semibold text-white transition-colors duration-200"
                  style={{ backgroundColor: featured.color }}
                >
                  Read Full Announcement
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((item, idx) => (
            <div
              key={item.title}
              ref={el => cardsRef.current[idx] = el}
              className="group relative bg-white border border-gray-200 cursor-pointer transition-all duration-300"
              onClick={() => handleFeaturedClick(item)}
              onMouseEnter={(e) => handleCardHover(e, item)}
              onMouseLeave={handleCardLeave}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48">
                <div 
                  className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: item.color }}
                >
                  {(idx + 1).toString().padStart(2, "0")}
                </div>
                
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: `${item.color}20` }}
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200"
                  style={headingFont}
                >
                  {item.title}
                </h3>
                
                <div className="flex items-center text-gray-600 text-sm mb-3 bg-gray-50 p-2">
                  <svg className="w-3 h-3 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ color: item.color }} className="font-medium">
                    {item.date}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <button 
                  className="w-full text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 py-2 border border-gray-200 hover:border-blue-500 hover:text-blue-600"
                >
                  View Full Announcement
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Hover Border */}
              <div 
                className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ borderColor: item.color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Lato:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
});

export default NoticeBoard;