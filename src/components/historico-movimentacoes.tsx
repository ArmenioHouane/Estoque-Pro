import { Badge } from "@/components/ui/badge"

export function HistoricoMovimentacoes() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Entrada
            </Badge>
            <div>
              <p className="font-medium">Adicionado ao estoque</p>
              <p className="text-sm text-muted-foreground">15/05/2025 às 09:15</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">+5 unidades</p>
            <p className="text-sm text-muted-foreground">Total: 15 unidades</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Responsável: João Silva</p>
          <p>Nota Fiscal: NF-e 12345</p>
          <p>Fornecedor: Tech Distribuidora</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              Saída
            </Badge>
            <div>
              <p className="font-medium">Removido do estoque</p>
              <p className="text-sm text-muted-foreground">10/05/2025 às 14:30</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">-2 unidades</p>
            <p className="text-sm text-muted-foreground">Total: 10 unidades</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Responsável: Maria Oliveira</p>
          <p>Pedido: #PED002</p>
          <p>Cliente: Carlos Santos</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Entrada
            </Badge>
            <div>
              <p className="font-medium">Adicionado ao estoque</p>
              <p className="text-sm text-muted-foreground">05/05/2025 às 10:45</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">+12 unidades</p>
            <p className="text-sm text-muted-foreground">Total: 12 unidades</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Responsável: Carlos Santos</p>
          <p>Nota Fiscal: NF-e 12340</p>
          <p>Fornecedor: Tech Distribuidora</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              Ajuste
            </Badge>
            <div>
              <p className="font-medium">Ajuste de inventário</p>
              <p className="text-sm text-muted-foreground">01/05/2025 às 16:20</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">-2 unidades</p>
            <p className="text-sm text-muted-foreground">Total: 0 unidades</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Responsável: Ana Pereira</p>
          <p>Motivo: Inventário físico</p>
        </div>
      </div>
    </div>
  )
}
