"use client"

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
    <Card className="w-full rounded-none border border-slate-200 bg-white shadow-none h-full">
      <CardHeader className="border-b border-slate-100 p-4 sm:p-5">
        <CardTitle className="flex items-center gap-2 text-xs sm:text-base font-bold uppercase tracking-wider text-slate-900">
          Consumo por Motorista
        </CardTitle>
        <CardDescription className="pt-0.5 text-[11px] sm:text-xs font-medium text-slate-900">
          Total de litros abastecidos por condutor
        </CardDescription>
      </CardHeader>

      <CardContent className="p-3 sm:p-5">
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <BarChart accessibilityLayer data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-slate-100" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              stroke="currentColor"
              tick={{ fill: "#0f172a", fontSize: 10, fontWeight: 600 }}
              tickFormatter={(value: string) => value.split(" ")[0]}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="currentColor"
              tick={{ fill: "#0f172a", fontSize: 10, fontWeight: 600 }}
              tickFormatter={(value) => `${value}L`}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(15, 61, 33, 0.05)" }}
              content={
                <ChartTooltipContent
                  className="rounded-none border border-slate-200 bg-white p-2.5 shadow-md text-slate-900"
                  formatter={(value) => `${value} Litros`}
                />
              }
            />
            <Bar
              dataKey="liters"
              fill="var(--color-liters)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-1 border-t border-slate-100 p-3 sm:p-4 text-xs text-slate-900">
        <div className="font-bold uppercase text-[10px] sm:text-xs">
          Comparativo de abastecimento
        </div>
        <div className="text-[10px] sm:text-[11px] font-medium">
          Métricas calculadas com base nos registros do período.
        </div>
      </CardFooter>
    </Card>
  )
}

export default LitersPerDriverChart;