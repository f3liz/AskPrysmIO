import "../../styles/admin-view.css";
import { useState } from "react";
import AddUserForm from "../../components/admin/AddUserForm";
import UploadFile from "../../components/admin/UploadFile";
import UsersTable from "../../components/admin/UsersTable";

type AdminTab = "addUser" | "fileUpload" | "allUsers";

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>("fileUpload");

  const renderContent = () => {
    switch (activeTab) {
      case "addUser":
        return <AddUserForm />;
      case "fileUpload":
        return <UploadFile />;
      case "allUsers":
        return <UsersTable />;
      default:
        return <UploadFile />;
    }
  };

  return (
    <div className="admin-dashboard">
      <h3 className="admin-title">Admin Dashboard</h3>

      <nav className="admin-nav">
        <button
          onClick={() => setActiveTab("fileUpload")}
          className={`admin-nav-btn ${activeTab === "fileUpload" ? "active" : "inactive"}`}
        >
          File Upload
        </button>
        <button
          onClick={() => setActiveTab("addUser")}
          className={`admin-nav-btn ${activeTab === "addUser" ? "active" : "inactive"}`}
        >
          Add User
        </button>
        <button
          onClick={() => setActiveTab("allUsers")}
          className={`admin-nav-btn ${activeTab === "allUsers" ? "active" : "inactive"}`}
        >
          All Users
        </button>
      </nav>

      <div className="admin-content">{renderContent()}</div>
    </div>
  );
}
