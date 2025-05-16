import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/login-form"
import { Package } from "lucide-react"

export const metadata: Metadata = {
  title: "Login | Sistema de Gestão de Inventário",
  description: "Faça login no sistema de gestão de inventário",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Package className="h-6 w-6" />
        <span className="font-bold">InventárioFácil</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
          <p className="text-sm text-muted-foreground">Digite seu e-mail e senha para acessar sua conta</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/recovery" className="hover:text-brand underline underline-offset-4">
            Esqueceu sua senha?
          </Link>
        </p>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link href="/signup" className="hover:text-brand underline underline-offset-4">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
