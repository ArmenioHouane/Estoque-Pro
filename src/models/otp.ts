import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
  },
  otp: {
    type: String,
    required: [true, "OTP is required"],
  },
  purpose: {
    type: String,
    enum: ["PASSWORD_RESET", "EMAIL_VERIFICATION"],
    default: "PASSWORD_RESET",
  },
  expiresAt: {
    type: Date,
    required: [true, "Expiry time is required"],
    default: () => {
      // OTP expires in 10 minutes
      return new Date(Date.now() + 10 * 60 * 1000)
    },
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Index to automatically delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.models.OTP || mongoose.model("OTP", otpSchema)
