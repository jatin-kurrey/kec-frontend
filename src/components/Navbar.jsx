"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Users,
  Phone,
  ChevronDown,
  Home,
  BookOpen,
  Trophy,
  Award,
  Star,
  GraduationCap,
  Building,
} from "lucide-react";

const affiliations = [
  { Icon: Award, label: "Best Result", color: "text-red-500" },
  { Icon: Star, label: "Quality Education", color: "text-blue-500" },
  { Icon: Trophy, label: "Placement", color: "text-amber-500" },
  { Icon: GraduationCap, label: "Mentor", color: "text-purple-500" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="w-4 h-4" />,
    },
    {
      name: "About",
      path: "/about",
      icon: <Users className="w-4 h-4" />,
      dropdown: [
        { name: "About College", path: "/about" },
        { name: "Principal's Message", path: "/principal" },
        { name: "HOD", path: "/hod" },
        { name: "Mission & Vision", path: "/mission" },
        { name: "Infrastructure", path: "/infrastructure" },
        { name: "Facilities", path: "/facilities" },
        { name: "Governance", path: "/governance" },
      ],
    },
    {
      name: "Departments",
      path: "/departments",
      icon: <BookOpen className="w-4 h-4" />,
      dropdown: [
        { name: "Computer Science", path: "/departments/cse" },
        { name: "Mechanical Engineering", path: "/departments/mech" },
        { name: "Civil Engineering", path: "/departments/civil" },
        { name: "Electrical Engineering", path: "/departments/eee" },
      ],
    },
    {
      name: "Courses",
      path: "/courses",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <Phone className="w-4 h-4" />,
    },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleMobileDropdown = (itemName) => {
    setMobileDropdown(mobileDropdown === itemName ? null : itemName);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="bg-white text-blue-900 shadow-md sticky top-0 z-50 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main navigation bar */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 px-4 py-2 md:px-6 md:py-4"
          >
            <div className="flex-shrink-0">
              <img
                src="/images/2025-08-27 19.10.46.jpg"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-800 p-1 object-cover"
                alt="College Logo"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl tracking-tight">
                KRISHNA
              </span>
              <span className="text-xs text-blue-700 md:text-sm">
                ENGINEERING COLLEGE
              </span>
              <span className="text-xs text-blue-600 font-medium md:text-sm">
                Managed By KPS GROUP
              </span>
            </div>
          </motion.div>

          {/* Affiliations for Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {affiliations.map(({ Icon, label, color }, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative">
                  <Icon
                    className={`h-6 w-6 ${color} group-hover:scale-110 transition-transform`}
                  />
                  <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                </div>
                <span className="text-xs text-blue-800 mt-1 font-medium whitespace-nowrap">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Apply Now Button for Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <Link
              to="/admission"
              className="inline-block"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 20px -5px rgba(37, 99, 235, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2 cursor-pointer"
              >
                <span>Apply Now</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-900 hover:bg-blue-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-xl overflow-hidden border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {/* Mobile Affiliations */}
              <div className="px-3 py-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-blue-800 mb-3 text-center">
                  RECOGNITIONS & AWARDS
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {affiliations.map(({ Icon, label, color }, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center p-3 bg-blue-50 rounded-lg border border-blue-100"
                    >
                      <Icon className={`h-6 w-6 ${color} mb-1`} />
                      <span className="text-xs text-blue-800 text-center font-medium">
                        {label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <div
                    className="flex items-center justify-between px-3 py-3 text-base font-medium rounded-lg text-blue-900 hover:bg-blue-50 transition-colors"
                    onClick={() =>
                      item.dropdown
                        ? toggleMobileDropdown(item.name)
                        : setIsOpen(false)
                    }
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      <Link
                        to={item.path}
                        onClick={() => !item.dropdown && setIsOpen(false)}
                        className="font-medium"
                      >
                        {item.name}
                      </Link>
                    </div>
                    {item.dropdown && (
                      <motion.span
                        animate={{
                          rotate: mobileDropdown === item.name ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={18} />
                      </motion.span>
                    )}
                  </div>

                  {/* Mobile Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && mobileDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-6 bg-blue-50 rounded-lg overflow-hidden my-1"
                      >
                        {item.dropdown.map((drop, i) => (
                          <Link
                            key={i}
                            to={drop.path}
                            className="block px-4 py-3 text-sm text-blue-800 hover:text-blue-600 hover:bg-blue-100 transition-colors border-b border-blue-100 last:border-b-0"
                            onClick={() => setIsOpen(false)}
                          >
                            {drop.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Mobile Apply Button */}
              <div className="px-3 pt-3">
                <Link
                  to="/admission"
                  className="block w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-700 text-white font-bold px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Apply Now</span>
                    <span>→</span>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
