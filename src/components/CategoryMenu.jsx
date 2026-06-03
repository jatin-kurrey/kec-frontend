import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  BookOpen,
  Briefcase,
  Calendar,
  Award,
  Navigation,
  Globe,
  Star,
  Map,
  Send,
  GraduationCap,
  Download,
  QrCode,
  Landmark,
  Shield,
  Clock,
  Drone,
  Car,
  Code2,
  Zap,
  Plug,
  Code
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { settingsService, courseService } from "../api";
import { colors, affiliations, mainCategories } from "../data/navigation";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const UniversityMenu = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("next");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isZoomedQR, setIsZoomedQR] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState({
    payment_qr_code: '/image.png',
    payment_bank_name: 'State Bank of India',
    payment_account_number: '123456789012',
    payment_ifsc_code: 'SBIN0012345',
    payment_account_holder: 'KRISHNA ENGINEERING COLLEGE',
    payment_upi_id: 'kec@upi'
  });

  // Fetch courses dynamically for navbar submenu
  const { data: dbCourses = [] } = useQuery({
    queryKey: ['courses-menu'],
    queryFn: async () => {
      try {
        const response = await courseService.getAll();
        return Array.isArray(response.data) ? response.data : (response.data?.data || []);
      } catch (err) {
        console.error("Failed to load courses for menu:", err);
        return [];
      }
    }
  });

  const dynamicSummerCourses = dbCourses
    .filter(c => (c.department === "Summer Programs" || c.department === "Advanced Tech Programs") && c.is_active !== false)
    .map(c => {
      // Map icons dynamically
      let icon = Zap;
      if (c.icon === "Drone") icon = Drone;
      else if (c.icon === "Car") icon = Car;
      else if (c.icon === "Code2") icon = Code2;
      else if (c.icon === "Zap") icon = Zap;
      else if (c.icon === "Plug") icon = Plug;
      else if (c.icon === "Code") icon = Code;

      return {
        name: c.title,
        path: c.title.toLowerCase().includes("drone") 
          ? "/drone" 
          : c.title.toLowerCase().includes("ev") || c.title.toLowerCase().includes("electric")
          ? "/ev" 
          : c.title.toLowerCase().includes("charge")
          ? "/charging"
          : "/coding",
        icon: icon,
        description: c.description ? (c.description.substring(0, 45) + "...") : "Explore specialized course",
        color: colors.neutral,
      };
    });

  useEffect(() => {
    const fetchPaymentSettings = async () => {
      try {
        const res = await settingsService.get();
        if (res.data) {
          setPaymentSettings(prev => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error("Failed to load payment settings:", err);
      }
    };
    fetchPaymentSettings();
  }, []);

  // Refs for GSAP animations
  const menuRef = useRef(null);
  const logoRef = useRef(null);
  const affiliationRefs = useRef([]);
  const menuItemRefs = useRef([]);
  const megaMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Function to handle News & Events click
  const handleNewsEventsClick = (e) => {
    e.preventDefault();
    closeAllMenus();
    
    // Find the news-events section on the page
    const newsEventsSection = document.getElementById('news-events');
    if (newsEventsSection) {
      // Smooth scroll to the section
      newsEventsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Optional: Add a visual highlight effect
      gsap.fromTo(newsEventsSection,
        { backgroundColor: 'rgba(124, 58, 237, 0.1)' },
        { 
          backgroundColor: 'transparent', 
          duration: 2,
          ease: "power2.out"
        }
      );
    } else {
      navigate('/#news-events');
    }
  };

  // Update the News & Events and Summer Courses menu items dynamically
  const updatedMainCategories = mainCategories.map(category => {
    if (category.name === "News & Events") {
      return {
        ...category,
        onClick: handleNewsEventsClick
      };
    }
    if (category.name === "Summer Courses" && dynamicSummerCourses.length > 0) {
      return {
        ...category,
        submenu: dynamicSummerCourses
      };
    }
    return category;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
        setMobileSubmenu(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      if (logoRef.current) {
        gsap.fromTo(logoRef.current,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out"
          }
        );
      }

      // Affiliations animation
      const validAffiliations = affiliationRefs.current.filter(Boolean);
      if (validAffiliations.length > 0) {
        gsap.fromTo(validAffiliations,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
          }
        );
      }

      // Menu items animation
      const validMenuItems = menuItemRefs.current.filter(Boolean);
      if (validMenuItems.length > 0) {
        gsap.fromTo(validMenuItems,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.7)"
          }
        );
      }
    }, menuRef.current);

    return () => ctx.revert();
  }, []);

  // Animate mega menu when activeMenu changes
  useEffect(() => {
    if (activeMenu && megaMenuRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(megaMenuRef.current,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          }
        );
      }, megaMenuRef.current);
      return () => ctx.revert();
    }
  }, [activeMenu]);

  const closeAllMenus = () => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
  };

  const getCategoryColor = (categoryName) => {
    const category = updatedMainCategories.find(cat => cat.name === categoryName);
    return category ? category.color : colors.primary;
  };

  return (
    <div ref={menuRef} className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      {/* Top Bar with Logo and Affiliations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0">
            <div className="flex items-center">
            <Link to="/">
      <div className="w-20 h-20 rounded-full p-1 flex items-center justify-center cursor-pointer">
        <img
          src="/images/2025-08-27 19.10.46.jpg"
          className="w-full h-full rounded-full object-cover"
          alt="Krishna Engineering College Logo"
        />
      </div>
    </Link>
              <div className="ml-3" style={{ fontFamily: 'inter, serif' }}>
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                  KRISHNA
                </h1>
                <p className="text-xs md:text-xl -mt-1 font-semibold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                  ENGINEERING COLLEGE
                </p>
                <span className="text-xs font-medium md:text-sm">
                  Managed By KPS GROUP
                </span>
              </div>
            </div>
          </div>

          {/* Affiliations - Right Side */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 rounded-2xl p-4"
            style={{ 
              fontFamily: 'Inter, serif',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {affiliations.map(({ img, label, color, bgColor }, index) => (
              <div
                key={index}
                ref={el => affiliationRefs.current[index] = el}
                className="flex items-center gap-3 rounded-xl group"
              >
                <div className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110">
                  <img src={img} alt={label} className="w-6 h-6 lg:w-16 lg:h-16 object-contain" />
                </div>
                <div 
                  className="w-1 h-8 rounded-full transition-all duration-300 group-hover:h-10"
                  style={{ backgroundColor: bgColor }}
                ></div>
              </div>
            ))}

            {/* Elegant 3D E-Brochure Book Button */}
            <div className="w-px h-8 bg-gray-200 self-center hidden lg:block"></div>
            <Link
              to="/e-brochure"
              className="flex items-center gap-3 p-2.5 rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md hover:scale-105 hover:-translate-y-0.5 transform"
            >
              {/* Mini Book Graphic */}
              <div className="relative w-8 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-r-md shadow-md border-l-4 border-amber-500 flex items-center justify-center transition-transform duration-500 group-hover:[transform:rotateY(15deg)] transform">
                <BookOpen size={16} className="text-amber-400 group-hover:scale-110 transition-transform" />
                {/* Book Pages effect */}
                <div className="absolute right-0 top-0.5 bottom-0.5 w-0.5 bg-slate-100 rounded-r-sm opacity-80"></div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest leading-none">Interactive</span>
                <span className="text-xs font-extrabold text-blue-900 leading-snug group-hover:text-blue-700 transition-colors">3D Flipbook</span>
                <span className="text-[8px] text-gray-500 leading-none">View Prospectus</span>
              </div>
            </Link>

            {/* Elegant Online Payment Admission Fee Button */}
            <div className="w-px h-8 bg-gray-200 self-center hidden lg:block"></div>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="flex items-center gap-3 p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-700 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md hover:scale-105 hover:-translate-y-0.5 transform"
            >
              <div className="relative w-8 h-10 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-r-md shadow-md border-l-4 border-emerald-500 flex items-center justify-center transition-transform duration-500 group-hover:[transform:rotateY(15deg)] transform">
                <QrCode size={16} className="text-white group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest leading-none">Admission Fee</span>
                <span className="text-xs font-extrabold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors">Scan & Pay</span>
                <span className="text-[8px] text-gray-500 leading-none">Online Payment</span>
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl transition-colors"
              style={{ 
                backgroundColor: colors.primary,
                color: 'white'
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Menu with Mega Menu */}
      <div className="hidden md:block border-t"
        style={{ borderColor: `${colors.primary}20` }}
      >
        <div className="max-w-9xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center relative">
            <div className="flex space-x-1">
              {updatedMainCategories.map((category, index) => {
                const IconComponent = category.icon;
                const isActive = activeMenu === category.name;
                const categoryColor = getCategoryColor(category.name);

                return (
                  <div
                    key={category.name}
                    ref={el => menuItemRefs.current[index] = el}
                    className="relative group"
                    style={{ fontFamily: "inter, serif" }}
                    onMouseEnter={() => setActiveMenu(category.name)}
                    onMouseLeave={() => {
                      setActiveMenu(null);
                      setHoveredItem(null);
                    }}
                  >
                    {category.name === "News & Events" ? (
                      // Special handling for News & Events with scroll
                      <button
                        onClick={category.onClick}
                        className="flex items-center px-5 py-4 text-sm transition-all duration-300 group-hover:rounded-t-xl relative w-full"
                        style={{ 
                          color: isActive ? categoryColor : colors.dark,
                          backgroundColor: isActive ? `${categoryColor}10` : 'transparent'
                        }}
                      >
                        <IconComponent 
                          size={18} 
                          className="mr-2" 
                          style={{ color: isActive ? categoryColor : colors.dark }}
                        />
                        {category.name}
                        {/* Animated underline */}
                        <div 
                          className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full"
                          style={{ 
                            backgroundColor: categoryColor,
                            width: isActive ? '100%' : '0%'
                          }}
                        />
                      </button>
                    ) : (
                      // Regular menu items with Link
                      <Link
                        to={category.path}
                        className="flex items-center px-5 py-4 text-sm transition-all duration-300 group-hover:rounded-t-xl relative"
                        style={{ 
                          color: isActive ? categoryColor : colors.dark,
                          backgroundColor: isActive ? `${categoryColor}10` : 'transparent'
                        }}
                      >
                        <IconComponent 
                          size={18} 
                          className="mr-2" 
                          style={{ color: isActive ? categoryColor : colors.dark }}
                        />
                        {category.name}
                        {category.submenu && (
                          <ChevronDown
                            size={16}
                            className="ml-2 transition-transform duration-300 group-hover:rotate-180"
                            style={{ color: isActive ? categoryColor : colors.dark }}
                          />
                        )}
                        {/* Animated underline */}
                        <div 
                          className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full"
                          style={{ 
                            backgroundColor: categoryColor,
                            width: isActive ? '100%' : '0%'
                          }}
                        />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Enhanced Mega Menu Container */}
            {activeMenu && (
              <div
                ref={megaMenuRef}
                className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl"
                onMouseEnter={() => setActiveMenu(activeMenu)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {updatedMainCategories.map((category) => {
                  if (category.name === activeMenu && category.submenu) {
                    const IconComponent = category.icon;
                    const categoryColor = category.color;
                    
                    return (
                      <div
                        key={category.name}
                        className="rounded-xl shadow-2xl border-2 overflow-hidden transform transition-all duration-300"
                        style={{ 
                          borderColor: `${categoryColor}20`,
                          background: 'white'
                        }}
                      >
                        {/* Enhanced Mega Menu Header */}
                        <div 
                          className="py-5 px-8 text-white relative overflow-hidden"
                          style={{ background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}dd 100%)` }}
                        >
                          <div className="flex items-center relative z-10">
                            <div 
                              className="p-3 rounded-xl mr-4 backdrop-blur-sm"
                              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                            >
                              <IconComponent size={28} className="text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold">
                                {category.name}
                              </h3>
                              <p className="text-sm opacity-95 mt-1">
                                {category.description}
                              </p>
                            </div>
                          </div>
                          {/* Background pattern */}
                          <div 
                            className="absolute top-0 right-0 w-32 h-32 opacity-10"
                            style={{ background: 'radial-gradient(circle, white 20%, transparent 70%)' }}
                          />
                        </div>

                        {/* Enhanced Mega Menu Content */}
                        <div className="p-8 grid grid-cols-2 gap-2">
                          {category.submenu.map((item, index) => {
                            const ItemIcon = item.icon;
                            const itemColor = item.color || categoryColor;
                            
                            return (
                              <div
                                key={item.name}
                                className="transform transition-all duration-300 hover:scale-[1.02]"
                              >
                                {item.path.startsWith('http') ? (
                                  <a
                                    href={item.path}
                                    className={`flex items-start p-4 rounded-xl transition-all duration-300 border-2 ${
                                      hoveredItem === item.name
                                        ? "shadow-lg transform scale-[1.02]"
                                        : "shadow-sm hover:shadow-md"
                                    }`}
                                    onClick={closeAllMenus}
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{ 
                                      borderColor: hoveredItem === item.name ? `${itemColor}40` : 'transparent',
                                      backgroundColor: hoveredItem === item.name ? `${itemColor}08` : 'white'
                                    }}
                                  >
                                    <div 
                                      className="flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center mr-4 shadow-sm"
                                      style={{ 
                                        backgroundColor: `${itemColor}15`,
                                        border: `2px solid ${itemColor}30`
                                      }}
                                    >
                                      <ItemIcon
                                        size={20}
                                        style={{ color: itemColor }}
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 
                                        className="font-bold text-lg mb-2"
                                        style={{ color: colors.dark }}
                                      >
                                        {item.name}
                                      </h4>
                                      <p 
                                        className="text-sm"
                                        style={{ color: colors.dark + 'cc' }}
                                      >
                                        {item.description}
                                      </p>
                                      <div 
                                        className="w-8 h-0.5 rounded-full mt-2"
                                        style={{ backgroundColor: itemColor }}
                                      />
                                    </div>
                                  </a>
                                ) : (
                                  <Link
                                    to={item.path}
                                    className={`flex items-start p-4 rounded-xl transition-all duration-300 border-2 ${
                                      hoveredItem === item.name
                                        ? "shadow-lg transform scale-[1.02]"
                                        : "shadow-sm hover:shadow-md"
                                    }`}
                                    onClick={closeAllMenus}
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{ 
                                      borderColor: hoveredItem === item.name ? `${itemColor}40` : 'transparent',
                                      backgroundColor: hoveredItem === item.name ? `${itemColor}08` : 'white'
                                    }}
                                  >
                                    <div 
                                      className="flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center mr-4 shadow-sm"
                                      style={{ 
                                        backgroundColor: `${itemColor}15`,
                                        border: `2px solid ${itemColor}30`
                                      }}
                                    >
                                      <ItemIcon
                                        size={20}
                                        style={{ color: itemColor }}
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 
                                        className="font-bold text-lg mb-2"
                                        style={{ color: colors.dark }}
                                      >
                                        {item.name}
                                      </h4>
                                      <p 
                                        className="text-sm"
                                        style={{ color: colors.dark + 'cc' }}
                                      >
                                        {item.description}
                                      </p>
                                      <div 
                                        className="w-8 h-0.5 rounded-full mt-2"
                                        style={{ backgroundColor: itemColor }}
                                      />
                                    </div>
                                  </Link>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Mega Menu Footer */}
                        <div 
                          className="px-8 py-4 border-t text-center"
                          style={{ borderColor: `${categoryColor}15`, backgroundColor: `${categoryColor}05` }}
                        >
                          <span 
                            className="text-sm font-medium"
                            style={{ color: categoryColor }}
                          >
                            Explore more about {category.name.toLowerCase()}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-t"
          style={{ borderColor: `${colors.primary}20` }}
        >
          {/* Mobile Affiliations */}
          <div 
            className="px-4 py-4 border-b"
            style={{ borderColor: `${colors.primary}20`, backgroundColor: `${colors.primary}05` }}
          >
            <h3 
              className="text-sm font-bold mb-3 text-center"
              style={{ color: colors.primary }}
            >
              RECOGNITIONS & AWARDS
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {affiliations.map((affiliation, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-2 rounded-xl bg-white border border-gray-100"
                >
                  <img src={affiliation.img} alt={affiliation.label} className="w-12 h-12 object-contain" />
                  <span className="text-[10px] font-bold text-gray-500 text-center uppercase leading-tight">
                    {affiliation.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Categories */}
          <div className="max-h-[70vh] overflow-y-auto">
            {updatedMainCategories.map((category) => {
              const IconComponent = category.icon;
              const isSubmenuOpen = mobileSubmenu === category.name;
              const categoryColor = category.color;

              return (
                <div key={category.name} className="border-b border-gray-50">
                  <div className="flex items-center justify-between p-4">
                    <div 
                      className="flex items-center gap-3 flex-1"
                      onClick={() => {
                        if (category.onClick) {
                          category.onClick({ preventDefault: () => {} });
                        } else {
                          closeAllMenus();
                          navigate(category.path);
                        }
                      }}
                    >
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${categoryColor}15` }}
                      >
                        <IconComponent size={20} style={{ color: categoryColor }} />
                      </div>
                      <span className="font-bold text-gray-800">{category.name}</span>
                    </div>
                    {category.submenu && (
                      <button
                        onClick={() => setMobileSubmenu(isSubmenuOpen ? null : category.name)}
                        className="p-2 rounded-lg bg-gray-50 text-gray-400"
                      >
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform duration-300 ${isSubmenuOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>
                    )}
                  </div>

                  {isSubmenuOpen && category.submenu && (
                    <div className="bg-gray-50 px-4 py-2 space-y-1">
                      {category.submenu.map((item) => {
                        const ItemIcon = item.icon;
                        const itemColor = item.color || categoryColor;

                        return item.path.startsWith('http') ? (
                          <a
                            key={item.name}
                            href={item.path}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-colors w-full"
                            onClick={closeAllMenus}
                          >
                            <div 
                              className="p-1.5 rounded-lg"
                              style={{ backgroundColor: `${itemColor}15` }}
                            >
                              <ItemIcon size={16} style={{ color: itemColor }} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-700">{item.name}</div>
                              <div className="text-[10px] text-gray-400">{item.description}</div>
                            </div>
                          </a>
                        ) : (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-colors"
                            onClick={closeAllMenus}
                          >
                            <div 
                              className="p-1.5 rounded-lg"
                              style={{ backgroundColor: `${itemColor}15` }}
                            >
                              <ItemIcon size={16} style={{ color: itemColor }} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-700">{item.name}</div>
                              <div className="text-[10px] text-gray-400">{item.description}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Footer */}
          <div className="p-4 bg-gray-50">
            <Link
              to="/admission"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white font-bold shadow-lg shadow-blue-200"
              style={{ backgroundColor: colors.primary }}
              onClick={closeAllMenus}
            >
              <GraduationCap size={20} />
              Admissions Open 2026
            </Link>
          </div>
        </div>
      )}

      {/* Stunning Interactive online payment details Modal Popup */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] w-full max-w-3xl shadow-[0_24px_64px_rgba(0,0,0,0.18)] overflow-hidden relative animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-emerald-600 to-teal-800 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                    <QrCode className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight leading-none">Admission Fee Payment</h3>
                    <p className="text-xs text-white/70 font-semibold mt-1.5 uppercase tracking-wider">Krishna Engineering College</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-stretch">
                
                {/* Bank details card */}
                <div className="flex-1 space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-emerald-600" />
                      Direct Bank Transfer
                    </h4>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 space-y-3.5 shadow-inner">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bank Name</span>
                        <p className="font-extrabold text-slate-800 text-base leading-none">{paymentSettings.payment_bank_name}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Account Number</span>
                          <p className="font-extrabold text-slate-800 text-sm tracking-wide leading-none">{paymentSettings.payment_account_number}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">IFSC Code</span>
                          <p className="font-extrabold text-slate-800 text-sm tracking-wide leading-none">{paymentSettings.payment_ifsc_code}</p>
                        </div>
                      </div>

                      <div className="space-y-1 pt-1.5 border-t border-slate-200/50">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Account Holder Name</span>
                        <p className="font-extrabold text-slate-800 text-sm leading-none">{paymentSettings.payment_account_holder}</p>
                      </div>
                    </div>
                  </div>

                  {/* UPI Details card */}
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">UPI Address</span>
                      <p className="font-black text-slate-800 text-sm mt-0.5">{paymentSettings.payment_upi_id}</p>
                    </div>
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-500/20">Active UPI</span>
                  </div>
                </div>

                {/* QR Code scanning card */}
                <div className="w-full md:w-80 shrink-0 bg-slate-50 border border-slate-100 rounded-3xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
                  <div 
                    onClick={() => setIsZoomedQR(true)}
                    className="w-64 h-[20rem] bg-white border border-slate-200 rounded-2xl p-2.5 mb-4 flex items-center justify-center overflow-hidden shadow-inner group cursor-pointer"
                  >
                    <img 
                      src={paymentSettings.payment_qr_code} 
                      alt="Scan to Pay QR" 
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => { e.target.src = '/image.png' }}
                    />
                  </div>
                  <h5 className="font-black text-slate-800 text-xs tracking-tight uppercase leading-none">Instant QR Scan</h5>
                  <p className="text-[10px] text-slate-400 font-semibold mt-2">Scan QR code through GPay, PhonePe, BHIM, or Paytm app to pay directly.</p>
                </div>

              </div>

              {/* Secure payment protection label */}
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  After successful transaction, please save the payment screenshot / transaction ID and upload it in the centralized registration portal while submitting your online enrollment application.
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-4 border-t border-slate-100 bg-slate-50 text-center flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Centralized Payment Portal • KEC Bhilai</span>
            </div>

          </div>
        </div>
      )}

      {/* Stunning Zoomed QR Code Modal Overlay for Maximum Scanability */}
      {isZoomedQR && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-[99999] animate-fade-in">
          <div className="relative max-w-sm sm:max-w-md w-full flex flex-col items-center justify-center bg-white rounded-[2rem] p-6 shadow-2xl animate-scale-up">
            <button
              onClick={() => setIsZoomedQR(false)}
              className="absolute top-4 right-4 p-2 bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 rounded-full transition-all z-10 cursor-pointer"
              aria-label="Close zoomed QR"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-full aspect-[3/4] bg-white border border-slate-100 rounded-2xl p-3 flex items-center justify-center overflow-hidden shadow-inner mt-4">
              <img
                src={paymentSettings.payment_qr_code}
                alt="Zoomed Payment QR placard"
                className="w-full h-full object-contain rounded-xl"
                onError={(e) => { e.target.src = '/image.png' }}
              />
            </div>
            
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider text-center mt-5 leading-none">
              Admission Payment QR Code
            </h4>
            <p className="text-[10px] text-slate-400 font-semibold text-center mt-2">
              Scan directly from screen using a secondary device, or save screenshot to pay using your local UPI application.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityMenu;