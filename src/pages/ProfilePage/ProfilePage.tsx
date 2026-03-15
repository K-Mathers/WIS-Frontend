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
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { staggerContainer, slideInLeft, fadeInUp } from "@/utils/animations";

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] =
    useState<keyof typeof TAB_TITLES>("general");

  const [forgotEmail, setForgotEmail] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [verifStep, setVerifStep] = useState(1);

  const { data: formData, isLoading } = useQuery({
    queryKey: ["profileData"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (formData?.email) {
      setForgotEmail(formData.email);
    }
  }, [formData]);

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

      <motion.div
        className="profile-layout-main"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.aside variants={slideInLeft} className="profile-sidebar">
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
        </motion.aside>

        <motion.main variants={fadeInUp} className="profile-content-area">
          <div className="profile-content-card">
            <div className="profile-card__header">
              <h2 className="profile-card__title">{TAB_TITLES[activeTab]}</h2>
            </div>

            <GeneralPage activeTab={activeTab} formData={formData} isLoading={isLoading} />

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
              formData={formData}
              setVerifStep={setVerifStep}
              isLoading={isLoading}
            />

            <LogoutPage activeTab={activeTab} />
          </div>
        </motion.main>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
