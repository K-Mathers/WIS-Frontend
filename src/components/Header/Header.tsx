import "./Header.css";
import { Link } from "react-router-dom";
import LogoSVG from "@/assets/HeaderAssets/LogoSVG/LogoSVG";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/components/AuthProvider/AuthContext/AuthContext";

interface IHeader {
  backgroundColor?: string;
}

const Header = ({ backgroundColor }: IHeader) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <div className={`link-block ${backgroundColor}`}>
      <div className="logo-block">
        <LogoSVG />
        <Link className="logo-text" to="/">
          WIS
        </Link>
      </div>
      <div className="routes-block">
        <Link className="header-link" to="/">
          HOME
        </Link>
        <Link className="header-link" to="/blog">
          BLOG
        </Link>
        <Link className="header-link" to="/ai">
          AI GUIDE
        </Link>
        {isAuthenticated ? (
          <Link className="header-link" to="/profile">
            PROFILE
          </Link>
        ) : (
          <Link className="header-link" to="/login">
            LOGIN
          </Link>
        )}
        {!isLoading && user && (
          <Link className="header-link" to="/admin">
            ADMIN
          </Link>
        )}
      </div>
      <button
        className="theme-switcher"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <div className="theme-switcher-track">
          <div
            className={`theme-switcher-thumb ${isDarkMode ? "dark" : "light"}`}
          >
            {isDarkMode ? (
              <svg
                className="theme-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                className="theme-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default Header;
