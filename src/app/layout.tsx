import type { Metadata } from "next";
import { Inter  } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Sistema de Gestão de Inventário",
  description: "Sistema de Gestão de Inventário para Pequenas e Médias Empresas",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body><ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
