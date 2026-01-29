import "./ProfilePage.css";
import ProfileCard from "./ui/ProfileCard/ProfileCard";
import FooterHome from "../HomePage/ui/Footer/FooterHome";
import jordanRed from "@/assets/AuthAssets/sneaker1.png";
import sneakerBlue from "@/assets/AuthAssets/sneaker2.png";
import burstPow from "@/assets/AuthAssets/burst_pow.png";
import burstZap from "@/assets/AuthAssets/burst_zap.png";
import Header from "@/components/Header/Header";
import Hero from "@/components/HomePage/ui/Hero/Hero";
import { useAuth } from "@/components/AuthProvider/AuthContext/AuthContext";
import AuthLocked from "@/components/AuthLocked/AuthLocked";

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="profile-page-container">
      <div className="profile-header-wrapper">
        <Header />
      </div>

      <div className="profile-content-wrapper">
        {isAuthenticated ? (
          <>
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
            <ProfileCard />
          </>
        ) : (
          <AuthLocked />
        )}
      </div>

      <FooterHome />
    </div>
  );
};

export default ProfilePage;
