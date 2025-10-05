"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState("")

  const charset = useMemo(() => {
    let chars = "abcdefghijklmnopqrstuvwxyz"
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numbers) chars += "0123456789"
    if (symbols) chars += "!@#$%^&*()-_=+[]{};:,.<>?"
    return chars
  }, [uppercase, numbers, symbols])

  function generate() {
    if (!charset) return
    let result = ""
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    for (let i = 0; i < length; i++) {
      const idx = array[i] % charset.length
      result += charset[idx]
    }
    setPassword(result)
  }

  async function copy() {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
    } catch (e) {
      console.error("Clipboard error:", e)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 transition-colors duration-300">
      <div className="max-w-xl mx-auto space-y-6 rounded-2xl border border-border bg-card shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center">🔐 Password Generator</h1>
        <p className="text-sm text-muted-foreground text-center">
          Create strong, secure passwords instantly.
        </p>

        <div className="space-y-4">
          {/* Length and Options */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length">Password Length</Label>
              <Input
                id="length"
                type="number"
                min={8}
                max={64}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="bg-input text-foreground"
              />
              <p className="text-xs text-muted-foreground">Recommended: 12–24</p>
            </div>

            <div className="grid grid-cols-2 gap-3 content-start">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="accent-primary"
                />
                <span className="text-sm">Uppercase</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={numbers}
                  onChange={(e) => setNumbers(e.target.checked)}
                  className="accent-primary"
                />
                <span className="text-sm">Numbers</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={symbols}
                  onChange={(e) => setSymbols(e.target.checked)}
                  className="accent-primary"
                />
                <span className="text-sm">Symbols</span>
              </label>
            </div>
          </div>

          <Separator />

          {/* Generated password + buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              readOnly
              value={password}
              placeholder="Your secure password will appear here"
              className="bg-input text-foreground"
            />
            <div className="flex gap-2">
              <Button onClick={generate} variant="default">
                Generate
              </Button>
              <Button onClick={copy} variant="outline" disabled={!password}>
                Copy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
