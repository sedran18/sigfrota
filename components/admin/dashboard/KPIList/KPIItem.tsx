import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KPIItemType } from "@/schemas/dashboard.schema"


export function KPIItem({ title, value, description}: KPIItemType) {
  return (
    <Card className="border border-slate-200/80 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          {value}
        </div>
        {description && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}