import { useNavigate } from "react-router-dom";
import CustomButton from "../../../CustomButton/CustomButton";
import "./CreateArticle.css";
import { useAuth } from "@/components/AuthProvider/AuthContext/AuthContext";

const CreateArticle = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="create-article-block">
      <div className="text-block">
        <p className="create-article-title">Wanna create article?</p>
        <p className="create-article-description">
          Let’s go, just read our docs and click button
        </p>
      </div>
      <div onClick={() => navigate("/blog/create")}>
        <CustomButton
          transition="all 0.2s ease"
          fz="32px"
          width="240px"
          height="80px"
          textButton="CREATE NOW!"
          hoverTransform="translate(-5px, -5px)"
          fontFamily="'Comic Neue', cursive"
          backgroundColor="#ffde03"
          textColor="#000"
          boxShadow="10px 10px 0px #000"
          border="4px solid #000"
        />
      </div>
    </div>
  );
};

export default CreateArticle;
