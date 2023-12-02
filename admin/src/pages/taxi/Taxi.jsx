import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DatatableTaxi from "../../components/datatableTaxi/DatatableTaxi"

const Taxi = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableTaxi/>
      </div>
    </div>
  )
}

export default Taxi