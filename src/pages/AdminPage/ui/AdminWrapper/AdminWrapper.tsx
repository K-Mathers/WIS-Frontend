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
    return location.pathname === path ? "nav-item active" : "nav-item";
  };
  return (
    <div className="admin-page-container">
      <Header />
      <motion.div
        className="comic-admin"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.aside variants={slideInLeft} className="comic-sidebar">
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
        </motion.aside>
        <motion.main variants={fadeInUp} style={{ flex: 1 }}>
          {children}
        </motion.main>
      </motion.div>
    </div>
  );
};

export default AdminWrapper;
