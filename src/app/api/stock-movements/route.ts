import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import StockMovement from "@/models/stockMovement"
import Product from "@/models/product"
import { verifyToken } from "@/lib/auth"

// Type definitions
interface ProductMovement {
  productId: string
  quantity: number
}

interface StockMovementRequest {
  type: "Entrada" | "Saída"
  products: ProductMovement[]
  reason: string
  reference?: string
  supplier?: string
  notes?: string
  date?: string
}

interface QueryFilter {
  userId: string
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>
  type?: string
  date?: {
    $gte?: Date
    $lte?: Date
  }
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
    const { type, products, reason, reference, supplier, notes, date }: StockMovementRequest = await req.json()

    // Validate required fields
    if (!type || !products || !products.length || !reason) {
      return NextResponse.json(
        { error: "Missing required fields", details: "All fields marked with * are required" },
        { status: 400 },
      )
    }

    // Process each product and update stock
    const productUpdates = []
    const movementProducts = []

    for (const item of products) {
      const product = await Product.findOne({ _id: item.productId, userId })

      if (!product) {
        return NextResponse.json(
          { error: "Product not found", details: `Product with ID ${item.productId} not found` },
          { status: 404 },
        )
      }

      const previousStock = product.currentStock
      let newStock = previousStock

      if (type === "Entrada") {
        newStock = previousStock + item.quantity
      } else if (type === "Saída") {
        if (previousStock < item.quantity) {
          return NextResponse.json(
            {
              error: "Insufficient stock",
              details: `Not enough stock for product ${product.name}. Available: ${previousStock}, Requested: ${item.quantity}`,
            },
            { status: 400 },
          )
        }
        newStock = previousStock - item.quantity
      }

      // Prepare product update
      productUpdates.push({
        updateOne: {
          filter: { _id: product._id },
          update: { $set: { currentStock: newStock, updatedAt: new Date() } },
        },
      })

      // Add to movement products
      movementProducts.push({
        product: product._id,
        quantity: item.quantity,
        previousStock,
        newStock,
      })
    }

    // Create the stock movement
    const stockMovement = await StockMovement.create({
      userId,
      type,
      products: movementProducts,
      reason,
      reference,
      supplier: supplier || undefined,
      responsibleUser: userId,
      notes,
      date: date ? new Date(date) : new Date(),
    })

    // Update product stock levels
    if (productUpdates.length > 0) {
      await Product.bulkWrite(productUpdates)
    }

    // Return the created stock movement
    return NextResponse.json(
      {
        message: "Stock movement created successfully",
        stockMovement: {
          id: stockMovement._id,
          movementId: stockMovement.movementId,
          type: stockMovement.type,
          date: stockMovement.date,
        },
      },
      { status: 201 },
    )
  } catch (error: unknown) {
    console.error("Error creating stock movement:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json({ error: "Failed to create stock movement", details: errorMessage }, { status: 500 })
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
    const type = searchParams.get("type") || ""
    const startDate = searchParams.get("startDate") || ""
    const endDate = searchParams.get("endDate") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build the query with proper typing
    const query: QueryFilter = { userId }

    if (search) {
      query.$or = [{ movementId: { $regex: search, $options: "i" } }, { reference: { $regex: search, $options: "i" } }]
    }

    if (type) {
      query.type = type
    }

    if (startDate || endDate) {
      query.date = {}
      if (startDate) {
        query.date.$gte = new Date(startDate)
      }
      if (endDate) {
        query.date.$lte = new Date(endDate)
      }
    }

    // Get stock movements with pagination and populate references
    const stockMovements = await StockMovement.find(query)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "products.product",
        select: "name code",
      })
      .populate({
        path: "responsibleUser",
        select: "name",
      })
      .populate({
        path: "supplier",
        select: "name",
      })
      .lean()

    // Get total count for pagination
    const total = await StockMovement.countDocuments(query)

    // Process the results to format them for the frontend
    const formattedMovements = stockMovements.map((movement) => {
      // Handle supplier which could be an object or "proprio"
      let supplierName = "Não especificado"
      if (movement.supplier) {
        if (movement.supplier === "proprio") {
          supplierName = "Próprio"
        } else if (typeof movement.supplier === "object" && movement.supplier.name) {
          supplierName = movement.supplier.name
        }
      }

      return {
        ...movement,
        supplierName,
        // Format the products to show the first product and a count if there are more
        productSummary:
          movement.products.length > 1
            ? `${movement.products[0].product.name} e mais ${movement.products.length - 1}`
            : movement.products[0]?.product.name || "Produto não encontrado",
        // Total quantity across all products with proper typing
        totalQuantity: movement.products.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0),
      }
    })

    // Return the stock movements
    return NextResponse.json(
      {
        stockMovements: formattedMovements,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
    )
  } catch (error: unknown) {
    console.error("Error fetching stock movements:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json({ error: "Failed to fetch stock movements", details: errorMessage }, { status: 500 })
  }
}
