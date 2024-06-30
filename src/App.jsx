import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authService } from "./appwrite/authService";
import { login, logout } from "./features/authSlice";
import { Header, Footer } from "./Components/index";
import { Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(10);
    authService
      .getUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout);
        }
        setProgress(100);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return null;
  } else {
    return (
      <div className="w-full">
        <LoadingBar
          color="red"
          progress={progress}
          onLoaderFinished={() => {
            setProgress(0);
          }}
        />
        <Header />
        <main className="w-full min-h-full">
          <Outlet context={{ setProgress }} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
