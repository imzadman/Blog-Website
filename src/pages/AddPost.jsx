import React, { useEffect } from "react";
import { PostForm } from "../Components/index";
import { useOutletContext } from "react-router-dom";

function AddPost() {
  const setProgress = useOutletContext().setProgress;
  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  return (
    <div className="w-full">
      <PostForm />
    </div>
  );
}

export default AddPost;
