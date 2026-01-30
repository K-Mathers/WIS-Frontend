import { useEffect, useState } from "react";
import "./ProfilePage.css";
import Header from "@/components/Header/Header";
import { useAuth } from "@/components/AuthProvider/AuthContext/AuthContext";
import AuthLocked from "@/components/AuthLocked/AuthLocked";
import { getUser } from "@/api/auth";
import GeneralPage from "./ui/Sections/GeneralSection";
import SecurityPage from "./ui/Sections/SecuritySection";
import VerifEmailPage from "./ui/Sections/VerifEmailSection";
import LogoutPage from "./ui/Sections/LogoutSection";
import { TAB_TITLES } from "./lib";
import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] =
    useState<keyof typeof TAB_TITLES>("general");

  const [formData, setFormData] = useState({
    email: "",
    role: "",
    createdAt: "",
    isVerified: "",
  });
  const [forgotEmail, setForgotEmail] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [verifStep, setVerifStep] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserData = async () => {
        try {
          const data = await getUser();
          setFormData(data);
          setForgotEmail(data.email);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="profile-page-container">
        <Header />
        <div
          className="profile-layout-main"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <AuthLocked />
        </div>
      </div>
    );
  }

  const getActiveClass = (tabName: string) => {
    return activeTab === tabName
      ? "profile-sidebar__btn profile-sidebar__btn--active"
      : "profile-sidebar__btn";
  };

  return (
    <div className="profile-page-container">
      <Header />

      <div className="profile-layout-main">
        <aside className="profile-sidebar">
          <div className="profile-sidebar__title">PROFILE!</div>

          <nav>
            <button
              className={getActiveClass("general")}
              onClick={() => setActiveTab("general")}
            >
              General Info
            </button>

            <button
              className={getActiveClass("security")}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>

            <button
              className={getActiveClass("forgotPass")}
              onClick={() => setActiveTab("forgotPass")}
            >
              Forgot Password
            </button>

            <button
              className={getActiveClass("verifEmail")}
              onClick={() => setActiveTab("verifEmail")}
            >
              Verification Email
            </button>

            <button
              className={getActiveClass("logout")}
              onClick={() => setActiveTab("logout")}
            >
              Logout
            </button>
          </nav>
        </aside>
        
        <main className="profile-content-area">
          <div className="profile-content-card">
            <div className="profile-card__header">
              <h2 className="profile-card__title">{TAB_TITLES[activeTab]}</h2>
            </div>

            <GeneralPage activeTab={activeTab} formData={formData} />

            <SecurityPage
              activeTab={activeTab}
              passwordData={passwordData}
              setPasswordData={setPasswordData}
            />

            {activeTab === "forgotPass" && (
              <ForgotPasswordForm
                forgotEmail={forgotEmail}
                setForgotEmail={setForgotEmail}
                onSuccess={() => setActiveTab("security")}
              />
            )}

            <VerifEmailPage
              activeTab={activeTab}
              verifStep={verifStep}
              setVerifStep={setVerifStep}
              formData={formData}
              setFormData={setFormData}
            />

            <LogoutPage activeTab={activeTab} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
