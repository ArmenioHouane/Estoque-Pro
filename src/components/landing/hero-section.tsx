import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-accent to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Gerencie seu inventário com <span className="text-primary">facilidade</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Solução completa para pequenas e médias empresas controlarem estoque, produtos e vendas em um só lugar.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/signup">
              <Button size="lg" className="gap-1">
                Começar agora
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg">
                Ver demonstração
              </Button>
            </Link>
          </div>
          <div className="mt-8 w-full max-w-3xl overflow-hidden rounded-lg border shadow-xl">
          <Image
            src="/hero.jpg"
            alt="Dashboard do sistema"
            width={1200}
            height={600}
               className="w-full object-cover"
          />
          </div>
        </div>
      </div>
    </section>
  )
}
