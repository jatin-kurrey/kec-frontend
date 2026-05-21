"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause, Calendar, User } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Hero slides
const slides = [
  {
    title: "Krishna Engineering College: Excellence in Technical Education",
    description: "KEC Bhilai has been shaping future engineers with strong academic foundations, modern laboratories, and a focus on innovation and research.",
    image: "/herosection/building.jpg",
    author: "KEC Editorial Team",
    readTime: "2 min read",
    badge: "Featured"
  },
  {
    title: "Student Achievements in National Level Competitions",
    description: "KEC students consistently excel in national hackathons, coding contests, and technical fests, bringing laurels to the institution.",
    image: "https://www.kecbhilai.com/images/slider_img3.jpg",
    author: "Campus News",
    readTime: "3 min read",
    badge: "Achievements"
  },
  {
    title: "Industry Partnerships Driving Placements",
    description: "With strong collaborations with top companies, KEC Bhilai ensures excellent placement opportunities for graduating students every year.",
    image: "https://www.kecbhilai.com/images/slider_img4.jpg",
    author: "Placement Cell",
    readTime: "4 min read",
    badge: "Placements"
  },
];

const fadeImgVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 1.2, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  },
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const textItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  },
};

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative w-full h-screen max-h-[580px] min-h-[400px] overflow-hidden bg-gray-900">
      <Swiper
        modules={[Navigation, Autoplay, Pagination, EffectFade]}
        navigation={{
          nextEl: ".hero-next-btn",
          prevEl: ".hero-prev-btn",
        }}
        pagination={{
          clickable: true,
          el: ".hero-pagination",
          bulletClass: "hero-bullet",
          bulletActiveClass: "hero-bullet-active",
        }}
        autoplay={isPlaying ? { 
          delay: 6000, 
          disableOnInteraction: false 
        } : false}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image with Enhanced Overlay */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  key={`image-${index}`}
                  src={slide.image}
                  alt={slide.title}
                  width="1920"
                  height="1080"
                  loading={index === 0 ? "eager" : "lazy"}
                  {...(index === 0 ? { fetchpriority: "high" } : {})}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial="hidden"
                  animate={activeIndex === index ? "visible" : "hidden"}
                  variants={fadeImgVariants}
                />
                
                {/* Multi-layer Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-gray-900/40" />
                
                {/* Animated Light Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-pulse" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 h-full flex items-center">
                <div className=" px-6 lg:px-12">
                  <motion.div
                    className="max-w-2xl"
                    initial="hidden"
                    animate={activeIndex === index ? "visible" : "hidden"}
                    variants={textContainerVariants}
                  >
                    {/* Badge */}
                    <motion.div
                      variants={textItemVariants}
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-white tracking-wide">
                        {slide.badge}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                      variants={textItemVariants}
                      className="text-2xl md:text-3xl lg:text-3xl font-bold text-white leading-tight mb-6"
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      variants={textItemVariants}
                      className="text-lg md:text-md text-gray-200 leading-relaxed mb-8 max-w-xl"
                    >
                      {slide.description}
                    </motion.p>

                    {/* Meta Information & CTA */}
                    <motion.div
                      variants={textItemVariants}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                    >
                      {/* Meta Info */}
                      <div className="flex items-center gap-6 text-gray-300">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span className="text-sm">{slide.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{slide.readTime}</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              
            </div>
          </SwiperSlide>
        ))}

        {/* Enhanced Controls Container */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
          {/* Play/Pause Button */}
          <button 
            onClick={toggleAutoplay}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button className="hero-prev-btn w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button className="hero-next-btn w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Custom Pagination */}
      
      </Swiper>

      {/* Enhanced Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .hero-bullet::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #ffffff, transparent);
          transition: left 0.6s ease;
        }

        .hero-bullet:hover::before {
          left: 100%;
        }

        .hero-bullet-active {
          width: 32px;
          background: #ffffff;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          transform: scale(1.1);
        }

        .hero-pagination {
          backdrop-filter: blur(10px);
          background: rgba(0, 0, 0, 0.2);
          padding: 8px 12px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .hero-bullet {
            width: 6px;
            height: 6px;
          }
          
          .hero-bullet-active {
            width: 24px;
          }
        }
      ` }} />
    </section>
  );
};

export default HeroSection;