export interface IUserData {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  isVerified: false;
}
