import { VerifyOTPForm } from "@/components/verify-otp-form"

export default function VerifyOTPPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Verificação de Código</h1>
          <p className="text-sm text-muted-foreground">Verifique seu e-mail e digite o código de verificação abaixo</p>
        </div>
        <VerifyOTPForm />
      </div>
    </div>
  )
}
