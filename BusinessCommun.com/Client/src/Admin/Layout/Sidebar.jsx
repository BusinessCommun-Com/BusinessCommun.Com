import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/companies">Companies</Link>
      <Link to="/admin/pending">Pending Requests</Link>
      <Link to="/admin/approved">Approved Companies</Link>
      <Link to="/admin/admins">Admin Management</Link>
    </div>
  );
}