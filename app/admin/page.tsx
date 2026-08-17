
import { Suspense } from "react";
import Loading from "../loading";
import DashboardContent from "@/components/admin/dashboard/DashboardContent";
import { DateType } from "@/schemas/date.schema";

const Admin = async ({ searchParams }: {
  searchParams: Promise<{ from?: DateType, to?: DateType }>
}) => {
  const { from, to } = await searchParams;
  
  return (
    <Suspense key={`${from}-${to}`} fallback={<Loading />}>
      <DashboardContent from={from} to={to}/>
    </Suspense>
  )
}

export default Admin;