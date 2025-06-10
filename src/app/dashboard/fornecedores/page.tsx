"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Loader2, Edit } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

interface Supplier {
  _id: string
  name: string
  nuit: string
  contactName: string
  email: string
  phone: string
  status: string
}

export default function FornecedoresPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Edit dialog state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    nuit: "",
    contactName: "",
    contactRole: "",
    email: "",
    phone: "",
    mobile: "",
    website: "",
    status: "",
    notes: "",
  })

  useEffect(() => {
    fetchSuppliers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter, currentPage])

  const fetchSuppliers = async () => {
    setIsLoading(true)
    try {
      let url = `/api/suppliers?page=${currentPage}&limit=10`

      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`
      }

      if (statusFilter !== "all") {
        url += `&status=${encodeURIComponent(statusFilter)}`
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch suppliers")
      }

      const data = await response.json()
      setSuppliers(data.suppliers)
      setTotalPages(data.pagination.pages)
    } catch (error) {
      console.error("Error fetching suppliers:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page on new search
    fetchSuppliers()
  }

  const openEditDialog = async (supplier: Supplier) => {
    try {
      // Fetch full supplier details
      const response = await fetch(`/api/suppliers/${supplier._id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch supplier details")
      }
      const data = await response.json()

      setSelectedSupplier(data.supplier)
      setEditForm({
        name: data.supplier.name || "",
        nuit: data.supplier.nuit || "",
        contactName: data.supplier.contactName || "",
        contactRole: data.supplier.contactRole || "",
        email: data.supplier.email || "",
        phone: data.supplier.phone || "",
        mobile: data.supplier.mobile || "",
        website: data.supplier.website || "",
        status: data.supplier.status || "Ativo",
        notes: data.supplier.notes || "",
      })
      setIsEditDialogOpen(true)
    } catch (error) {
      console.error("Error fetching supplier details:", error)
    }
  }

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setEditForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleStatusChange = (value: string) => {
    setEditForm((prev) => ({ ...prev, status: value }))
  }

  const handleEditSubmit = async () => {
    if (!selectedSupplier) return

    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch(`/api/suppliers/${selectedSupplier._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || data.details || "Erro ao atualizar fornecedor")
      }

      setSuccess(true)

      // Refresh suppliers list
      fetchSuppliers()

      // Close dialog after 1.5 seconds
      setTimeout(() => {
        setIsEditDialogOpen(false)
        setSuccess(false)
      }, 1500)
    } catch (error) {
      console.error("Erro ao atualizar fornecedor", error)
      
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Ativo
          </Badge>
        )
      case "Inativo":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Inativo
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Fornecedores</h1>
        <Link href="/dashboard/fornecedores/novo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Fornecedor
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <form onSubmit={handleSearch} className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar fornecedores..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="flex w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="Ativo">Ativo</SelectItem>
              <SelectItem value="Inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="ml-2" onClick={() => fetchSuppliers()}>
            Filtrar
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Carregando fornecedores...
                  </div>
                </TableCell>
              </TableRow>
            ) : suppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Nenhum fornecedor encontrado.
                </TableCell>
              </TableRow>
            ) : (
              suppliers.map((supplier) => (
                <TableRow key={supplier._id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.nuit}</TableCell>
                  <TableCell>{supplier.contactName}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(supplier)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
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

      {/* Edit Supplier Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Fornecedor</DialogTitle>
            <DialogDescription>Atualize as informações do fornecedor</DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Sucesso</AlertTitle>
              <AlertDescription className="text-green-800">Fornecedor atualizado com sucesso!</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Empresa</Label>
              <Input id="name" value={editForm.name} onChange={handleEditFormChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nuit">CNPJ</Label>
              <Input id="nuit" value={editForm.nuit} onChange={handleEditFormChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">Nome do Contato</Label>
              <Input id="contactName" value={editForm.contactName} onChange={handleEditFormChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactRole">Cargo</Label>
              <Input id="contactRole" value={editForm.contactRole} onChange={handleEditFormChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={editForm.email} onChange={handleEditFormChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" value={editForm.phone} onChange={handleEditFormChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Celular</Label>
              <Input id="mobile" value={editForm.mobile} onChange={handleEditFormChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Site</Label>
              <Input id="website" value={editForm.website} onChange={handleEditFormChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={editForm.status} onValueChange={handleStatusChange}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea id="notes" value={editForm.notes} onChange={handleEditFormChange} className="min-h-[100px]" />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button onClick={handleEditSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
