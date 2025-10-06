"use server"

import { sendEmail } from "../lib/mailer";

export async function SendOtp(email: string, otp: number) {
    try {
        await sendEmail(email, "Your OTP Code", `<h1>${otp}</h1>`);
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}