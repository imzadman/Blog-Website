import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { authService } from "../appwrite/authService";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { Input, Button } from "./index";

export function Signup() {
  const setProgress = useOutletContext().setProgress;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const signupHandler = async (data) => {
    setError("");
    setProgress(20);
    try {
      const session = await authService.createAccount(data);
      setProgress(40);
      if (session) {
        const userData = await authService.getUser();
        setProgress(60);
        if (userData) {
          dispatch(login(userData));
          setProgress(80);
          navigate("/");
          setProgress(100);
        }
      }
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
      setProgress(100);
    }
  };
  // Confirm password
  const password = watch("password");

  return (
    <div className="flex flex-col items-center justify-between p-4 shadow-lg rounded-xl">
      <div className="text-center my-4">
        <span className="font-mono font-semibold text-2xl">Sign Up</span>
      </div>
      <form
        onSubmit={handleSubmit(signupHandler)}
        className="flex flex-col p-4 gap-2"
      >
        {/* Name */}
        <Input
          type="text"
          label="FullName: "
          placeholder="Enter your Full Name"
          {...register("name", {
            required: "Username is required",
            validate: {
              minLength: (v) =>
                v.length >= 3 || "Username must have 3 characters",
            },
          })}
        />
        {errors.name?.message && (
          <p className="text-red-500 text-xs font-mono">
            {errors.name.message}
          </p>
        )}
        {/* Email */}
        <div className="email flex flex-col">
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
            <p className="text-red-500 text-xs font-mono">
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
                minlength: (v) => v.length >= 8 || "Password length must be 8",
              },
            })}
          />
          {errors.password?.message && (
            <p className="text-red-500 text-xs font-mono">
              {errors.password.message}
            </p>
          )}
        </div>
        {/* Confirm Password */}
        <div className="confirm">
          <Input
            label="Confirm Password: "
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: {
                match: (v) => v === password || "Password does not match",
              },
            })}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500 text-xs font-mono">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {/* Button */}
        <div className="button flex items-center justify-center">
          <Button
            type="submit"
            className="bg-blue-400 w-full text-gray-50 mt-2"
          >
            Sign up
          </Button>
        </div>
      </form>
      {error && <p className="text-red-500 mb-3 text-xs font-mono">{error}</p>}
      <div className="message flex items-center">
        <p className="text-xs">
          Already have an Account?&nbsp;
          <Link
            to="/login"
            className="hover:underline text-blue-500 duration-100 text-sm"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
