import React from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Heart,
  GraduationCap,
  Award,
  Clock,
  Send,
  Building,
  Users,
  BookOpen,
  Target,
  ArrowUp,
  Map,
  Navigation,
  Globe,
  Star
} from "lucide-react";

const Footer = () => {
  // Modern color palette
  const colors = {
    primary: "#2563eb",
    secondary: "#7c3aed",
    accent: "#f59e0b",
    success: "#10b981",
    dark: "#0f172a",
    light: "#f8fafc"
  };

  const quickLinks = [
    { name: "Home", url: "/", icon: Building, color: colors.primary },
    { name: "Admissions", url: "/admission", icon: Users, color: colors.secondary },
    { name: "Departments", url: "/departments", icon: BookOpen, color: colors.accent },
    { name: "Placements", url: "/placements", icon: Target, color: colors.success },
    { name: "Event", url: "/events", icon: Clock, color: colors.primary },
    { name: "Contact", url: "/contact", icon: Send, color: colors.secondary },
  ];

  const contactInfo = [
    {
      icon: Phone,
      text: "+91 7000130299",
      subtext: "+91 7587329553",
      color: colors.success
    },
    {
      icon: Phone,
      text: "WhatsApp: +91 92440 05187",
      subtext: "",
      color: colors.success
    },
    {
      icon: Mail,
      text: "admissions@kecbhilai.com",
      subtext: "krishnaengineeringcollege@gmail.com",
      color: colors.primary
    },
    {
      icon: MapPin,
      text: "Behind Smriti Nagar Petrol Pump",
      subtext: "Junwani, Khamahariya, Bhilai",
      color: colors.accent
    }
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      url: "https://www.facebook.com/kecbhilaioffical/", 
      name: "Facebook",
      color: colors.primary,
    },
    { 
      icon: Instagram, 
      url: "https://www.instagram.com/kec_bhilai/", 
      name: "Instagram",
      color: colors.secondary,
    },
    { 
      icon: Twitter, 
      url: "javascript:void(0)", 
      name: "Twitter",
      color: colors.primary,
    },
   
  ];

  const features = [
    { text: "AICTE Approved", icon: Award, color: colors.accent },
    { text: "CSVTU Affiliated", icon: GraduationCap, color: colors.success },
    { text: "Industry Partnerships", icon: Users, color: colors.primary },
    { text: "Modern Infrastructure", icon: Building, color: colors.secondary }
  ];

  const kpsSchools = [
    "KPS Nehru Nagar", "KPS Raipur", "KPS Bilaspur", 
    "KPS Naya Raipur", "KPS Sundernagar", "KPS Sarona",
    "KPS Durg", "KPS Utai", "KPS Sindhiya Nagar"
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white px-4">
      {/* Stats Banner */}
      

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto  py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 xl:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  Krishna Engineering College
                </h3>
                <p className="text-slate-400 text-sm">Excellence in Technical Education</p>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              Premier institution nurturing future engineers with cutting-edge education, 
              industry collaboration, and innovative research since 2009.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10"
                >
                  <feature.icon className="w-4 h-4" style={{ color: feature.color }} />
                  <span className="text-xs font-medium text-slate-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-slate-300">Follow Us</h4>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                    style={{ borderColor: `${social.color}30` }}
                  >
                    <social.icon 
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                      style={{ color: social.color }} 
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-400" />
              Quick Links
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {quickLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div 
                    className="p-2 rounded-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${link.color}20` }}
                  >
                    <link.icon className="w-4 h-4" style={{ color: link.color }} />
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors font-medium">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-green-400" />
              Contact Info
            </h4>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div 
                    className="p-2 rounded-lg flex-shrink-0 mt-1"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{item.text}</p>
                    {item.subtext && (
                      <p className="text-slate-400 text-xs mt-1">{item.subtext}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Map className="w-5 h-5 text-orange-400" />
              Visit Campus
            </h4>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.0431844472773!2d81.31696617549485!3d21.23013608047009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a293d41cba65b87%3A0xa9e4dad8f8e1e7db!2sKrishna%20Engineering%20College!5e0!3m2!1sen!2sus!4v1758765414200!5m2!1sen!2sus"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Krishna Engineering College Location"
                className="w-full h-48"
              />
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call
              </button>
              <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </button>
            </div>
          </div>
        </div>

        {/* KPS Group Section */}
        <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl p-6 mb-8 border border-white/10">
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-400" />
            KPS Group of Institutions
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {kpsSchools.map((school, index) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-sm text-slate-300">{school}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-4 text-slate-400 flex-wrap">
              <p className="text-sm flex items-center gap-2">
                © {new Date().getFullYear()} Krishna Engineering College
                <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                All rights reserved
              </p>
             
            </div>

            {/* Policy Links */}
            <div className="flex items-center gap-6 flex-wrap">
              {/* {["Privacy Policy", "Terms of Service", "Sitemap", "Careers"].map((item, index) => (
                <a 
                  key={index}
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                >
                  {item}
                </a>
              ))} */}

<div className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20">
                <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
                <span>Made with passion by KSS Team</span>
              </div>
            </div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2 group"
            >
              <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
              <span className="text-sm font-medium">Back to Top</span>
            </button>
          </div>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;