import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NovoFornecedorPage() {
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

      <Card>
        <CardHeader>
          <CardTitle>Informações do Fornecedor</CardTitle>
          <CardDescription>Preencha os dados do novo fornecedor</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Empresa</Label>
                <Input id="nome" placeholder="Ex: Tech Distribuidora" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" placeholder="Ex: 12.345.678/0001-90" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato">Nome do Contato</Label>
                <Input id="contato" placeholder="Ex: Roberto Almeida" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Input id="cargo" placeholder="Ex: Gerente Comercial" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="Ex: contato@empresa.com.br" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="Ex: (11) 3456-7890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="celular">Celular</Label>
                <Input id="celular" placeholder="Ex: (11) 98765-4321" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site">Site</Label>
                <Input id="site" placeholder="Ex: www.empresa.com.br" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Endereço</Label>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" placeholder="Ex: 01234-567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logradouro">Logradouro</Label>
                  <Input id="logradouro" placeholder="Ex: Av. Paulista" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input id="numero" placeholder="Ex: 1000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input id="complemento" placeholder="Ex: Sala 101" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input id="bairro" placeholder="Ex: Bela Vista" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" placeholder="Ex: São Paulo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select>
                    <SelectTrigger id="estado">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ac">Acre</SelectItem>
                      <SelectItem value="al">Alagoas</SelectItem>
                      <SelectItem value="ap">Amapá</SelectItem>
                      <SelectItem value="am">Amazonas</SelectItem>
                      <SelectItem value="ba">Bahia</SelectItem>
                      <SelectItem value="ce">Ceará</SelectItem>
                      <SelectItem value="df">Distrito Federal</SelectItem>
                      <SelectItem value="es">Espírito Santo</SelectItem>
                      <SelectItem value="go">Goiás</SelectItem>
                      <SelectItem value="ma">Maranhão</SelectItem>
                      <SelectItem value="mt">Mato Grosso</SelectItem>
                      <SelectItem value="ms">Mato Grosso do Sul</SelectItem>
                      <SelectItem value="mg">Minas Gerais</SelectItem>
                      <SelectItem value="pa">Pará</SelectItem>
                      <SelectItem value="pb">Paraíba</SelectItem>
                      <SelectItem value="pr">Paraná</SelectItem>
                      <SelectItem value="pe">Pernambuco</SelectItem>
                      <SelectItem value="pi">Piauí</SelectItem>
                      <SelectItem value="rj">Rio de Janeiro</SelectItem>
                      <SelectItem value="rn">Rio Grande do Norte</SelectItem>
                      <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                      <SelectItem value="ro">Rondônia</SelectItem>
                      <SelectItem value="rr">Roraima</SelectItem>
                      <SelectItem value="sc">Santa Catarina</SelectItem>
                      <SelectItem value="sp">São Paulo</SelectItem>
                      <SelectItem value="se">Sergipe</SelectItem>
                      <SelectItem value="to">Tocantins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pais">País</Label>
                  <Input id="pais" defaultValue="Brasil" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea id="observacoes" placeholder="Observações sobre este fornecedor..." className="min-h-[120px]" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link href="/dashboard/fornecedores">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button>Salvar Fornecedor</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
