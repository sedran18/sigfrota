import MotoristaCard from "./MotoristaCard"
import { DriverType } from "@/schemas/driver.schema";

const MotoristasList = ({drivers}: {drivers: DriverType[]}) => {

  return (
    <div className="grid  m-1 lg :m-10 mx-auto grid-cols-1 gap-4 w-full max-w-[95%]">
      {drivers.map((driver) => (
        <MotoristaCard key={driver.id} driver={driver} />
      ))}
    </div>
  )
}

export default MotoristasList;