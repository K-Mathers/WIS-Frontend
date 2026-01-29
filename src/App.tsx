import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BlogPage from "./pages/BlogPage/BlogPage";
import AiPage from "./pages/AiPage/AiPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegistrationPage from "./pages/AuthPage/RegistrationPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import CreateBlogPage from "./pages/CreateBlogPage/CreateBlogPage";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import ForgotPassPage from "./pages/ForgotPassPage/ForgotPassPage";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/create" element={<CreateBlogPage />} />
          <Route path="/ai" element={<AiPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPassPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ai/:sessionId" element={<AiPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
