import AuthCard from "./AuthCard/AuthCard";
import { PageBlockWrapper } from "./PageBlockWrapper/PageBlockWrapper";
import "./AuthPage.css";
import burstPow from "@/assets/AuthAssets/burst_pow.png";
import burstZap from "@/assets/AuthAssets/burst_zap.png";
import jordanRed from "@/assets/AuthAssets/sneaker1.png";
import sneakerBlue from "@/assets/AuthAssets/sneaker2.png";
import Header from "../../components/Header/Header";
import { motion } from "framer-motion";
import { staggerContainer, zoomIn } from "@/utils/animations";

const LoginPage = () => {
  return (
    <div className="auth-page-container">
      <div className="auth-header-wrapper">
        <Header backgroundColor="comic-header" />
      </div>
      <motion.div
        className="auth-content-wrapper"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          variants={zoomIn}
          src={jordanRed}
          className="comic-decoration decor-top-left"
        />
        <motion.img
          variants={zoomIn}
          src={sneakerBlue}
          className="comic-decoration decor-top-right"
        />
        <motion.img
          variants={zoomIn}
          src={burstPow}
          className="comic-decoration decor-bottom-left"
        />
        <motion.img
          variants={zoomIn}
          src={burstZap}
          className="comic-decoration decor-bottom-right"
        />

        <PageBlockWrapper>
          <AuthCard type="login" />
        </PageBlockWrapper>
      </motion.div>
    </div>
  );
};

export default LoginPage;
