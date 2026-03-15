import star from "/Star_1.png";
import star2 from "/Star_2.png";
import allArticlesIMG from "/allArticles.jpg";
import premCollectionIMG from "/premCollection.jpg";
import crazyShoesIMG from "/crazyShoes.jpg";
import CustomButton from "@/components/CustomButton/CustomButton";
import ProductCard from "./ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import "./MainHome.css";

const MainHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="main-home">
        <section className="main-home-stats">
          <div className="stat-card stat-card-yellow">
            <div className="stat-text-center">
              <h2 className="stat-title">10K+</h2>
              <p className="stat-subtitle">User trust us</p>
            </div>
          </div>

          <div className="stat-card stat-card-white">
            <div className="stat-text-center">
              <h2 className="stat-title">30K+</h2>
              <p className="stat-subtitle">brand CHANNEL</p>
            </div>
          </div>

          <div className="stat-card stat-card-red">
            <div className="stat-text-center">
              <h2 className="stat-title">1K+</h2>
              <p className="stat-subtitle">TOPICS</p>
            </div>
          </div>
        </section>

        <section className="main-home-trending">
          <div className="trending-image-wrapper">
            <div className="trending-bg"></div>
            <img className="trending-img" src="/Trending_block.png" alt="Trending" />
          </div>

          <div className="trending-text-wrapper">
            <p className="trending-title">
              TRENDING SHOES <br /> OF THE DAY
            </p>
            <p className="trending-desc">
              Sneaker of the day: discover what’s hot, what’s rare, and what’s
              next. Every day we highlight the sneakers that define the culture.
            </p>

            <div className="trending-btn-wrapper">
              <CustomButton
                onClick={() => navigate("/blog")}
                textButton="START EXPLORING"
                fz="20px"
                padding="15px 40px"
                backgroundColor="#ffde03"
                textColor="#000"
                boxShadow="8px 8px 0px #000"
                hoverTransform="rotate(-2deg) scale(1.05)"
                transition="all 0.2s ease"
              />
            </div>
          </div>
        </section>

        <section className="main-home-collection">
          <div className="collection-container">
            <div className="collection-header">
              <p className="collection-title">
                TOP
                <br />
                COLLECTION
              </p>
            </div>

            <div className="collection-grid">
              <img src={star} className="star-left" alt="star" />
              <img src={star2} className="star-right" alt="star" />

              <ProductCard
                imageSrc={allArticlesIMG}
                title="ALL ARTICLES"
                containerClassName="card-all-articles"
                link="/blog"
              />

              <ProductCard
                imageSrc={premCollectionIMG}
                title="PREMIUM COLLECTION"
                containerClassName="card-premium"
                link="/blog/category/PREMIUM_COLLECTION"
              />

              <ProductCard
                imageSrc={crazyShoesIMG}
                title="CRAZY SHOES"
                containerClassName="card-crazy"
                link="/blog/category/CRAZY_SHOES"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MainHome;
