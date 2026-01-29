import { PageBlockWrapper } from "./PageBlockWrapper/PageBlockWrapper";
import AuthCard from "./AuthCard/AuthCard";
import "./AuthPage.css";
import jordanRed from "@/assets/AuthAssets/sneaker1.png";
import sneakerBlue from "@/assets/AuthAssets/sneaker2.png";
import burstPow from "@/assets/AuthAssets/burst_pow.png";
import burstZap from "@/assets/AuthAssets/burst_zap.png";
import Header from "../../components/Header/Header";

const RegistrationPage = () => {
  return (
    <div className="auth-page-container">
      <div className="auth-header-wrapper">
        <Header backgroundColor="comic-header" />
      </div>
      <div className="auth-content-wrapper">
        <img
          src={jordanRed}
          className="comic-decoration decor-top-left"
          alt=""
        />
        <img
          src={sneakerBlue}
          className="comic-decoration decor-top-right"
          alt=""
        />
        <img
          src={burstPow}
          className="comic-decoration decor-bottom-left"
          alt=""
        />
        <img
          src={burstZap}
          className="comic-decoration decor-bottom-right"
          alt=""
        />

        <PageBlockWrapper>
          <AuthCard type="register" />
        </PageBlockWrapper>
      </div>
    </div>
  );
};

export default RegistrationPage;
