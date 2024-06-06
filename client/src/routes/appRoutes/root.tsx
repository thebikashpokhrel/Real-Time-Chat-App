import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppRoot() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-start-2 col-span-12 mt-4">
        <Navbar />
      </div>
      <div className="col-span-auto row-start-1">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
}
