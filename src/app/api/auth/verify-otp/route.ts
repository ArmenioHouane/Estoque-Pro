import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import OTP from "@/models/otp"

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    // Find the OTP record
    const otpRecord = await OTP.findOne({
      email,
      otp,
      purpose: "PASSWORD_RESET",
      isUsed: false,
      expiresAt: { $gt: new Date() },
    })

    if (!otpRecord) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
    }

    // Mark OTP as used
    otpRecord.isUsed = true
    await otpRecord.save()

    // Generate a temporary token for the reset process
    const resetToken = Buffer.from(`${otpRecord.userId}:${Date.now()}`).toString("base64")

    return NextResponse.json(
      {
        message: "OTP verified successfully",
        resetToken,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("OTP verification error:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}
