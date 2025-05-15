import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Pronto para transformar a gestão do seu inventário?
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl">
              Comece hoje mesmo e veja a diferença que o InventárioFácil pode fazer para o seu negócio.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Começar gratuitamente
              </Button>
            </Link>
            <Link href="/contato">
              <Button
                size="lg"
                variant="outline"
                className="dark:bg-[#020817] text-primary dark:hover:bg-[#121622]"
              >
                Falar com um consultor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
