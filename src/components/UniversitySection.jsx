"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Play } from "lucide-react";

const UniversitySection = () => {
  const marqueeText = "Welcome to Krishna Engineering College - Excellence in Education! ";
  const marqueeRef = useRef(null);
  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);

  // Infinite marquee animation
  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: { repeat: Infinity, duration: 20, ease: "linear" },
    });
  }, [controls]);

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Full width background image */}
      <img
        src="https://www.kecbhilai.com/images/slider_img2.jpg"
        alt="University"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Play Button Center */}
      <div className="absolute inset-0 flex justify-center items-center">
        <motion.button
          className="bg-white/30 backdrop-blur-md p-6 rounded-full hover:bg-white/50 transition shadow-lg"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-10 h-10 text-gray-900" />
        </motion.button>
      </div>

      {/* Infinite Outlined Marquee with Parallax */}
      <div className="absolute bottom-10 w-full overflow-hidden">
        <motion.div
          ref={marqueeRef}
          className="flex whitespace-nowrap text-6xl md:text-8xl font-bold tracking-wide uppercase"
          animate={controls}
          style={{
            WebkitTextStroke: "1px white",
            color: "transparent",
            transform: `translateY(${scrollY * 0.05}px)`, // parallax effect
          }}
        >
          {/* Two copies for seamless loop */}
          {[...Array(2)].map((_, i) => (
            <span key={i}>{marqueeText.repeat(10)}</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default UniversitySection;
