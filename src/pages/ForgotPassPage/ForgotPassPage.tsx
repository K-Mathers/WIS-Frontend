import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";
import "./ForgotPassPage.css";
import "../ProfilePage/ui/ProfileCard/ProfileCard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jordanRed from "@/assets/AuthAssets/sneaker1.png";
import sneakerBlue from "@/assets/AuthAssets/sneaker2.png";
import burstPow from "@/assets/AuthAssets/burst_pow.png";
import burstZap from "@/assets/AuthAssets/burst_zap.png";
import Header from "../../components/Header/Header";

const ForgotPassPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="profile-page-container">
      <div className="profile-header-wrapper">
        <Header />
      </div>

      <div className="profile-content-wrapper">
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
        <div className="forgot-pass-card">
          <div className="profile-card">
            <div className="profile-card__header">
              <h2 className="profile-card__title">Reset Password</h2>
            </div>
            <ForgotPasswordForm
              forgotEmail={email}
              setForgotEmail={setEmail}
              onSuccess={() => navigate("/login")}
              onBack={() => navigate("/login")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
