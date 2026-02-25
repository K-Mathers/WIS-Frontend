import { useAuth } from "@/components/AuthProvider/AuthContext/AuthContext";
import { useLogoutMutation } from "@/hooks/Mutations/authMutations";
import { useNavigate } from "react-router-dom";

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
        <div className="profile-form profile-form--full animate-fade-in">
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
        </div>
      )}
    </div>
  );
};

export default LogoutPage;
