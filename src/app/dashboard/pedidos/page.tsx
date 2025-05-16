import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PedidosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pedidos</h1>
        <Link href="/dashboard/pedidos/novo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Pedido
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar pedidos..." className="pl-8" />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Select defaultValue="todos">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="enviado">Enviado</SelectItem>
              <SelectItem value="entregue">Entregue</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="recentes">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recentes">Mais Recentes</SelectItem>
              <SelectItem value="antigos">Mais Antigos</SelectItem>
              <SelectItem value="valor-maior">Maior Valor</SelectItem>
              <SelectItem value="valor-menor">Menor Valor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>#PED001</TableCell>
              <TableCell>15/05/2025</TableCell>
              <TableCell>João Silva</TableCell>
              <TableCell className="text-right">R$ 3.499,90</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Pendente
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#PED002</TableCell>
              <TableCell>14/05/2025</TableCell>
              <TableCell>Maria Oliveira</TableCell>
              <TableCell className="text-right">R$ 899,90</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Aprovado
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#PED003</TableCell>
              <TableCell>14/05/2025</TableCell>
              <TableCell>Carlos Santos</TableCell>
              <TableCell className="text-right">R$ 1.349,90</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Enviado
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#PED004</TableCell>
              <TableCell>13/05/2025</TableCell>
              <TableCell>Ana Pereira</TableCell>
              <TableCell className="text-right">R$ 129,90</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Entregue
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#PED005</TableCell>
              <TableCell>12/05/2025</TableCell>
              <TableCell>Pedro Costa</TableCell>
              <TableCell className="text-right">R$ 1.299,90</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Cancelado
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
