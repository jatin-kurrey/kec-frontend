"use client";
import React from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <AlertTriangle className="w-20 h-20 text-red-500 drop-shadow-lg" />
      </motion.div>

      {/* 404 Title */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-6xl font-extrabold text-gray-800 mb-4"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-lg text-gray-600 mb-8 max-w-md"
      >
        Oops! The page you are looking for does not exist at{" "}
        <span className="font-semibold text-blue-600">
          Krishna Engineering College
        </span>
        . It might have been moved or deleted.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="flex gap-4"
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-5 py-3 bg-gray-200 text-gray-700 rounded-2xl shadow-md hover:bg-gray-300 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
