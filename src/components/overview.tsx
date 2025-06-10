//components/overview.tsx
"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface OverviewProps {
  data: {
    name: string
    entrada: number
    saida: number
  }[]
}

export function Overview({ data }: OverviewProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          formatter={(value: number) => [`${value} unidades`, ""]}
          labelFormatter={(label) => {
            const date = new Date(label)
            return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
          }}
        />
        <Bar dataKey="entrada" name="Entrada" fill="#4ade80" radius={[4, 4, 0, 0]} />
        <Bar dataKey="saida" name="Saída" fill="#f87171" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
