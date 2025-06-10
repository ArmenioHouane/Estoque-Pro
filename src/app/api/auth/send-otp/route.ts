import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/user"
import OTP from "@/models/otp"
import { sendPasswordResetEmail } from "@/utils/email"

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const { email, purpose = "PASSWORD_RESET" } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return NextResponse.json({ message: "If your email is registered, you will receive an OTP" }, { status: 200 })
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Save OTP to database
    await OTP.create({
      userId: user._id,
      email: user.email,
      otp,
      purpose,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    })

    // Send email with OTP
    await sendPasswordResetEmail(user.email, otp, user.name)

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
