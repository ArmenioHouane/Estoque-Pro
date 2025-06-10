import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Product from "@/models/product"
import StockMovement from "@/models/stockMovement"



type OverviewEntry = {
  name: string
  entrada: number
  saida: number
}

export async function GET() {
  try {
    await connectToDatabase()

    // Contagem total de produtos
    const totalProducts = await Product.countDocuments()

    // Valor total do estoque
    const products = await Product.find({}, "currentStock costPrice")
    const stockValue = products.reduce((total, product) => {
      return total + product.currentStock * product.costPrice
    }, 0)

    // Produtos com estoque baixo
    const lowStockProducts = await Product.countDocuments({
      status: "Estoque Baixo",
    })

    // Produtos sem estoque
    const outOfStockProducts = await Product.countDocuments({
      status: "Sem Estoque",
    })

    // Total de movimentações no mês atual
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const endOfMonth = new Date()
    endOfMonth.setMonth(endOfMonth.getMonth() + 1)
    endOfMonth.setDate(0)
    endOfMonth.setHours(23, 59, 59, 999)

    const monthlyMovements = await StockMovement.countDocuments({
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    })

    // Dados para o gráfico de visão geral (últimos 30 dias)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const movementsData = await StockMovement.aggregate([
      {
        $match: {
          date: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            type: "$type",
          },
          count: { $sum: 1 },
          quantity: { $sum: "$quantity" },
        },
      },
      {
        $sort: { "_id.date": 1 },
      },
    ])

    // Formatar dados para o gráfico
   
    const overviewData: OverviewEntry[] = []
    const dateMap = new Map()

    movementsData.forEach((item) => {
      const date = item._id.date
      const type = item._id.type

      if (!dateMap.has(date)) {
        dateMap.set(date, {
          name: date,
          entrada: 0,
          saida: 0,
        })
      }

      const entry = dateMap.get(date)

      if (type === "Entrada") {
        entry.entrada = item.quantity
      } else if (type === "Saída") {
        entry.saida = item.quantity
      }
    })

    dateMap.forEach((value) => {
      overviewData.push(value)
    })

    // Produtos com estoque baixo para alerta
    const lowStockAlerts = await Product.find({
      status: "Estoque Baixo",
    })
      .select("name currentStock minStock")
      .sort({ currentStock: 1 })
      .limit(5)

    // Atividades recentes
    const recentActivities = await StockMovement.find()
      .populate("product", "name")
      .populate("responsibleUser", "name")
      .sort({ date: -1 })
      .limit(5)

    return NextResponse.json({
      totalProducts,
      stockValue,
      lowStockProducts,
      outOfStockProducts,
      monthlyMovements,
      overviewData,
      lowStockAlerts,
      recentActivities,
    })
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error)
    return NextResponse.json({ error: "Erro ao buscar dados do dashboard" }, { status: 500 })
  }
}
