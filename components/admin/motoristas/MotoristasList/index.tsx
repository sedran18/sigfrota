import MotoristaCard from "./MotoristaCard";
import { DriverWithUsageType } from "@/schemas/driver.schema";

const MotoristasList = ({
  drivers,
  isAdmin,
}: {
  drivers: DriverWithUsageType[];
  isAdmin: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-2 md:p-4 lg:p-10 w-full">
      {drivers.map((driver) => (
        <MotoristaCard key={driver.id} driver={driver} isAdmin={isAdmin} />
      ))}
    </div>
  );
};

export default MotoristasList;