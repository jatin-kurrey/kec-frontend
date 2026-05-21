import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { facultyService } from "../api";
import {
  GraduationCap,
  BookOpen,
  Search,
  Filter,
  Mail,
  Award,
  Calendar,
  ArrowRight,
  X,
  Users,
  Bookmark,
  Star,
  ChevronDown,
  Eye,
  ExternalLink,
  Heart,
  Share2,
} from "lucide-react";




const FacultyPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);
  const [sortBy, setSortBy] = useState("name");

  // Fallback data if API fails
  const staticFaculty = [
    { sno: 1, name: "Dr. SUDESHNA SENGUPTA", role: "ASST PROFESSOR", dept: "HUMANITIES", image: "https://ui-avatars.com/api/?background=random&color=fff&name=Faculty" },
    { sno: 2, name: "Dr. CHAND RAM", role: "ASST PROFESSOR", dept: "APPLIED MATHEMATICS", image: "https://ui-avatars.com/api/?background=random&color=fff&name=Faculty" },
    { sno: 3, name: "Mrs. RICHA SHARMA", role: "ASST PROFESSOR", dept: "APPLIED CHEMISTRY", image: "https://ui-avatars.com/api/?background=random&color=fff&name=Faculty" },
    { sno: 4, name: "Mr. AMIT PANDEY", role: "ASST PROFESSOR", dept: "ELECTRICAL ENGINEERING", image: "https://ui-avatars.com/api/?background=random&color=fff&name=Faculty" },
    { sno: 5, name: "Mr. DEVENDRA DEWANGAN", role: "ASST PROFESSOR", dept: "MECHANICAL ENGINEERING", image: "https://ui-avatars.com/api/?background=random&color=fff&name=Faculty" },
  ];

  const { data: facultyMembers = staticFaculty } = useQuery({
    queryKey: ['faculty'],
    queryFn: async () => {
      const response = await facultyService.getAll();
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      return staticFaculty;
    }
  });

  const departments = ["All", ...new Set(facultyMembers.map((member) => member.dept))];

  const filteredFaculty = facultyMembers
    .filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.role && member.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (member.dept && member.dept.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDept =
        selectedDept === "All" || member.dept === selectedDept;
      return matchesSearch && matchesDept;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-8 md:px-8 md:py-12">
      {/* Header */}
      <section className="py-16 md:py-20 px-4 sm:px-6 text-blue-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full translate-x-1/3 translate-y-1/3 opacity-30 blur-3xl"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6 shadow-sm">
            <GraduationCap className="w-4 h-4 mr-2" />
            Our Distinguished Faculty
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Mentors of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Excellence
            </span>
          </h1>

          <p className="text-lg md:text-xl text-blue-700 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8 px-4">
            At{" "}
            <span className="font-semibold text-blue-700">
              Krishna Engineering College
            </span>
            , our dedicated and experienced faculty members are committed to
            nurturing innovation, knowledge, and excellence among students.
          </p>

          <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Filters */}
      <div className="mb-10 bg-white rounded-2xl p-6 shadow-lg max-w-7xl mx-auto border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-600" />
              <select
                className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                <option value="All">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Bookmark size={20} className="text-slate-600" />
              <select
                className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="experience">Sort by Experience</option>
                <option value="publications">Sort by Publications</option>
              </select>
            </div>
          </div>
        </div>

       
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto mb-6 px-2">
        <p className="text-slate-600">
          Showing{" "}
          <span className="font-semibold">{filteredFaculty.length}</span> of{" "}
          <span className="font-semibold">{facultyMembers.length}</span> faculty
          members
        </p>
      </div>

      {/* Faculty Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto px-4">
        {filteredFaculty.map((faculty, index) => (
          <div
            key={faculty.name}
            className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
            onClick={() => setSelectedMember(faculty)}
          >
            {/* Background decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Image Container */}
            <div className="relative mb-5">
              <div className="w-32 h-32 rounded-full mx-auto overflow-hidden border-4 border-white shadow-xl group-hover:border-blue-100 transition-colors duration-300 ring-2 ring-blue-50">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Department Badge */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-4 py-1.5 rounded-full shadow-lg">
                {faculty.dept}
              </div>
            </div>

            {/* Name and Role */}
            <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-800 transition-colors">
              {faculty.name}
            </h2>
            <p className="text-blue-700 font-semibold text-sm mb-3 bg-blue-50 px-3 py-1 rounded-full inline-block">
              {faculty.role}
            </p>

            {/* Hover Effect Indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFaculty.length === 0 && (
        <div className="text-center py-16 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <Users size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              No faculty members found
            </h3>
            <p className="text-slate-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              onClick={() => {
                setSearchTerm("");
                setSelectedDept("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Faculty Detail Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-10"
              onClick={() => setSelectedMember(null)}
            >
              <X size={20} className="text-slate-600" />
            </button>

            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto md:mx-0">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-center mt-4 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(selectedMember.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-slate-300"
                        }
                      />
                    ))}
                    <span className="text-slate-600 ml-1 text-sm">
                      {selectedMember.rating}
                    </span>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex justify-center gap-3 mt-6">
                    <button className="p-2 bg-blue-100 rounded-lg text-blue-600 hover:bg-blue-200 transition-colors">
                      <Mail size={18} />
                    </button>
                    <button className="p-2 bg-green-100 rounded-lg text-green-600 hover:bg-green-200 transition-colors">
                      <Heart size={18} />
                    </button>
                    <button className="p-2 bg-purple-100 rounded-lg text-purple-600 hover:bg-purple-200 transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">
                    {selectedMember.name}
                  </h2>
                  <p className="text-blue-700 font-medium text-lg mb-3">
                    {selectedMember.role}
                  </p>
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm px-4 py-2 rounded-full inline-block mb-6">
                    {selectedMember.dept} Department
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-slate-600 text-sm">
                          Qualification
                        </div>
                        <div className="text-slate-800 font-medium">
                          {selectedMember.qualification}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Award size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-slate-600 text-sm">Experience</div>
                        <div className="text-slate-800 font-medium">
                          {selectedMember.experience}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl sm:col-span-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <GraduationCap size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-slate-600 text-sm">
                          Specialization
                        </div>
                        <div className="text-slate-800 font-medium">
                          {selectedMember.specialization}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium w-full justify-center">
                    <Mail size={18} />
                    Contact Professor
                  </button>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800 mb-6">
                  Professional Background
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {selectedMember.bio}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <div className="text-blue-700 font-bold text-2xl">
                      {selectedMember.publications}+
                    </div>
                    <div className="text-slate-600 text-sm">Publications</div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <div className="text-blue-700 font-bold text-2xl">
                      {selectedMember.projects}+
                    </div>
                    <div className="text-slate-600 text-sm">
                      Research Projects
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <div className="text-blue-700 font-bold text-2xl">100+</div>
                    <div className="text-slate-600 text-sm">
                      Students Guided
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <div className="text-blue-700 font-bold text-2xl">5+</div>
                    <div className="text-slate-600 text-sm">Awards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyPage;
