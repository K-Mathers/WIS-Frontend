import MainHome from "./ui/Main/MainHome";
import FooterHome from "./ui/Footer/FooterHome";
import "./HomePage.css";
import jordanRed from "@/assets/AuthAssets/sneaker1.png";
import sneakerBlue from "@/assets/AuthAssets/sneaker2.png";
import burstPow from "@/assets/AuthAssets/burst_pow.png";
import burstZap from "@/assets/AuthAssets/burst_zap.png";
import ComicChat from "@/components/ComicChat/ComicChat";
import { useAuth } from "@/components/AuthProvider/AuthContext/AuthContext";
import Header from "../../components/Header/Header";
import CustomButton from "@/components/CustomButton/CustomButton";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="home-page-container">
      <header className="header">
        <Header />
        <div className="start-btn-block">
          <CustomButton
            textButton="START"
            fz="48px"
            padding="30px 100px"
            backgroundColor="#ffde03"
            textColor="#000"
            boxShadow="10px 10px 0px #000"
            transform="rotate(-5deg)"
            hoverTransform="rotate(-5deg) scale(1.1)"
            transition="all 0.3s ease"
          />
        </div>
      </header>

      <div className="home-content-wrapper">
        <img src={jordanRed} className="comic-decoration decor-top-left" />
        <img src={sneakerBlue} className="comic-decoration decor-top-right" />
        <img src={burstPow} className="comic-decoration decor-bottom-left" />
        <img src={burstZap} className="comic-decoration decor-bottom-right" />
        <MainHome />
      </div>

      <FooterHome />
      {isAuthenticated && <ComicChat />}
    </div>
  );
};

export default HomePage;
