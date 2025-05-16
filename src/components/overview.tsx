"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "01/05", entrada: 12, saida: 8 },
  { name: "05/05", entrada: 18, saida: 12 },
  { name: "10/05", entrada: 15, saida: 10 },
  { name: "15/05", entrada: 25, saida: 15 },
  { name: "20/05", entrada: 20, saida: 18 },
  { name: "25/05", entrada: 30, saida: 22 },
  { name: "30/05", entrada: 22, saida: 20 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="entrada" name="Entrada" fill="#4ade80" />
        <Bar dataKey="saida" name="Saída" fill="#f87171" />
      </BarChart>
    </ResponsiveContainer>
  )
}
