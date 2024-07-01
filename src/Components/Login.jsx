import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { authService } from "../appwrite/authService";
import { login } from "../features/authSlice";
import { Input, Button } from "./index";
import toast from "react-hot-toast";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [error, setError] = useState("");
  const setProgress = useOutletContext().setProgress;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginHandler = async (data) => {
    setProgress(20);
    // setError("");
    try {
      const session = await authService.login(data);
      setProgress(40);
      if (session) {
        const userData = await authService.getUser();
        setProgress(60);
        if (userData) {
          dispatch(login(userData));
          setProgress(80);
          toast.success("Logged in successfully");
          navigate("/");
          setProgress(100);
        }
      }
    } catch (error) {
      // setError(error.message || "Login failed. Please try again.");
      toast.error(error.message);
      setProgress(100);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-between p-4 rounded-xl shadow-lg">
        {/* Logo */}
        <div className="text-center my-4">
          <span className="font-mono text-2xl font-semibold">Log in</span>
        </div>
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="flex flex-col gap-2 p-4"
        >
          {/* Email */}
          <div className="email">
            <Input
              type="email"
              placeholder="Enter your email"
              label="Email: "
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address must be a valid address",
                  matchLength: (v) =>
                    v.length <= 50 || "Email should have at most 50 characters",
                },
              })}
            />
            {errors.email?.message && (
              <p className="text-red-500 font-mono text-xs">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password */}
          <div className="password">
            <Input
              type="password"
              placeholder="Enter your password"
              label="Password: "
              {...register("password", {
                required: "Password is required",
                validate: {
                  minlength: (v) =>
                    v.length >= 8 || "Password length must be 8",
                },
              })}
            />
            {errors.password?.message && (
              <p className="text-red-500 font-mono text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Button */}
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="mb-3 mt-2 bg-green-500 text-gray-50 w-full"
            >
              Log in
            </Button>
          </div>
        </form>
        {/* Error */}
        {/* {error && (
          <span className="text-red-500 mb-2 font-mono text-xs line-clamp-3 ">
            {error}
          </span>
        )} */}
        <div className="message text-center flex items-center">
          <p className="text-xs">Don&apos;t have an Account?&nbsp;</p>
          <Link
            to="/signup"
            className="text-blue-400 duration-100 hover:underline text-sm"
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
