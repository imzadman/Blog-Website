import React from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/login")}
      className="py-1 px-2 bg-blue-500 hover:opacity-[85%] font-mono text-white duration-100"
    >
      Register
    </button>
  );
}
