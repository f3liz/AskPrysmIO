import { Outlet } from "react-router-dom";
import Navbar from './Navbar';

function MainLayout() {
  return (
    <div className="layout-container">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;