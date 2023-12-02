import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DatatableHotel from "../../components/datatableHotels/DatatableHotel"
import DatatableRooms from "../../components/datatableRooms/DatatableRooms"

const Rooms = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableRooms/>
      </div>
    </div>
  )
}

export default Rooms