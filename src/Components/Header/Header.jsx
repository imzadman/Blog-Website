import React, { useEffect, useState } from "react";
import { LogoutBtn } from "./LogoutBtn";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { DarkModeBtn, Register } from "../index";

export function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Home",
      slug: "/",
      status: true,
    },
    {
      name: "Sign up",
      slug: "/signup",
      status: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      status: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      status: authStatus,
    },
  ];
  // Theme:-
  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <header className="w-full shadow h-[7vh] px-4">
      <div className="flex items-center justify-between py-2">
        <div className="logo">
          <Link
            style={{ fontFamily: "cursive" }}
            to="/"
            className="text-lg font-semibold"
          >
            Blog with Appwrite
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {navItems.map((item) =>
            item.status ? (
              <NavLink
                key={item.name}
                to={item.slug}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-500 underline " : undefined
                  } font-mono duration-100`
                }
              >
                {item.name}
              </NavLink>
            ) : null
          )}
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-500 underline " : undefined
              } font-mono duration-100`
            }
            to="/about"
          >
            About
          </NavLink>
        </div>
        <div className="section flex gap-3 items-center">
          <DarkModeBtn onChange={handleToggle} />
          {authStatus ? (
            <li className="list-none">
              <LogoutBtn />
            </li>
          ) : (
            <li className="list-none">
              <Register />
            </li>
          )}
        </div>
      </div>
    </header>
  );
}
