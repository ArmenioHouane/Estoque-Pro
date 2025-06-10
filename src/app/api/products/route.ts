import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Product from "@/models/product"
import { verifyToken } from "@/lib/auth"
import Supplier from "@/models/supplier"
import { Types } from "mongoose"

// Define interfaces for better type safety
interface ProductQuery {
  userId: string
  $or?: Array<{ code: { $regex: string; $options: string } } | { name: { $regex: string; $options: string } }>
  category?: string
  status?: string
}

interface ProductData {
  userId: string
  code: string
  name: string
  description?: string
  category: string
  supplier: string | Types.ObjectId
  costPrice: number
  sellingPrice: number
  minStock: number
  currentStock: number
  status: string
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
    const { code, name, description, category, supplier, costPrice, sellingPrice, minStock, currentStock } =
      await req.json()

    // Validate required fields
    if (!code || !name || !category || !supplier || !costPrice || !sellingPrice) {
      return NextResponse.json(
        { error: "Missing required fields", details: "All fields marked with * are required" },
        { status: 400 },
      )
    }

    // Check if product code already exists for this user
    const existingProduct = await Product.findOne({ userId, code })
    if (existingProduct) {
      return NextResponse.json(
        { error: "Product code already exists", details: "Please use a different product code" },
        { status: 409 },
      )
    }

    // Create the product with special handling for "proprio" supplier
    const productData: ProductData = {
      userId,
      code,
      name,
      description,
      category,
      supplier: supplier === "proprio" ? "proprio" : supplier,
      costPrice: Number(costPrice),
      sellingPrice: Number(sellingPrice),
      minStock: Number(minStock) || 0,
      currentStock: Number(currentStock) || 0,
      status:
        Number(currentStock) === 0
          ? "Sem Estoque"
          : Number(currentStock) <= Number(minStock)
            ? "Estoque Baixo"
            : "Ativo",
    }

    const product = await Product.create(productData)

    // Return the created product
    return NextResponse.json(
      {
        message: "Product created successfully",
        product: {
          id: product._id,
          code: product.code,
          name: product.name,
          status: product.status,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating product:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json({ error: "Failed to create product", details: errorMessage }, { status: 500 })
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
    const category = searchParams.get("category") || ""
    const status = searchParams.get("status") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build the query with proper typing
    const query: ProductQuery = { userId }

    if (search) {
      query.$or = [{ code: { $regex: search, $options: "i" } }, { name: { $regex: search, $options: "i" } }]
    }

    if (category) {
      query.category = category
    }

    if (status) {
      query.status = status
    }

    // Get products with pagination
    let products = await Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

    // Get total count for pagination
    const total = await Product.countDocuments(query)

    // Populate supplier information for products that don't have "proprio" as supplier
    const supplierIds = products
      .filter((product) => product.supplier !== "proprio")
      .map((product) => product.supplier)
      .filter(Boolean)
      .filter((id): id is Types.ObjectId => Types.ObjectId.isValid(id))

    if (supplierIds.length > 0) {
      const suppliers = await Supplier.find({ _id: { $in: supplierIds } }).lean()

      // Create a map of supplier id to supplier name
      const supplierMap = suppliers.reduce(
        (map, supplier) => {
          if (supplier._id && supplier.name) {
            map[supplier._id.toString()] = supplier.name
          }
          return map
        },
        {} as Record<string, string>,
      )

      // Add supplier name to each product
      products = products.map((product) => {
        if (product.supplier === "proprio") {
          return { ...product, supplierName: "Próprio" }
        } else if (product.supplier && typeof product.supplier === "object" && "_id" in product.supplier) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const supplierId = (product.supplier as any)._id?.toString()
          return {
            ...product,
            supplierName: supplierMap[supplierId] || "Não especificado",
          }
        } else if (typeof product.supplier === "string" && supplierMap[product.supplier]) {
          return {
            ...product,
            supplierName: supplierMap[product.supplier],
          }
        }
        return { ...product, supplierName: "Não especificado" }
      })
    } else {
      // If no suppliers to look up, just add the supplier name for "proprio"
      products = products.map((product) => {
        if (product.supplier === "proprio") {
          return { ...product, supplierName: "Próprio" }
        }
        return { ...product, supplierName: "Não especificado" }
      })
    }

    // Return the products
    return NextResponse.json(
      {
        products,
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
    console.error("Error fetching products:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json({ error: "Failed to fetch products", details: errorMessage }, { status: 500 })
  }
}
