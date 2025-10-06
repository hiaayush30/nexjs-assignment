'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@radix-ui/themes'
import { Card, CardContent } from './ui/card'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { User } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export default function VerifyEmail() {
    const [otp, setOtp] = useState('')
    const { data } = useSession();
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        if (data?.user) {
            setUser(user)
        }
    }, [data, user])

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6)
        setOtp(value)
    }

    const handleVerify = async () => {
        if (otp.length === 6) {
            try {
                if (!user) throw new Error("user not found")
                if (Number(otp) == user.otp) {
                    await prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            verified: true
                        }
                    })
                    alert("Email verified successfully!")
                }
            } catch (error) {
                alert("Something went wrong,please try again later!")
            }
        } else {
            alert('Enter a valid 6-digit OTP')
        }
    }

    return (
        <Card
            className={cn(
                'max-w-md mx-auto mt-10 rounded-2xl shadow-md border p-4 transition-colors duration-300',
                // light mode
                'bg-stone-100 text-stone-800 border-stone-200',
                // dark mode
                'dark:bg-stone-900 dark:text-stone-100 dark:border-stone-700'
            )}
        >
            <CardContent className="space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-semibold">Verify Your Email</h2>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                        Verify your email address to enable password recovery and sync.
                    </p>
                </div>

                <div className="flex justify-center">
                    <Button
                        variant="solid"
                        className={cn(
                            'bg-stone-700 hover:bg-stone-600 text-stone-50',
                            'dark:bg-stone-200 dark:hover:bg-stone-300 dark:text-stone-900'
                        )}
                    >
                        Send Verification Mail
                    </Button>
                </div>

                <div className="pt-4 space-y-3">
                    <label
                        htmlFor="otp"
                        className="block text-sm font-medium text-stone-700 dark:text-stone-300"
                    >
                        Enter 6-digit OTP
                    </label>
                    <input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="123456"
                        className={cn(
                            'w-full text-center tracking-widest font-mono text-lg rounded-md border py-2 outline-none',
                            'border-stone-300 focus:border-stone-500 focus:ring-1 focus:ring-stone-500',
                            'bg-white text-stone-900',
                            'dark:bg-stone-800 dark:text-stone-100 dark:border-stone-600 dark:focus:border-stone-400'
                        )}
                    />
                    <div className='flex items-center gap-3'>
                        <Button
                            onClick={handleVerify}
                            className={cn(
                                'w-full mt-2 cursor-pointer',
                                'bg-stone-700 hover:bg-stone-600 text-stone-50',
                                'dark:bg-stone-200 dark:hover:bg-stone-300 dark:text-stone-900'
                            )}
                            variant="solid"
                        >
                            Resend OTP
                        </Button>
                        <Button
                            onClick={handleVerify}
                            className={cn(
                                'w-full mt-2 cursor-pointer',
                                'bg-stone-700 hover:bg-stone-600 text-stone-50',
                                'dark:bg-stone-200 dark:hover:bg-stone-300 dark:text-stone-900'
                            )}
                            variant="surface"
                        >
                            Verify OTP
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
