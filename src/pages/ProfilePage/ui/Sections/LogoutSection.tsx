import { useAuth } from "@/components/AuthProvider/AuthContext/AuthContext";
import { useLogoutMutation } from "@/hooks/Mutations/authMutations";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

interface ILogoutPage {
  activeTab: string;
}

const LogoutPage = ({ activeTab }: ILogoutPage) => {
  const { refreshAuth } = useAuth();
  const navigate = useNavigate();

  const useLogout = useLogoutMutation();

  const handleLogout = async () => {
    useLogout.mutate(undefined, {
      onSuccess: async () => {
        await refreshAuth();
        navigate("/");
      },
    });
  };

  return (
    <div>
      {activeTab === "logout" && (
        <motion.div
          className="profile-form profile-form--full"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="profile-form__group">
            <label className="profile-form__label">
              Are you sure you want to leave?
            </label>
          </div>
          <div className="profile-actions">
            <button
              className="profile-btn profile-btn--danger"
              onClick={handleLogout}
            >
              Yes, Log Me Out!
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LogoutPage;
