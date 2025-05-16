"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Notebook Dell", quantidade: 25 },
  { name: "Monitor LG", quantidade: 18 },
  { name: "Mouse Microsoft", quantidade: 15 },
  { name: "Teclado Logitech", quantidade: 12 },
  { name: "Headset HyperX", quantidade: 10 },
]

export function ProdutosPopularesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={150} />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantidade" name="Quantidade Vendida" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
