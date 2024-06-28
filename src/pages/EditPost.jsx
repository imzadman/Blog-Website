import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { dbService } from "../appwrite/dbService";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../Components/index";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
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
  return (
    <div className="w-full">
      <PostForm post={post} />
    </div>
  );
}

export default EditPost;
