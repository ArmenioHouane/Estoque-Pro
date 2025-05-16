"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "01/05", entrada: 12, saida: 8, total: 120 },
  { name: "05/05", entrada: 18, saida: 12, total: 126 },
  { name: "10/05", entrada: 15, saida: 10, total: 131 },
  { name: "15/05", entrada: 25, saida: 15, total: 141 },
  { name: "20/05", entrada: 20, saida: 18, total: 143 },
  { name: "25/05", entrada: 30, saida: 22, total: 151 },
  { name: "30/05", entrada: 22, saida: 20, total: 153 },
]

export function EstoqueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="entrada" name="Entrada" stroke="#4ade80" />
        <Line type="monotone" dataKey="saida" name="Saída" stroke="#f87171" />
        <Line type="monotone" dataKey="total" name="Estoque Total" stroke="#60a5fa" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
