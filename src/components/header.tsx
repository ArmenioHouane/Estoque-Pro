"use client";

import { useAuth } from "@/hooks/useAuth"; // ajuste o caminho conforme seu projeto
import { Button } from "@/components/ui/button";
import { BarChart3, BoxIcon, Home, Settings, ShoppingCart, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu, Package } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    // Chame a API logout, espere resposta e depois redirecione
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="lg:hidden">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6 text-primary" />
              <span className="">InventárioFácil</span>
            </Link>
          </div>
          <div className="flex h-full max-h-screen flex-col gap-2 py-2">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                {[
                  {
                    title: "Dashboard",
                    href: "/dashboard",
                    icon: Home,
                  },
                  {
                    title: "Produtos",
                    href: "/dashboard/produtos",
                    icon: Package,
                  },
                  {
                    title: "Estoque",
                    href: "/dashboard/estoque",
                    icon: BoxIcon,
                  },
                  {
                    title: "Pedidos",
                    href: "/dashboard/pedidos",
                    icon: ShoppingCart,
                  },
                  {
                    title: "Fornecedores",
                    href: "/dashboard/fornecedores",
                    icon: Users,
                  },
                  {
                    title: "Relatórios",
                    href: "/dashboard/relatorios",
                    icon: BarChart3,
                  },
                  {
                    title: "Configurações",
                    href: "/dashboard/configuracoes",
                    icon: Settings,
                  },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </SheetContent>
       
      </Sheet>
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Package className="h-6 w-6 text-primary" />
        <span className="hidden md:inline">InventárioFácil</span>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />
        <Button variant="outline" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notificações</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                {loading ? (
                  <AvatarFallback>...</AvatarFallback>
                ) : user?.name ? (
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                ) : (
                  <AvatarFallback>US</AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {loading ? (
                "Carregando..."
              ) : user ? (
                <>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </>
              ) : (
                "Usuário não autenticado"
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
