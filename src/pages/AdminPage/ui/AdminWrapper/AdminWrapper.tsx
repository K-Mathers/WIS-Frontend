import Header from "@/components/Header/Header";
import "./AdminWrapper.css";
import { useLocation, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface IAdminWrapper {
  children: ReactNode;
}

const AdminWrapper = ({ children }: IAdminWrapper) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveClass = (path: string) => {
    return location.pathname === path ? "nav-item active" : "nav-item";
  };
  return (
    <div className="admin-page-container flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="comic-admin flex-1">
        <aside className="comic-sidebar">
          <div className="comic-logo">ADMIN!</div>
          <nav>
            <button
              className={getActiveClass("/admin")}
              onClick={() => navigate("/admin")}
            >
              DASHBOARD
            </button>
            <button
              className={getActiveClass("/admin/article")}
              onClick={() => navigate("/admin/article")}
            >
              ARTICLE
            </button>
            <button
              className={getActiveClass("/admin/messages")}
              onClick={() => navigate("/admin/messages")}
            >
              MESSAGES
            </button>
          </nav>
          <div className="sidebar-footer">POW! v.1.0</div>
        </aside>
        {children}
      </div>
    </div>
  );
};

export default AdminWrapper;
