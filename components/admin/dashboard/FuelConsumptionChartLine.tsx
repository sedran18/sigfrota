"use client"

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

const FuelConsumptionChartLine = ({ data }: { data: LineChartItemType[] }) => {
  return (
    <Card className="w-full rounded-none border border-slate-200 bg-white shadow-none">
      <CardHeader className="border-b border-slate-100 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xs sm:text-base font-bold uppercase tracking-wider text-slate-900">
            Consumo de Combustível
          </CardTitle>
          <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-900">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4c9a2a]" />
            Ao vivo
          </span>
        </div>
        <CardDescription className="pt-0.5 text-[11px] sm:text-xs font-medium text-slate-900">
          Volume diário consumido (em litros) por tipo de combustível no período selecionado.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-3 sm:p-5">
        <ChartContainer config={chartConfig} className="h-72 sm:h-80 w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ left: -15, right: 10, top: 10, bottom: 10 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-slate-100" />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="currentColor"
              tick={{ fill: "#0f172a", fontSize: 10, fontWeight: 600 }}
              tickFormatter={(value: string) => {
                if (!value) return ""
                const [year, month, day] = value.split("-")
                return `${day}/${month}`
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="currentColor"
              tick={{ fill: "#0f172a", fontSize: 10, fontWeight: 600 }}
              tickFormatter={(val) => `${val}L`}
            />

            <ChartTooltip
              cursor={{ stroke: "#0f3d21", strokeWidth: 1, strokeDasharray: "4 4" }}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  className="rounded-none border border-slate-200 bg-white p-2.5 shadow-md text-slate-900"
                  labelFormatter={(value) => {
                    if (typeof value !== "string") return String(value ?? "")
                    const [year, month, day] = value.split("-")
                    return `Data: ${day}/${month}/${year}`
                  }}
                />
              }
            />

            <Line dataKey="GASOLINA_COMUM" type="monotone" stroke="var(--color-GASOLINA_COMUM)" strokeWidth={2} activeDot={{ r: 4 }} dot={false} />
            <Line dataKey="GASOLINA_ADITIVADA" type="monotone" stroke="var(--color-GASOLINA_ADITIVADA)" strokeWidth={2} activeDot={{ r: 4 }} dot={false} />
            <Line dataKey="ETANOL" type="monotone" stroke="var(--color-ETANOL)" strokeWidth={2} activeDot={{ r: 4 }} dot={false} />
            <Line dataKey="DIESEL_COMUM" type="monotone" stroke="var(--color-DIESEL_COMUM)" strokeWidth={2} activeDot={{ r: 4 }} dot={false} />
            <Line dataKey="DIESEL_S10" type="monotone" stroke="var(--color-DIESEL_S10)" strokeWidth={2} activeDot={{ r: 4 }} dot={false} />

            <ChartLegend
              content={
                <ChartLegendContent className="flex-wrap gap-2 pt-3 text-[10px] sm:text-xs font-bold text-slate-900 uppercase" />
              }
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default FuelConsumptionChartLine;