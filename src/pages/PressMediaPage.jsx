import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, Newspaper, Search, ChevronDown, ExternalLink, Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { pressMediaService } from "../api";

const PressMediaPage = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Fetch media data with TanStack Query
  const { data: mediaData = [], isLoading: loading } = useQuery({
    queryKey: ['press-media'],
    queryFn: async () => {
      const response = await pressMediaService.getAll();
      return response.data?.data || [];
    }
  });

  const categories = [
    { id: "all", name: "All Media", count: mediaData.length },
    { id: "Awards", name: "Awards", count: mediaData.filter(item => item.category === "Awards").length },
    { id: "Events", name: "Events", count: mediaData.filter(item => item.category === "Events").length },
    { id: "Lecture", name: "Lectures", count: mediaData.filter(item => item.category === "Lecture").length },
    { id: "Research", name: "Research", count: mediaData.filter(item => item.category === "Research").length },
    { id: "Campus", name: "Campus", count: mediaData.filter(item => item.category === "Campus").length },
  ];

  const sortOptions = [
    { id: "newest", name: "Newest First" },
    { id: "oldest", name: "Oldest First" },
    { id: "az", name: "A to Z" },
  ];

  const filteredData = mediaData
    .filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "az") return a.title.localeCompare(b.title);
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Press & Media
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest achievements, events coverage, and media mentions that showcase our excellence in education and innovation.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? "bg-blue-700" : "bg-gray-100"}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search media..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white hover:bg-gray-50 w-full md:w-auto"
              >
                <span>{sortOptions.find(opt => opt.id === sortBy)?.name}</span>
                <ChevronDown size={16} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-10">
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id);
                        setIsSortOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        sortBy === option.id ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                      } ${option.id === 'newest' ? 'rounded-t-xl' : ''} ${option.id === 'az' ? 'rounded-b-xl' : ''}`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="mb-6 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Showing {filteredData.length} of {mediaData.length} media items
        </motion.div>

        {/* Media Grid */}
        {filteredData.length > 0 ? (
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            <AnimatePresence>
              {filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer group border border-gray-100 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -8 }}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedMedia(item)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <span className="absolute top-4 left-4 bg-white text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      {item.category}
                    </span>
                    
                    {item.type === "video" && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-md">
                        <Play size={16} fill="white" />
                      </div>
                    )}
                    
                    <span className="absolute bottom-4 left-4 flex items-center text-white text-sm font-medium gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Calendar size={16} /> 
                      {new Date(item.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span className="bg-gray-100 px-2 py-1 rounded-md">{item.source}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{item.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center text-blue-600 text-sm font-medium hover:underline">
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                      
                      {item.type === "video" && (
                        <span className="flex items-center text-red-500 text-sm">
                          <Play size={14} fill="red" className="mr-1" />
                          Video
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Newspaper size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No media found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
          </motion.div>
        )}

        {/* Load More Button (for future pagination) */}
        {filteredData.length > 0 && (
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium shadow-sm">
              Load More
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-10"
                onClick={() => setSelectedMedia(null)}
              >
                <X size={20} />
              </button>
              
              <div className="relative h-64 sm:h-80">
                <img
                  src={selectedMedia.image}
                  alt={selectedMedia.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="inline-block bg-white text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 shadow-sm">
                    {selectedMedia.category}
                  </span>
                  
                  {selectedMedia.type === "video" && (
                    <div className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 text-white p-3 rounded-full shadow-lg">
                      <Play size={20} fill="white" />
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-white">{selectedMedia.title}</h3>
                  
                  <div className="flex items-center gap-4 text-white/90 mt-2">
                    <Calendar size={16} /> 
                    {new Date(selectedMedia.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                    <span className="text-white/70">|</span>
                    <span>{selectedMedia.source}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">{selectedMedia.description}</p>
                
                <a
                  href={selectedMedia.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  {selectedMedia.type === "video" ? "Watch video" : "Read full article"}
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PressMediaPage;