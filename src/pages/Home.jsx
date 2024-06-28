import React, { useEffect, useState } from "react";
import { dbService } from "../appwrite/dbService";
import { Card, Button } from "../Components/index";
import { Images } from "../img/Images";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    dbService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  return posts && posts.length >= 0 ? (
    <>
      <div className="hero-section">
        <div className="flex w-full flex-wrap  justify-evenly items-center py-4 px-2">
          <div className="img w-[30%] object-contain flex ">
            <img src={Images.image2} alt="img" className="" />
          </div>
          {authStatus ? (
            <div className="w-[40%] flex flex-col gap-3 items-center justify-center">
              <p className="font-mono text-lg font-light">
                Click the btn ⬇ to share a post{" "}
              </p>
              <Button className="bg-green-500 py-1 px-2 font-mono text-gray-50 text-lg">
                <Link to="/add-post">Add Post</Link>
              </Button>
            </div>
          ) : (
            <div className="w-[40%] flex flex-col gap-3 items-center justify-center">
              <p className="font-mono text-sm">
                Please{" "}
                <Link
                  className="font-mono font-semibold text-2xl duration-100 underline"
                  to="/login"
                >
                  Login
                </Link>{" "}
                <span>to add posts</span>
              </p>
              <Button className="bg-gray-600 py-1 px-2 font-mono text-gray-50 btn-disabled">
                Add Post
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full min-h-screen py-4 px-2">
        {authStatus && (
          <h1 className="text-2xl hover:underline font-semibold font-mono text-center mb-4">
            Posts
          </h1>
        )}
        {!authStatus && (
          <>
            <div className="flex items-center justify-center">
              <p className="font-mono text-lg pt-10 ">
                {" "}
                <Link
                  to="/login"
                  className="text-2xl text-red-500 underline font-semibold"
                >
                  Log in
                </Link>
                /
                <Link
                  to="/signup"
                  className="text-2xl text-blue-500 underline font-semibold"
                >
                  Sign up
                </Link>{" "}
                to see <span className="font-semibold text-2xl">Posts</span>
              </p>
            </div>
            <div className="flex items-center justify-center relative">
              <img src={Images.image3} alt="img" className="w-[30%] " />
              <span className=" hover:opacity-[90%] absolute bottom-[89px] left-[593px] bg-red-500 font-mono text-white py-1 px-2 text-xs rounded-full">
                <Link to="/login">Log in</Link>
              </span>
              <span className=" hover:opacity-[90%] absolute bottom-[89px] right-[587px] bg-blue-500 font-mono text-white py-1 px-2 text-xs rounded-full">
                <Link to="/signup">Sign up</Link>
              </span>
            </div>
          </>
        )}
        <div className="w-full grid grid-cols-3 place-items-center h-screen">
          {authStatus &&
            posts?.map((post) => (
              <div key={post.$id} className="">
                <Card {...post} />
              </div>
            ))}
        </div>
      </div>
    </>
  ) : null;
}

export default Home;
