import "./BlogPage.css";
import CategorieCard from "../../components/BlogPage/ui/CategorieCard/CategorieCard";
import CreateArticle from "../../components/BlogPage/ui/CreateArticle/CreateArticle";
import FooterHome from "../HomePage/ui/Footer/FooterHome";
import jordanRed from "@/assets/AuthAssets/sneaker1.png";
import sneakerBlue from "@/assets/AuthAssets/sneaker2.png";
import burstPow from "@/assets/AuthAssets/burst_pow.png";
import burstZap from "@/assets/AuthAssets/burst_zap.png";
import Header from "@/components/Header/Header";

const BlogPage = () => {
  return (
    <div className="blog-page-container">
      <Header />

      <div className="blog-content-wrapper">
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

        {/* <SearchBlock /> */}
        <CategorieCard />
        <CreateArticle />
      </div>

      <FooterHome />
    </div>
  );
};

export default BlogPage;
