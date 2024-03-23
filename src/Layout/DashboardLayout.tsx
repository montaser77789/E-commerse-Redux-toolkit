import Dashboard from "../pages/Dashboard/Dashboard";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div className="root-layout">
      <Navbar/>
        <Dashboard/>
    </div>
  );
};

export default DashboardLayout;