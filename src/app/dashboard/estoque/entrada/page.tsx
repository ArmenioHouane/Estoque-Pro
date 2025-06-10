"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Product {
  _id: string
  name: string
  code: string
  currentStock: number
}

interface Supplier {
  _id: string
  name: string
}

interface CartItem {
  productId: string
  productName: string
  quantity: number
}

export default function EntradaEstoquePage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form state
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [supplier, setSupplier] = useState("")
  const [reference, setReference] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [notes, setNotes] = useState("")

  useEffect(() => {
    fetchProducts()
    fetchSuppliers()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products?limit=100")
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setIsLoadingProducts(false)
    }
  }

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

  const addToCart = () => {
    if (!selectedProduct || quantity < 1) return

    const product = products.find((p) => p._id === selectedProduct)
    if (!product) return

    const existingItemIndex = cartItems.findIndex((item) => item.productId === selectedProduct)

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...cartItems]
      updatedItems[existingItemIndex].quantity += quantity
      setCartItems(updatedItems)
    } else {
      // Add new item
      setCartItems([
        ...cartItems,
        {
          productId: selectedProduct,
          productName: product.name,
          quantity,
        },
      ])
    }

    // Reset selection
    setSelectedProduct("")
    setQuantity(1)
  }

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.productId !== productId))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      if (cartItems.length === 0) {
        throw new Error("Adicione pelo menos um produto")
      }

      const response = await fetch("/api/stock-movements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "Entrada",
          products: cartItems,
          reason: "Compra",
          reference,
          supplier: supplier || "proprio",
          notes,
          date,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || data.details || "Erro ao registrar entrada de estoque")
      }

      setSuccess(true)

      // Reset form
      setCartItems([])
      setSupplier("")
      setReference("")
      setNotes("")

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/dashboard/estoque")
      }, 2000)
    } catch (error) {
      console.error("Error submitting stock entry:", error)
          } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/estoque">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Nova Entrada de Estoque</h1>
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
          <AlertDescription className="text-green-800">
            Entrada de estoque registrada com sucesso! Redirecionando...
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>Adicione os produtos que estão entrando no estoque</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="produto">Produto</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct} disabled={isLoadingProducts}>
                    <SelectTrigger id="produto">
                      <SelectValue placeholder={isLoadingProducts ? "Carregando..." : "Selecione um produto"} />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product._id} value={product._id}>
                          {product.name} ({product.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full space-y-2 sm:w-32">
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="flex items-end">
                  <Button className="w-full sm:w-auto" onClick={addToCart} disabled={!selectedProduct || quantity < 1}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-right">Quantidade</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                          Nenhum produto adicionado
                        </TableCell>
                      </TableRow>
                    ) : (
                      cartItems.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.productId)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Entrada</CardTitle>
            <CardDescription>Informações sobre esta entrada de estoque</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Select value={supplier} onValueChange={setSupplier} disabled={isLoadingSuppliers}>
                  <SelectTrigger id="fornecedor">
                    <SelectValue placeholder={isLoadingSuppliers ? "Carregando..." : "Selecione um fornecedor"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proprio">Próprio</SelectItem>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier._id} value={supplier._id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nota-fiscal">Nota Fiscal</Label>
                <Input
                  id="nota-fiscal"
                  placeholder="Número da NF"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input id="data" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Observações sobre esta entrada..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Link href="/dashboard/estoque">
              <Button variant="outline" disabled={isSubmitting}>
                Cancelar
              </Button>
            </Link>
            <Button onClick={handleSubmit} disabled={cartItems.length === 0 || isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar Entrada
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
