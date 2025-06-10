import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "MZN",
  }).format(value)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export function getStatusColor(status: string): {
  bg: string
  text: string
  border: string
} {
  switch (status) {
    case "Ativo":
      return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" }
    case "Inativo":
      return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" }
    case "Estoque Baixo":
      return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" }
    case "Sem Estoque":
      return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" }
    case "Pendente":
      return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" }
    case "Aprovado":
      return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" }
    case "Enviado":
      return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" }
    case "Entregue":
      return { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" }
    case "Cancelado":
      return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" }
    case "Entrada":
      return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" }
    case "Saída":
      return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" }
    case "Ajuste":
      return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" }
    default:
      return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" }
  }
}
