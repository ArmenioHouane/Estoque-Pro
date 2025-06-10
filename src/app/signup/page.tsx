import type { Metadata } from "next"
import Link from "next/link"
import { SignupForm } from "@/components/signup-form"
import { Package } from "lucide-react"

export const metadata: Metadata = {
  title: "Cadastro | Sistema de Gestão de Inventário",
  description: "Crie uma conta no sistema de gestão de inventário",
}

export default function SignupPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Package className="h-6 w-6" />
        <span className="font-bold">InventárioFácil</span>
      </Link>
      <div className="
    mx-auto 
    
    flex w-full max-w-[95%] sm:max-w-[350px]
    flex-col justify-center 
    space-y-6 
    rounded-2xl 
    p-6 
    
    shadow-md
    focus-within:ring-2 
    focus-within:ring-blue-400 
    focus-within:shadow-[0_0_15px_#3b82f6]
    transition-all
    touch-manipulation
  ">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Crie sua conta</h1>
          <p className="text-sm text-muted-foreground">Preencha os dados abaixo para criar sua conta</p>
        </div>
        <SignupForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link href="/login" className="hover:text-brand underline underline-offset-4">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}
