// src/App.jsx
import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import PageLoader from "./components/PageLoader";
import Loader from "./components/Loader";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const AdmissionKEC = lazy(() => import("./pages/Admission"));
const FacilitiesPage = lazy(() => import("./pages/Facilities"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const PlacementPage = lazy(() => import("./pages/Placement"));
const Notice = lazy(() => import("./pages/Notice"));
const Research = lazy(() => import("./pages/Research"));
const DepartmentsPage = lazy(() => import("./pages/DepartmentsPage"));
const DepartmentDetails = lazy(() => import("./pages/DepartmentDetails"));
const FacultyPage = lazy(() => import("./pages/Faculty"));
const MissionVision = lazy(() => import("./pages/MissionVision"));
const Governance = lazy(() => import("./pages/Governance"));
const PrincipalMessage = lazy(() => import("./pages/PrincipalMessage"));
const Infrastructure = lazy(() => import("./pages/Infrastructure"));
const AffiliationAccreditation = lazy(() => import("./pages/AffiliationAccreditation"));
const EventComponent = lazy(() => import("./pages/EventComponent"));
const PressMediaPage = lazy(() => import("./pages/PressMediaPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const AlumniPage = lazy(() => import("./pages/AlumniPage"));
const Hod = lazy(() => import("./pages/Hod"));
const Courses = lazy(() => import("./pages/Courses"));
const Drone = lazy(() => import("./pages/Drone"));
const EV = lazy(() => import("./pages/EV"));
const AdvancedCodingRegistration = lazy(() => import("./pages/Coding"));
const ChargingTechnologyRegistration = lazy(() => import("./pages/FastCharging"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin Components
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const AdminLogin = lazy(() => import("./admin/Login"));
const LeadershipManager = lazy(() => import("./admin/pages/LeadershipManager"));
const DepartmentManager = lazy(() => import("./admin/pages/DepartmentManager"));
const FacultyManager = lazy(() => import("./admin/pages/FacultyManager"));
const FacilityManager = lazy(() => import("./admin/pages/FacilityManager"));
const CourseManager = lazy(() => import("./admin/pages/CourseManager"));
const ResearchManager = lazy(() => import("./admin/pages/ResearchManager"));
const AdmissionManager = lazy(() => import("./admin/pages/AdmissionManager"));
const GalleryManager = lazy(() => import("./admin/pages/GalleryManager"));
const AdminManager = lazy(() => import("./admin/pages/AdminManager"));
const GalleryAdminLayout = lazy(() => import("./admin/GalleryAdminLayout"));
const GalleryAdminLogin = lazy(() => import("./admin/GalleryAdminLogin"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageLoader>
        <Layout />
      </PageLoader>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <ContactUs /> },
      { path: "departments", element: <DepartmentsPage /> },
      { path: "departments/:id", element: <DepartmentDetails /> },
      { path: "courses", element: <Courses /> },
      { path: "admission", element: <AdmissionKEC /> },
      { path: "facilities", element: <FacilitiesPage /> },
      { path: "placements", element: <PlacementPage /> },
      { path: "notice", element: <Notice /> },
      { path: "research", element: <Research /> },
      { path: "alumni", element: <AlumniPage /> },
      { path: "faculty", element: <FacultyPage /> },
      { path: "mission", element: <MissionVision /> },
      { path: "governance", element: <Governance /> },
      { path: "principal", element: <PrincipalMessage /> },
      { path: "infrastructure", element: <Infrastructure /> },
      { path: "hod", element: <Hod /> },
      { path: "affiliation", element: <AffiliationAccreditation /> },
      { path: "event", element: <EventComponent /> },
      { path: "press", element: <PressMediaPage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "drone", element: <Drone /> },
      { path: "ev", element: <EV /> },
      { path: "charging", element: <ChargingTechnologyRegistration /> },
      { path: "coding", element: <AdvancedCodingRegistration /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "departments", element: <DepartmentManager /> },
      { path: "faculty", element: <FacultyManager /> },
      { path: "courses", element: <CourseManager /> },
      { path: "research", element: <ResearchManager /> },
      { path: "admission", element: <AdmissionManager /> },
      { path: "facilities", element: <FacilityManager /> },
      { path: "content", element: <div className="text-slate-900 p-10 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Content Manager</h2>
          <p className="text-slate-500">This module is currently under development.</p>
        </div> 
      },
      { path: "gallery", element: <GalleryManager /> },
      { path: "leadership", element: <LeadershipManager /> },
      { path: "settings", element: <AdminManager /> },
    ]
  },
  {
    path: "/admin/login",
    element: <AdminLogin />
  },
  {
    path: "/gallery-admin",
    element: <GalleryAdminLayout />,
    children: [
      { index: true, element: <GalleryManager /> }
    ]
  },
  {
    path: "/gallery-admin/login",
    element: <GalleryAdminLogin />
  }
]);

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
