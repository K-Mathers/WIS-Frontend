import {
  changePassword,
  forgotPassword,
  loginUser,
  logoutUser,
  registrationUser,
  resetPassword,
  sendCode,
  verifyCode,
} from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendVerifCodeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
    onError: (err) => {
      console.error("Ошибка при отправке кода:", err);
    },
  });
};

export const useVerifyEmailConfirmMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
    onError: (err) => {
      console.error("Ошибка при отправке кода:", err);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
    },
    onError: (err) => {
      console.error("Ошибка при отправке кода:", err);
    },
  });
};

export const useForgotSendEmailMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
    onError: (err) => {
      console.error("Ошибка при отправке кода:", err);
    },
  });
};

export const useResetPasswordConfirmMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
    onError: (err) => {
      console.error("Ошибка при отправке кода:", err);
    },
  });
};

export const useSaveResetPasswordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
    onError: (err) => {
      console.error("Ошибка при отправке кода:", err);
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useRegistrationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registrationUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
