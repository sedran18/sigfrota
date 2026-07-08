import DateCalendarPicker from "@/components/shared/DateCalendarPicker";
import HeaderTemplate from "@/components/admin/HeaderTemplate";

const Admin = () => {
  return (
    <>
      <HeaderTemplate 
        title="Dashboard"
        description="Visão geral do sistema"
      >
        <DateCalendarPicker />
      </HeaderTemplate>
      
    </>
  )
}

export default Admin;