import React from "react";
import { authService } from "../../appwrite/authService";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

export function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handler = async () => {
    await authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <button
      onClick={handler}
      className={`font-mono duration-100 py-1 px-2 bg-blue-500 hover:opacity-[85%] text-gray-50 `}
    >
      Log out
    </button>
  );
}
