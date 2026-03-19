import Header from "@/components/Header/Header";
import "./AdminWrapper.css";
import { useLocation, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { staggerContainer, slideInLeft, fadeInUp } from "@/utils/animations";

interface IAdminWrapper {
  children: ReactNode;
}

const AdminWrapper = ({ children }: IAdminWrapper) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveClass = (path: string) => {
    return location.pathname === path
      ? "admin-sidebar__btn admin-sidebar__btn--active"
      : "admin-sidebar__btn";
  };
  return (
    <div className="admin-page-container">
      <Header />
      <motion.div
        className="admin-layout-main"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.aside variants={slideInLeft} className="admin-sidebar">
          <div className="admin-sidebar__title">ADMIN</div>
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
        </motion.aside>
        <motion.main variants={fadeInUp} className="admin-content-area">
          <div className="admin-content-card">
            {children}
          </div>
        </motion.main>
      </motion.div>
    </div>
  );
};

export default AdminWrapper;
