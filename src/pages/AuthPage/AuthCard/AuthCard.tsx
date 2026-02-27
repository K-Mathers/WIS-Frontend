import { GlassCard } from "../GlassCard/GlassCard";
import "./AuthCard.css";
import { Link, useNavigate } from "react-router-dom";
import {
  loginSchema,
  registerSchema,
  type loginSchemaType,
  type registerSchemaType,
} from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialButtons } from "../SocialButtons/SocialButtons";
import {
  errorNotification,
  successNotification,
} from "@/utils/notification/notification";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider/AuthContext/AuthContext";
import {
  useLoginMutation,
  useRegistrationMutation,
} from "@/hooks/Mutations/authMutations";

type AuthCard = {
  type: "login" | "register";
};

type FormData = loginSchemaType & Partial<registerSchemaType>;

const AuthCard = ({ type = "login" }: AuthCard) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const loginUserMutation = useLoginMutation();
  const registrationUserMutation = useRegistrationMutation();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(type === "login" ? loginSchema : registerSchema),
  });

  const isLogin = type === "login";
  const isPending =
    loginUserMutation.isPending || registrationUserMutation.isPending;

  const onSubmit = async (data: FormData) => {
    if (isLogin) {
      loginUserMutation.mutate(
        { email: data.email, password: data.password },
        {
          onSuccess: () => {
            successNotification("Login success!");
            navigate("/profile");
          },
          onError: (err) => {
            errorNotification("Login failed");
            console.error("Login Error:", err);
          },
        },
      );
    } else {
      registrationUserMutation.mutate(
        {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword!,
        },
        {
          onSuccess: () => {
            successNotification("Registration success!");
            navigate("/profile");
          },
          onError: (err) => {
            errorNotification("Registration failed");
            console.error("Registration Error:", err);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-card">
      <GlassCard>
        <div className="auth-card__wrapper">
          <div className="auth-card__logo">
            <p className="auth-card__logo-text">What Is Shoes?</p>
          </div>

          <form className="auth-card__form" onSubmit={handleSubmit(onSubmit)}>
            <p className="auth-card__title">
              {type === "login" ? "Login" : "Register"}
            </p>

            <div className="auth-card__field">
              <label htmlFor="email" className="auth-card__label">
                Email
              </label>
              <input
                {...formRegister("email")}
                placeholder="username@gmail.com"
                className={`auth-card__input ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.email && (
                <span className="field-error">{errors.email.message}</span>
              )}
            </div>

            <div className="auth-card__field">
              <label htmlFor="password" className="auth-card__label">
                Password
              </label>
              <input
                type="password"
                {...formRegister("password")}
                className={`auth-card__input ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="Password"
              />
              {errors.password && (
                <span className="field-error">{errors.password.message}</span>
              )}
            </div>

            {type === "register" && (
              <div className="auth-card__field">
                <label htmlFor="confirmPassword" className="auth-card__label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...formRegister("confirmPassword")}
                  className={`auth-card__input ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                  placeholder="Repeat Password"
                />
                {errors.confirmPassword && (
                  <span className="field-error">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            )}

            {type === "login" && (
              <div className="auth-card__forgot">
                <Link to="/forgot-password" className="auth-card__forgot-link">
                  Forgot Password?
                </Link>
              </div>
            )}

            <div className="auth-card__button-wrapper">
              <button
                type="submit"
                className="auth-card__button"
                disabled={isPending}
              >
                {isPending
                  ? "Loading..."
                  : type === "login"
                    ? "Sign in"
                    : "Sign up"}
              </button>
            </div>

            <div className="auth-card__social">
              <p className="auth-card__social-text">or continue with</p>
            </div>
            <SocialButtons />

            <div className="auth-card__switch">
              {type === "login" ? (
                <>
                  <span className="auth-card__switch-text">
                    Don&apos;t have an account yet?{" "}
                  </span>
                  <Link to="/register" className="auth-card__switch-link">
                    Register for free
                  </Link>
                </>
              ) : (
                <>
                  <span className="auth-card__switch-text">
                    Already have an account?{""}
                  </span>
                  <Link to="/login" className="auth-card__switch-link">
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </form>
        </div>
      </GlassCard>
    </div>
  );
};

export default AuthCard;
