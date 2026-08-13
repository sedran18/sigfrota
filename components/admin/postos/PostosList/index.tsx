import {GasStationWithUsageType } from "@/schemas/gasStation.schema"
import PostoCard from "./PostoCard"


const PostosList = ({ gasStations, isAdmin}: {gasStations: GasStationWithUsageType[], isAdmin: boolean}) => {
  return (
    <div className="grid p-1 md:p-2 lg:p-10 px-auto grid-cols-1 gap-4 w-full overflow-hidden">
      {gasStations.map((posto) => (
        <PostoCard key={posto.id} gasStation={posto} isAdmin={isAdmin}/>
      ))}
    </div>
  )
}

export default PostosList