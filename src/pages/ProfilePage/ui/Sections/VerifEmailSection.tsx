import { useState, type Dispatch, type SetStateAction } from "react";
import type { IFormData } from "../../type/types";
import {
  useSendVerifCodeMutation,
  useVerifyEmailConfirmMutation,
} from "@/hooks/Mutations/authMutations";

interface IVerifEmailPage {
  activeTab: string;
  verifStep: number;
  setVerifStep: Dispatch<SetStateAction<number>>;
  formData: IFormData;
}

const VerifEmailPage = ({
  activeTab,
  verifStep,
  formData,
  setVerifStep,
}: IVerifEmailPage) => {
  const [verifCode, setVerifCode] = useState("");

  const sendVerifCode = useSendVerifCodeMutation();
  const verifyEmailConfirm = useVerifyEmailConfirmMutation();

  const handleSendVerifCode = () => {
    useSendVerifCode.mutate(
      { email: formData.email },
      {
        onSuccess: () => {
          setVerifStep(2);
        },
      },
    );
  };

  const handleVerifyEmailConfirm = () => {
    useVerifyEmailConfirm.mutate(
      { email: formData.email, code: verifCode },
      {
        onSuccess: () => {
          setVerifStep(1);
          setVerifCode("");
        },
      },
    );
  };

  return (
    <div>
      {activeTab === "verifEmail" && (
        <div className="profile-form profile-form--full animate-fade-in">
          {verifStep === 1 ? (
            <>
              <div className="profile-form__group">
                <label className="profile-form__label">Verify Your Email</label>
                <p className="profile-form__text">
                  {formData.isVerified ? "Verified" : "Not Verified"}
                </p>
                <input
                  className="profile-form__input"
                  value={formData.email}
                  disabled
                />
              </div>
              {!formData.isVerified && (
                <div className="profile-actions">
                  <button
                    className="profile-btn profile-btn--primary"
                    onClick={handleSendVerifCode}
                  >
                    Send Verification Code
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="profile-form__group">
                <label className="profile-form__label">Enter Code</label>
                <input
                  className="profile-form__input"
                  placeholder="123456"
                  value={verifCode}
                  onChange={(e) => setVerifCode(e.target.value)}
                />
              </div>
              <div className="profile-actions">
                <button
                  className="profile-btn profile-btn--primary"
                  onClick={handleVerifyEmailConfirm}
                >
                  Verify Now!
                </button>
                <button className="profile-btn" onClick={() => setVerifStep(1)}>
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifEmailPage;
