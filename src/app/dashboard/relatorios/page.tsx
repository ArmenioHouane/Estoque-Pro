import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EstoqueChart } from "@/components/estoque-chart"
import { VendasChart } from "@/components/vendas-chart"
import { ProdutosPopularesChart } from "@/components/produtos-populares-chart"

export default function RelatoriosPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Relatórios</h1>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select defaultValue="mes">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Última Semana</SelectItem>
              <SelectItem value="mes">Último Mês</SelectItem>
              <SelectItem value="trimestre">Último Trimestre</SelectItem>
              <SelectItem value="ano">Último Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Exportar Relatórios</Button>
      </div>

      <Tabs defaultValue="estoque" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="estoque">Estoque</TabsTrigger>
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
          <TabsTrigger value="produtos">Produtos Populares</TabsTrigger>
        </TabsList>
        <TabsContent value="estoque">
          <Card>
            <CardHeader>
              <CardTitle>Movimentação de Estoque</CardTitle>
              <CardDescription>Entradas e saídas de produtos no último mês</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <EstoqueChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vendas">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Vendas</CardTitle>
              <CardDescription>Desempenho de vendas no último mês</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <VendasChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="produtos">
          <Card>
            <CardHeader>
              <CardTitle>Produtos Mais Movimentados</CardTitle>
              <CardDescription>Top 10 produtos com maior movimentação</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ProdutosPopularesChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
