import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <div className="flex min-h-screen flex-col">
  <Header />
  <div className="flex">
    {/* Sidebar fixo visível somente em telas grandes */}
    <aside className="hidden lg:fixed lg:top-16 lg:left-0 lg:h-[calc(100vh-4rem)] lg:w-64 lg:block border-r z-40">
      <Sidebar />
    </aside>

    {/* Conteúdo principal com margem em telas grandes */}
    <main className="flex-1 p-6 lg:ml-64">{children}</main>
  </div>
</div>


  )
}
