"use client"

import type React from "react"

import { useState } from "react"
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

export default function NovoFornecedorPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    nuit: "",
    contactName: "",
    contactRole: "",
    email: "",
    phone: "",
    mobile: "",
    website: "",
    address: {
      zipCode: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "Brasil",
    },
    notes: "",
    status: "Ativo",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target

    if (id.includes(".")) {
      // Handle nested fields (address)
      const [parent, child] = id.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
          [child]: value,
        },
      }))
    } else {
      // Handle top-level fields
      setFormData((prev) => ({ ...prev, [id]: value }))
    }
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      // Validate required fields
      if (!formData.name || !formData.nuit || !formData.contactName || !formData.email || !formData.phone) {
        throw new Error("Preencha todos os campos obrigatórios")
      }

      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || data.details || "Erro ao criar fornecedor")
      }

      setSuccess(true)

      // Reset form
      setFormData({
        name: "",
        nuit: "",
        contactName: "",
        contactRole: "",
        email: "",
        phone: "",
        mobile: "",
        website: "",
        address: {
          zipCode: "",
          street: "",
          number: "",
          complement: "",
          neighborhood: "",
          city: "",
          state: "",
          country: "Brasil",
        },
        notes: "",
        status: "Ativo",
      })

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/dashboard/fornecedores")
      }, 2000)
    } catch (error) {
      console.error("Erro ao criar fornecedor:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/fornecedores">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Novo Fornecedor</h1>
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
            Fornecedor criado com sucesso! Redirecionando...
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Informações do Fornecedor</CardTitle>
          <CardDescription>Preencha os dados do novo fornecedor</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="supplier-form" className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Empresa *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Tech Distribuidora"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nuit">CNPJ *</Label>
                <Input
                  id="nuit"
                  placeholder="Ex: 12.345.678/0001-90"
                  value={formData.nuit}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName">Nome do Contato *</Label>
                <Input
                  id="contactName"
                  placeholder="Ex: Roberto Almeida"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactRole">Cargo</Label>
                <Input
                  id="contactRole"
                  placeholder="Ex: Gerente Comercial"
                  value={formData.contactRole}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ex: contato@empresa.com.br"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  placeholder="Ex: (11) 3456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Celular</Label>
                <Input id="mobile" placeholder="Ex: (11) 98765-4321" value={formData.mobile} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Site</Label>
                <Input
                  id="website"
                  placeholder="Ex: www.empresa.com.br"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Endereço</Label>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="address.zipCode">CEP</Label>
                  <Input
                    id="address.zipCode"
                    placeholder="Ex: 01234-567"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.street">Logradouro</Label>
                  <Input
                    id="address.street"
                    placeholder="Ex: Av. Paulista"
                    value={formData.address.street}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.number">Número</Label>
                  <Input
                    id="address.number"
                    placeholder="Ex: 1000"
                    value={formData.address.number}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.complement">Complemento</Label>
                  <Input
                    id="address.complement"
                    placeholder="Ex: Sala 101"
                    value={formData.address.complement}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.neighborhood">Bairro</Label>
                  <Input
                    id="address.neighborhood"
                    placeholder="Ex: Bela Vista"
                    value={formData.address.neighborhood}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.city">Cidade</Label>
                  <Input
                    id="address.city"
                    placeholder="Ex: São Paulo"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.state">Estado</Label>
                  <Select
                    value={formData.address.state}
                    onValueChange={(value) => handleSelectChange("address.state", value)}
                  >
                    <SelectTrigger id="address.state">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC">Acre</SelectItem>
                      <SelectItem value="AL">Alagoas</SelectItem>
                      <SelectItem value="AP">Amapá</SelectItem>
                      <SelectItem value="AM">Amazonas</SelectItem>
                      <SelectItem value="BA">Bahia</SelectItem>
                      <SelectItem value="CE">Ceará</SelectItem>
                      <SelectItem value="DF">Distrito Federal</SelectItem>
                      <SelectItem value="ES">Espírito Santo</SelectItem>
                      <SelectItem value="GO">Goiás</SelectItem>
                      <SelectItem value="MA">Maranhão</SelectItem>
                      <SelectItem value="MT">Mato Grosso</SelectItem>
                      <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="PA">Pará</SelectItem>
                      <SelectItem value="PB">Paraíba</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="PE">Pernambuco</SelectItem>
                      <SelectItem value="PI">Piauí</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="RO">Rondônia</SelectItem>
                      <SelectItem value="RR">Roraima</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="SE">Sergipe</SelectItem>
                      <SelectItem value="TO">Tocantins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.country">País</Label>
                  <Input id="address.country" value={formData.address.country} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Observações sobre este fornecedor..."
                className="min-h-[120px]"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link href="/dashboard/fornecedores">
            <Button variant="outline" disabled={isSubmitting}>
              Cancelar
            </Button>
          </Link>
          <Button type="submit" form="supplier-form" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Fornecedor
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
