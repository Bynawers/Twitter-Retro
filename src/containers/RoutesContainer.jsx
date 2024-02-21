import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideBar from "../components/home/SideBar";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Explorer from "../pages/Explorer";
import Notifications from "../pages/Notifications";
import NotFound from "../pages/NotFound";

import Layout from "../pages/Layout.jsx";

const RoutesContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/home" element={<Layout />} />
        <Route path="/explore" element={<Explorer />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesContainer;
