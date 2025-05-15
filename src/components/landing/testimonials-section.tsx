import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Depoimentos
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">O que nossos clientes dizem</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Veja como o InventárioFácil tem ajudado empresas a otimizar seus processos.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                &quot;O InventárioFácil transformou a maneira como gerenciamos nosso estoque. Economizamos horas de trabalho
                toda semana e reduzimos erros de inventário em 90%.&quot;
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@usuario" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">João Silva</p>
                  <p className="text-xs text-muted-foreground">Gerente de Operações, TechStore</p>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                &quot;Interface intuitiva e relatórios detalhados. Conseguimos identificar tendências de vendas que antes
                passavam despercebidas. Recomendo fortemente!&quot;
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@usuario" />
                  <AvatarFallback>MO</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Maria Oliveira</p>
                  <p className="text-xs text-muted-foreground">Proprietária, Boutique Elegance</p>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                &quot;Após implementar o InventárioFácil, conseguimos reduzir nosso estoque em 30% sem comprometer as vendas.
                O ROI foi impressionante já no primeiro trimestre.&quot;
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@usuario" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Carlos Santos</p>
                  <p className="text-xs text-muted-foreground">Diretor Financeiro, MegaSupply</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
