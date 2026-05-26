import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";
import { leadershipService, contentService } from "../api";
import { Check, Award, Users, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LeadershipProfiles = () => {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const [activeLeader, setActiveLeader] = useState(null);
  const { data: leaders = [], isLoading } = useQuery({
    queryKey: ['leadership'],
    queryFn: async () => {
      const res = await leadershipService.getAll();
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      
      const execRoles = ["Chairman", "Secretary", "Vice-Chairman"];
      const filtered = data.filter(leader => 
        execRoles.some(role => leader.role.toLowerCase().includes(role.toLowerCase()))
      );
      
      if (filtered.length === 0) {
        return [
          {
            id: "L01",
            name: "Mr. Anand Kumar Tripathi",
            role: "Chairman, Krishna Engineering College & Vice-Chairman, KES",
            bio: "A visionary leader shaping the growth of Krishna Engineering College and contributing significantly as Vice-Chairman of Krishna Education Society.",
            image: "/leadership/anandKumar.jpeg",
            color: "#FF7F50",
            stats: { experience: "15+ Years", initiatives: "50+", leadership: "Visionary" },
            achievements: [
              "Chairman of Krishna Engineering College",
              "Vice-Chairman of Krishna Education Society",
              "Driving academic excellence and innovation in education"
            ]
          },
          {
            id: "L02",
            name: "Mr. M. M. Tripathi",
            role: "Chairman, Krishna Education Society",
            bio: "Providing strong leadership and guidance as Chairman of Krishna Education Society, fostering an environment of learning and growth.",
            image: "https://www.kecbhilai.com/images/MANAGEMENT%20&%20HIGHER%20AUTHORITIES/mmtripathi.jpg",
            color: "#00C950",
            stats: { experience: "20+ Years", initiatives: "100+", leadership: "Strategic" },
            achievements: [
              "Chairman of Krishna Education Society",
              "Promoting quality education and values",
              "Champion of community-driven education"
            ]
          },
          {
            id: "L03",
            name: "Mr. Pramod Kumar Tripathi",
            role: "Secretary, Krishna Education Society",
            bio: "Dedicated to the mission of Krishna Education Society, ensuring high standards in education and administration.",
            image: "https://www.kecbhilai.com/images/MANAGEMENT%20&%20HIGHER%20AUTHORITIES/pramodtripathi.jpg",
            color: "#FA2C37",
            stats: { experience: "12+ Years", initiatives: "75+", leadership: "Operational" },
            achievements: [
              "Secretary of Krishna Education Society",
              "Strengthening academic and cultural initiatives",
              "Committed to holistic student development"
            ]
          }
        ];
      }

      filtered.sort((a, b) => (a.priority || 0) - (b.priority || 0));

      return filtered.map(leader => {
        let achievements = [];
        if (leader.achievements) {
          try {
            achievements = typeof leader.achievements === 'string' ? JSON.parse(leader.achievements) : leader.achievements;
          } catch(e) {
            console.error(e);
          }
        }
        if (!Array.isArray(achievements) || achievements.length === 0) {
          achievements = [
            "Promoting quality education and values",
            "Champion of community-driven education",
            "Committed to holistic student development"
          ];
        }

        let color = "#3B82F6";
        let stats = {
          experience: "15+ Years",
          initiatives: "50+",
          leadership: "Visionary"
        };

        const name = leader.name.toLowerCase();
        if (name.includes("anand")) {
          color = "#FF7F50";
          stats = {
            experience: leader.experience || "15+ Years",
            initiatives: "50+",
            leadership: "Visionary"
          };
        } else if (name.includes("m. m.") || name.includes("m.m.")) {
          color = "#00C950";
          stats = {
            experience: leader.experience || "20+ Years",
            initiatives: "100+",
            leadership: "Strategic"
          };
        } else if (name.includes("pramod")) {
          color = "#FA2C37";
          stats = {
            experience: leader.experience || "12+ Years",
            initiatives: "75+",
            leadership: "Operational"
          };
        }

        return {
          id: leader.id,
          name: leader.name,
          role: leader.role,
          bio: leader.bio,
          image: leader.image ? (leader.image.startsWith('http') || leader.image.startsWith('/') ? leader.image : `${contentService.getBaseUrl()}/${leader.image}`) : "/leadership/anandKumar.jpeg",
          color: color,
          stats: stats,
          achievements: achievements
        };
      });
    }
  });

  useEffect(() => {
    if (leaders.length > 0 && !activeLeader) {
      setActiveLeader(leaders[0]);
    }
  }, [leaders, activeLeader]);

  useEffect(() => {
    if (leaders.length === 0) return;
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      cards.forEach((card, i) => {
        // Smooth entrance animation for each card
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "top center+=100",
              scrub: 0.5,
              overwrite: "auto"
            }
          }
        );

        // Update the active leader preview when the card is in focus
        ScrollTrigger.create({
          trigger: card,
          start: "top center+=200",
          end: "bottom center+=200",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveLeader(leaders[i]);
            }
          },
          onUpdate: (self) => {
            if (self.isActive && self.progress > 0.1) {
              setActiveLeader(leaders[i]);
            }
          }
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, [leaders]);

  if (isLoading) return null;

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
            Executive Leadership
          </div>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent mb-6">
            Leadership Profiles
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover visionary leaders shaping industries through innovation,
            strategy, and transformative leadership.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Sidebar - Active Leader Preview */}
          <div className="lg:w-2/5">
            <div className="sticky top-54">
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-blue-100/50 ">
                {activeLeader && (
                  <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
                    {/* Image Section */}
                    <div className="relative w-full aspect-square max-h-80 lg:max-h-96">
                      <img
                        src={activeLeader.image}
                        alt={activeLeader.name}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Gradient Overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(45deg, ${activeLeader.color}40, transparent)`,
                        }}
                      />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                          {activeLeader.name}
                        </h2>
                        <div
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold text-white border border-white/30 mb-4"
                          style={{ backgroundColor: activeLeader.color }}
                        >
                          {activeLeader.role}
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
                          {activeLeader.bio}
                        </p>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4 group-hover:opacity-0 transition-opacity duration-300">
                      <div
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm border border-white/20"
                        style={{ backgroundColor: `${activeLeader.color}80` }}
                      >
                        Active Leader
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats Section */}
                {activeLeader && (
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                      <Users
                        className="w-5 h-5 mx-auto mb-2"
                        style={{ color: activeLeader.color }}
                      />
                      <div className="text-sm font-semibold text-gray-900">
                        {activeLeader.stats.experience}
                      </div>
                      <div className="text-xs text-gray-600">Experience</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                      <Target
                        className="w-5 h-5 mx-auto mb-2"
                        style={{ color: activeLeader.color }}
                      />
                      <div className="text-sm font-semibold text-gray-900">
                        {activeLeader.stats.initiatives}
                      </div>
                      <div className="text-xs text-gray-600">Initiatives</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-200">
                      <Award
                        className="w-5 h-5 mx-auto mb-2"
                        style={{ color: activeLeader.color }}
                      />
                      <div className="text-sm font-semibold text-gray-900">
                        {activeLeader.stats.leadership}
                      </div>
                      <div className="text-xs text-gray-600">Style</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Leader Cards */}
          <div className="lg:w-3/5">
            <div className="space-y-6 lg:space-y-8 relative">
              {leaders.map((leader, index) => (
                <div
                  key={leader.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="group bg-white rounded-xl relative overflow-hidden border-l-0 transition-shadow duration-300"
                  style={{ willChange: "transform, opacity" }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1"
                    style={{ backgroundColor: leader.color }}
                  ></div>

                  <div className="p-8">
                    <div className="flex items-start mb-6 space-x-4">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      {/* Status Indicator */}

                      <div className="flex-1">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 font-merriweather group-hover:text-gray-800 transition-colors">
                          {leader.name}
                        </h3>
                        <div
                          className="hidden  md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg"
                          style={{ backgroundColor: leader.color }}
                        >
                          <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                          {leader.role}
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="text-gray-700 leading-relaxed text-lg font-lato bg-gray-100/50 p-4 rounded-xl border border-gray-200/50">
                        {leader.bio}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-lg flex items-center gap-2 mb-4 font-merriweather">
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: leader.color }}
                        ></div>
                        Key Achievements
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {leader.achievements.map((achievement, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200/60 hover:border-gray-300/80 transition-all duration-300 group/achievement hover:shadow-md"
                          >
                            {/* Check Icon */}
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-transform duration-300 group-hover/achievement:scale-110"
                              style={{ backgroundColor: leader.color }}
                            >
                              <Check size={16} />
                            </div>

                            {/* Achievement Text */}
                            <span className="text-gray-700 font-medium font-lato text-sm leading-tight">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200/50">
                      <div className="flex items-center justify-between text-sm text-gray-600 font-lato">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Academic Leadership
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Institutional Guidance
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipProfiles;
