import { Outlet } from "react-router-dom";
import './AppLayout.css'
import Navbar from "../Components/Navbar/Navbar";

export default function AppLayout() {

  return (
    <div className="appLayoutContent">
      
      <div className="layoutNavbar">
        <Navbar />
      </div>

      <div className="layoutOutlet">
        <Outlet />
      </div>
    </div>
  );
}