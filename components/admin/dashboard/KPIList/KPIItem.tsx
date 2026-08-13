import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KPIItemType } from "@/schemas/dashboard.schema"

export function KPIItem({ title, value, description }: KPIItemType) {
  return (
    <Card className="rounded-none border border-slate-200 bg-white p-3 sm:p-4 shadow-none transition-all hover:border-slate-300">
      <CardHeader className="p-0 pb-1.5 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-xl sm:text-2xl font-black text-slate-900 ">
          {value}
        </div>
        {description && (
          <p className="mt-1 text-[10px] sm:text-xs font-medium text-slate-900">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}