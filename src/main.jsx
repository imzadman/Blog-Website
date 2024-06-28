import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Home from "./pages/Home.jsx";
import AddPost from "./pages/AddPost.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Post from "./pages/Post.jsx";
import EditPost from "./pages/EditPost.jsx";
import { About } from "./pages/About.jsx";
import { AuthLayout } from "./Components/AuthLayout.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route
        path="login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />
      <Route path="about" element={<About />} />
      <Route path="post/:slug" element={<Post />} />
      <Route
        path="add-post"
        element={
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        }
      />
      <Route
        path="all-posts"
        element={
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        }
      />
      <Route
        path="edit-post/:slug"
        element={
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
