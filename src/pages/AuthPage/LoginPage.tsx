import AuthCard from "./AuthCard/AuthCard";
import { PageBlockWrapper } from "./PageBlockWrapper/PageBlockWrapper";
import "./AuthPage.css";
import burstPow from "@/assets/AuthAssets/burst_pow.png";
import burstZap from "@/assets/AuthAssets/burst_zap.png";
import jordanRed from "@/assets/AuthAssets/sneaker1.png";
import sneakerBlue from "@/assets/AuthAssets/sneaker2.png";
import Header from "../../components/Header/Header";

const LoginPage = () => {
  return (
    <div className="auth-page-container">
      <div className="auth-header-wrapper">
        <Header backgroundColor="comic-header" />
      </div>
      <div className="auth-content-wrapper">
        <img src={jordanRed} className="comic-decoration decor-top-left" />
        <img src={sneakerBlue} className="comic-decoration decor-top-right" />
        <img src={burstPow} className="comic-decoration decor-bottom-left" />
        <img src={burstZap} className="comic-decoration decor-bottom-right" />

        <PageBlockWrapper>
          <AuthCard type="login" />
        </PageBlockWrapper>
      </div>
    </div>
  );
};

export default LoginPage;
