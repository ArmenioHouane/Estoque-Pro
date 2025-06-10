import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Order from "@/models/order"
import Product from "@/models/product"
import StockMovement from "@/models/stockMovement"
import { verifyToken } from "@/lib/auth"

// Define types for better TypeScript support
interface OrderQuery {
  userId: string
  $or?: Array<{
    orderNumber?: { $regex: string; $options: string }
    "customer.name"?: { $regex: string; $options: string }
    "customer.email"?: { $regex: string; $options: string }
  }>
  status?: string
  createdAt?: {
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
    const { customer, items, totalAmount, status, paymentMethod, notes, date } = await req.json()

    // Validate required fields
    if (!customer || !customer.name || !items || !items.length || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields", details: "All fields marked with * are required" },
        { status: 400 },
      )
    }

    // Validate items and calculate total
    const processedItems = []
    let calculatedTotal = 0

    for (const item of items) {
      if (!item.product || !item.quantity || !item.unitPrice) {
        return NextResponse.json(
          { error: "Invalid item data", details: "Each item must have product, quantity, and unitPrice" },
          { status: 400 },
        )
      }

      const product = await Product.findOne({ _id: item.product, userId })
      if (!product) {
        return NextResponse.json(
          { error: "Product not found", details: `Product with ID ${item.product} not found` },
          { status: 404 },
        )
      }

      // Check stock if this is a sale and status is not "Cancelado"
      if (status !== "Cancelado") {
        if (product.currentStock < item.quantity) {
          return NextResponse.json(
            {
              error: "Insufficient stock",
              details: `Not enough stock for product ${product.name}. Available: ${product.currentStock}, Requested: ${item.quantity}`,
            },
            { status: 400 },
          )
        }
      }

      const subtotal = item.quantity * item.unitPrice
      calculatedTotal += subtotal

      processedItems.push({
        product: item.product,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal,
      })
    }

    // Verify total amount
    if (Math.abs(calculatedTotal - totalAmount) > 0.01) {
      return NextResponse.json(
        {
          error: "Total amount mismatch",
          details: `Calculated total (${calculatedTotal}) does not match provided total (${totalAmount})`,
        },
        { status: 400 },
      )
    }

    // Create the order
    const order = await Order.create({
      userId,
      customer,
      items: processedItems,
      totalAmount: calculatedTotal,
      status: status || "Pendente",
      paymentMethod,
      notes,
      createdBy: userId,
      createdAt: date ? new Date(date) : new Date(),
    })

    // If order is approved or shipped, create stock movement
    if (status === "Aprovado" || status === "Enviado" || status === "Entregue") {
      // Prepare stock movement products
      const movementProducts = []
      const productUpdates = []

      for (const item of processedItems) {
        const product = await Product.findById(item.product)
        const previousStock = product.currentStock
        const newStock = previousStock - item.quantity

        // Add to movement products
        movementProducts.push({
          product: product._id,
          quantity: item.quantity,
          previousStock,
          newStock,
        })

        // Prepare product update
        productUpdates.push({
          updateOne: {
            filter: { _id: product._id },
            update: { $set: { currentStock: newStock, updatedAt: new Date() } },
          },
        })
      }

      // Create stock movement
      await StockMovement.create({
        userId,
        type: "Saída",
        products: movementProducts,
        reason: "Venda",
        reference: order.orderNumber,
        order: order._id,
        responsibleUser: userId,
        notes: `Pedido ${order.orderNumber}`,
        date: order.createdAt,
      })

      // Update product stock levels
      if (productUpdates.length > 0) {
        await Product.bulkWrite(productUpdates)
      }
    }

    // Return the created order
    return NextResponse.json(
      {
        message: "Order created successfully",
        order: {
          id: order._id,
          orderNumber: order.orderNumber,
          status: order.status,
        },
      },
      { status: 201 },
    )
  } catch (error: unknown) {
    console.error("Error creating order:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json({ error: "Failed to create order", details: errorMessage }, { status: 500 })
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
    const startDate = searchParams.get("startDate") || ""
    const endDate = searchParams.get("endDate") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build the query with proper typing
    const query: OrderQuery = { userId }

    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { "customer.name": { $regex: search, $options: "i" } },
        { "customer.email": { $regex: search, $options: "i" } },
      ]
    }

    if (status) {
      query.status = status
    }

    if (startDate || endDate) {
      query.createdAt = {}
      if (startDate) {
        query.createdAt.$gte = new Date(startDate)
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate)
      }
    }

  

    // Get orders with pagination
    const orders = await Order.find(query)

      .skip(skip)
      .limit(limit)
      .populate({
        path: "items.product",
        select: "name code",
      })
      .populate({
        path: "createdBy",
        select: "name",
      })
      .lean()

    // Get total count for pagination
    const total = await Order.countDocuments(query)

    // Return the orders
    return NextResponse.json(
      {
        orders,
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
    console.error("Error fetching orders:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json({ error: "Failed to fetch orders", details: errorMessage }, { status: 500 })
  }
}
