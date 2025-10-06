import { prisma } from "@/lib/prisma";
import { SendOtp } from "@/actions/send-otp";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { randomBytes } from "crypto";

const NewUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, { message: "Minimum 3 characters required" }),
});

// Generate 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000); // simpler and safer
};

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const parsedData = NewUserSchema.safeParse(body);

    if (!parsedData.success) {
      console.log(parsedData.error.issues);
      return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }

    const { email, password } = parsedData.data;

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered!" },
        { status: 403 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    const customSalt = randomBytes(16).toString("hex")

    // Send OTP mail (don’t await if you want faster response)
    await SendOtp(email, otp);

    // Create user in DB
    await prisma.user.create({
      data: {
        email,
        otp,
        username: email.split("@")[0],
        password: hashedPassword,
        profilePic: `https://avatar.iran.liara.run/username?username=${email.split("@")[0]}`,
        customSalt
      },
    });

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in register route:", error);
    // ✅ this was your type mismatch cause — fixed below
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
