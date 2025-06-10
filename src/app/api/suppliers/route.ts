import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Supplier from "@/models/supplier"
import { verifyToken } from "@/lib/auth"

// Define types for MongoDB queries
interface MongoQuery {
  userId: string
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>
  status?: string
}

export async function POST(req: NextRequest) {
  try {
    // Get the token from cookies
    const token = req.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify the token and get the user ID
    const decoded = await verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const userId = decoded.userId

    // Connect to the database
    await connectToDatabase()

    // Parse the request body
    const {
      name,
      nuit,
      contactName,
      contactRole,
      email,
      phone,
      mobile,
      website,
      address,
      notes,
      status = "Ativo",
    } = await req.json()

    // Validate required fields
    if (!name || !nuit || !contactName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields", details: "All fields marked with * are required" },
        { status: 400 },
      )
    }

    // Check if supplier with same NUIT already exists for this user
    const existingSupplier = await Supplier.findOne({ userId, nuit })
    if (existingSupplier) {
      return NextResponse.json(
        { error: "Supplier with this NUIT already exists", details: "Please use a different NUIT" },
        { status: 409 },
      )
    }

    // Create the supplier
    const supplier = await Supplier.create({
      userId,
      name,
      nuit,
      contactName,
      contactRole,
      email,
      phone,
      mobile,
      website,
      address,
      notes,
      status,
    })

    // Return the created supplier
    return NextResponse.json(
      {
        message: "Supplier created successfully",
        supplier: {
          id: supplier._id,
          name: supplier.name,
          nuit: supplier.nuit,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating supplier:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: "Failed to create supplier", details: errorMessage }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    // Get the token from cookies
    const token = req.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify the token and get the user ID
    const decoded = await verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const userId = decoded.userId

    // Connect to the database
    await connectToDatabase()

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build the query with proper typing
    const query: MongoQuery = { userId }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { nuit: { $regex: search, $options: "i" } },
        { contactName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }

    if (status) {
      query.status = status
    }

    // Get suppliers with pagination
    const suppliers = await Supplier.find(query).sort({ name: 1 }).skip(skip).limit(limit).lean()

    // Get total count for pagination
    const total = await Supplier.countDocuments(query)

    // Return the suppliers
    return NextResponse.json(
      {
        suppliers,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error fetching suppliers:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: "Failed to fetch suppliers", details: errorMessage }, { status: 500 })
  }
}
