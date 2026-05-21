import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, MapPin, Clock, Users, ArrowRight, Filter, Search } from "lucide-react";
import { contentService } from "../api";

const EventComponent = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await contentService.getEvents();
        setEventsData(res.data);
      } catch (err) {
        console.error("Fetch Events Error:", err);
      }
    };
    fetchEvents();
  }, []);

  const categories = ["All", ...new Set(eventsData.map(event => event.category))];

  const filteredEvents = eventsData.filter(event => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const upcomingEvents = filteredEvents.filter(event => event.status === "upcoming");
  const pastEvents = filteredEvents.filter(event => event.status === "past");

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            College Events
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore the exciting events, workshops, and seminars happening on our campus.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="bg-gray-50 rounded-xl p-4 mb-8 shadow-sm"
>
  <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
    {/* Search Box */}
    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 w-full md:w-auto">
      <Search size={18} className="text-gray-500" />
      <input
        type="text"
        placeholder="Search events..."
        className="bg-transparent outline-none w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Filters */}
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex items-center gap-2 text-gray-700">
        <Filter size={18} />
        <span>Filter by Category:</span>
      </div>

      {/* All Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === "All"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => setSelectedCategory("All")}
      >
        All
      </motion.button>

      {/* Dynamic Categories */}
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </motion.button>
      ))}
    </div>
  </div>
</motion.div>


        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Upcoming Events
            </h3>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer group border border-gray-100"
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedEvent(event)}
                  layout
                >
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      {event.category}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Calendar size={14} /> 
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Clock size={12} /> {event.time}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin size={14} /> {event.location}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Users size={14} /> {event.attendees}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
              Past Events
            </h3>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className="relative bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer group border border-gray-100 opacity-80"
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedEvent(event)}
                  layout
                >
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <span className="absolute top-4 left-4 bg-gray-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      {event.category}
                    </span>
                    <div className="absolute bottom-4 left-4 text-white text-sm">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPin size={14} /> {event.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-2xl shadow-md"
          >
            <div className="text-gray-400 mb-4 text-lg">No events found matching your criteria</div>
            <button 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2 mx-auto"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear filters <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
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
                onClick={() => setSelectedEvent(null)}
              >
                <X size={20} />
              </button>
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                    {selectedEvent.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedEvent.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} /> 
                      {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} /> {selectedEvent.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} /> {selectedEvent.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-blue-700 font-bold text-xl">{selectedEvent.attendees}+</div>
                    <div className="text-gray-600 text-sm">Expected Attendees</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-blue-700 font-bold text-xl">
                      {selectedEvent.status === "upcoming" ? "Upcoming" : "Completed"}
                    </div>
                    <div className="text-gray-600 text-sm">Event Status</div>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-800 mb-3">About This Event</h4>
                <p className="text-gray-700 mb-6 leading-relaxed">{selectedEvent.description}</p>
                
                {selectedEvent.status === "upcoming" && (
                  <div className="flex gap-4">
                    <a 
                      href={selectedEvent.registrationLink}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex-1 text-center"
                    >
                      Register Now
                    </a>
                    <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex-1">
                      Add to Calendar
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventComponent;