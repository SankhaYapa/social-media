import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DatatableHotel from "../../components/datatableHotels/DatatableHotel"
import DatatableRooms from "../../components/datatableRooms/DatatableRooms"
import DatatableReservedRooms from "../../components/datatableReservedRooms/DatatableReservedRooms"
import DatatableBookedtaxi from "../../components/datatableBookedTaxi/DatatableBookedtaxi"

const Bookedtaxi = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableBookedtaxi/>
      </div>
    </div>
  )
}

export default Bookedtaxi