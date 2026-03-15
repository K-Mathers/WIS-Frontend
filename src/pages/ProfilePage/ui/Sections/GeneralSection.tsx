import { useState } from "react";
import type { IFormData } from "../../type/types";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import WithSkeleton from "@/utils/skeleton/SkeletonWrapper";
import { Skeleton } from "antd";

interface IGeneralPage {
  activeTab: string;
  formData: IFormData;
  isLoading?: boolean;
}

const GeneralPage = ({ activeTab, formData, isLoading = false }: IGeneralPage) => {
  const [isEditing] = useState(false);

  const skeletonContent = (
    <div style={{ padding: "8px 0" }}>
      <Skeleton active paragraph={{ rows: 4 }} />
    </div>
  );

  return (
    <div>
      {activeTab === "general" && (
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <WithSkeleton isLoading={isLoading} skeleton={skeletonContent}>
            <>
              <div className="profile-form__group">
                <label className="profile-form__label">Email Address</label>
                <input
                  name="email"
                  className="profile-form__input"
                  value={formData?.email ?? ""}
                  disabled={!isEditing}
                />
              </div>
              <div className="profile-form__group">
                <label className="profile-form__label">Role</label>
                <input
                  name="role"
                  className="profile-form__input"
                  value={formData?.role ?? ""}
                  disabled={!isEditing}
                />
              </div>
              <div className="profile-form__group">
                <label className="profile-form__label">Created At</label>
                <input
                  name="createdAt"
                  className="profile-form__input"
                  value={formData?.createdAt?.split("T")[0] ?? ""}
                  disabled={!isEditing}
                />
              </div>
              <div className="profile-form__group">
                <label className="profile-form__label">is Verified</label>
                <input
                  name="isVerified"
                  className="profile-form__input"
                  value={String(formData?.isVerified ?? "")}
                  disabled={!isEditing}
                />
              </div>
            </>
          </WithSkeleton>
        </motion.div>
      )}
    </div>
  );
};

export default GeneralPage;
