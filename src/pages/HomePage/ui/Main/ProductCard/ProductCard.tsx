import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

interface Card {
  imageSrc: string;
  title: string;
  containerClassName?: string;
  link: string;
}

const ProductCard = ({ imageSrc, title, containerClassName, link }: Card) => {
  const navigate = useNavigate();

  return (
    <div className={`product-card ${containerClassName || ""}`}>
      <img src={imageSrc} className="product-card-img" />
      <p className="product-card-title">{title}</p>
      <button
        onClick={() => navigate(link)}
        className="product-card-btn"
      >
        Explore
      </button>
    </div>
  );
};

export default ProductCard;
