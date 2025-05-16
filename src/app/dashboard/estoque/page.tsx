import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

export default function EstoquePage() {
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
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar movimentações..." className="pl-8" />
        </div>
        <Button variant="outline">Filtros</Button>
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
            <TableRow>
              <TableCell>MOV001</TableCell>
              <TableCell>15/05/2025</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Entrada
                </Badge>
              </TableCell>
              <TableCell>Notebook Dell Inspiron</TableCell>
              <TableCell className="text-right">5</TableCell>
              <TableCell>João Silva</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MOV002</TableCell>
              <TableCell>14/05/2025</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Saída
                </Badge>
              </TableCell>
              <TableCell>Monitor LG 24&quot;</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell>Maria Oliveira</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MOV003</TableCell>
              <TableCell>14/05/2025</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Entrada
                </Badge>
              </TableCell>
              <TableCell>Teclado Mecânico Logitech</TableCell>
              <TableCell className="text-right">10</TableCell>
              <TableCell>Carlos Santos</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MOV004</TableCell>
              <TableCell>13/05/2025</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Saída
                </Badge>
              </TableCell>
              <TableCell>Mouse Sem Fio Microsoft</TableCell>
              <TableCell className="text-right">3</TableCell>
              <TableCell>Ana Pereira</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MOV005</TableCell>
              <TableCell>12/05/2025</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Saída
                </Badge>
              </TableCell>
              <TableCell>Cadeira Gamer ThunderX</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell>Pedro Costa</TableCell>
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
