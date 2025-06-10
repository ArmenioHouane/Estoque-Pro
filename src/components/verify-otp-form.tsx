"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function VerifyOTPForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem("resetEmail")
    if (!storedEmail) {
      router.push("/forgot-password")
    } else {
      setEmail(storedEmail)
    }
  }, [router])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      const otp = formData.get("otp") as string

      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      })

      if (response.ok) {
        const data = await response.json()
        // Store reset token for the reset password page
        sessionStorage.setItem("resetToken", data.resetToken)
        router.push("/reset-password")
      } else {
        const data = await response.json()
        throw new Error(data.error || "Failed to verify OTP")
      }
    } catch (error) {
      console.error("Error:", error)
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

      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="otp">Código de Verificação</Label>
            <Input
              id="otp"
              name="otp"
              placeholder="Digite o código de 6 dígitos"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              required
              minLength={6}
              maxLength={6}
              pattern="[0-9]{6}"
              inputMode="numeric"
            />
            <p className="text-sm text-muted-foreground">
              Digite o código de 6 dígitos enviado para {email || "seu e-mail"}
            </p>
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verificar Código
          </Button>
        </div>
      </form>
      <div className="text-center text-sm">
        <Button variant="link" onClick={() => router.push("/forgot-password")} className="p-0">
          Não recebeu o código? Solicitar novamente
        </Button>
      </div>
    </div>
  )
}
