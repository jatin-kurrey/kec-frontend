import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Users, 
  BookOpen, 
  Utensils, 
  Wifi, 
  Bus, 
  Microscope,
  GraduationCap,
  Search,
  Filter,
  X,
  MapPin,
  ArrowRight,
  SquareParking,
  Bookmark,
  Library,
  ClipboardList,
  Calculator,
  FlaskConical,
  Computer,
  Home,
  Building
} from "lucide-react";

const Infrastructure = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  // Infrastructure data based on the provided information
  const infrastructureData = [
    {
      id: 1,
      name: "Classrooms (UG)",
      description: "Spacious and well-ventilated undergraduate classrooms equipped with modern teaching aids and comfortable seating.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      features: ["Smart Boards", "Projectors", "Comfortable Seating", "Air Conditioned"],
      icon: GraduationCap,
      stats: { number: 12, area: "1020.00 sq.m.", capacity: 792 },
      category: "academic",
      location: "Main Academic Block"
    },
    {
      id: 2,
      name: "Laboratories",
      description: "State-of-the-art laboratories for various engineering disciplines with modern equipment and safety systems.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      features: ["Advanced Equipment", "Safety Systems", "Research Facilities", "Dedicated Technicians"],
      icon: Microscope,
      stats: { number: 58, area: "3886.00 sq.m.", capacity: 3828 },
      category: "academic",
      location: "Science & Technology Block"
    },
    {
      id: 3,
      name: "Library & Reading Room",
      description: "A vast collection of physical and digital resources with comfortable reading areas and research facilities.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
      features: ["50,000+ Books", "E-Journals", "Digital Resources", "Quiet Study Areas"],
      icon: BookOpen,
      stats: { area: "455.00 sq.m.", capacity: 100, books: "50,000+" },
      category: "academic",
      location: "Central Library Building"
    },
    {
      id: 4,
      name: "Computer Centre",
      description: "High-tech computer labs with latest systems, software, and high-speed internet connectivity.",
      image: "https://images.unsplash.com/photo-1581091012184-49b91f4b7a0f?auto=format&fit=crop&w=800&q=80",
      features: ["Latest Systems", "High-speed Internet", "Specialized Software", "24/7 Access"],
      icon: Computer,
      stats: { number: 3, area: "450.00 sq.m.", capacity: 198 },
      category: "technology",
      location: "IT Block"
    },
    {
      id: 5,
      name: "Workshop",
      description: "Fully equipped workshop for practical training in mechanical and manufacturing processes.",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80",
      features: ["Modern Machinery", "Safety Equipment", "Expert Supervision", "Hands-on Training"],
      icon: FlaskConical,
      stats: { area: "227.00 sq.m.", capacity: 66 },
      category: "academic",
      location: "Workshop Block"
    },
    {
      id: 6,
      name: "Seminar Halls",
      description: "Fully equipped seminar halls with advanced audio-visual systems for conferences and events.",
      image: "https://images.unsplash.com/photo-1607438466642-58cbd14f2300?auto=format&fit=crop&w=800&q=80",
      features: ["Audio-Visual Systems", "Comfortable Seating", "Air Conditioned", "Recording Facilities"],
      icon: Users,
      stats: { number: 2, area: "270.00 sq.m.", capacity: 200 },
      category: "academic",
      location: "Main Administration Block"
    },
    {
      id: 7,
      name: "Drawing Hall",
      description: "Specialized hall for engineering drawing and design with drafting equipment and tools.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      features: ["Drafting Tables", "Design Tools", "Natural Lighting", "Expert Guidance"],
      icon: ClipboardList,
      stats: { area: "137.32 sq.m.", capacity: 66 },
      category: "academic",
      location: "Design Studio"
    },
    {
      id: 8,
      name: "Cafeteria/Canteen",
      description: "Hygienic and spacious cafeteria serving nutritious meals and snacks for students and staff.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      features: ["Hygienic Kitchen", "Varied Menu", "Comfortable Seating", "Affordable Pricing"],
      icon: Utensils,
      stats: { area: "150.94 sq.m.", capacity: 120 },
      category: "amenities",
      location: "Central Plaza"
    },
    {
      id: 9,
      name: "Medical Facility",
      description: "Fully equipped medical center with qualified doctors and emergency care facilities.",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
      features: ["Qualified Doctors", "Emergency Care", "Medicines Available", "24/7 Service"],
      icon: Utensils,
      stats: { area: "10.73 sq.m.", beds: 2 },
      category: "amenities",
      location: "Health Center"
    },
    {
      id: 10,
      name: "Administrative Offices",
      description: "Well-organized administrative offices for smooth functioning of college operations.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
      features: ["Principal Office", "HOD Cabins", "Staff Rooms", "Meeting Spaces"],
      icon: Building,
      stats: { area: "190.00 sq.m.", offices: 10 },
      category: "administrative",
      location: "Administration Block"
    },
    {
      id: 11,
      name: "Wi-Fi Campus",
      description: "Seamless high-speed internet connectivity across the entire campus with secure access.",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
      features: ["High-speed Internet", "Campus-wide Coverage", "Secure Access", "IT Support"],
      icon: Wifi,
      stats: { access_points: 200, speed: "1Gbps" },
      category: "technology",
      location: "Campus-wide"
    },
    {
      id: 12,
      name: "Transportation",
      description: "College bus service covering all major routes in the city for students and staff.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      features: ["City-wide Coverage", "AC Buses", "GPS Tracking", "Safe Transport"],
      icon: Bus,
      stats: { buses: 30, routes: 25 },
      category: "amenities",
      location: "Main Gate Transport Hub"
    }
  ];

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Facilities", count: infrastructureData.length },
    { id: "academic", name: "Academic", count: infrastructureData.filter(item => item.category === "academic").length },
    { id: "technology", name: "Technology", count: infrastructureData.filter(item => item.category === "technology").length },
    { id: "amenities", name: "Amenities", count: infrastructureData.filter(item => item.category === "amenities").length },
    { id: "administrative", name: "Administrative", count: infrastructureData.filter(item => item.category === "administrative").length }
  ];

  // Filter data based on category and search query
  const filteredData = infrastructureData.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
            <Building2 className="h-4 w-4 mr-1" /> Campus Infrastructure
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            World-Class Facilities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our campus is equipped with state-of-the-art infrastructure to provide the best learning environment for our students.
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search facilities..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          Showing {filteredData.length} of {infrastructureData.length} facilities
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredData.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="400"
                    height="300"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-sm">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{item.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {Object.entries(item.stats).map(([key, value], idx) => (
                        <span key={idx} className="mr-3">
                          <span className="font-semibold">{value}</span> {key}
                        </span>
                      ))}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      Details <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredData.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No facilities found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-900 text-white p-8 rounded-xl shadow-lg mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Campus Infrastructure at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "12", label: "Classrooms" },
              { value: "58", label: "Laboratories" },
              { value: "455", label: "Library Area (sq.m.)" },
              { value: "100%", label: "Wi-Fi Coverage" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-blue-800 rounded-lg">
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    width="800"
                    height="500"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                    onClick={() => setSelectedItem(null)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                      {selectedItem.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedItem.name}</h2>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{selectedItem.location}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{selectedItem.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedItem.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(selectedItem.stats).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-xl font-bold text-blue-900">
                            {typeof value === 'number' ? value.toLocaleString() : value}
                          </div>
                          <div className="text-sm text-gray-600 capitalize mt-1">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Infrastructure;