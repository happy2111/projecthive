import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AccountSozlamalari from "./pages/AccountSozlamalari";
import ProjectDetails from "./pages/ProjectDetails";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import { Login } from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import Admin from "./pages/Admin";
import LoginChoose from "./pages/LoginChoose";
import AdminLogin from "./pages/AdminLogin";
import AuthLayout from "./components/AuthLayout.jsx";
import Profile from "./pages/Profile";
import ProjectCreate from "./pages/ProjectCreate.jsx";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="" element={<Navigate to="login" replace />} />
            <Route path="login" index element={<Login />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="choose" element={<LoginChoose />} />
            <Route path="admin-login" element={<AdminLogin />} />
          </Route>

          <Route path="/admin/*" elemenCreateProjectt={<Admin />} />

          <Route path="/account-settings" element={<AccountSozlamalari />} />
          {/* <Route path="/create" element={<CreateProject />} /> */}
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create" element={<ProjectCreate />} />
          {/* <Route path='/projects-create' element={<ProjectCreate/>} /> */}
          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
