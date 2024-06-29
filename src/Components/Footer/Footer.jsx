import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full">
      <div className="main flex flex-col py-4 px-2">
        <div className="footer1 flex flex-wrap items-center justify-around">
          <div className="logo mb-4 lg:mb-0 ">
            <Link
              to="/"
              className="font-semibold text-zinc-800"
              style={{ fontFamily: "cursive" }}
            >
              Blog with Appwrite
            </Link>
          </div>
          <div className="second flex gap-2">
            <ul className="list-none font-mono text-sm text-center">
              <li className="hover:text-blue-400 duration-100">
                <Link to="/" className="hover:text-blue-400 duration-100">
                  Company
                </Link>
              </li>
              <li className="hover:text-blue-400 duration-100">
                <Link to="/" className="hover:text-blue-400 duration-100">
                  Features
                </Link>
              </li>
              <li className="hover:text-blue-400 duration-100">
                <Link to="/" className="hover:text-blue-400 duration-100">
                  Pricing
                </Link>
              </li>
            </ul>
            <ul className="list-none font-mono text-sm text-center">
              <li className="hover:text-blue-400 duration-100">
                <Link to="/" className="hover:text-blue-400 duration-100">
                  Affiliate Program
                </Link>
              </li>
              <li className="hover:text-blue-400 duration-100">
                <Link to="/" className="hover:text-blue-400 duration-100">
                  Press Kit
                </Link>
              </li>
              <li className="hover:text-blue-400 duration-100">
                <Link to="/" className="hover:text-blue-400 duration-100">
                  Support
                </Link>
              </li>
            </ul>
            <ul className="list-none font-mono text-sm text-center">
              <li className="hover:text-blue-400 duration-100">
                <Link to="/" className="hover:text-blue-400 duration-100">
                  Account
                </Link>
              </li>
              <li className="hover:text-blue-400 duration-100">
                <Link to="/" className="hover:text-blue-400 duration-100">
                  Help
                </Link>
              </li>
              <li className="hover:text-blue-400 duration-100">
                <Link to="/" className="hover:text-blue-400 duration-100">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="mx-8 text-center my-2 text-gray-600" />

        <div className="footer2">
          <p className="text-center font-mono text-sm">
            You can visit me on these&nbsp;→&nbsp;
            <Link to={"https://www.instagram.com/imzadman/"} target="main">
              <i className="fa-brands fa-instagram text-lg hover:text-blue-500 duration-100"></i>
            </Link>
            &nbsp;
            <Link to={"https://x.com/imzadman"} target="main">
              <i className="fa-brands fa-twitter text-lg hover:text-blue-500 duration-100"></i>
            </Link>
            &nbsp;
            <Link to={"https://github.com/imzadman"} target="main">
              <i className="fa-brands fa-github text-lg hover:text-blue-500 duration-100"></i>
            </Link>
            &nbsp;
          </p>
        </div>
        <hr className="mx-8 text-center my-2 text-gray-600" />

        <div className="footer3">
          <p className="text-sm text-center font-mono py-2">
            © Copyright 2024: All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
