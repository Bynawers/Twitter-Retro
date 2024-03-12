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
import Post from "../pages/Post.jsx";
import PostPhoto from "../pages/PostPhoto.jsx";
import AuthProvider from "../hooks/AuthProvider";

import Layout from "../components/Layout.jsx";

const RoutesContainer = () => {
  //const user = useAuth();
  //if (!user.token) return <Navigate to="/login" />;
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/home" element={<Layout children={<Home />} />} />
          <Route path="/explore" element={<Layout children={<Explorer />} />} />
          <Route
            path="/notifications"
            element={<Layout children={<Notifications />} />}
          />
          <Route
            path="/messages"
            element={<Layout children={<Messages />} />}
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default RoutesContainer;
