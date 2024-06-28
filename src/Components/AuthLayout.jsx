import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function AuthLayout({ children, authentication = true }) {
  const [loading, setloading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setloading(false);
  }, [navigate, authStatus, authentication]);
  if (loading) {
    return <p>Loading...</p>;
  } else {
    return <>{children}</>;
  }
}
