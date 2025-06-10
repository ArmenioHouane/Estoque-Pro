"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

interface Supplier {
  _id: string
  name: string
}

export default function NovoProdutoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true)

  // Form state
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    category: "",
    supplier: "",
    costPrice: "",
    sellingPrice: "",
    minStock: "0",
    currentStock: "0",
  })

  // Load suppliers
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/api/suppliers?limit=100")
        if (!response.ok) {
          throw new Error("Failed to fetch suppliers")
        }
        const data = await response.json()
        setSuppliers(data.suppliers)
      } catch (error) {
        console.error("Error fetching suppliers:", error)
      } finally {
        setIsLoadingSuppliers(false)
      }
    }

    fetchSuppliers()
  }, [])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Handle select changes
  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Falha ao criar produto")
      }

      setSuccess(true)
      // Reset form
      setFormData({
        code: "",
        name: "",
        description: "",
        category: "",
        supplier: "",
        costPrice: "",
        sellingPrice: "",
        minStock: "0",
        currentStock: "0",
      })

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/dashboard/produtos")
      }, 2000)
    } catch (error) {
      console.error("alha ao criar produto. Por favor, tente novamente", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/produtos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Novo Produto</h1>
      </div>

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
          <AlertDescription className="text-green-800">Produto criado com sucesso! Redirecionando...</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Informações do Produto</CardTitle>
          <CardDescription>Preencha os dados do novo produto</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="product-form" className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="code">Código *</Label>
                <Input id="code" placeholder="Ex: PRD001" value={formData.code} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Notebook Dell Inspiron"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                    <SelectItem value="perifericos">Periféricos</SelectItem>
                    <SelectItem value="moveis">Móveis</SelectItem>
                    <SelectItem value="acessorios">Acessórios</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Fornecedor *</Label>
                <Select
                  value={formData.supplier}
                  onValueChange={(value) => handleSelectChange("supplier", value)}
                  required
                  disabled={isLoadingSuppliers}
                >
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder={isLoadingSuppliers ? "Carregando..." : "Selecione um fornecedor"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proprio">Próprio</SelectItem>
                    {suppliers.length > 0 ? (
                      suppliers.map((supplier) => (
                        <SelectItem key={supplier._id} value={supplier._id}>
                          {supplier.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-suppliers" disabled>
                        Nenhum fornecedor encontrado
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="costPrice">Preço de Custo (R$) *</Label>
                <Input
                  id="costPrice"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.costPrice}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellingPrice">Preço de Venda (R$) *</Label>
                <Input
                  id="sellingPrice"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">Estoque Mínimo</Label>
                <Input
                  id="minStock"
                  type="number"
                  placeholder="5"
                  value={formData.minStock}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentStock">Estoque Inicial</Label>
                <Input
                  id="currentStock"
                  type="number"
                  placeholder="10"
                  value={formData.currentStock}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva o produto..."
                className="min-h-[120px]"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link href="/dashboard/produtos">
            <Button variant="outline" disabled={isLoading}>
              Cancelar
            </Button>
          </Link>
          <Button type="submit" form="product-form" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Produto
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
