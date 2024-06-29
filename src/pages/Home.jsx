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
        <div className="flex flex-col lg:flex-row w-full flex-wrap gap-8 lg:justify-evenly items-center py-4 px-2">
          <div className="img w-[60%] lg:w-[30%] object-contain flex ">
            <img src={Images.image2} alt="img" className="" />
          </div>
          {authStatus ? (
            <div className="w-[40%] flex flex-col gap-3 items-center justify-center">
              <p className="font-mono lg:text-lg font-light text-center">
                Click the btn ⬇ to share a post{" "}
              </p>
              <Button className="bg-green-500 py-1 px-2 font-mono text-gray-50 lg:text-lg">
                <Link to="/add-post">Add Post</Link>
              </Button>
            </div>
          ) : (
            <div className="w-[40%] flex flex-col gap-3 items-center justify-center">
              <p className="font-mono text-center text-sm">
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
            <div className="flex items-center justify-center relative mt-8 lg:mt-2 ">
              <img
                src={Images.image3}
                alt="img"
                className="lg:w-[30%] w-[90%] "
              />
              <span className=" bottom-[58px] left-[50px] lg:bottom-[56px] lg:left-[385px] xl:bottom-[72px] xl:left-[493px]  hover:opacity-[90%] absolute 2xl:bottom-[89px] 2xl:left-[593px] bg-red-500 font-mono text-white py-1 px-2 text-sm rounded-full">
                <Link to="/login">Log in</Link>
              </span>
              <span className=" bottom-[56px] right-[50px] lg:bottom-[56px] lg:right-[380px] xl:bottom-[72px] xl:right-[485px] hover:opacity-[90%] absolute 2xl:bottom-[89px] 2xl:right-[587px] bg-blue-500 font-mono text-white py-1 px-2 text-sm rounded-full">
                <Link to="/signup">Sign up</Link>
              </span>
            </div>
          </>
        )}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 place-items-center h-full">
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
