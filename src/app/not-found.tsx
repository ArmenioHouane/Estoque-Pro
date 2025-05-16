import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package  } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="  flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6 text-primary" />
          <span>Estoque Pro</span>
        </Link>
      </div>
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-8">
          <div className="text-[150px] font-extrabold text-primary/20 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
           
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Página não encontrada</h1>
        <p className="text-muted-foreground max-w-[500px] mb-8">
          Ops! Parece que o item que você está procurando está fora de estoque. Vamos ajudá-lo a encontrar o caminho de
          volta.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/contato">Entrar em contato</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
