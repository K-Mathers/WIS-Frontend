import { useState, type Dispatch, type SetStateAction } from "react";
import type { IFormData } from "../../type/types";
import {
  useSendVerifCodeMutation,
  useVerifyEmailConfirmMutation,
} from "@/hooks/Mutations/authMutations";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import WithSkeleton from "@/utils/skeleton/SkeletonWrapper";
import { Skeleton } from "antd";

interface IVerifEmailPage {
  activeTab: string;
  verifStep: number;
  setVerifStep: Dispatch<SetStateAction<number>>;
  formData: IFormData;
  isLoading?: boolean;
}

const VerifEmailPage = ({
  activeTab,
  verifStep,
  formData,
  setVerifStep,
  isLoading = false,
}: IVerifEmailPage) => {
  const [verifCode, setVerifCode] = useState("");

  const sendVerifCode = useSendVerifCodeMutation();
  const verifyEmailConfirm = useVerifyEmailConfirmMutation();

  const handleSendVerifCode = () => {
    sendVerifCode.mutate(
      { email: formData.email },
      {
        onSuccess: () => {
          setVerifStep(2);
        },
      },
    );
  };

  const handleVerifyEmailConfirm = () => {
    verifyEmailConfirm.mutate(
      { email: formData.email, code: verifCode },
      {
        onSuccess: () => {
          setVerifStep(1);
          setVerifCode("");
        },
      },
    );
  };

  const skeletonContent = (
    <div style={{ padding: "8px 0" }}>
      <Skeleton active paragraph={{ rows: 2 }} />
    </div>
  );

  return (
    <div>
      {activeTab === "verifEmail" && (
        <motion.div
          className="profile-form profile-form--full"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <WithSkeleton isLoading={isLoading} skeleton={skeletonContent}>
            <>
              {verifStep === 1 ? (
                <>
                  <div className="profile-form__group">
                    <label className="profile-form__label">Verify Your Email</label>
                    <p className="profile-form__text">
                      {formData?.isVerified ? "Verified" : "Not Verified"}
                    </p>
                    <input
                      className="profile-form__input"
                      value={formData?.email ?? ""}
                      disabled
                    />
                  </div>
                  {!formData?.isVerified && (
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
            </>
          </WithSkeleton>
        </motion.div>
      )}
    </div>
  );
};

export default VerifEmailPage;
