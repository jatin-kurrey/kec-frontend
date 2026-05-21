"use client";
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, FileText, CheckCircle2 } from "lucide-react";

const ApplyNow = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 px-6 md:px-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Apply Now - Krishna Engineering College
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl max-w-2xl mx-auto"
        >
          Take the first step towards your future with us. Apply for admissions
          and be part of a legacy of innovation, growth, and excellence.
        </motion.p>
      </section>

      {/* Admission Process */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition"
          >
            <GraduationCap className="w-12 h-12 text-blue-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Eligibility</h3>
            <p className="text-gray-600">
              Candidates must have passed 10+2 with PCM/PCB and valid entrance
              exam scores (JEE/State Exams).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition"
          >
            <FileText className="w-12 h-12 text-blue-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Required Documents</h3>
            <ul className="text-gray-600 text-left list-disc list-inside">
              <li>10th & 12th Mark Sheets</li>
              <li>Entrance Exam Score Card</li>
              <li>Passport Size Photographs</li>
              <li>Transfer Certificate</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition"
          >
            <CheckCircle2 className="w-12 h-12 text-blue-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Selection Process</h3>
            <p className="text-gray-600">
              Admission is based on merit and counseling rounds as per
              university norms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Apply Button */}
      <section className="text-center py-12">
        <motion.a
          href="/apply-form"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="px-8 py-4 bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-800 transition"
        >
          Apply Now
        </motion.a>
      </section>
    </div>
  );
};

export default ApplyNow;
