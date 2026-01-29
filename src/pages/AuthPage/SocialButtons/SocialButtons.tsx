import { Link } from "react-router-dom";
import "./SocialButtons.css";

const socialIcons = [
  {
    src: "/google.svg",
    alt: "google",
    link: "http://localhost:3000/auth/google",
  },
  {
    src: "/github.svg",
    alt: "github",
    link: "http://localhost:3000/auth/github",
  },
  {
    src: "/discord.svg",
    alt: "discord",
    link: "http://localhost:3000/auth/discord",
  },
];

export const SocialButtons = () => {
  return (
    <div className="social-buttons-container">
      {socialIcons.map((icon) => (
        <Link key={icon.alt} to={icon.link}>
          <button className="social-button" type="button">
            <img src={icon.src} alt={icon.alt} className="social-icon" />
          </button>
        </Link>
      ))}
    </div>
  );
};
