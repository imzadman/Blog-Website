import React from "react";
import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="flex flex-col font-mono items-center justify-center w-full min-h-screen">
      <h1 className="text-2xl font-semibold">
        Hi! Thank You for visiting my page
      </h1>
      <h1>
        I am <span className="font-semibold text-2xl text-red-400">Zaid</span>
      </h1>

      <div className="links">
        <p className="font-mono text-sm">
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
      <p className="font-semibold text-2xl text-center ">Have a nice day!</p>
    </div>
  );
}
