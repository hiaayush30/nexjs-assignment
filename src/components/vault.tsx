'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { cn } from '@/lib/utils'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Eye, EyeOff, Copy } from 'lucide-react'

type VaultEntry = {
  id: string
  title: string
  password: string
  URL?: string
  notes?: string
  createdAt: string
}

export default function Vault() {
  const { data: session, status } = useSession()
  const [vaultEntries, setVaultEntries] = useState<VaultEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (status === 'authenticated') fetchVault()
  }, [status])

  const fetchVault = async () => {
    try {
      const res = await axios.get(`/api/vault?userId=${session?.user?.id}`)
      setVaultEntries(res.data)
    } catch (error) {
      console.error('Error fetching vault:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleVisibility = (id: string) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    alert('Password copied!')
  }

  if (status === 'loading' || loading) {
    return (
      <p className="text-center mt-8 text-stone-500 dark:text-stone-400">
        Loading your vault...
      </p>
    )
  }

  return (
    <Card
      className={cn(
        'max-w-2xl mx-auto mt-8 rounded-2xl shadow-md border p-4 transition-colors duration-300',
        'bg-stone-100 text-stone-800 border-stone-200',
        'dark:bg-stone-900 dark:text-stone-100 dark:border-stone-700'
      )}
    >
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">🔐 Your Vault</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Securely stored passwords appear below. You can reveal or copy them.
        </p>

        {vaultEntries.length === 0 ? (
          <div className="flex items-center justify-center py-6">
            <p className="text-stone-500 dark:text-stone-400 italic">
              No saved passwords yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {vaultEntries.map(entry => (
              <Card
                key={entry.id}
                className="p-4 border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-800/60 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{entry.title}</h3>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type={visiblePasswords[entry.id] ? 'text' : 'password'}
                    value={entry.password}
                    readOnly
                    className="w-full bg-stone-50 dark:bg-stone-900 font-mono text-sm"
                  />

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleVisibility(entry.id)}
                        >
                          {visiblePasswords[entry.id] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{visiblePasswords[entry.id] ? 'Hide' : 'Show'} password</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(entry.password)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy password</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {entry.URL && (
                  <p className="text-sm mt-2 text-stone-600 dark:text-stone-400">
                    🌐 <a href={entry.URL} target="_blank" className="underline">{entry.URL}</a>
                  </p>
                )}
                {entry.notes && (
                  <p className="text-sm mt-1 text-stone-600 dark:text-stone-400">
                    📝 {entry.notes}
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
