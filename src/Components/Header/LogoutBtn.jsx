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
      className={`font-mono duration-100 py-1 rounded px-2 hover:opacity-[85%] hover:bg-blue-500 hover:text-gray-50 `}
    >
      Log out
    </button>
  );
}
