import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

export default function ProdutosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <Link href="/dashboard/produtos/novo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar produtos..." className="pl-8" />
        </div>
        <Button variant="outline">Filtros</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>PRD001</TableCell>
              <TableCell>Notebook Dell Inspiron</TableCell>
              <TableCell>Eletrônicos</TableCell>
              <TableCell className="text-right">R$ 3.499,90</TableCell>
              <TableCell className="text-right">15</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Ativo
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PRD002</TableCell>
              <TableCell>Monitor LG 24&quot;</TableCell>
              <TableCell>Eletrônicos</TableCell>
              <TableCell className="text-right">R$ 899,90</TableCell>
              <TableCell className="text-right">8</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Ativo
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PRD003</TableCell>
              <TableCell>Teclado Mecânico Logitech</TableCell>
              <TableCell>Periféricos</TableCell>
              <TableCell className="text-right">R$ 349,90</TableCell>
              <TableCell className="text-right">3</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Estoque Baixo
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PRD004</TableCell>
              <TableCell>Mouse Sem Fio Microsoft</TableCell>
              <TableCell>Periféricos</TableCell>
              <TableCell className="text-right">R$ 129,90</TableCell>
              <TableCell className="text-right">22</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Ativo
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PRD005</TableCell>
              <TableCell>Cadeira Gamer ThunderX</TableCell>
              <TableCell>Móveis</TableCell>
              <TableCell className="text-right">R$ 1.299,90</TableCell>
              <TableCell className="text-right">0</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Sem Estoque
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
