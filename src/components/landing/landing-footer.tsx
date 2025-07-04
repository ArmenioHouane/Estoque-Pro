import Link from "next/link"
import { Package } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="w-full border-t py-12 md:py-16 lg:py-20">
      <div className="container grid gap-8 px-4 md:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6 text-primary" />
            <span>Estoque Pro</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Solução completa para gestão de inventário para pequenas e médias empresas.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Produto</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#features" className="text-muted-foreground hover:text-primary">
                Funcionalidades
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="text-muted-foreground hover:text-primary">
                Preços
              </Link>
            </li>
            <li>
              <Link href="/demo" className="text-muted-foreground hover:text-primary">
                Demonstração
              </Link>
            </li>
            <li>
              <Link href="/roadmap" className="text-muted-foreground hover:text-primary">
                Roadmap
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Empresa</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/sobre" className="text-muted-foreground hover:text-primary">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-muted-foreground hover:text-primary">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/carreiras" className="text-muted-foreground hover:text-primary">
                Carreiras
              </Link>
            </li>
            <li>
              <Link href="/contato" className="text-muted-foreground hover:text-primary">
                Contato
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/termos" className="text-muted-foreground hover:text-primary">
                Termos de Serviço
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="text-muted-foreground hover:text-primary">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-muted-foreground hover:text-primary">
                Política de Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t pt-8 px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm  text-muted-foreground">© 2025 Estoque Pro. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
