import { Outlet } from "react-router-dom";
import './AppLayout.css'
import Sidebar from "../Components/sidebar/Sidebar";

export default function AppLayout() {

  return (
    <div className="appLayoutContent">
      
      <div className="layoutNavbar">
        <Sidebar />
      </div>

      <div className="layoutOutlet">
        <Outlet />
      </div>
    </div>
  );
}