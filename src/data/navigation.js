import { 
  Users, 
  Building, 
  Mic, 
  Award, 
  Library, 
  BookOpen, 
  GraduationCap, 
  Beaker, 
  UserPlus, 
  BarChart3, 
  Bookmark, 
  ClipboardList, 
  FileText, 
  MapPin, 
  Image, 
  Briefcase, 
  School, 
  Calendar, 
  Zap, 
  Plug, 
  Code, 
  Car, 
  Newspaper, 
  Phone 
} from "lucide-react";

export const colors = {
  primary: "#1e40af",      // Deep blue
  secondary: "#0891b2",    // Cyan
  tertiary: "#ea580c",     // Orange
  accent: "#7c3aed",       // Purple
  success: "#059669",      // Emerald
  dark: "#0f172a",         // Slate 900
  highlight: "#facc15",    // Yellow
  darkRed: "#b23b3c",
  neutral: "#0369a1",  
  danger: "#dc2626", 
  pink: "#7c3aed",  
  gradient: {
    primary: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
    secondary: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    tertiary: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
  }
};

export const affiliations = [
  {
    img: "https://i0.wp.com/sjbit.edu.in/wp-content/uploads/2021/07/NAAC-Logo-250x250-1.png?ssl=1",
    label: "NAAC Accredited",
    color: "text-orange-500",
    bgColor: "#fed7aa",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/en/5/52/National_Institutional_Ranking_Framework_logo.png",
    label: "NIRF Ranked",
    color: "text-green-500",
    bgColor: "#bbf7d0",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx0MXjwnJVBVGn2aq6GwXvS7M4UV_EeksTlQ&s",
    label: "NBA Accredited",
    color: "text-blue-500",
    bgColor: "#bfdbfe",
  },
  {
    img: "https://static.wixstatic.com/media/9d31c9_8d868574531544b78f5dcf11679c32c5~mv2.png/v1/fill/w_509,h_491,al_c/9d31c9_8d868574531544b78f5dcf11679c32c5~mv2.png",
    label: "Approved by AICTE",
    color: "text-purple-500",
    bgColor: "#e9d5ff",
  },
];

export const mainCategories = [
  {
    name: "About",
    path: "/about",
    icon: Users,
    description: "Discover our history and leadership",
    color: colors.secondary,
    submenu: [
      {
        name: "About College",
        path: "/about",
        icon: Building,
        description: "Our journey and achievements",
        color: colors.secondary,
      },
      {
        name: "Principal's Message",
        path: "/principal",
        icon: Mic,
        description: "Words from our leadership",
        color: colors.secondary,
      },
      {
        name: "HOD",
        path: "/hod",
        icon: Users,
        description: "Heads of Departments",
        color: colors.secondary,
      },
      {
        name: "Mission & Vision",
        path: "/mission",
        icon: Award,
        description: "Our guiding principles",
        color: colors.secondary,
      },
      {
        name: "Governance",
        path: "/governance",
        icon: Library,
        description: "Management structure",
        color: colors.secondary,
      },
    ],
  },
  {
    name: "Academics",
    path: "/departments",
    icon: BookOpen,
    description: "Programs and departments",
    color: colors.tertiary,
    submenu: [
      {
        name: "Departments",
        path: "/departments",
        icon: BookOpen,
        description: "Explore our academic departments",
        color: colors.tertiary,
      },
      {
        name: "Courses",
        path: "/courses",
        icon: GraduationCap,
        description: "Programs we offer",
        color: colors.tertiary,
      },
      {
        name: "Faculty",
        path: "/faculty",
        icon: Users,
        description: "Meet our professors",
        color: colors.tertiary,
      },
      {
        name: "Research",
        path: "/research",
        icon: Beaker,
        description: "Innovation and projects",
        color: colors.tertiary,
      },
    ],
  },
  {
    name: "Admission",
    path: "/admission",
    icon: GraduationCap,
    description: "Join our institution",
    color: colors.primary,
    submenu: [
      {
        name: "Process",
        path: "/admission#process",
        icon: BarChart3,
        description: "Step-by-step guide",
        color: colors.primary,
      },
      {
        name: "Requirements",
        path: "/admission#requirements",
        icon: Bookmark,
        description: "Eligibility criteria",
        color: colors.primary,
      },
      {
        name: "Scholarships",
        path: "/admission#scholarships",
        icon: Award,
        description: "Financial assistance",
        color: colors.primary,
      },
      {
        name: "Super 40 Entrance Portal",
        path: "https://super40-frontend.vercel.app/",
        icon: Award,
        description: "Take the entrance exam online",
        color: colors.primary,
      },
    ],
  },
  {
    name: "Campus",
    path: "/facilities",
    icon: Building,
    description: "Our facilities and infrastructure",
    color: colors.highlight,
    submenu: [
      {
        name: "Facilities",
        path: "/facilities",
        icon: Building,
        description: "Campus amenities",
        color: colors.highlight,
      },
      {
        name: "Infrastructure",
        path: "/infrastructure",
        icon: MapPin,
        description: "Our campus layout",
        color: colors.highlight,
      },
      {
        name: "Gallery",
        path: "/gallery",
        icon: Image,
        description: "Campus visuals",
        color: colors.highlight,
      },
    ],
  },
  {
    name: "Placements",
    path: "/placements",
    icon: Briefcase,
    description: "Career opportunities",
    color: colors.darkRed,
    submenu: [
      {
        name: "Placement Stats",
        path: "/placements#stats",
        icon: BarChart3,
        description: "Our success records",
        color: colors.darkRed,
      },
      {
        name: "Recruiters",
        path: "/placements#recruiters",
        icon: Briefcase,
        description: "Our industry partners",
        color: colors.darkRed,
      },
      {
        name: "Training",
        path: "/placements#training",
        icon: School,
        description: "Career preparation",
        color: colors.darkRed,
      },
    ],
  },
  {
    name: "News & Events",
    path: "#news-events",
    icon: Calendar,
    description: "Latest updates and happenings at KEC",
    color: colors.pink,
    isScrollLink: true,
  },
  {
    name: "Summer Courses",
    path: "/courses",
    icon: BookOpen,
    description: "Explore our specialized courses",
    color: colors.neutral,
    submenu: [
      {
        name: "Drone Technology",
        path: "/drone",
        icon: Zap,
        description: "Learn cutting-edge drone tech",
        color: colors.neutral,
      },
      {
        name: "EV Charging Station",
        path: "/charging",
        icon: Plug,
        description: "Electric Vehicle Charging Station setup",
        color: colors.neutral,
      },
      {
        name: "Advanced Coding",
        path: "/coding",
        icon: Code,
        description: "Master advanced programming concepts",
        color: colors.neutral,
      },
      {
        name: "Electrical Vehicle Design",
        path: "/ev",
        icon: Car,
        description: "Learn electric vehicle design",
        color: colors.neutral,
      },
    ],
  },
  {
    name: "Connect",
    path: "/contact",
    icon: Bookmark,
    description: "More ways to engage",
    color: colors.danger,
    submenu: [
      {
        name: "Notices",
        path: "/notice",
        icon: Newspaper,
        description: "Latest announcements",
        color: colors.danger,
      },
      {
        name: "Events",
        path: "/event",
        icon: Calendar,
        description: "Upcoming activities",
        color: colors.danger,
      },
      {
        name: "Press",
        path: "/press",
        icon: Bookmark,
        description: "Media coverage",
        color: colors.danger,
      },
      {
        name: "Alumni",
        path: "/alumni",
        icon: School,
        description: "Our graduates network",
        color: colors.danger,
      },
      {
        name: "Affiliation",
        path: "/affiliation",
        icon: Award,
        description: "Accreditations",
        color: colors.danger,
      },
      {
        name: "Contact",
        path: "/contact",
        icon: Phone,
        description: "Get in touch with us",
        color: colors.danger,
      },
    ],
  },
];
