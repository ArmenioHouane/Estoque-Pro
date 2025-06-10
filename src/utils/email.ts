import nodemailer from "nodemailer"

// Criar o transporter com credenciais do Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // ex: armenioamalio2003@gmail.com
      pass: process.env.GMAIL_PASS, // senha de app do Gmail
    },
  })
}

// Enviar email de recuperação de senha com OTP
export const sendPasswordResetEmail = async (email: string, otp: string, nome: string) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: `"Sua Plataforma" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Solicitação de Redefinição de Senha",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333;">Redefinição de Senha</h2>
          <p>Olá ${nome},</p>
          <p>Recebemos uma solicitação para redefinir a sua senha. Use o código OTP abaixo para continuar com o processo:</p>
          <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>Este código é válido por 10 minutos.</p>
          <p>Se você não solicitou essa redefinição, ignore este e-mail ou entre em contato com o suporte.</p>
          <p>Obrigado,<br>Equipe da Sua Plataforma</p>
        </div>
      `,
    }

    const info = await transporter.sendMail(mailOptions)

    console.log("E-mail enviado com sucesso:", info.messageId)

    return {
      success: true,
      development: process.env.NODE_ENV !== "production",
      previewUrl: null, // Gmail não gera preview URL
    }
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error)
    return { success: false, error }
  }
}
