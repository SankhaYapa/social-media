import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import HomeSocial from "./pages/HomeSocial/HomeSocial";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import { useContext } from "react";
import Register from "./pages/register/Register";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Taxi from "./pages/taxi/Taxi";
import Guiders from "./pages/guiders/Guiders";
import SingleHotel from "./pages/single_hotel/SingleHotel";
import Profile from "./pages/profile/Profile";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hotel" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/taxi" element={<Taxi/>}/>
        <Route path="/guiders" element={<Guiders/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/singlehotels/:id" element={<SingleHotel/>}/>
       
        <Route path="/register" element={user ? <HomeSocial /> : <Register />} />
          <Route path="/messenger" element={!user ? <HomeSocial /> : <Messenger />} />
          <Route path="/login" element={user ? <HomeSocial /> : <Login />} />
          <Route
            exact
            path="/"
            element={user ? <HomeSocial /> : <Register />} // Redirect to the login page if not logged in
          />
          <Route path="/profile/:username" element={<Profile />} />
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
