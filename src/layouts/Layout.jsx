import React, { useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lenis from "@studio-freight/lenis";
import ScrollToTop from "../components/ScrollToTop";
import Topbar from "../components/Topbar";
import CategoryMenu from "../components/CategoryMenu";
import Loader from "../components/Loader"; // 👈 import loader

const Layout = () => {
  const navigation = useNavigation(); // 👈 detects route changes

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Show loader while route is changing */}
      {navigation.state === "loading" && <Loader />}

      <ScrollToTop />
      <div className="hidden lg:block">
    <Topbar />
  </div>

      <CategoryMenu />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default Layout;
