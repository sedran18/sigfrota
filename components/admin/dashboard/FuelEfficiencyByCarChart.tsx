"use client"

import { Gauge } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useMemo } from "react"

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
import { FuelEfficiencyByVehicleType } from "@/schemas/dashboard.schema"

const DRIVER_COLORS = [
  "#0f3d21",
  "#4c9a2a", 
  "#d8a721", 
  "#a5652f", 
  "#2e9bc2", 
]

const FuelEfficiencyByCarChart = ({
  data,
  driverLabels = {},
}: {
  data: FuelEfficiencyByVehicleType[]
  driverLabels?: Record<string, string>
}) => {
  const { chartConfig, driverKeys } = useMemo(() => {
    const driversSet = new Set<string>()

    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "carName") driversSet.add(key)
      })
    })

    const keys = Array.from(driversSet)
    const config: ChartConfig = {}

    keys.forEach((driverKey, index) => {
      config[driverKey] = {
        label: driverLabels[driverKey] ?? driverKey,
        color: DRIVER_COLORS[index % DRIVER_COLORS.length],
      }
    })

    return { chartConfig: config, driverKeys: keys }
  }, [data, driverLabels])

  return (
    <Card className="border border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-950">
      <CardHeader className="border-b border-slate-100 pb-4 dark:border-slate-800">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-100">
          <Gauge className="h-4 w-4 text-[#0f3d21] dark:text-[#4c9a2a]" />
          Eficiência por Veículo
        </CardTitle>
        <CardDescription className="pt-1 text-xs text-slate-500 dark:text-slate-400">
          Média de km/L por motorista, no período selecionado
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-slate-800" />
            <XAxis
              dataKey="carName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="currentColor"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(15, 61, 33, 0.05)" }}
              content={
                <ChartTooltipContent
                  hideLabel
                  className="rounded-md border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                />
              }
            />
            <ChartLegend
              content={
                <ChartLegendContent className="flex-wrap gap-3 pt-4 text-xs font-medium text-slate-500 dark:text-slate-400" />
              }
            />
            {driverKeys.map((driverKey, index) => (
              <Bar
                key={driverKey}
                dataKey={driverKey}
                stackId="a"
                fill={`var(--color-${driverKey})`}
                radius={
                  index === 0
                    ? [0, 0, 3, 3]
                    : index === driverKeys.length - 1
                    ? [3, 3, 0, 0]
                    : [0, 0, 0, 0]
                }
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default FuelEfficiencyByCarChart