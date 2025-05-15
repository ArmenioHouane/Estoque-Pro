import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, BoxIcon, ClipboardList, Users, Zap, Clock, Shield } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Funcionalidades
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Tudo o que você precisa para gerenciar seu negócio
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Nossa plataforma oferece todas as ferramentas necessárias para controlar seu estoque, gerenciar produtos e
              acompanhar vendas.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <BoxIcon className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">Controle de Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitore níveis de estoque em tempo real e receba alertas automáticos quando produtos atingirem o
                estoque mínimo.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <ClipboardList className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">Gestão de Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Cadastre e organize seus produtos com categorias, códigos personalizados e informações detalhadas.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">Relatórios Detalhados</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visualize dados importantes do seu negócio com relatórios personalizáveis e gráficos interativos.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">Gestão de Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Controle quem tem acesso ao sistema com diferentes níveis de permissão para cada tipo de usuário.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Zap className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">Interface Intuitiva</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Navegue facilmente pelo sistema com uma interface moderna, responsiva e amigável para todos os usuários.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Clock className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">Economia de Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Automatize processos repetitivos e reduza o tempo gasto em tarefas administrativas do dia a dia.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader className="pb-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">Segurança e Confiabilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Seus dados estão protegidos com as mais modernas tecnologias de segurança. Backups automáticos garantem
                que você nunca perca informações importantes.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
