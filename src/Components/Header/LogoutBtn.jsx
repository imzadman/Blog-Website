import React from "react";
import { authService } from "../../appwrite/authService";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handler = async () => {
    await authService
      .logout()
      .then(() => {
        dispatch(logout());
        toast.success("You are logged out");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout failed");
      });
  };
  return (
    <button
      onClick={handler}
      className={`font-mono duration-100 py-1 rounded px-2 hover:opacity-[85%] hover:bg-blue-500 hover:text-gray-50 flex items-center gap-1 `}
    >
      <i className="fa-solid fa-arrow-right-from-bracket"></i>Log out
    </button>
  );
}
