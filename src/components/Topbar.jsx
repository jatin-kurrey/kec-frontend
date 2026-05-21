"use client";
import React from "react";
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin } from "lucide-react";

const Topbar = () => {
  // Modern gradient colors
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white text-sm z-50 border-b border-blue-400/20 relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-400/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-3 sm:gap-6">
          
          {/* Left - Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center sm:text-left">
            {/* Phone */}
            <div className="flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="relative">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                  <Phone size={14} className="text-white" />
                </div>
                <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white text-xs uppercase tracking-wide">Call Us</span>
                <span className="font-bold text-cyan-200 text-sm">9285123400 / 9826130624</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="relative">
                <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-300">
                  <Mail size={14} className="text-white" />
                </div>
                <div className="absolute -inset-1 bg-green-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white text-xs uppercase tracking-wide">Email Us</span>
                <span className="font-bold text-emerald-200 text-sm truncate max-w-[200px]">krishnaengineeringcollege@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Right - Social Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:block text-xs font-medium text-gray-300 mr-2 uppercase tracking-wide">Follow Us:</span>
            
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/kecbhilaioffical/" 
              className="group relative p-2 rounded-xl bg-white/5 hover:bg-blue-600/30 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Facebook size={16} className="text-blue-400 group-hover:text-white transition-colors" />
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>

            {/* Twitter */}
            <a 
              href="javascript:void(0)" 
              className="group relative p-2 rounded-xl bg-white/5 hover:bg-cyan-600/30 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <Twitter size={16} className="text-cyan-400 group-hover:text-white transition-colors" />
              <div className="absolute inset-0 bg-cyan-500/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/kec_bhilai/" 
              className="group relative p-2 rounded-xl bg-white/5 hover:bg-pink-600/30 backdrop-blur-sm border border-white/10 hover:border-pink-400/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25"
            >
              <Instagram size={16} className="text-pink-400 group-hover:text-white transition-colors" />
              <div className="absolute inset-0 bg-pink-500/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>

            {/* LinkedIn */}
            <a 
              href="javascript:void(0)" 
              className="group relative p-2 rounded-xl bg-white/5 hover:bg-blue-700/30 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-600/25"
            >
              <Linkedin size={16} className="text-blue-300 group-hover:text-white transition-colors" />
              <div className="absolute inset-0 bg-blue-600/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>

            {/* YouTube */}
            <a 
              href="javascript:void(0)" 
              className="group relative p-2 rounded-xl bg-white/5 hover:bg-red-600/30 backdrop-blur-sm border border-white/10 hover:border-red-400/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
            >
              <Youtube size={16} className="text-red-400 group-hover:text-white transition-colors" />
              <div className="absolute inset-0 bg-red-500/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>
          </div>
        </div>

        {/* Mobile optimized contact bar */}
        <div className="sm:hidden border-t border-white/10 mt-2 pt-3 pb-2 px-4">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={12} className="text-green-400" />
              <span className="text-xs font-semibold text-green-200">9285123400</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Mail size={12} className="text-blue-400" />
              <span className="text-xs font-semibold text-blue-200 truncate max-w-[120px]">krishnaengineeringcollege@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated underline effect */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
    </div>
  );
};

export default Topbar;