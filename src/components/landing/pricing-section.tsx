import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function PricingSection() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-accent">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Preços</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Planos para todos os tamanhos de negócio
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Escolha o plano que melhor se adapta às necessidades da sua empresa. Todos incluem suporte técnico.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Básico</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">R$99</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <CardDescription>Ideal para pequenos negócios</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Até 500 produtos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>2 usuários</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Relatórios básicos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Suporte por e-mail</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Começar agora</Button>
            </CardFooter>
          </Card>
          <Card className="border-primary">
            <CardHeader>
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-xs text-primary-foreground">
                Popular
              </div>
              <CardTitle className="text-xl">Profissional</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">R$199</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <CardDescription>Perfeito para empresas em crescimento</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Até 2.000 produtos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>5 usuários</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Relatórios avançados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Importação/Exportação de dados</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Começar agora</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Empresarial</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">R$399</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <CardDescription>Para médias e grandes empresas</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Produtos ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Usuários ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Relatórios personalizados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Suporte 24/7</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>API para integrações</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Treinamento personalizado</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Começar agora</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
