import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

export default function FornecedoresPage() {
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
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar fornecedores..." className="pl-8" />
        </div>
        <Button variant="outline">Filtros</Button>
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
            <TableRow>
              <TableCell>Tech Distribuidora</TableCell>
              <TableCell>12.345.678/0001-90</TableCell>
              <TableCell>Roberto Almeida</TableCell>
              <TableCell>contato@techdistribuidora.com.br</TableCell>
              <TableCell>(11) 3456-7890</TableCell>
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
              <TableCell>Info Supply</TableCell>
              <TableCell>23.456.789/0001-01</TableCell>
              <TableCell>Carla Mendes</TableCell>
              <TableCell>carla@infosupply.com.br</TableCell>
              <TableCell>(11) 4567-8901</TableCell>
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
              <TableCell>Mega Eletrônicos</TableCell>
              <TableCell>34.567.890/0001-12</TableCell>
              <TableCell>Fernando Costa</TableCell>
              <TableCell>fernando@megaeletronicos.com.br</TableCell>
              <TableCell>(11) 5678-9012</TableCell>
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
              <TableCell>Office Móveis</TableCell>
              <TableCell>45.678.901/0001-23</TableCell>
              <TableCell>Luciana Ferreira</TableCell>
              <TableCell>luciana@officemoveis.com.br</TableCell>
              <TableCell>(11) 6789-0123</TableCell>
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
              <TableCell>Digital Imports</TableCell>
              <TableCell>56.789.012/0001-34</TableCell>
              <TableCell>Ricardo Oliveira</TableCell>
              <TableCell>ricardo@digitalimports.com.br</TableCell>
              <TableCell>(11) 7890-1234</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Inativo
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
