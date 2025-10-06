"use client"

import { useState } from "react"
import { Moon, Sun, KeyRound, Shield, MailCheck, LogOutIcon, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import PasswordGenerator from "@/components/generator"
import VerifyEmail from "@/components/verify-email"
import Vault from "@/components/vault"
import { useTheme } from "next-themes"
import { signOut } from "next-auth/react"

export default function DashboardPage() {
  const { setTheme, theme } = useTheme();
  const [activeTab, setActiveTab] = useState("generate")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col md:flex-row transition-colors duration-300 bg-white dark:bg-black text-foreground">

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 p-6 flex flex-col border-r bg-gray-50 dark:bg-black/95 dark:border-gray-800 border-gray-200 transform transition-transform duration-300 md:relative md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>

        <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
          🔐 <span>Password Manager</span>
        </h1>

        <nav className="flex flex-col gap-3">
          <Button
            variant={activeTab === "generate" ? "default" : "ghost"}
            className="justify-start cursor-pointer"
            onClick={() => setActiveTab("generate")}
          >
            <KeyRound className="mr-2 h-4 w-4" /> Generate Password
          </Button>

          <Button
            variant={activeTab === "vault" ? "default" : "ghost"}
            className="justify-start cursor-pointer"
            onClick={() => setActiveTab("vault")}
          >
            <Shield className="mr-2 h-4 w-4" /> View Vault
          </Button>

          <Button
            variant={activeTab === "verify" ? "default" : "ghost"}
            className="justify-start cursor-pointer"
            onClick={() => setActiveTab("verify")}
          >
            <MailCheck className="mr-2 h-4 w-4" /> Verify Mail
          </Button>
        </nav>

        <div className="mt-auto pt-8 flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOutIcon /> Logout
          </Button>
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
          >
            {theme == "light" ? <><Moon /> Dark Mode</> : <> <Sun />Light Mode</>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 transition-colors duration-300 overflow-y-auto bg-gray-50 dark:bg-background min-h-screen">
        {/* Mobile menu button */}
        <div className="md:hidden mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{activeTab === "generate" ? "Generate Password" : activeTab === "vault" ? "Vault" : "Verify Email"}</h2>
          <Button variant="ghost" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {activeTab === "generate" && (
            <PasswordGenerator />
        )}

        {activeTab === "vault" && <Vault />}

        {activeTab === "verify" && <VerifyEmail />}
      </main>
    </div>
  )
}
