"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Loader2, Eye } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductMovement {
  product: {
    name: string
  }
  quantity: number
  previousStock: number
  newStock: number
}

interface StockMovement {
  _id: string
  movementId: string
  date: string
  type: "Entrada" | "Saída" | "Ajuste"
  productSummary: string
  totalQuantity: number
  responsibleUser: {
    name: string
  }
  reference?: string
  supplierName?: string
  reason?: string
  supplier?: string
  products?: ProductMovement[]
  notes?: string
}

export default function EstoquePage() {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
 const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

 

 const fetchStockMovements = useCallback(async () => {
    setIsLoading(true)
    try {
      let url = `/api/stock-movements?page=${currentPage}&limit=10`

      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`
      }

      if (typeFilter !== "all") {
        url += `&type=${encodeURIComponent(typeFilter)}`
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch stock movements")
      }

      const data = await response.json()
      setStockMovements(data.stockMovements)
      setTotalPages(data.pagination.pages)
    } catch (error) {
      console.error("Error fetching stock movements:", error)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, searchTerm, typeFilter])

  useEffect(() => {
    fetchStockMovements()
  }, [fetchStockMovements])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page on new search
    fetchStockMovements()
  }

  const viewMovementDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/stock-movements/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch movement details")
      }
      const data = await response.json()
      setSelectedMovement(data.stockMovement)
      setIsDialogOpen(true)
    } catch (error) {
      console.error("Error fetching movement details:", error)
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Entrada":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Entrada
          </Badge>
        )
      case "Saída":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Saída
          </Badge>
        )
      case "Ajuste":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Ajuste
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR })
    } catch (error) {
      console.error(error)
      return dateString
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Movimentações de Estoque</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/estoque/entrada">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Entrada
            </Button>
          </Link>
          <Link href="/dashboard/estoque/saida">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Saída
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <form onSubmit={handleSearch} className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar movimentações..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="flex w-full sm:w-auto">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="Entrada">Entrada</SelectItem>
              <SelectItem value="Saída">Saída</SelectItem>
              <SelectItem value="Ajuste">Ajuste</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="ml-2" onClick={() => fetchStockMovements()}>
            Filtrar
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Carregando movimentações...
                  </div>
                </TableCell>
              </TableRow>
            ) : stockMovements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhuma movimentação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              stockMovements.map((movement) => (
                <TableRow key={movement._id}>
                  <TableCell>{movement.movementId}</TableCell>
                  <TableCell>{formatDate(movement.date)}</TableCell>
                  <TableCell>{getTypeBadge(movement.type)}</TableCell>
                  <TableCell>{movement.productSummary}</TableCell>
                  <TableCell className="text-right">{movement.totalQuantity}</TableCell>
                  <TableCell>{movement.responsibleUser?.name || "Não especificado"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => viewMovementDetails(movement._id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <span className="flex items-center px-4">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </div>
      )}

      {/* Movement Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Movimentação</DialogTitle>
            <DialogDescription>
              {selectedMovement?.movementId} - {selectedMovement && formatDate(selectedMovement.date)}
            </DialogDescription>
          </DialogHeader>

          {selectedMovement && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm">Tipo</h3>
                  <p>{getTypeBadge(selectedMovement.type)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Motivo</h3>
                  <p>{selectedMovement.reason}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Referência</h3>
                  <p>{selectedMovement.reference || "Não especificado"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Responsável</h3>
                  <p>{selectedMovement.responsibleUser?.name || "Não especificado"}</p>
                </div>
                {selectedMovement.supplier && (
                  <div>
                    <h3 className="font-semibold text-sm">Fornecedor</h3>
                    <p>{selectedMovement.supplierName}</p>
                  </div>
                )}
              </div>

             {selectedMovement?.products && (
  <div>
    <h3 className="font-semibold text-sm mb-2">Produtos</h3>
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
            <TableHead className="text-right">Estoque Anterior</TableHead>
            <TableHead className="text-right">Novo Estoque</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedMovement.products.length > 0 ? (
            selectedMovement.products.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">{item.previousStock}</TableCell>
                <TableCell className="text-right">{item.newStock}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Nenhum produto listado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
)}

              {selectedMovement.notes && (
                <div>
                  <h3 className="font-semibold text-sm">Observações</h3>
                  <p className="text-sm">{selectedMovement.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
