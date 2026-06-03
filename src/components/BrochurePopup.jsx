import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Download, BookOpen, Sparkles } from "lucide-react";

const BrochurePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the popup has already been dismissed in the current session
    const isDismissed = sessionStorage.getItem("kec_brochure_dismissed");
    if (!isDismissed) {
      // Auto open popup after 1.5 seconds for premium entry flow
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("kec_brochure_dismissed", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/60 backdrop-blur-md px-4">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-popupFadeIn border border-slate-100">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 z-20 rounded-full bg-slate-100 p-2.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-950 cursor-pointer"
        >
          <X size={16} className="stroke-[2.5px]" />
        </button>

        <div className="grid md:grid-cols-2">
          
          {/* Left Content */}
          <div className="flex flex-col justify-center p-8 md:p-12 text-left">
            <span className="mb-4 w-fit rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-black text-blue-900 uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
              <Sparkles size={12} className="text-amber-500 fill-current" /> Admissions Open 2026-27
            </span>
            <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-4xl tracking-tight">
              Explore Our New Prospectus
            </h2>
            <p className="mt-4 text-sm text-slate-500 font-semibold leading-relaxed">
              Get complete details about our CSVTU affiliated B.Tech programs, advanced labs (Drone & EV), placements record, student amenities, and college guidelines in one beautifully designed brochure.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              {/* Interactive 3D flipbook Viewer Page */}
              <Link
                to="/e-brochure"
                onClick={handleClose}
                className="flex items-center gap-2 rounded-xl bg-blue-900 hover:bg-blue-800 px-6 py-3.5 text-xs font-black tracking-wider uppercase text-white shadow-lg shadow-blue-900/10 transition transform hover:scale-[1.02] cursor-pointer"
              >
                <BookOpen size={14} />
                <span>View Online Spread</span>
              </Link>
              
              {/* Download original Prospectus PDF file */}
              <a
                href="/PROSPECTUS_26-27 KEC Bhilai.pdf"
                download
                onClick={handleClose}
                className="flex items-center gap-2 rounded-xl border border-slate-200 hover:border-slate-400 bg-white px-6 py-3.5 text-xs font-black tracking-wider uppercase text-slate-700 hover:bg-slate-50 transition transform hover:scale-[1.02] cursor-pointer"
              >
                <Download size={14} className="stroke-[2.5px]" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          {/* Right Preview */}
          <div className="relative hidden bg-slate-50 md:flex items-center justify-center p-8 border-l border-slate-100">
            {/* Elegant preview card with cover page of prospectus */}
            <div className="rotate-3 rounded-2xl bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 hover:rotate-0 hover:scale-105 border border-slate-100">
              <img
                src="/Broucher image/1.jpg"
                alt="KEC Prospectus Cover"
                className="h-[380px] w-auto rounded-xl object-contain shadow-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BrochurePopup;
