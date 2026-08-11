"use client"

import { Fuel } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { LineChartItemType } from "@/schemas/dashboard.schema"

const chartConfig = {
  GASOLINA_COMUM: {
    label: "Gasolina Comum",
    color: "#0f3d21", 
  },
  GASOLINA_ADITIVADA: {
    label: "Gasolina Aditivada",
    color: "#4c9a2a", 
  },
  ETANOL: {
    label: "Etanol",
    color: "#d8a721", 
  },
  DIESEL_COMUM: {
    label: "Diesel Comum",
    color: "#a5652f", 
  },
  DIESEL_S10: {
    label: "Diesel S10",
    color: "#2e9bc2", 
  },
} satisfies ChartConfig




const  FuelConsumptionChartLine = ({ data }: { data: LineChartItemType[] }) => {

  return (
    <Card className="border border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-950">
      <CardHeader className="border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-100">
            <Fuel className="h-4 w-4 text-[#0f3d21] dark:text-[#4c9a2a]" />
            Consumo de Combustível
          </CardTitle>
          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4c9a2a]" />
            Ao vivo
          </span>
        </div>
        <CardDescription className="pt-1 text-xs text-slate-500 dark:text-slate-400">
          Volume diário consumido (em litros) por tipo de combustível no período selecionado.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 10,
              right: 12,
              top: 12,
              bottom: 24,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-slate-800" />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              stroke="currentColor"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(value: string) => {
                if (!value) return ""
                const [year, month, day] = value.split("-")
                return `${day}/${month}`
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="currentColor"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(val) => `${val}L`}
            />

            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1, strokeDasharray: "4 4" }}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  className="rounded-md border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                  labelFormatter={(value) => {
                    if (typeof value !== "string") return String(value ?? "")
                    const [year, month, day] = value.split("-")
                    return `Data: ${day}/${month}/${year}`
                  }}
                />
              }
            />

            <Line
              dataKey="GASOLINA_COMUM"
              type="monotone"
              stroke="var(--color-GASOLINA_COMUM)"
              strokeWidth={2}
              activeDot={{ r: 5, strokeWidth: 0 }}
              dot={false}
            />
            <Line
              dataKey="GASOLINA_ADITIVADA"
              type="monotone"
              stroke="var(--color-GASOLINA_ADITIVADA)"
              strokeWidth={2}
              activeDot={{ r: 5, strokeWidth: 0 }}
              dot={false}
            />
            <Line
              dataKey="ETANOL"
              type="monotone"
              stroke="var(--color-ETANOL)"
              strokeWidth={2}
              activeDot={{ r: 5, strokeWidth: 0 }}
              dot={false}
            />
            <Line
              dataKey="DIESEL_COMUM"
              type="monotone"
              stroke="var(--color-DIESEL_COMUM)"
              strokeWidth={2}
              activeDot={{ r: 5, strokeWidth: 0 }}
              dot={false}
            />
            <Line
              dataKey="DIESEL_S10"
              type="monotone"
              stroke="var(--color-DIESEL_S10)"
              strokeWidth={2}
              activeDot={{ r: 5, strokeWidth: 0 }}
              dot={false}
            />

            <ChartLegend
              content={
                <ChartLegendContent className="flex-wrap gap-3 pt-4 text-xs font-medium text-slate-500 dark:text-slate-400" />
              }
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default FuelConsumptionChartLine;