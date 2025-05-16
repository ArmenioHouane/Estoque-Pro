/* eslint-disable react/jsx-no-comment-textnodes */
import { LandingHeader } from "@/components/landing/landing-header"
import { LandingFooter } from "@/components/landing/landing-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Target, Users, Zap } from "lucide-react"
import Image from "next/image"

export default function SobrePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-accent to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Sobre a <span className="text-primary">InventárioFácil</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Conheça nossa história, missão e as pessoas por trás do sistema que está transformando a gestão de
                  inventário.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Nossa História</h2>
                <p className="text-muted-foreground mb-4">
                  A InventárioFácil nasceu em 2020, quando três amigos empreendedores enfrentavam o mesmo desafio:
                  encontrar um sistema de gestão de inventário que fosse ao mesmo tempo poderoso e fácil de usar.
                </p>
                <p className="text-muted-foreground mb-4">
                  Frustrados com as soluções disponíveis no mercado - ou muito complexas ou muito limitadas - eles
                  decidiram criar seu próprio sistema, combinando tecnologia de ponta com uma experiência de usuário
                  intuitiva.
                </p>
                <p className="text-muted-foreground">
                  O que começou como um projeto para resolver seus próprios problemas rapidamente se transformou em uma
                  solução adotada por centenas de pequenas e médias empresas em todo o Brasil. Hoje, a InventárioFácil
                  ajuda mais de 5.000 empresas a gerenciar seus estoques de forma eficiente.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden border shadow-lg">
                
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-accent">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Nossos Valores</h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Estes são os princípios que guiam nossas decisões e definem quem somos como empresa.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Simplicidade</h3>
                <p className="text-muted-foreground">
                  Acreditamos que a tecnologia deve simplificar a vida, não complicá-la. Nosso foco é criar soluções
                  intuitivas que qualquer pessoa possa usar.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Inovação</h3>
                <p className="text-muted-foreground">
                  Estamos constantemente buscando novas maneiras de melhorar nossos produtos e serviços, sempre na
                  vanguarda da tecnologia.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cliente em Primeiro Lugar</h3>
                <p className="text-muted-foreground">
                  Nossos clientes são nossa prioridade. Ouvimos atentamente suas necessidades e trabalhamos
                  incansavelmente para superá-las.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Nossa Equipe</h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Conheça as pessoas apaixonadas que trabalham todos os dias para tornar o InventárioFácil melhor.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Carlos Oliveira",
                  role: "CEO & Co-fundador",
                  bio: "Empreendedor em série com mais de 15 anos de experiência em tecnologia e gestão de negócios.",
                },
                {
                  name: "Ana Souza",
                  role: "CTO & Co-fundadora",
                  bio: "Engenheira de software com especialização em arquitetura de sistemas e experiência do usuário.",
                },
                {
                  name: "Rafael Santos",
                  role: "COO & Co-fundador",
                  bio: "Especialista em operações com vasta experiência em logística e gestão de cadeia de suprimentos.",
                },
                {
                  name: "Juliana Costa",
                  role: "Diretora de Produto",
                  bio: "Apaixonada por criar produtos que resolvem problemas reais dos usuários de forma elegante.",
                },
                {
                  name: "Marcos Silva",
                  role: "Líder de Desenvolvimento",
                  bio: "Desenvolvedor full-stack com foco em criar código limpo, eficiente e escalável.",
                },
                {
                  name: "Fernanda Lima",
                  role: "Diretora de Atendimento",
                  bio: "Dedicada a garantir que cada cliente tenha uma experiência excepcional com nossos produtos.",
                },
              ].map((person, index) => (
                <div key={index} className="flex flex-col p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="h-40 rounded-md bg-muted mb-4 overflow-hidden">
                    // eslint-disable-next-line @next/next/no-img-element
                   <Image
  src="/placeholder.svg"
  alt={person.name}
  width={320}
  height={160}
  className="w-full h-full object-cover"
/>
                  </div>
                  <h3 className="text-xl font-bold">{person.name}</h3>
                  <p className="text-primary mb-2">{person.role}</p>
                  <p className="text-muted-foreground text-sm">{person.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Junte-se a Nós</h2>
            <p className="max-w-[700px] mx-auto mb-8 text-primary-foreground/80">
              Estamos sempre procurando pessoas talentosas e apaixonadas para se juntar à nossa equipe. Confira nossas
              vagas abertas ou envie seu currículo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/carreiras">Ver vagas abertas</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Link href="/contato">
                  Entrar em contato
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}
