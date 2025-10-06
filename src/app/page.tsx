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
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans overflow-hidden">
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/70 border-b border-neutral-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-5 py-4">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold text-white hover:text-neutral-400 transition-colors"
          >
            Pass<span className="text-neutral-500">Vault</span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link
              href="/login"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen bg-black pt-20">
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Text Section */}
          <motion.div
            className="text-center md:text-left md:w-1/2"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6 text-white">
              Secure. Private. <br />
              <span className="text-neutral-400">Effortless.</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-400 mb-10 max-w-md mx-auto md:mx-0">
              Manage your passwords securely — encrypted and locally protected,
              built for the modern web.
            </p>

            <motion.button
              onClick={() => router.push("/login")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-black font-semibold text-lg rounded-full transition-all duration-300 hover:bg-neutral-200 active:scale-95"
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="lg:pl-20 relative w-full md:w-1/2 h-72 sm:h-96 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Image
              src="/landing.jpg"
              alt="Password Vault Illustration"
              fill
              className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 text-center py-6 text-neutral-500 text-sm">
        © {new Date().getFullYear()} PassVault — All Rights Reserved
      </footer>
    </div>
  );
}
