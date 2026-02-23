import MainHome from "./ui/Main/MainHome";
import FooterHome from "./ui/Footer/FooterHome";
import "./HomePage.css";
import jordan4Blue from "@/assets/HomePageAssets/sneaker_1.png";
import adidasSamba from "@/assets/HomePageAssets/sneaker_2.png";
import burstWow from "@/assets/HomePageAssets/burst_wow.png";
import burstCrazy from "@/assets/HomePageAssets/burst_crazy.png";
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
            className="home-start-btn"
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
        <img src={jordan4Blue} className="comic-decoration decor-top-left" />
        <img src={adidasSamba} className="comic-decoration decor-top-right" />
        <img src={burstWow} className="comic-decoration decor-bottom-left" />
        <img src={burstCrazy} className="comic-decoration decor-bottom-right" />
        <MainHome />
      </div>

      <FooterHome />
      {isAuthenticated && <ComicChat />}
    </div>
  );
};

export default HomePage;
