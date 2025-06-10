//components/low-stock-alert.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface LowStockAlertProps {
  products: {
    _id: string
    name: string
    currentStock: number
    minStock: number
  }[]
}

export function LowStockAlert({ products }: LowStockAlertProps) {
  return (
    <div className="space-y-4">
      {products.length === 0 ? (
        <p className="text-sm text-muted-foreground">Não há produtos com estoque baixo.</p>
      ) : (
        products.map((product) => {
          const percentage = Math.min(Math.round((product.currentStock / product.minStock) * 100), 100)

          return (
            <Card key={product._id} className="border-none shadow-none">
              <CardContent className="p-0">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{product.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {product.currentStock} / {product.minStock}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )
        })
      )}
    </div>
  )
}
