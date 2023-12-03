import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DatatableHotel from "../../components/datatableHotels/DatatableHotel"
import DatatableRooms from "../../components/datatableRooms/DatatableRooms"
import DatatableReservedRooms from "../../components/datatableReservedRooms/DatatableReservedRooms"

const ReservedRooms = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableReservedRooms/>
      </div>
    </div>
  )
}

export default ReservedRooms