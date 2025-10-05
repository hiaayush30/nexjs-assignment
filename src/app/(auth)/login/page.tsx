"use client";

import { motion, Variants } from "framer-motion";
import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Separator, Spinner } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

const inputVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

const buttonVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
    setLoading(false);
  };

  return (
    <div className="pt-24 min-h-screen bg-black text-gray-100 font-sans flex flex-col items-center justify-center p-4">
      <motion.div
        className="bg-stone-900/70 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md text-center border border-gray-800"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.h1
          className="text-4xl font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome Back
        </motion.h1>

        <p className="text-gray-400 mb-10 text-lg">
          Log in to access your password vault.
        </p>

        <motion.form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={inputVariants}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-stone-800 border border-stone-700 focus:ring-2 focus:ring-gray-400 focus:border-transparent text-base placeholder-gray-400 transition-all duration-300"
              required
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-stone-800 border border-stone-700 focus:ring-2 focus:ring-gray-400 focus:border-transparent text-base placeholder-gray-400 transition-all duration-300"
              required
            />
          </motion.div>

          <motion.button
            disabled={loading}
            type="submit"
            className="flex items-center justify-center w-full py-3 bg-white text-black font-semibold text-lg rounded-lg shadow-md transition-all duration-300 hover:bg-gray-200 disabled:opacity-70"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {loading ? <Spinner size={"3"} /> : "Log In"}
          </motion.button>
        </motion.form>

        <Separator className="my-6 border-gray-700" />

        <motion.p className="mt-6 text-gray-400 text-md">
          Don’t have an account?{" "}
          <Link href="/signup" passHref legacyBehavior>
            <motion.a
              className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.a>
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
