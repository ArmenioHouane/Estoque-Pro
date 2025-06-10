"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [resetToken, setResetToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get reset token from session storage
    const token = sessionStorage.getItem("resetToken")
    if (!token) {
      router.push("/forgot-password")
    } else {
      setResetToken(token)
    }
  }, [router])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)
      const newPassword = formData.get("password") as string
      const confirmPassword = formData.get("confirmPassword") as string

      if (newPassword !== confirmPassword) {
        throw new Error("As senhas não coincidem")
      }

      if (newPassword.length < 8) {
        throw new Error("A senha deve ter pelo menos 8 caracteres")
      }

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetToken, newPassword }),
      })

      if (response.ok) {
        setSuccess(true)
        // Clear session storage
        sessionStorage.removeItem("resetEmail")
        sessionStorage.removeItem("resetToken")
      } else {
        const data = await response.json()
        throw new Error(data.error || "Falha ao redefinir a senha")
      }
    } catch (error) {
      console.error("Falha ao redefinir a senha. Por favor, tente novamente", error)
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

      {success ? (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Senha redefinida com sucesso</AlertTitle>
          <AlertDescription>
            Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha.
            <div className="mt-4">
              <Button onClick={() => router.push("/login")} variant="outline">
                Ir para o Login
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="Digite sua nova senha"
                  type={showPassword ? "text" : "password"}
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                  minLength={8}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">A senha deve ter pelo menos 8 caracteres</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirme sua nova senha"
                  type={showPassword ? "text" : "password"}
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                  minLength={8}
                />
              </div>
            </div>

            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Redefinir Senha
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
