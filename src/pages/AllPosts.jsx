import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "../appwrite/dbService";
import { Card } from "../Components/index";
import { useOutletContext } from "react-router-dom";

function AllPosts() {
  const setProgress = useOutletContext().setProgress;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setProgress(20);
    dbService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setProgress(100);
      }
    });
  }, []);
  return posts && posts.length > 0 ? (
    <div className="w-full min-h-full py-4 px-2">
      <h1 className="text-xl hover:underline font-semibold font-mono text-center mb-4">
        All Posts
      </h1>
      <div className="w-full flex gap-4 flex-wrap justify-center h-full">
        {posts.map((post) => (
          <div key={post.$id} className="">
            <Card {...post} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex items-center justify-center ">
        <p className="font-mono text-xl font-medium">
          <span className="loading loading-infinity loading-lg"></span>
        </p>
      </div>
    </div>
  );
}

export default AllPosts;
