import { Link } from "react-router-dom";
import "./AuthLocked.css";

interface AuthLockedProps {
    title?: string;
    text?: string;
    buttonText?: string;
}

const AuthLocked = ({
    title = "Access blocked",
    text = "You are blocked from viewing anything on this page without registering or logging in.",
    buttonText = "Login",
}: AuthLockedProps) => {
    return (
        <div className="auth-locked-content">
            <div className="auth-locked-card">
                <h2 className="auth-locked-title">{title}</h2>
                <p className="auth-locked-text">{text}</p>
                <Link to="/login" className="auth-locked-link">
                    {buttonText}
                </Link>
            </div>
        </div>
    );
};

export default AuthLocked;
