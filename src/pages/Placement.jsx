import React, { useState } from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { 
  BriefcaseIcon, 
  ChartBarIcon, 
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  PlayIcon,
  RocketLaunchIcon,
  TrophyIcon,
  BuildingLibraryIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import CompaniesVisitedTable from '../components/CompaniesVisitedTable';
import { GraduationCap, Users, User } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { placementService } from '../api';

const PlacementPortal = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerChildren = {
    visible: { 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  // Fetch placement data with TanStack Query
  const { data: placementStats = [], isLoading: statsLoading } = useQuery({
    queryKey: ['placement-stats'],
    queryFn: async () => {
      const response = await placementService.getStats();
      const stats = response.data?.data || [];
      // If API doesn't return data yet, fallback to default structure
      if (stats.length === 0) {
        return [
          { value: '95%', label: 'Placement Rate', icon: 'ChartBarIcon', color: 'from-green-500 to-green-600' },
          { value: '250+', label: 'Companies Visited', icon: 'BriefcaseIcon', color: 'from-blue-500 to-blue-600' },
          { value: '₹18 LPA', label: 'Highest Package', icon: 'ArrowTrendingUpIcon', color: 'from-amber-500 to-amber-600' },
          { value: '₹7.5 LPA', label: 'Average Package', icon: 'AcademicCapIcon', color: 'from-teal-500 to-teal-600' }
        ];
      }
      return stats;
    }
  });

  const { data: recruiters = [], isLoading: recruitersLoading } = useQuery({
    queryKey: ['recruiters'],
    queryFn: async () => {
      const response = await placementService.getRecruiters();
      return response.data?.data || [];
    }
  });

  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await placementService.getTestimonials();
      return response.data?.data || [];
    }
  });

  const loading = statsLoading || recruitersLoading || testimonialsLoading;

  const getStatIcon = (iconName) => {
    const icons = {
      ChartBarIcon,
      BriefcaseIcon,
      ArrowTrendingUpIcon,
      AcademicCapIcon
    };
    return icons[iconName] || ChartBarIcon;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      <SEO 
        title="Placements" 
        description="Explore the placement record of Krishna Engineering College (KEC) Bhilai. High placement rates, top recruiters like Microsoft, Adani, and excellent packages."
        keywords="KEC placements, engineering jobs Bhilai, highest package KEC, top recruiters college, campus recruitment Chhattisgarh"
      />
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600 rounded-full -translate-y-36 translate-x-36 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full translate-y-48 -translate-x-48 opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center justify-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6 border border-white/20">
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              Launch Your Career Journey
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-teal-200">Placement Portal</span>
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-2xl leading-relaxed">
              Your gateway to exceptional career opportunities. Connect with top companies and build your future with Krishna Engineering College.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-900 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center hover:bg-blue-50"
              >
                <PlayIcon className="h-5 w-5 mr-2" />
                Watch Placement Journey
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center backdrop-blur-sm"
              >
                <BriefcaseIcon className="h-5 w-5 mr-2" />
                View Opportunities
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TrophyIcon className="w-4 h-4" />
              Placement Excellence
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Placement Achievements
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Consistent excellence in placements with top-tier companies and competitive packages
            </p>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {placementStats.map((stat, index) => {
              const Icon = getStatIcon(stat.icon);
              return (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 group"
                >
                  <div className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-3">{stat.value}</h3>
                  <p className="text-gray-700 font-semibold text-lg">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Recruiters Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
              <BuildingLibraryIcon className="w-4 h-4" />
              Our Recruitment Partners
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top Recruiters
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Leading companies that trust and recruit from Krishna Engineering College
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {recruiters.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="h-12 w-full flex items-center justify-center">
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="h-8 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.button 
              whileHover={{ x: 5 }}
              className="text-blue-700 font-semibold text-lg flex items-center justify-center mx-auto hover:text-blue-800 transition-colors duration-300 group"
            >
              View all recruiting partners 
              <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Student Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              From Campus to Corporate
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our alumni about their journey from Krishna Engineering College to successful careers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ 
                clickable: true,
                el: '.testimonial-pagination',
                bulletClass: 'swiper-pagination-bullet !w-3 !h-3 !bg-blue-300 !opacity-50 !mx-1',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-gradient-to-r !from-blue-500 !to-teal-500 !opacity-100 !w-8 !rounded-full'
              }}
              navigation={{
                nextEl: '.testimonial-next',
                prevEl: '.testimonial-prev',
              }}
              autoplay={{ 
                delay: 6000,
                disableOnInteraction: false 
              }}
              breakpoints={{
                640: { 
                  slidesPerView: 1,
                  spaceBetween: 20 
                },
                768: { 
                  slidesPerView: 2,
                  spaceBetween: 30 
                },
                1024: { 
                  slidesPerView: 3,
                  spaceBetween: 40 
                },
              }}
              className="pb-16"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8  border border-blue-100 h-full flex flex-col transition-all duration-500 group"
                  >
                    {/* Header with Avatar and Info */}
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                          {/* <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          /> */}
                           <User className="w-12 h-12 text-blue-600" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-sm">
                          <CheckCircleIcon className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{testimonial.name}</h4>
                        <p className="text-blue-600 font-medium text-sm mb-1">{testimonial.role}</p>
                        <p className="text-gray-500 text-sm">at {testimonial.company}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon 
                                key={star} 
                                className="w-4 h-4 text-amber-400 fill-current" 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">5.0</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quote */}
                    <div className="flex-1 mb-6 relative">
                      <div className="absolute -top-2 -left-2 text-4xl text-blue-200 opacity-50">"</div>
                      <p className="text-gray-700 leading-relaxed relative z-10 pl-4">
                        {testimonial.quote}
                      </p>
                      <div className="absolute -bottom-4 -right-2 text-4xl text-blue-200 opacity-50 rotate-180">"</div>
                    </div>
                    
                    {/* Footer with Department */}
                    <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600 font-medium">{testimonial.department}</span>
                      </div>
                      <div className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300">
                        <ArrowRightIcon className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <button className="testimonial-prev w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-110">
                <ArrowRightIcon className="w-5 h-5 rotate-180" />
              </button>
              
              {/* Custom Pagination */}
              <div className="testimonial-pagination flex justify-center space-x-2" />
              
              <button className="testimonial-next w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-110">
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6 text-lg">Ready to start your success story?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Your Journey
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                View All Stories
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Companies Visited Table Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompaniesVisitedTable />
        </div>
      </section>
    </div>
  );
};

export default PlacementPortal;