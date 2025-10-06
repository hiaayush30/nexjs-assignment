"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { addToVault } from "@/actions/add-to-vault"

export default function PasswordGenerator() {
  const { data } = useSession()
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [notes, setNotes] = useState("")

  const charset = useMemo(() => {
    let chars = "abcdefghijklmnopqrstuvwxyz"
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numbers) chars += "0123456789"
    if (symbols) chars += "!@#$%^&*()-_=+[]{};:,.<>?"
    return chars
  }, [uppercase, numbers, symbols])

  function generate() {
    if (!data?.user?.verified) {
      return alert("Please verify your email first!")
    }
    let result = ""
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    for (let i = 0; i < length; i++) {
      const idx = array[i] % charset.length
      result += charset[idx]
    }
    setPassword(result)
    setCopied(false)
  }

  async function copy() {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error("Clipboard error:", e)
    }
  }

  async function handleSave() {
    if (!title || !password)
      return alert("Please fill at least a title and generate a password.")

    console.log({
      title,
      url,
      password,
      notes,
    })

    const res = await addToVault(data?.user.id as string, { title, url, password, notes })

    if (res) {
      alert("Password added to vault!")
      setTitle("")
      setUrl("")
      setNotes("")
      setPassword("")
    }
    else{
      alert("Error in adding to vault!")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 transition-colors duration-300">
      <div className="max-w-xl mx-auto space-y-6 rounded-2xl border border-border bg-card shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center">🔐 Password & Vault Entry</h1>
        <p className="text-sm text-muted-foreground text-center">
          Generate and store secure credentials safely.
        </p>

        <div className="space-y-6">
          {/* Vault Entry Fields */}
          <div className="space-y-3">
            <div>
              <Label className="pb-2" htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. GitHub Account"
                className="bg-input text-foreground"
              />
            </div>

            <div>
              <Label className="pb-2" htmlFor="url">Website / URL</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="bg-input text-foreground"
              />
            </div>
          </div>

          <Separator />

          {/* Password Options */}
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
              <Button className="cursor-pointer" onClick={generate} variant="default">
                Generate
              </Button>
              <Button
                onClick={copy}
                variant={copied ? "secondary" : "outline"}
                disabled={!password || copied}
                className={copied ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Notes Field */}
          <div>
            <Label className="pb-3" htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes for this account..."
              className="bg-input text-foreground min-h-[80px]"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button onClick={handleSave} className="cursor-pointer bg-stone-700 hover:bg-stone-600 text-stone-50 dark:bg-stone-200 dark:hover:bg-stone-300 dark:text-stone-900">
              Save Entry
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
