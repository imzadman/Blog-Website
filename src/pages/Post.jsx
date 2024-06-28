import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dbService } from "../appwrite/dbService";
import { storageService } from "../appwrite/storageService";
import parse from "html-react-parser";
import { Button } from "../Components/index";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  useEffect(() => {
    if (slug) {
      dbService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  const deleteHandler = () => {
    dbService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="w-full py-4 px-2 flex flex-col gap-4">
      {/* image */}
      <div className="w-full flex items-center justify-center object-contain relative">
        <img
          src={storageService.previewFile(post.featuredImage)}
          alt={post.title}
          className="rounded w-[50%] "
        />
        {/* Button */}
        {isAuthor && (
          <div className="absolute right-6 top-0">
            <Link to={`/edit-post/${post.$id}`}>
              <Button className="bg-green-500 text-white mr-3">Edit</Button>
            </Link>
            <Button
              type="submit"
              onClick={deleteHandler}
              className="bg-red-500 text-white"
            >
              Delete
            </Button>
          </div>
        )}
        <div className="arrow">
          <p className="absolute top-0 left-6">
            <Link
              to={"/"}
              className="py-1 px-2 font-mono bg-blue-500 hover:opacity-[90%] active:text-xs duration-100 text-gray-50 text-sm rounded"
            >
              Go to Homepage
            </Link>
          </p>
        </div>
      </div>
      {/* Title */}
      <div className="w-full text-center font-mono font-semibold text-2xl hover:underline">
        <Link
          to="https://www.google.com/search?client=firefox-b-d&q=superman"
          target="main"
        >
          {post.title}
        </Link>
      </div>
      {/* Content */}
      <div className="w-full text-center px-10 font-mono">
        {parse(post.content)}
      </div>
    </div>
  ) : null;
}

export default Post;
