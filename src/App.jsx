import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authService } from "./appwrite/authService";
import { login, logout } from "./features/authSlice";
import { Header, Footer } from "./Components/index";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authService
      .getUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout);
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);
  if (loading) {
    return;
  } else {
    return (
      <div className="w-full">
        <Header />
        <main className="w-full min-h-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
