import { sendEmail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const NewUserSchema = z.object({
    email: z.email(),
    password: z.string().min(3, { message: "Minimum 3 characters required" })
})

const generateOtp = ()=>{
    let otp = 0;
    for(let i = 0;i<6;i++){
        otp = otp*10;
        otp += Math.floor(Math.random()*10)
    }
    return otp
}

export async function SendOtp(email:string,otp:number) {
  await sendEmail(email, "Your OTP Code", `<h1>${otp}</h1>`);
  return NextResponse.json({ success: true });
}

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const parsedData = NewUserSchema.safeParse(body);
        if (!parsedData.success) {
            console.log(parsedData.error.issues)
            return NextResponse.json({
                error: "Invalid Request"
            }, { status: 400 })
        }
        const { email, password } = parsedData.data;
        const existingUser = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (existingUser) {
            return NextResponse.json({
                error: "email already registered!"
            }, { status: 403 })
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const otp = generateOtp();
        SendOtp(email,otp);
        await prisma.user.create({
            data: {
                email,
                otp,
                username:email.split("@")[0],
                password: hashedPassword,
                profilePic: `https://avatar.iran.liara.run/username?username=${email.split("@")[0]}`
            }
        })
        return NextResponse.json({
            message: "user registered successfully!"
        }, { status: 201 })

    } catch (error) {
        console.log("Error in register route:", error)
        return NextResponse.json({
            error: "Internal server error"
        }), { status: 500 }
    }
}