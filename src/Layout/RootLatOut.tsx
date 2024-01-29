import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx"

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;