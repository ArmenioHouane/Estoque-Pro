"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export function RecoveryForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      const email = formData.get("email") as string

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Store email in sessionStorage for the verification page
        sessionStorage.setItem("resetEmail", email)
      } else {
        const data = await response.json()
        throw new Error(data.error || "Failed to send recovery email")
      }
    } catch (error) {
      console.error("Falha ao enviar e-mail de recuperação. Por favor, tente novamente", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isSubmitted ? (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>E-mail enviado</AlertTitle>
          <AlertDescription>
            Enviamos um código de verificação para o seu e-mail. Por favor, verifique sua caixa de entrada e use o
            código para redefinir sua senha.
            <div className="mt-4">
              <Button onClick={() => router.push("/verify-otp")} variant="outline">
                Continuar para verificação
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                placeholder="nome@empresa.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                required
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enviar Código de Verificação
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
