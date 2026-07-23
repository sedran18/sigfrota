import MotoristaCard from "./MotoristaCard"
import {  DriverWithUsageType } from "@/schemas/driver.schema";

const MotoristasList = ({drivers}: {drivers: DriverWithUsageType[]}) => {

  return (
    <div className="grid  p-1 md:p-2 lg:p-10 px-auto grid-cols-1 gap-4 w-full">
      {drivers.map((driver) => (
        <MotoristaCard key={driver.id} driver={driver} />
      ))}
    </div>
  )
}

export default MotoristasList;