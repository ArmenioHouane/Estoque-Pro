import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EntradaEstoquePage() {
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
                  <Select>
                    <SelectTrigger id="produto">
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="notebook-dell">Notebook Dell Inspiron</SelectItem>
                      <SelectItem value="monitor-lg">Monitor LG 24&quot;</SelectItem>
                      <SelectItem value="teclado-logitech">Teclado Mecânico Logitech</SelectItem>
                      <SelectItem value="mouse-microsoft">Mouse Sem Fio Microsoft</SelectItem>
                      <SelectItem value="cadeira-gamer">Cadeira Gamer ThunderX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full space-y-2 sm:w-32">
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input id="quantidade" type="number" min="1" defaultValue="1" />
                </div>
                <div className="flex items-end">
                  <Button className="w-full sm:w-auto">
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
                    <TableRow>
                      <TableCell>Notebook Dell Inspiron</TableCell>
                      <TableCell className="text-right">5</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Monitor LG 24&quot;</TableCell>
                      <TableCell className="text-right">3</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
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
                <Select>
                  <SelectTrigger id="fornecedor">
                    <SelectValue placeholder="Selecione um fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech-distribuidora">Tech Distribuidora</SelectItem>
                    <SelectItem value="info-supply">Info Supply</SelectItem>
                    <SelectItem value="mega-eletronicos">Mega Eletrônicos</SelectItem>
                    <SelectItem value="office-moveis">Office Móveis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nota-fiscal">Nota Fiscal</Label>
                <Input id="nota-fiscal" placeholder="Número da NF" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input id="data" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" placeholder="Observações sobre esta entrada..." />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Link href="/dashboard/estoque">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button>Confirmar Entrada</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
