import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { dbService } from "../appwrite/dbService";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../Components/index";
import { useOutletContext } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const setProgress = useOutletContext().setProgress;

  useEffect(() => {
    setProgress(20);
    if (slug) {
      dbService.getPost(slug).then((post) => {
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
  return (
    <div className="w-full">
      <PostForm post={post} />
    </div>
  );
}

export default EditPost;
