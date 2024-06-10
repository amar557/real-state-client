import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div className="bg-[#f1f5f1]">
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
