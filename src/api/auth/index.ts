import api from "../api";
import type {
  IChangePassData,
  IForgotPassData,
  ILoginData,
  IRegistartionData,
  IResetPassData,
  ISendCodeData,
  IVerifyCodeSend,
} from "./types";
import { userPath } from "./userPath";

export const getUser = async () => {
  const response = await api.get(userPath.PROFILE);
  return response.data;
};

export const registrationUser = async (userData: IRegistartionData) => {
  const response = await api.post(userPath.REGISTRATION, userData);
  return response.data;
};

export const loginUser = async (userData: ILoginData) => {
  const response = await api.post(userPath.LOGIN, userData);
  return response.data;
};

export const logoutUser = async () => {
  await api.post(userPath.LOGOUT, {});
};

export const forgotPassword = async (userData: IForgotPassData) => {
  await api.post(userPath.FORGOT_PASSWORD, userData);
};

export const resetPassword = async (userData: IResetPassData) => {
  await api.post(userPath.RESET_PASSWORD, userData);
};

export const changePassword = async (userData: IChangePassData) => {
  await api.post(userPath.CHANGE_PASSWORD, userData);
};

export const sendCode = async (userData: ISendCodeData) => {
  await api.post(userPath.SEND_CODE, userData);
};

export const verifyCode = async (userData: IVerifyCodeSend) => {
  await api.post(userPath.VERIFY_CODE, userData);
};
