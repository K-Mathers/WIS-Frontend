import { useState } from "react";

import "./ForgotPasswordForm.css";
import { errorNotification } from "@/utils/notification/notification";
import {
  useForgotSendEmailMutation,
  useResetPasswordConfirmMutation,
} from "@/hooks/Mutations/authMutations";

interface IForgotPasswordForm {
  forgotEmail: string;
  setForgotEmail: React.Dispatch<React.SetStateAction<string>>;
  onSuccess: () => void;
  onBack?: () => void;
}

const ForgotPasswordForm = ({
  forgotEmail,
  setForgotEmail,
  onSuccess,
  onBack,
}: IForgotPasswordForm) => {
  const [forgotStep, setForgotStep] = useState(1);
  const [recoveryData, setRecoveryData] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const ForgotSendEmail = useForgotSendEmailMutation();
  const ResetPasswordConfirm = useResetPasswordConfirmMutation();

  const handleForgotSendEmail = async () => {
    if (!forgotEmail) {
      errorNotification("Please enter your email");
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(forgotEmail)) {
      errorNotification("Please enter a valid email address");
      return;
    }
    ForgotSendEmail.mutate(
      { email: forgotEmail },
      {
        onSuccess: () => {
          setForgotStep(2);
        },
      },
    );
  };

  const handleResetPasswordConfirm = async () => {
    const { code, newPassword, confirmPassword } = recoveryData;
    ResetPasswordConfirm.mutate(
      { email: forgotEmail, code, newPassword, confirmPassword },
      {
        onSuccess: () => {
          setForgotStep(1);
          if (onSuccess) onSuccess();
        },
      },
    );
  };

  return (
    <div className="profile-form profile-form--full animate-fade-in">
      {forgotStep === 1 ? (
        <>
          <div className="profile-form__group">
            <label className="profile-form__label">
              Lost your password? Enter your email address.
            </label>
            <input
              type="email"
              className="profile-form__input"
              placeholder="user@example.com"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
          </div>
          <div className="profile-actions">
            {onBack && (
              <button className="profile-btn" onClick={onBack}>
                Back
              </button>
            )}
            <button
              className="profile-btn profile-btn--primary"
              onClick={handleForgotSendEmail}
            >
              Send Reset Instructions
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="profile-form__group">
            <label className="profile-form__label">Reset Code</label>
            <input
              className="profile-form__input"
              placeholder="ENTER CODE"
              value={recoveryData.code}
              onChange={(e) =>
                setRecoveryData({
                  ...recoveryData,
                  code: e.target.value,
                })
              }
            />
          </div>
          <div className="profile-form__group">
            <label className="profile-form__label">New Password</label>
            <input
              type="password"
              className="profile-form__input"
              placeholder="******"
              value={recoveryData.newPassword}
              onChange={(e) =>
                setRecoveryData({
                  ...recoveryData,
                  newPassword: e.target.value,
                })
              }
            />
          </div>
          <div className="profile-form__group">
            <label className="profile-form__label">Confirm Password</label>
            <input
              type="password"
              className="profile-form__input"
              placeholder="******"
              value={recoveryData.confirmPassword}
              onChange={(e) =>
                setRecoveryData({
                  ...recoveryData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
          <div className="profile-actions">
            <button
              className="profile-btn profile-btn--primary"
              onClick={handleResetPasswordConfirm}
            >
              Reset Password
            </button>
            <button className="profile-btn" onClick={() => setForgotStep(1)}>
              Back
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
