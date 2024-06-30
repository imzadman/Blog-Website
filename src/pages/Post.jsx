import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dbService } from "../appwrite/dbService";
import { storageService } from "../appwrite/storageService";
import parse from "html-react-parser";
import { Button } from "../Components/index";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const setProgress = useOutletContext().setProgress;

  useEffect(() => {
    setProgress(20);
    if (slug) {
      dbService.getPost(slug).then((post) => {
        setProgress(40);
        if (post) {
          setPost(post);
          setProgress(100);
        } else {
          navigate("/");
          setProgress(100);
        }
      });
    } else {
      navigate("/");
      setProgress(100);
    }
  }, [slug, navigate, setProgress]);
  const deleteHandler = () => {
    setProgress(20);
    dbService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);
        setProgress(40);
        navigate("/");
        setProgress(100);
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
          className="rounded w-[90%] lg:w-[50%] mt-10 lg:mt-0 "
        />
        {/* Button */}
        {isAuthor && (
          <div className="absolute right-0 top-0">
            <Link to={`/edit-post/${post.$id}`}>
              <Button className="bg-green-500 text-white mr-3 text-xs lg:text-[1.1rem] lg:py-2 ">
                Edit
              </Button>
            </Link>
            <Button
              type="submit"
              onClick={deleteHandler}
              className="bg-red-500 text-white text-xs lg:text-[1.1rem] lg:py-2 "
            >
              Delete
            </Button>
          </div>
        )}
        <div className="arrow">
          <p className="absolute top-0 left-0">
            <Link
              to={"/"}
              className="py-1 px-2 font-mono bg-blue-500 hover:opacity-[90%] active:text-xs duration-100 text-gray-50 text-sm rounded"
            >
              Back
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
      <div className="w-full lg:text-center px-2 lg:px-10 font-mono">
        {parse(post.content)}
      </div>
    </div>
  ) : null;
}

export default Post;
