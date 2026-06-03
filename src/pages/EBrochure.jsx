import React, { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";

const EBrochure = () => {
  const totalPages = 24;
  const [currentPage, setCurrentPage] = useState(1); // 1-indexed
  const [direction, setDirection] = useState(0); // Navigation direction (-1 or 1)

  const handleNext = () => {
    if (currentPage >= totalPages) return;
    setDirection(1);
    
    if (currentPage === 1) {
      setCurrentPage(2);
    } else if (currentPage < totalPages - 1) {
      setCurrentPage(prev => Math.min(totalPages, prev + 2));
    } else if (currentPage === totalPages - 1) {
      setCurrentPage(totalPages);
    }
  };

  const handlePrev = () => {
    if (currentPage <= 1) return;
    setDirection(-1);

    if (currentPage === totalPages) {
      setCurrentPage(totalPages - 1);
    } else if (currentPage > 2) {
      setCurrentPage(prev => Math.max(1, prev - 2));
    } else if (currentPage === 2) {
      setCurrentPage(1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const getPageUrl = (pageNum) => `/Broucher image/${pageNum}.jpg`;
  
  const isCover = currentPage === 1;
  const isBackCover = currentPage === totalPages;

  // Ultra-clean slide and fade animation parameters
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 380, damping: 36 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.25 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 380, damping: 36 },
        opacity: { duration: 0.15 },
        scale: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="w-screen h-screen bg-slate-100 text-slate-800 flex flex-col justify-between overflow-hidden relative select-none" style={{ fontFamily: "Inter, sans-serif" }}>
      <SEO 
        title="Official E-Prospectus" 
        description="Experience Krishna Engineering College's prospectus online in full-page double spread spreads with realistic page transitions."
        keywords="KEC Bhilai prospectus, KEC brochure CSVTU"
      />

      {/* Fullscreen High-Contrast Header - Compact to maximize canvas space */}
      <header className="w-full h-[7vh] min-h-[50px] px-8 bg-white border-b border-slate-200/80 flex items-center justify-between shadow-sm relative z-20 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-1.5 hover:bg-slate-100 rounded-xl transition-all group border border-slate-200/50">
            <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-slate-900 transition-colors" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-900/10 border border-blue-900/20 flex items-center justify-center text-blue-900">
              <BookOpen size={14} />
            </div>
            <div>
              <h1 className="text-xs md:text-sm font-black text-slate-900 tracking-tight leading-none">Krishna Engineering College</h1>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">Academic Prospectus 2026-27</p>
            </div>
          </div>
        </div>

        {/* Action Header controls */}
        <div className="flex items-center gap-4">
          <div className="text-[9px] font-black text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-1 rounded-lg">
            {isCover ? "Cover (Page 1 / 24)" : isBackCover ? "Back Cover (Page 24 / 24)" : `Pages ${currentPage - 1}-${currentPage} / 24`}
          </div>

          <a
            href="/PROSPECTUS_26-27 KEC Bhilai.pdf"
            download
            className="flex items-center gap-2 px-5 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-black text-[10px] tracking-wider uppercase shadow-sm transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
            title="Download Prospectus PDF"
          >
            <Download size={12} className="stroke-[2.5px]" />
            <span>Download PDF</span>
          </a>
        </div>
      </header>

      {/* Maximized Immersive Spread Canvas (Occupies 87vh to give absolute highlight to pages) */}
      <main className="w-full h-[87vh] flex items-center justify-center relative bg-slate-100 px-4 md:px-12 py-2">
        
        {/* Navigation Arrow buttons - Positioned on the margins of screen */}
        {currentPage > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 z-20 p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={22} className="stroke-[2.5px]" />
          </button>
        )}

        {currentPage < totalPages && (
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 z-20 p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight size={22} className="stroke-[2.5px]" />
          </button>
        )}

        {/* Dynamic Fullscreen Page Viewer Spread */}
        <div className="w-full h-full flex items-center justify-center relative">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full flex items-center justify-center gap-5 md:gap-8"
            >
              {isCover ? (
                /* Cover Page Centered (Fills 98% of main canvas height) */
                <div className="h-[96%] aspect-[3/4] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200 overflow-hidden p-1 flex items-center justify-center">
                  <img
                    src={getPageUrl(1)}
                    alt="Prospectus Cover Page"
                    className="w-full h-full object-contain rounded-2xl"
                    loading="eager"
                    onError={(e) => { e.target.src = '/Unknown.jpg'; }}
                  />
                </div>
              ) : isBackCover ? (
                /* Back Cover Centered */
                <div className="h-[96%] aspect-[3/4] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200 overflow-hidden p-1 flex items-center justify-center">
                  <img
                    src={getPageUrl(totalPages)}
                    alt="Prospectus Back Cover"
                    className="w-full h-full object-contain rounded-2xl"
                    loading="lazy"
                    onError={(e) => { e.target.src = '/Unknown.jpg'; }}
                  />
                </div>
              ) : (
                /* Two-Page Spread side-by-side (Fills 96% of viewport height for massive clarity) */
                <div className="w-full h-[96%] flex items-center justify-center gap-4 md:gap-8">
                  
                  {/* Left Page (Even) */}
                  <div className="h-full aspect-[3/4] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/80 overflow-hidden p-1.5 hidden sm:flex items-center justify-center relative">
                    <img
                      src={getPageUrl(currentPage - 1)}
                      alt={`Page ${currentPage - 1}`}
                      className="w-full h-full object-contain rounded-2xl"
                      loading="lazy"
                      onError={(e) => { e.target.src = '/Unknown.jpg'; }}
                    />
                    <span className="absolute bottom-4 left-6 text-[9px] font-black text-slate-400 bg-slate-50 border border-slate-200/50 px-2.5 py-0.5 rounded-lg">
                      Page {currentPage - 1}
                    </span>
                  </div>

                  {/* Right Page (Odd) */}
                  <div className="h-full aspect-[3/4] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/80 overflow-hidden p-1.5 flex items-center justify-center relative">
                    <img
                      src={getPageUrl(currentPage)}
                      alt={`Page ${currentPage}`}
                      className="w-full h-full object-contain rounded-2xl"
                      loading="eager"
                      onError={(e) => { e.target.src = '/Unknown.jpg'; }}
                    />
                    <span className="absolute bottom-4 right-6 text-[9px] font-black text-slate-400 bg-slate-50 border border-slate-200/50 px-2.5 py-0.5 rounded-lg">
                      Page {currentPage}
                    </span>
                  </div>

                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* Tiny clean footer timeline representing 6vh */}
      <footer className="w-full h-[6vh] min-h-[40px] border-t border-slate-200 bg-white flex items-center justify-center shrink-0">
        <div className="w-64 h-1 bg-slate-200 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-blue-900 rounded-full transition-all duration-300"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
      </footer>
    </div>
  );
};

export default EBrochure;
