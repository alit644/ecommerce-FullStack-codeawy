import { Outlet } from "react-router";
import Navbar from "../../components/ui/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
