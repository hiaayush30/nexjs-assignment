"use client";

import { motion, Variants } from "framer-motion";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { Spinner } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

// Animation variants
const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.0, 0.0, 0.58, 1.0] },
  },
};

const formVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: 0.3, ease: [0.0, 0.0, 0.58, 1.0] },
  },
};

const inputVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.0, 0.0, 0.58, 1.0] },
  },
};

const buttonVariants = {
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
};

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/auth/register", { email, password });
      alert("User registered successfully!");
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-neutral-950 text-neutral-100 font-sans p-4">
      <motion.div
        className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800 p-8 sm:p-10 rounded-2xl shadow-lg w-full max-w-md text-center"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.h1
          className="text-4xl font-extrabold text-neutral-100 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Create Account
        </motion.h1>

        <p className="text-neutral-400 mb-8 text-base">
          Sign up to start managing your passwords securely.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 text-left"
          variants={formVariants}
        >
          <motion.div variants={inputVariants}>
            <label className="block mb-2 text-sm text-neutral-300">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-700 focus:ring-2 focus:ring-neutral-400 focus:border-transparent text-sm placeholder-neutral-500 transition-all duration-300"
              required
            />
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-xs text-neutral-500 mt-2"
            >
              📧 An OTP will be sent to this email for verification.
            </motion.p>
          </motion.div>

          <motion.div variants={inputVariants}>
            <label className="block mb-2 text-sm text-neutral-300">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-700 focus:ring-2 focus:ring-neutral-400 focus:border-transparent text-sm placeholder-neutral-500 transition-all duration-300"
              required
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <label className="block mb-2 text-sm text-neutral-300">
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-700 focus:ring-2 focus:ring-neutral-400 focus:border-transparent text-sm placeholder-neutral-500 transition-all duration-300"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="flex justify-center items-center w-full py-3 bg-white text-neutral-900 font-semibold text-lg rounded-lg shadow-sm hover:bg-neutral-200 active:scale-95 transition-all duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={loading}
          >
            {loading ? <Spinner size={"3"} /> : "Sign Up"}
          </motion.button>
        </motion.form>

        <motion.p className="mt-8 text-neutral-500 text-sm">
          Already have an account?{" "}
          <Link href="/login" passHref legacyBehavior>
            <motion.a
              className="text-white font-medium hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Log In
            </motion.a>
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
