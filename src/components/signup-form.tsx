"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle, Check, X, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"

type ValidationState = {
  nameRequired: boolean
  nameLength: boolean
  nameStartsWithUppercase: boolean
  nameHasTwoWords: boolean
  emailRequired: boolean
  emailFormat: boolean
  passwordRequired: boolean
  passwordLength: boolean
  passwordUppercase: boolean
  passwordSymbol: boolean
  passwordsMatch: boolean
}

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<string[]>([])
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validation, setValidation] = useState<ValidationState>({
    nameRequired: false,
    nameLength: false,
    nameStartsWithUppercase: false,
    nameHasTwoWords: false,
    emailRequired: false,
    emailFormat: false,
    passwordRequired: false,
    passwordLength: false,
    passwordUppercase: false,
    passwordSymbol: false,
    passwordsMatch: false,
  })
  const router = useRouter()

  // Validate form fields on change
  useEffect(() => {
    const { name, email, password, confirmPassword } = formData

    // Check if name starts with uppercase
    const startsWithUppercase = name ? /^[A-Z]/.test(name) : false

    // Check if name has at least two words (first and last name)
    const hasTwoWords = name
      ? name
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0).length >= 2
      : false

    // Password validation
    const hasUppercase = password ? /[A-Z]/.test(password) : false
    const hasSymbol = password ? /[^A-Za-z0-9]/.test(password) : false

    setValidation({
      nameRequired: Boolean(name?.trim()),
      nameLength: name ? name.length <= 50 : false,
      nameStartsWithUppercase: startsWithUppercase,
      nameHasTwoWords: hasTwoWords,
      emailRequired: Boolean(email?.trim()),
      emailFormat: email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : false,
      passwordRequired: Boolean(password?.trim()),
      passwordLength: password ? password.length >= 8 : false,
      passwordUppercase: hasUppercase,
      passwordSymbol: hasSymbol,
      passwordsMatch: Boolean(password) && password === confirmPassword,
    })
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
    setTouched((prev) => ({
      ...prev,
      [id]: true,
    }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id } = e.target
    setTouched((prev) => ({
      ...prev,
      [id]: true,
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const allNameValidationsPassed =
    validation.nameRequired && validation.nameLength && validation.nameStartsWithUppercase && validation.nameHasTwoWords

  const allEmailValidationsPassed = validation.emailRequired && validation.emailFormat

  const allPasswordValidationsPassed =
    validation.passwordRequired &&
    validation.passwordLength &&
    validation.passwordUppercase &&
    validation.passwordSymbol

  const allConfirmPasswordValidationsPassed = validation.passwordsMatch

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setErrors([])

    const { name, email, password } = formData

    // Set all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    })

    // Check if all validations pass
    if (!Object.values(validation).every(Boolean)) {
      const clientErrors: string[] = []
      if (!validation.nameRequired) clientErrors.push("Nome é obrigatório")
      if (!validation.nameLength) clientErrors.push("Nome muito longo (máximo 50 caracteres)")
      if (!validation.nameStartsWithUppercase) clientErrors.push("Nome deve começar com letra maiúscula")
      if (!validation.nameHasTwoWords) clientErrors.push("Nome deve conter nome e sobrenome")
      if (!validation.emailRequired) clientErrors.push("Email é obrigatório")
      if (!validation.emailFormat) clientErrors.push("Email inválido")
      if (!validation.passwordRequired) clientErrors.push("Senha é obrigatória")
      if (!validation.passwordLength) clientErrors.push("A senha deve ter no mínimo 8 caracteres")
      if (!validation.passwordUppercase) clientErrors.push("A senha deve conter pelo menos uma letra maiúscula")
      if (!validation.passwordSymbol) clientErrors.push("A senha deve conter pelo menos um símbolo")
      if (!validation.passwordsMatch) clientErrors.push("As senhas não coincidem")

      setErrors(clientErrors)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 400 && data.errors) {
          setErrors(data.errors)
          toast.error("Erro de validação")
        } else if (response.status === 409) {
          setErrors([data.message])
          toast.error(data.message)
        } else {
          setErrors(["Ocorreu um erro ao criar sua conta. Tente novamente."])
          toast.error("Erro de servidor")
        }
        setIsLoading(false)
        return
      }

      toast.success("Conta criada com sucesso!")
      setTimeout(() => {
        router.push("/login")
      }, 1000)
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      setErrors(["Erro de conexão. Verifique sua internet e tente novamente."])
      toast.error("Erro de conexão")
      setIsLoading(false)
    }
  }

  // Validation requirement component
  const ValidationRequirement = ({
    fulfilled,
    text,
  }: {
    fulfilled: boolean
    text: string
  }) => (
    <div className="flex items-center gap-2">
      {fulfilled ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
      <span className={fulfilled ? "text-green-500" : "text-red-500"}>{text}</span>
    </div>
  )

  return (
    <div className="grid gap-6">
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc pl-5 mt-2">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              type="text"
              autoCapitalize="words"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.name && !allNameValidationsPassed ? "border-red-500" : ""}
            />
            {touched.name && !allNameValidationsPassed && (
              <div className="mt-2 text-sm space-y-1 p-2 bg-gray-50 rounded-md">
                <ValidationRequirement fulfilled={validation.nameRequired} text="Nome é obrigatório" />
                <ValidationRequirement fulfilled={validation.nameLength} text="Nome deve ter no máximo 50 caracteres" />
                <ValidationRequirement
                  fulfilled={validation.nameStartsWithUppercase}
                  text="Nome deve começar com letra maiúscula"
                />
                <ValidationRequirement
                  fulfilled={validation.nameHasTwoWords}
                  text="Nome deve conter nome e sobrenome"
                />
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              placeholder="nome@empresa.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && !allEmailValidationsPassed ? "border-red-500" : ""}
            />
            {touched.email && !allEmailValidationsPassed && (
              <div className="mt-2 text-sm space-y-1 p-2 bg-gray-50 rounded-md">
                <ValidationRequirement fulfilled={validation.emailRequired} text="Email é obrigatório" />
                <ValidationRequirement fulfilled={validation.emailFormat} text="Formato de email válido" />
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="********"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
                required
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.password && !allPasswordValidationsPassed ? "border-red-500 pr-10" : "pr-10"}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                onClick={togglePasswordVisibility}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {touched.password && !allPasswordValidationsPassed && (
              <div className="mt-2 text-sm space-y-1 p-2 bg-gray-50 rounded-md">
                <ValidationRequirement fulfilled={validation.passwordRequired} text="Senha é obrigatória" />
                <ValidationRequirement
                  fulfilled={validation.passwordLength}
                  text="Senha deve ter no mínimo 8 caracteres"
                />
                <ValidationRequirement
                  fulfilled={validation.passwordUppercase}
                  text="Senha deve conter pelo menos uma letra maiúscula"
                />
                <ValidationRequirement
                  fulfilled={validation.passwordSymbol}
                  text="Senha deve conter pelo menos um símbolo"
                />
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                placeholder="********"
                type={showConfirmPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  touched.confirmPassword && !allConfirmPasswordValidationsPassed ? "border-red-500 pr-10" : "pr-10"
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                onClick={toggleConfirmPasswordVisibility}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {touched.confirmPassword && !allConfirmPasswordValidationsPassed && (
              <div className="mt-2 text-sm space-y-1 p-2 bg-gray-50 rounded-md">
                <ValidationRequirement fulfilled={validation.passwordsMatch} text="As senhas devem coincidir" />
              </div>
            )}
          </div>

          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Criar Conta
          </Button>
        </div>
      </form>
    </div>
  )
}
