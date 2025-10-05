"use client";
import { DoubleArrowDownIcon } from "@radix-ui/react-icons";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

// Animation Variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.0, 0.0, 0.58, 1.0] as const },
  },
};

const imagePlaceholderVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export default function Home() {
  const divRef = useRef<null | HTMLDivElement>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans overflow-hidden">
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 p-4 bg-gray-800 bg-opacity-90 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl cursor-pointer font-extrabold text-blue-400 tracking-tight"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Password-Manager
          </motion.h1>
          <div className="hidden md:flex space-x-8">
            <Link
              href="/login"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-lg"
            >
              Signup/Login
            </Link>
          </div>
          <button className="md:hidden text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Hero Text */}
          <motion.div
            className="text-center md:text-left md:w-1/2 order-last md:order-first"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <motion.h2 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Secure Your Digital Life with Password-Manager
            </motion.h2>
            <motion.p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-10 max-w-4xl mx-auto md:mx-0">
              Generate, store, and manage strong passwords with complete privacy.
            </motion.p>

            <div className="flex items-center max-md:justify-center">
              <motion.button
                className="px-10 py-4 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xl rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
                onClick={() => router.push("/login")}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative w-full overflow-hidden md:w-1/2 h-80 sm:h-96 rounded-xl shadow-lg flex items-center justify-center"
            variants={imagePlaceholderVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          >
            <Image src="/PasswordHero.jpg" alt="Password Manager" fill className="object-cover" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
