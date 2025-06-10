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
  sellingPrice: number
  currentStock: number
}

interface CartItem {
  product: string
  productName: string
  quantity: number
  unitPrice: number
  subtotal: number
  maxStock: number
}

export default function NovoPedidoPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form state
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [status, setStatus] = useState("Pendente")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [notes, setNotes] = useState("")

  // Calculated values
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    // Calculate total amount whenever cart items change
    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0)
    setTotalAmount(total)
  }, [cartItems])

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

  const addToCart = () => {
    if (!selectedProduct || quantity < 1) return

    const product = products.find((p) => p._id === selectedProduct)
    if (!product) return

    if (quantity > product.currentStock) {
      setError(`Quantidade excede o estoque disponível (${product.currentStock})`)
      return
    }

    const existingItemIndex = cartItems.findIndex((item) => item.product === selectedProduct)

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...cartItems]
      const newQuantity = updatedItems[existingItemIndex].quantity + quantity

      if (newQuantity > product.currentStock) {
        setError(`Quantidade total excede o estoque disponível (${product.currentStock})`)
        return
      }

      updatedItems[existingItemIndex].quantity = newQuantity
      updatedItems[existingItemIndex].subtotal = newQuantity * product.sellingPrice
      setCartItems(updatedItems)
    } else {
      // Add new item
      setCartItems([
        ...cartItems,
        {
          product: selectedProduct,
          productName: product.name,
          quantity,
          unitPrice: product.sellingPrice,
          subtotal: quantity * product.sellingPrice,
          maxStock: product.currentStock,
        },
      ])
    }

    // Reset selection
    setSelectedProduct("")
    setQuantity(1)
    setError(null)
  }

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product !== productId))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      if (cartItems.length === 0) {
        throw new Error("Adicione pelo menos um produto")
      }

      if (!customerName) {
        throw new Error("Nome do cliente é obrigatório")
      }

      if (!paymentMethod) {
        throw new Error("Forma de pagamento é obrigatória")
      }

      const orderData = {
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          address: customerAddress,
        },
        items: cartItems,
        totalAmount,
        status,
        paymentMethod,
        notes,
        date,
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || data.details || "Erro ao criar pedido")
      }

      setSuccess(true)

      // Reset form
      setCartItems([])
      setCustomerName("")
      setCustomerEmail("")
      setCustomerPhone("")
      setCustomerAddress("")
      setPaymentMethod("")
      setStatus("Pendente")
      setNotes("")

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/dashboard/pedidos")
      }, 2000)
    } catch (error) {
      console.error("Erro ao criar pedido", error)
      setIsSubmitting(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pedidos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Novo Pedido</h1>
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
          <AlertDescription className="text-green-800">Pedido criado com sucesso! Redirecionando...</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>Adicione os produtos ao pedido</CardDescription>
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
                      {products
                        .filter((product) => product.currentStock > 0)
                        .map((product) => (
                          <SelectItem key={product._id} value={product._id}>
                            {product.name} ({product.code}) - {formatCurrency(product.sellingPrice)}
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
                      <TableHead className="text-right">Preço Unit.</TableHead>
                      <TableHead className="text-right">Quantidade</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                          Nenhum produto adicionado
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {cartItems.map((item) => (
                          <TableRow key={item.product}>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.subtotal)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.product)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-medium">
                            Total:
                          </TableCell>
                          <TableCell className="text-right font-bold">{formatCurrency(totalAmount)}</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Pedido</CardTitle>
            <CardDescription>Informações sobre este pedido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente *</Label>
                <Input
                  id="cliente"
                  placeholder="Nome do cliente"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="E-mail do cliente"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="Telefone do cliente"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  placeholder="Endereço do cliente"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input id="data" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="forma-pagamento">Forma de Pagamento *</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                  <SelectTrigger id="forma-pagamento">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                    <SelectItem value="Cartão de Débito">Cartão de Débito</SelectItem>
                    <SelectItem value="PIX">PIX</SelectItem>
                    <SelectItem value="Boleto Bancário">Boleto Bancário</SelectItem>
                    <SelectItem value="Transferência Bancária">Transferência Bancária</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Aprovado">Aprovado</SelectItem>
                    <SelectItem value="Enviado">Enviado</SelectItem>
                    <SelectItem value="Entregue">Entregue</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Observações sobre este pedido..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Link href="/dashboard/pedidos">
              <Button variant="outline" disabled={isSubmitting}>
                Cancelar
              </Button>
            </Link>
            <Button
              onClick={handleSubmit}
              disabled={cartItems.length === 0 || !customerName || !paymentMethod || isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Pedido
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
