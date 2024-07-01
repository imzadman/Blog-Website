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
  // Profile
  const userData = useSelector((state) => state.auth.userData);

  return (
    <header className="w-full shadow h-[7vh] px-4">
      <div className="flex items-center justify-between py-2">
        {/* Hamburger */}
        <details className="dropdown lg:hidden">
          <summary
            className="btn bg-transparent border-none rounded-full py-0"
            onClick={() => {
              document.getElementById("menu").classList.toggle("fa-xmark");
            }}
          >
            <i id="menu" className="fa-solid fa-bars text-lg"></i>
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              {navItems.map((item) =>
                item.status ? (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-blue-500 font-semibold " : undefined
                      } font-mono duration-100 `
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
                  } font-mono duration-100 text-sm lg:text-[1rem]`
                }
                to="/about"
              >
                About
              </NavLink>{" "}
            </li>
          </ul>
        </details>
        {/* Logo */}
        <Link
          style={{ fontFamily: "cursive" }}
          to="/"
          className=" text-sm lg:text-lg font-semibold"
        >
          Blog with Appwrite
        </Link>
        {/* NavItems */}
        <div className="lg:flex items-center gap-2 lg:gap-4 hidden">
          {navItems.map((item) =>
            item.status ? (
              <NavLink
                key={item.name}
                to={item.slug}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-500 underline " : undefined
                  } font-mono duration-100 text-sm lg:text-[1rem] `
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
              } font-mono duration-100 text-sm lg:text-[1rem]`
            }
            to="/about"
          >
            About
          </NavLink>
        </div>
        <div className="section flex gap-3 items-center">
          {/* DarkMode Btn */}
          <DarkModeBtn onChange={handleToggle} />
          {/* Logout/Register Btn */}
          {authStatus ? (
            <li className="list-none">
              <details
                className="dropdown border-none"
                onClick={() => {
                  document
                    .getElementById("carrot")
                    .classList.toggle("fa-caret-up");
                  document
                    .getElementById("carrot")
                    .classList.toggle("fa-caret-down");
                }}
              >
                <summary className="btn flex px-2 bg-transparent hover:bg-transparent border-none">
                  <i className="fa-solid fa-user lg:text-lg hidden md:flex"></i>
                  <span className="lg:text-lg text-xs font-mono font-medium">
                    {userData.name}
                  </span>
                  <i id="carrot" className="fa-solid fa-caret-down"></i>
                </summary>
                <ul className="menu dropdown-content bg-base-100 border-gray-400 border rounded px-1 z-[1] w-26 p-0 shadow hover:bg-blue-500 duration-100">
                  <li>
                    <LogoutBtn />
                  </li>
                </ul>
              </details>
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
