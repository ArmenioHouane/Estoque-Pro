import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/user"
import OTP from "@/models/otp"
import { sendPasswordResetEmail } from "@/utils/email"

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return NextResponse.json(
        { message: "If your email is registered, you will receive a password reset OTP" },
        { status: 200 },
      )
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Save OTP to database
    await OTP.create({
      userId: user._id,
      email: user.email,
      otp,
      purpose: "PASSWORD_RESET",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    })

    // Send email with OTP
    const emailResult = await sendPasswordResetEmail(user.email, otp, user.name)

    // In development, return the OTP for testing
    if (process.env.NODE_ENV !== "production" && emailResult.development) {
      return NextResponse.json(
        {
          message: "If your email is registered, you will receive a password reset OTP",
          development: {
            otp,
            previewUrl: emailResult.previewUrl,
          },
        },
        { status: 200 },
      )
    }

    return NextResponse.json(
      { message: "If your email is registered, you will receive a password reset OTP" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Password reset request error:", error)
    return NextResponse.json({ error: "Failed to process password reset request" }, { status: 500 })
  }
}
