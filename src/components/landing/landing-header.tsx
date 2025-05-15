import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function LandingHeader() {
  return (
    <header className="sticky top-0  z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6 ml-6 text-primary" />
          <span>Estoque Pro</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary">
            Funcionalidades
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary">
            Preços
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
            Depoimentos
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost">Entrar</Button>
          </Link>
          <Link href="/signup" className="hidden md:block">
            <Button>Cadastrar</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
