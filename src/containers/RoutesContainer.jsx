import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Explorer from "../pages/Explorer";
import Notifications from "../pages/Notifications";
import NotFound from "../pages/NotFound";
import User from "../pages/User.jsx";
import Lists from "../pages/Lists.jsx";
import Messages from "../pages/Messages.jsx";
import Post from "../pages/Post.jsx";
import PostPhoto from "../pages/PostPhoto.jsx";

import Layout from "../components/Layout.jsx";
import LayoutMessages from "../components/LayoutMessages.jsx";

import PrivateRoutes from "./PrivatesRoutes";
import PublicRoutes from "./PublicRoutes";

const RoutesContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Layout children={<Home />} />} />
          <Route path="/explore" element={<Layout children={<Explorer />} />} />
          <Route
            path="/notifications"
            element={<Layout children={<Notifications />} />}
          />
          <Route
            path="/messages"
            element={<LayoutMessages children={<Messages />} />}
          />
          <Route path="/lists" element={<Layout children={<Lists />} />} />
          <Route
            path="/not-found"
            element={<Layout children={<NotFound />} />}
          />
          <Route path="/:user" element={<Layout children={<User />} />} />
          <Route
            path="/:user/status/:post"
            element={<Layout children={<Post />} />}
          />
          <Route
            path="/:user/status/:post/photo"
            element={<Layout children={<PostPhoto />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesContainer;
