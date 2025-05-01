import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Home from "./Pages/Home.jsx";
import LoginModal from "./Pages/LoginModal.jsx";
import LoginModall from "./Pages/login2.jsx";
import SignUpmodal from "./Pages/SignUpModal.jsx";
import SuperAdminRequests from "./Pages/SuperAdminRequests.jsx";
import HeroSectionLMS from "./Pages/HeroSectionLMS.jsx";
import Projects from "./Pages/Projects.jsx";
import ShowProject from "./Pages/showProject.jsx";
import ShowProjectGPT from "./Pages/showProjectGPT.jsx";
import UserAuth from "./Helpers/UserAuth.jsx";



function App() {
  return (
    <Routes>
      <Route path="/" element={<UserAuth><Home/></UserAuth>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/loginModal" element={<LoginModal />} />
      <Route path="/loginModall" element={<LoginModall />} />
      <Route path="/signUpmodal" element={<SignUpmodal />} />
      <Route path="/adminRequests" element={<SuperAdminRequests />} />
      <Route path="/herosection" element={<HeroSectionLMS />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/project-details" element={<UserAuth><ShowProject/></UserAuth>} />
      <Route path="/ShowProjectGPT" element={<ShowProjectGPT />} />
    </Routes>
  );
}

export default App;
