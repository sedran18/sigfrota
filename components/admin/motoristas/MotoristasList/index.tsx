import MotoristaCard from "./MotoristaCard"
import {  DriverWithUsageType } from "@/schemas/driver.schema";

const MotoristasList = ({drivers, isAdmin}: {drivers: DriverWithUsageType[], isAdmin: boolean}) => {

  return (
    <div className="grid  p-1 md:p-2 lg:p-10 px-auto grid-cols-1 gap-4 w-full">
      {drivers.map((driver) => (
        <MotoristaCard key={driver.id} driver={driver} isAdmin={isAdmin}/>
      ))}
    </div>
  )
}

export default MotoristasList;