//dashboard/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { LowStockAlert } from "@/components/low-stock-alert"
import { formatCurrency } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dashboardData, setDashboardData] = useState<any>({
    totalProducts: 0,
    stockValue: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    monthlyMovements: 0,
    overviewData: [],
    lowStockAlerts: [],
    recentActivities: [],
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard")

        if (!response.ok) {
          throw new Error("Falha ao carregar dados do dashboard")
        }

        const data = await response.json()
        setDashboardData(data)
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error)
        toast.error("Não foi possível carregar os dados do dashboard")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Produtos</CardDescription>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <CardTitle className="text-3xl">{dashboardData.totalProducts}</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {loading ? <Skeleton className="h-4 w-40" /> : "Produtos cadastrados no sistema"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Valor do Estoque</CardDescription>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <CardTitle className="text-3xl">{formatCurrency(dashboardData.stockValue)}</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {loading ? <Skeleton className="h-4 w-40" /> : "Valor total do estoque atual"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Produtos com Estoque Baixo</CardDescription>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <CardTitle className="text-3xl">{dashboardData.lowStockProducts}</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {loading ? <Skeleton className="h-4 w-40" /> : `${dashboardData.outOfStockProducts} produtos sem estoque`}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Movimentações no Mês</CardDescription>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <CardTitle className="text-3xl">{dashboardData.monthlyMovements}</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {loading ? <Skeleton className="h-4 w-40" /> : "Entradas e saídas no mês atual"}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>Movimentação de estoque nos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[350px] w-full animate-pulse bg-muted rounded-md" />
            ) : (
              <Overview data={dashboardData.overviewData} />
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Produtos com Estoque Baixo</CardTitle>
            <CardDescription>Produtos que precisam de reposição</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <LowStockAlert products={dashboardData.lowStockAlerts} />
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardDescription>Últimas movimentações no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <RecentActivity activities={dashboardData.recentActivities} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
