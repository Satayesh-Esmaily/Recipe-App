import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="min-h-screen bg-transparent text-[var(--text)]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
