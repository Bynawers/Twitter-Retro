import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Explorer from "../pages/Explorer";
import Notifications from "../pages/Notifications";
import NotFound from "../pages/NotFound";
import User from "../pages/User.jsx";
import Lists from "../pages/Lists.jsx";
import Messages from "../pages/Messages.jsx";

import Layout from "../components/Layout.jsx";

const RoutesContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/home" element={<Layout children={<Home />} />} />
        <Route path="/explore" element={<Layout children={<Explorer />} />} />
        <Route
          path="/notifications"
          element={<Layout children={<Notifications />} />}
        />
        <Route path="/messages" element={<Layout children={<Messages />} />} />
        <Route path="/lists" element={<Layout children={<Lists />} />} />
        <Route path="/not-found" element={<Layout children={<NotFound />} />} />
        <Route path="/:pseudo" element={<Layout children={<User />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesContainer;
