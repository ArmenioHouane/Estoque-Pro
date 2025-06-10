import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/user"
import mongoose from "mongoose"

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const { resetToken, newPassword } = await req.json()

    if (!resetToken || !newPassword) {
      return NextResponse.json({ error: "Reset token and new password are required" }, { status: 400 })
    }

    // Validate password
    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Decode the reset token
    let userId, timestamp
    try {
      const decoded = Buffer.from(resetToken, "base64").toString()
      ;[userId, timestamp] = decoded.split(":")

      // Validate token format
      if (!userId || !timestamp) {
        throw new Error("Invalid token format")
      }

      // Check if token is expired (30 minutes)
      const tokenTime = Number.parseInt(timestamp)
      if (Date.now() - tokenTime > 30 * 60 * 1000) {
        throw new Error("Token expired")
      }
    } catch (error) {
        console.error(error)
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
    }

    // Find user and update password
    const user = await User.findById(new mongoose.Types.ObjectId(userId))
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update password
    user.password = newPassword
    // Invalidate all previous tokens
    user.invalidatedTokensAt = new Date()
    await user.save()

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 })
  }
}
