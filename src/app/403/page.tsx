'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, ShieldAlert, LogIn, RefreshCw, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AcessoProibido() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6 text-primary" />
          <span>InventárioFácil</span>
        </Link>
      </div>
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <ShieldAlert className="h-12 w-12 text-red-600 dark:text-red-500" />
              </div>
            </div>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Acesso Proibido</CardTitle>
              <CardDescription>Você não tem permissão para acessar esta página ou recurso.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="font-medium mb-2">Possíveis razões:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    <li>Sua sessão expirou</li>
                    <li>Você não está autenticado no sistema</li>
                    <li>Sua conta não possui as permissões necessárias</li>
                    <li>O recurso solicitado está restrito temporariamente</li>
                  </ul>
                </div>

                <div className="text-sm text-muted-foreground">
                  Se você acredita que deveria ter acesso a esta página, entre em contato com o administrador do sistema
                  ou tente uma das opções abaixo.
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Fazer login novamente
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para o Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/dashboard/configuracoes">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Atualizar permissões
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Precisa de ajuda? Entre em contato com o{" "}
              <Link href="/contato" className="text-primary hover:underline">
                suporte técnico
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
