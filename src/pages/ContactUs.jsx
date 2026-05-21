"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  Building2,
  GraduationCap,
  Users,
  MessageCircle
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <MapPin className="text-blue-600" size={24} />,
      title: "Our Campus",
      details: "Krishna Engineering College, Behind Smriti Nagar Petrol Pump Junwani, Khamahariya, Bhilai, Chhattisgarh 490020",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Phone className="text-green-600" size={24} />,
      title: "Call Us",
      details: "+91 7587329553\n+91 7000130299",
      bgColor: "bg-green-50"
    },
    {
      icon: <Mail className="text-purple-600" size={24} />,
      title: "Email Us",
      details: "admissions@kecbhilai.com\nkrishnaengineeringcollege@gmail.com",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Clock className="text-orange-600" size={24} />,
      title: "Office Hours",
      details: "Monday - Saturday: 9:00 AM - 5:00 PM\nSunday: Closed",
      bgColor: "bg-orange-50"
    }
  ];

  const stats = [
    { number: "500+", label: "Students Enrolled" },
    { number: "95%", label: "Placement Rate" },
    { number: "50+", label: "Expert Faculty" },
    { number: "15+", label: "Years Experience" }
  ];

  return (
    <div id="contact" className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" />
            Get In Touch With Us
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent ">
            Contact Krishna Engineering College
          </h2>
         
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Ready to begin your engineering journey? Reach out to us for admissions, 
            campus tours, or any questions about our programs and facilities.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl  border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">{stat.number}</div>
              <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
          {/* Left Side - Contact Information */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full xl:w-2/5 space-y-8"
          >
            {/* Contact Information Cards */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start p-6 bg-white rounded-2xl  transition-all duration-300 border border-gray-100"
                >
                  <div className={`p-3 rounded-xl mr-4 flex-shrink-0 ${item.bgColor}`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-800 text-lg mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {item.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
           
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full xl:w-3/5"
          >
            <div className="bg-white rounded-3xl  p-8 md:p-10 border border-gray-100">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Send us a Message</h3>
                <p className="text-gray-600 text-lg">We'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-3 font-semibold">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-3 font-semibold">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-3 font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 1234567890"
                      className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-3 font-semibold">Subject *</label>
                    <select 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 appearance-none bg-white"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="admission">Admission Process</option>
                      <option value="programs">Academic Programs</option>
                      <option value="campus-tour">Campus Tour</option>
                      <option value="placement">Placement & Internships</option>
                      <option value="scholarship">Scholarship Information</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-3 font-semibold">Message *</label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your inquiry or how we can help you..."
                    className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center text-lg disabled:opacity-70 disabled:cursor-not-allowed "
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} className="ml-3" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-20"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-6 md:p-8 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Visit Our Campus</h3>
              <p className="text-gray-600">Located in the educational hub of Bhilai, easily accessible from all parts of the city</p>
            </div>
            <div className="h-80 md:h-96">
              <iframe
                title="Krishna Engineering College Campus Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.0431844472773!2d81.31696617549485!3d21.23013608047009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a293d41cba65b87%3A0xa9e4dad8f8e1e7db!2sKrishna%20Engineering%20College!5e0!3m2!1sen!2sus!4v1758765414200!5m2!1sen!2sus"
                className="w-full h-full"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;