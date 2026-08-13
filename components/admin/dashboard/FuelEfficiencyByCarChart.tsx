"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
    <Card className="w-full h-full rounded-none border border-slate-200 bg-white shadow-none">
      <CardHeader className="border-b border-slate-100 p-4 sm:p-5">
        <CardTitle className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
          Eficiência por Veículo
        </CardTitle>
        <CardDescription className="pt-0.5 text-[11px] sm:text-xs font-medium text-slate-900">
          Média de km/L por motorista, no período selecionado
        </CardDescription>
      </CardHeader>

      <CardContent className="p-3 sm:p-5">
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <BarChart accessibilityLayer data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-slate-100" />
            <XAxis
              dataKey="carName"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              stroke="currentColor"
              tick={{ fill: "#0f172a", fontSize: 10, fontWeight: 600 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="currentColor"
              tick={{ fill: "#0f172a", fontSize: 10, fontWeight: 600 }}
              tickFormatter={(val) => `${val} km/L`}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(15, 61, 33, 0.05)" }}
              content={
                <ChartTooltipContent
                  hideLabel
                  className="rounded-none border border-slate-200 bg-white p-2.5 shadow-md text-slate-900"
                />
              }
            />
            <ChartLegend
              content={
                <ChartLegendContent className="flex-wrap gap-2 pt-3 text-[11px] font-bold text-slate-900 uppercase" />
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
                    ? [0, 0, 2, 2]
                    : index === driverKeys.length - 1
                    ? [2, 2, 0, 0]
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

export default FuelEfficiencyByCarChart;