'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@radix-ui/themes'
import { Card, CardContent } from './ui/card'
import { cn } from '@/lib/utils'
import { signOut, useSession } from 'next-auth/react'

import { useRouter } from 'next/navigation'
import { SendOtp } from '@/actions/send-otp'
import { verifyEmail } from '@/actions/verify-email'
import { User } from 'next-auth'
import { Check } from 'lucide-react'



export default function VerifyEmail() {
    const [otp, setOtp] = useState('')
    const router = useRouter();
    const { data, status } = useSession();
    const [user, setUser] = useState<User | null>(null)
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            return router.replace("/login")
        } else if (status === "authenticated") {
            setUser(data.user)
        }
    }, [data, status, router])

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6)
        setOtp(value)
    }

    const handleVerify = async () => {
        if (!user) return alert("User data not loaded. Please try again.");

        if (otp.length === 6) {
            setIsVerifying(true);

            try {
                if (Number(otp) === user.otp) {
                    await verifyEmail(user.id)
                    setUser((prev) => prev ? { ...prev, verified: true } : prev);
                    alert("Email verified successfully!,Please login again")
                    signOut()
                }
                else {
                    alert("OTP incorrect!")
                }
            } catch (error) {
                console.error(error)
                alert("Something went wrong, please try again later!")
            } finally {
                setIsVerifying(false);
            }
        } else {
            alert('Enter a valid 6-digit OTP')
        }
    }

    const handleResendOtp = async () => {
        if (!user?.email || !user?.otp) return alert("User email not available.");

        setIsResending(true);

        try {
            const res = await SendOtp(user.email, user.otp);
            if (res) {
                alert("OTP sent!")
            } else {
                alert("Something went wrong! Please try again later.")
            }
        } catch (error) {
            console.error(error);
            alert("Failed to resend OTP. Please check the console for details.")
        } finally {
            setIsResending(false);
        }
    }


    return (
        <Card
            className={cn(
                'max-w-md mx-auto mt-10 rounded-2xl shadow-md border p-4 transition-colors duration-300',
                'bg-stone-100 text-stone-800 border-stone-200',
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
                {!user?.verified ?
                    <>
                        <div className="flex justify-center">
                            <Button
                                variant="solid"
                                className={cn(
                                    'bg-stone-700 hover:bg-stone-600 text-stone-50',
                                    'dark:bg-stone-200 dark:hover:bg-stone-300 dark:text-stone-900'
                                )}
                                onClick={handleResendOtp}
                                disabled={isResending || isVerifying}
                            >
                                {isResending ? 'Sending...' : 'Send Verification Mail'}
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
                                disabled={isVerifying}
                                className={cn(
                                    'w-full text-center tracking-widest font-mono text-lg rounded-md border py-2 outline-none',
                                    'border-stone-300 focus:border-stone-500 focus:ring-1 focus:ring-stone-500',
                                    'bg-white text-stone-900',
                                    'dark:bg-stone-800 dark:text-stone-100 dark:border-stone-600 dark:focus:border-stone-400'
                                )}
                            />
                            <div className='flex items-center gap-3'>
                                <button
                                    onClick={handleResendOtp}
                                    disabled={isResending || isVerifying}
                                    className={cn(
                                        'w-full mt-2 cursor-pointer mx-auto rounded-lg p-1',
                                        'bg-stone-700 hover:bg-stone-600 text-stone-50',
                                        'dark:bg-stone-200 dark:hover:bg-stone-300 dark:text-stone-900',
                                        (isResending || isVerifying) && 'opacity-60 cursor-not-allowed'
                                    )}
                                >
                                    {isResending ? 'Sending...' : 'Resend OTP'}
                                </button>
                                <button
                                    onClick={handleVerify}
                                    disabled={isVerifying || isResending || otp.length !== 6}
                                    className={cn(
                                        'w-full mt-2 cursor-pointer mx-auto rounded-lg p-1',
                                        'bg-stone-700 hover:bg-stone-600 text-stone-50',
                                        'dark:bg-stone-200 dark:hover:bg-stone-300 dark:text-stone-900',
                                        (isVerifying || isResending || otp.length !== 6) && 'opacity-60 cursor-not-allowed'
                                    )}
                                >
                                    {isVerifying ? 'Verifying...' : 'Verify OTP'}
                                </button>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <p className='text-2xl font-semibold flex gap-2 justify-center'>
                            <span className='text-green-700'>Email already verified!</span> <Check className='text-green-700' />
                        </p>
                    </>
                }
            </CardContent>
        </Card >
    )
}