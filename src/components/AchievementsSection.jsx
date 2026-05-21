import React, { useRef } from "react";
import Marquee from "react-fast-marquee";

const CollegeAchievements = () => {
  const headerRef = useRef(null);

  const achievements = [
    {
      id: 1,
      title: "Top-Rated Library",
      image: "/campus/Library.jpeg",
      color: "#00BA59",
      gradient: "from-emerald-500 to-green-600",
      description:
        "Ranked as the top library in the state for its vast resources and innovative student support.",
      year: "2024",
      category: "Library Excellence",
    },
    {
      id: 2,
      title: "Drone Innovation Award",
      image: "/campus/drone.jpeg",
      color: "#FF6463",
      gradient: "from-rose-500 to-red-600",
      description: "Recognized for excellence in student-built drone technology.",
      year: "2024",
      category: "Innovation",
    },
    {
      id: 3,
      title: "GATE 2023 Achievement",
      image: "/Achievements/pranesh.png",
      color: "#FECF54",
      gradient: "from-amber-500 to-yellow-600",
      description: "Pranesh Pandey secured AIR 494 in GATE 2023 and is pursuing M.Tech in Civil Engineering at IIT Bombay.",
      year: "2023",
      category: "Student Success",
    },
    {
      id: 4,
      title: "CSVTU Affiliation",
      image: "/herosection/building.jpg",
      color: "#0EA5E9",
      gradient: "from-blue-500 to-cyan-600",
      description: "Affiliated with CSVTU, ensuring quality academics and curriculum.",
      year: "Ongoing",
      category: "Affiliation",
    },
    {
      id: 5,
      title: "Alumni Success",
      image: "/events/event2.jpeg",
      color: "#8B5CF6",
      gradient: "from-purple-500 to-violet-600",
      description: "95% of graduates employed within 6 months of graduation",
      year: "2024",
      category: "Career Outcomes",
    },
  ];

  return (
    <section
      className="relative py-20 px-4 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 overflow-hidden"
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
    

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-semibold text-white tracking-widest uppercase">
              Celebrating Excellence
            </span>
          </div>
          <h2
            className="text-5xl lg:text-7xl font-bold mb-8 py-2 bg-gradient-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-transparent"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            College Achievements
          </h2>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed  rounded-2xl ">
            Recognized for excellence in education, research, and student success.
            Our commitment to innovation and quality continues to set new standards
            in academic excellence.
          </p>
        </div>

        {/* Enhanced Infinite Marquee */}
        <Marquee
          pauseOnHover={true}
          gradient={false}
          speed={50}
          className="py-8"
        >
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="group relative overflow-hidden border border-white rounded-3xl cursor-pointer transform perspective-1000 w-80 flex-shrink-0 mx-4 transition-all duration-500 hover:scale-105 hover:rotate-1"
              style={{ height: "26rem" }}
            >
              {/* Main Card */}
              <div className="relative w-full h-full">
                {/* Background Image with Overlay */}
                <div className="relative w-full h-full overflow-hidden rounded-3xl">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dynamic Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-500" />
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between rounded-3xl">
                  {/* Top Section - Category & Year */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3 animate-pulse"
                        style={{ backgroundColor: achievement.color }}
                      />
                      <span
                        className="text-sm font-bold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-sm border border-white/20"
                        style={{ 
                          color: achievement.color,
                          backgroundColor: `${achievement.color}20`
                        }}
                      >
                        {achievement.category}
                      </span>
                    </div>
                    <span className="text-white/80 text-sm font-semibold bg-black/30 px-3 py-1 rounded-full">
                      {achievement.year}
                    </span>
                  </div>

                  {/* Middle Section - Title & Description */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3
                      className="text-2xl font-bold text-white mb-4 leading-tight transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500"
                      style={{ fontFamily: "'Merriweather', serif" }}
                    >
                      {achievement.title}
                    </h3>
                    <div className="overflow-hidden">
                      <p className="text-white/90 text-base leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 max-h-20">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Section - CTA Button */}
                  <div className="pt-4">
                    <button
                      className={`inline-flex items-center px-6 py-3 rounded-full font-bold text-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 hover:scale-105 bg-gradient-to-r ${achievement.gradient} shadow-lg hover:shadow-xl border-2 border-white/30 hover:border-white/60`}
                    >
                      Read More
                      <svg
                        className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Animated Border */}
                <div
                  className="absolute inset-0 border-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{
                    borderColor: achievement.color,
                    boxShadow: `inset 0 0 0 4px ${achievement.color}, 0 0 30px ${achievement.color}40`,
                  }}
                />

                {/* ID Badge with Enhanced Design */}
                <div
                  className="absolute bottom-5 right-6 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl border-2 border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg"
                  style={{ 
                    backgroundColor: achievement.color,
                    background: `linear-gradient(135deg, ${achievement.color}, ${achievement.color}CC)`
                  }}
                >
                  {achievement.id}
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute -inset-full top-0 transform -skew-x-12 group-hover:animate-shine group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-white/20 group-hover:to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>

        {/* Bottom Decorative Element */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-white/60">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
            <span className="text-sm font-semibold">Scroll to see more achievements</span>
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-1000"></span>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      ` }} />
    </section>
  );
};

export default CollegeAchievements;