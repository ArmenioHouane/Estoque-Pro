"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "01/05", vendas: 5200 },
  { name: "05/05", vendas: 4800 },
  { name: "10/05", vendas: 6100 },
  { name: "15/05", vendas: 5700 },
  { name: "20/05", vendas: 7200 },
  { name: "25/05", vendas: 6800 },
  { name: "30/05", vendas: 8500 },
]

export function VendasChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`R$ ${value}`, "Vendas"]} />
        <Legend />
        <Area type="monotone" dataKey="vendas" name="Vendas (R$)" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
