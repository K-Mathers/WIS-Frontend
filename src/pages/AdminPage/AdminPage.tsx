import "./AdminPage.css";
import Dashboard from "./ui/Dashboard/Dashboard";
import Article from "./ui/Article/Article";
import Messages from "./ui/Messages/Messages";
import { Route, Routes } from "react-router-dom";
import AdminWrapper from "./ui/AdminWrapper/AdminWrapper";

const AdminPage = () => {
  return (
    <AdminWrapper>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="article" element={<Article />} />
        <Route path="messages" element={<Messages />} />
      </Routes>
    </AdminWrapper>
  );
};

export default AdminPage;
