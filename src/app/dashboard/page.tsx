"use client"

import { useState } from "react"
import { Moon, Sun, KeyRound, Shield, MailCheck, LogOutIcon } from "lucide-react"
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

  return (
    <div
      className={"min-h-screen max-h-screen flex transition-colors duration-300 bg-white text-foreground"}
    >
      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 p-6 flex flex-col border-r transition-colors duration-300 dark:border-gray-800 dark:bg-black/95 border-gray-200 bg-gray-50",
        )}
      >
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
      <main
        className={cn(
          "flex-1 p-8 overflow-y-auto transition-colors duration-300",
          "dark:bg-background", "bg-gray-50"
        )}
      >
        {activeTab === "generate" && (
          <div className="max-w-2xl mx-auto">
            <PasswordGenerator />
          </div>
        )}

        {activeTab === "vault" && (
          <Vault />
        )}

        {(activeTab === "verify") && (
          <VerifyEmail />
        )}
      </main>
    </div>
  )
}
