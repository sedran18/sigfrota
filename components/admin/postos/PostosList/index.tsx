import {GasStationWithUsageType } from "@/schemas/gasStation.schema"
import PostoCard from "./PostoCard"


const PostosList = ({ gasStations }: {gasStations: GasStationWithUsageType[]}) => {
  return (
    <div className="grid p-1 md:p-2 lg:p-10 px-auto grid-cols-1 gap-4 w-full overflow-hidden">
      {gasStations.map((posto) => (
        <PostoCard key={posto.id} gasStation={posto} />
      ))}
    </div>
  )
}

export default PostosList