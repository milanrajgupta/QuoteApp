import "./App.css";
import {Route, Routes, useNavigate } from "react-router-dom";
import Body from "./components/Body";
import Navbar from "./components/Navbar";
import Signup from "./components/pages/signup";
import Login from "./components/pages/login";
import Dashboard from "./components/pages/dashboard";
import PrivateRoute from "./components/RouteType/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OpenRoute from "./components/RouteType/OpenRoute";
import UserQuote from "./components/pages/UserQuote";

function App() {
  return (
    <div className="App bg-[#ffffff]">
      <Navbar />
      <ToastContainer/>
     <Routes>
      <Route path="/" element={<Body/>}/>
      <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/>
      <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
      <Route path="user/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      <Route path="user/users-quote" element={<PrivateRoute><UserQuote/></PrivateRoute>}/>

     
     </Routes>
     {/* <div>Hello</div> */}
    </div>
  );
}

export default App;
