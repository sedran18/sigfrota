import { KPIItemType } from "@/schemas/dashboard.schema"
import { KPIItem} from "./KPIItem"



export function KPIList({ items }: {items:KPIItemType[]}) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((kpi, index) => (
        <KPIItem
          key={`${kpi.title}-${index}`}
          title={kpi.title}
          value={kpi.value}
          description={kpi.description}
        />
      ))}
    </div>
  )
}