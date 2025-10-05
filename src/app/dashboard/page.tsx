"use client"

import { useState } from "react"
import { Moon, Sun, KeyRound, Shield, MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import PasswordGenerator from "@/components/generator"
import { ModeToggle } from "@/components/theme-toggle"

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState("generate")

  return (
    <div
      className={"min-h-screen flex transition-colors duration-300 bg-white text-foreground" }
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
          <ModeToggle/>
        </nav>

        <div className="mt-auto pt-8">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <>
                <Sun className="mr-2 h-4 w-4" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" /> Dark Mode
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 p-8 overflow-y-auto transition-colors duration-300",
          darkMode ? "bg-background" : "bg-gray-50"
        )}
      >
        {activeTab === "generate" && (
          <div className="max-w-2xl mx-auto">
            <PasswordGenerator />
          </div>
        )}

        {activeTab === "vault" && (
          <Card
            className={cn(
              "max-w-2xl mx-auto mt-8 transition-colors duration-300",
              "dark:bg-gray-900 dark:text-gray-100","bg-gray-100 text-gray-800"
            )}
          >
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your Vault</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Securely stored passwords will appear here.
              </p>
              <p>No saved passwords yet.</p>
            </CardContent>
          </Card>
        )}

        {activeTab === "verify" && (
          <Card
            className={cn(
              "max-w-2xl mx-auto mt-8 transition-colors duration-300",
              "dark:bg-gray-900 dar:ktext-gray-100" , "bg-gray-100 text-gray-800"
            )}
          >
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Verify Your Email</h2>
              <p className="text-sm text-muted-foreground">
                Verify your email address to enable password recovery and sync.
              </p>
              <Button>Send Verification Mail</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
