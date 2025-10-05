"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans overflow-hidden">
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800 shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-5 py-4">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold text-white hover:text-gray-300 transition-colors duration-300"
          >
            Password<span className="text-gray-400">Manager</span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Text Section */}
          <motion.div
            className="text-center md:text-left md:w-1/2"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl sm:text-6xl md:text-6xl font-extrabold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
              Secure Your <br /> Digital Life
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-10 max-w-xl mx-auto md:mx-0">
              Store, generate, and manage strong passwords — encrypted, private,
              and always in your control.
            </p>

            <motion.button
              onClick={() => router.push("/login")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gray-100 text-black font-semibold text-lg rounded-full shadow-md transition-all duration-300 hover:bg-gray-300"
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="relative w-full md:w-1/2 h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Image
              src="/landing.jpg"
              alt="Password Manager Illustration"
              fill
              className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} PasswordManager — All Rights Reserved
      </footer>
    </div>
  );
}
