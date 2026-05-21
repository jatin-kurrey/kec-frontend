"use client";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Menu,
  X,
  ChevronDown,
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
} from "lucide-react";
import { colors, affiliations, mainCategories } from "../data/navigation";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const UniversityMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

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
      // If section not found, navigate to home and then scroll
      window.location.href = '/#news-events';
    }
  };

  // Update the News & Events menu item to use the scroll function
  const updatedMainCategories = mainCategories.map(category => {
    if (category.name === "News & Events") {
      return {
        ...category,
        onClick: handleNewsEventsClick
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
                          window.location.href = category.path;
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
    </div>
  );
};

export default UniversityMenu;