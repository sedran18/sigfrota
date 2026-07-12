import HeaderTemplate from "@/components/admin/HeaderTemplate";
import AddPosto from "@/components/admin/postos/AddPosto";
import PostosList from "@/components/admin/postos/PostosList";
import { gasStationsData } from "@/lib/data/gasStations";

const Postos = () => {
    return (<>
        <HeaderTemplate title="Postos">
            <AddPosto />
        </HeaderTemplate>
        <PostosList items={gasStationsData}  />

    </>)
}

export default Postos;
