import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";
import "./ForgotPassPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

const ForgotPassPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="forgot-page-container">
      <Header />

      <div className="forgot-page-content">
        <motion.div
          className="forgot-card"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="forgot-card__header">
            <h2 className="forgot-card__title">Reset Password</h2>
          </div>
          <ForgotPasswordForm
            forgotEmail={email}
            setForgotEmail={setEmail}
            onSuccess={() => navigate("/login")}
            onBack={() => navigate("/login")}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
