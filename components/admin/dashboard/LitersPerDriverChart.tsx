"use client"

import { Fuel } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { FuelBarChartItemType } from "@/schemas/dashboard.schema"

const chartConfig = {
  liters: {
    label: "Litros",
    color: "#0f3d21",
  },
} satisfies ChartConfig

const LitersPerDriverChart = ({ data = [] }: { data: FuelBarChartItemType[] }) => {
  return (
    <Card className="w-full border border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-950">
      <CardHeader className="border-b border-slate-100 pb-4 dark:border-slate-800">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-100">
          <Fuel className="h-4 w-4 text-[#0f3d21] dark:text-[#4c9a2a]" />
          Consumo por Motorista
        </CardTitle>
        <CardDescription className="pt-1 text-xs text-slate-500 dark:text-slate-400">
          Total de litros abastecidos por condutor
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <ChartContainer config={chartConfig} className="max-h-[350px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-slate-800" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="currentColor"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(value: string) => value.split(" ")[0]}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="currentColor"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(value) => `${value}L`}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(15, 61, 33, 0.05)" }}
              content={
                <ChartTooltipContent
                  className="rounded-md border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                  formatter={(value) => `${value} Litros`}
                />
              }
            />
            <Bar
              dataKey="liters"
              fill="var(--color-liters)"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-1 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <div className="flex gap-2 font-medium leading-none text-slate-700 dark:text-slate-200">
          Comparativo de abastecimento
        </div>
        <div className="text-xs leading-none">
          Métricas calculadas com base nos registros do período.
        </div>
      </CardFooter>
    </Card>
  )
}

export default LitersPerDriverChart;