import star from "/Star_1.png";
import star2 from "/Star_2.png";
import allArticlesIMG from "/allArticles.jpg";
import premCollectionIMG from "/premCollection.jpg";
import crazyShoesIMG from "/crazyShoes.jpg";
import CustomButton from "@/components/CustomButton/CustomButton";
import ProductCard from "./ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";

const MainHome = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="min-h-screen overflow-hidden">
        <section className="pt-24 pb-12 flex flex-wrap justify-center md:justify-around gap-8 px-4">
          <div className="flex justify-center items-center bg-[#ffde03] border-4 border-black p-6 md:p-8 shadow-[10px_10px_0px_#000] transform -rotate-2 min-w-[250px]">
            <div className="text-center">
              <h2 className="font-black text-5xl md:text-7xl uppercase mb-2">
                10K+
              </h2>
              <p className="font-black text-xl md:text-2xl uppercase">
                User trust us
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center bg-white dark:bg-[#2d2d2d] dark:text-white border-4 border-black p-6 md:p-8 shadow-[10px_10px_0px_#000] transform rotate-1 min-w-[250px]">
            <div className="text-center">
              <h2 className="font-black text-5xl md:text-7xl uppercase mb-2">
                30K+
              </h2>
              <p className="font-black text-xl md:text-2xl uppercase">
                brand CHANNEL
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center bg-[#e74c3c] text-white border-4 border-black p-6 md:p-8 shadow-[10px_10px_0px_#000] transform -rotate-1 min-w-[250px]">
            <div className="text-center">
              <h2 className="font-black text-5xl md:text-7xl uppercase mb-2">
                1K+
              </h2>
              <p className="font-black text-xl md:text-2xl uppercase">TOPICS</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row items-center justify-between relative py-12 md:py-24 px-8 gap-12">
          <div className="flex-1 flex justify-center max-w-lg relative">
            <div className="absolute inset-0 bg-[#ffde03] border-4 border-black -rotate-3 -z-10"></div>
            <img
              className="relative z-10 p-4"
              src="/Trending_block.png"
              alt="Trending"
            />
          </div>

          <div className="flex-1 max-w-2xl flex flex-col justify-center items-start bg-white dark:bg-[#2d2d2d] dark:text-white border-4 border-black p-8 md:p-12 shadow-[15px_15px_0px_#000] rotate-1">
            <p className="font-black text-4xl md:text-6xl lg:text-7xl mb-6 uppercase leading-tight">
              TRENDING SHOES <br /> OF THE DAY
            </p>
            <p className="text-lg md:text-2xl font-bold leading-relaxed pb-8 uppercase italic">
              Sneaker of the day: discover what’s hot, what’s rare, and what’s
              next. Every day we highlight the sneakers that define the culture.
            </p>

            <div className="flex">
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

        <section className="pt-24 pb-24 relative">
          <div className="px-8 flex flex-col items-center">
            <div className="mb-16 md:mb-24 self-start md:ml-12">
              <p className="font-black text-5xl md:text-8xl uppercase bg-[#e74c3c] text-white p-4 md:p-6 border-4 border-black shadow-[10px_10px_0px_#000] -rotate-3 inline-block leading-tight">
                TOP
                <br />
                COLLECTION
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full relative">
              <img
                src={star}
                className="absolute -top-20 left-0 -z-10 hidden md:block"
                alt="star"
              />
              <img
                src={star2}
                className="absolute -top-40 right-10 -z-10 hidden md:block"
                alt="star"
              />

              <ProductCard
                imageSrc={allArticlesIMG}
                title="ALL ARTICLES"
                containerClassName="z-20 transform -rotate-1"
              />

              <ProductCard
                imageSrc={premCollectionIMG}
                title="PREMIUM COLLECTION"
                containerClassName="z-20 transform rotate-2 md:-translate-y-12"
              />

              <ProductCard
                imageSrc={crazyShoesIMG}
                title="CRAZY SHOES"
                containerClassName="z-20 transform -rotate-2"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MainHome;
