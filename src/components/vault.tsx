'use client'

import React from 'react'
import { Card } from '@radix-ui/themes'
import { CardContent } from './ui/card'
import { cn } from '@/lib/utils'

export default function Vault() {
  return (
    <Card
      className={cn(
        'max-w-2xl mx-auto mt-8 rounded-2xl shadow-md border p-4 transition-colors duration-300',
        // light mode
        'bg-stone-100 text-stone-800 border-stone-200',
        // dark mode
        'dark:bg-stone-900 dark:text-stone-100 dark:border-stone-700'
      )}
    >
      <CardContent className="p-6 space-y-3">
        <h2 className="text-xl font-semibold">Your Vault</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Securely stored passwords will appear here.
        </p>
        <div className="flex items-center justify-center py-6">
          <p className="text-stone-500 dark:text-stone-400 italic">
            No saved passwords yet.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
