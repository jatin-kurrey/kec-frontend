import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Megaphone, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ExternalLink,
  Search,
  BookOpen,
  GraduationCap,
  Building,
  Users,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { contentService } from "../api";

const Notice = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const noticeCategories = [
    { id: "all", name: "All Notices", icon: <Megaphone size={16} /> },
    { id: "academic", name: "Academic", icon: <BookOpen size={16} /> },
    { id: "placement", name: "Placements", icon: <GraduationCap size={16} /> },
    { id: "event", name: "Events", icon: <Calendar size={16} /> },
    { id: "general", name: "General", icon: <Building size={16} /> },
    { id: "student", name: "Student", icon: <Users size={16} /> },
  ];
  const { data: notices = [] } = useQuery({
    queryKey: ['notices'],
    queryFn: async () => {
      const res = await contentService.getNotices();
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      return data.map(n => ({
        ...n,
        category: n.type,
        date: new Date(n.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        time: new Date(n.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      }));
    }
  });

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = activeFilter === "all" || notice.category === activeFilter;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <section className="py-12 md:py-16 px-4 sm:px-6 text-blue-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200 rounded-full translate-x-1/3 translate-y-1/3 opacity-30 blur-3xl"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Tagline pill */}
        <motion.div
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Megaphone className="w-4 h-4 mr-2" />
          Latest Announcements
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          College <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Notice Board</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Stay updated with the latest announcements, important events, and campus activities at Krishna Engineering College.
        </motion.p>

        {/* Underline accent */}
        <motion.div
          className="w-28 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 112 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        />
      </div>
    </section>

      {/* Filters and Search */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-4 shadow-md mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg w-full md:w-auto">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search notices..."
              className="bg-transparent outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {noticeCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === category.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.icon}
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Notices List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-5"
      >
        <AnimatePresence>
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <motion.div
                key={notice.id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${notice.important ? 'border-red-500' : 'border-blue-500'}`}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${notice.important ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                          {noticeCategories.find(cat => cat.id === notice.category)?.name}
                        </span>
                        {notice.important && (
                          <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                            Important
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {notice.title}
                      </h2>
                      <p className="text-gray-600 mb-4">{notice.content}</p>
                    </div>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={notice.link}
                      className="ml-4 p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      <ExternalLink size={18} />
                    </motion.a>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{notice.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{notice.time}</span>
                      </div>
                    </div>
                    
                    <motion.a
                      whileHover={{ x: 5 }}
                      href={notice.link}
                      className="text-blue-600 font-medium flex items-center gap-1 hover:underline"
                    >
                      Read more <ArrowRight size={16} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white rounded-xl shadow-md"
            >
              <Megaphone size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600">No notices found</h3>
              <p className="text-gray-500">Try changing your filters or search query</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-2xl font-bold text-blue-900">{notices.length}</div>
          <div className="text-sm text-gray-600">Total Notices</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-2xl font-bold text-blue-900">{notices.filter(n => n.important).length}</div>
          <div className="text-sm text-gray-600">Important</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-2xl font-bold text-blue-900">{notices.filter(n => n.category === 'placement').length}</div>
          <div className="text-sm text-gray-600">Placement Notices</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <div className="text-2xl font-bold text-blue-900">6</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Notice;