import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { dbService } from "../appwrite/dbService";
import { storageService } from "../appwrite/storageService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button, Select, RTE } from "./index";

export function PostForm({ post }) {
  const { register, handleSubmit, control, watch, setValue, getValues, reset } =
    useForm({
      defaultValues: {
        title: "",
        slug: "",
        content: "",
        status: "public",
      },
    });
  useEffect(() => {
    reset({
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "public",
    });
  }, [reset, post]);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const handler = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;
      if (file) {
        await storageService.deleteFile(post.featuredImage);
      }
      const dbPost = await dbService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await dbService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [setValue, slugTransform, watch]);
  return (
    <div className="w-full py-4 px-2 ">
      <form onSubmit={handleSubmit(handler)} className="flex w-full flex-wrap">
        <div className="first w-[60%] flex flex-col justify-center px-3">
          {/* Title */}
          <Input
            type="text"
            placeholder="Your title"
            label="Title: "
            className="mb-3 "
            {...register("title", {
              required: true,
            })}
          />
          {/* Slug */}
          <Input
            type="text"
            placeholder="Your Slug"
            label="Slug: "
            className="mb-3"
            {...register("slug", {
              required: true,
            })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          {/* RTE */}
          <RTE
            control={control}
            label="Content: "
            name="content"
            defaultValue={getValues("content")}
          />
        </div>
        <div className="second w-[40%] flex flex-col pr-10">
          {/* Image */}
          <Input
            type="file"
            placeholder="Choose a file"
            label="Image: "
            accept="image/*"
            className="mb-3"
            {...register("image", { required: !post })}
          />
          {/*Img Preview */}
          {post && (
            <div className="w-full ">
              <img
                src={storageService.previewFile(post.featuredImage)}
                alt={post.title}
                className="rounded mb-3 w-[50%]"
              />
            </div>
          )}
          {/* Status */}
          <Select
            label="Status: "
            options={["public", "private"]}
            className="mb-3"
            {...register("status", { required: true })}
          />
          {/* Button */}
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className={`${
                post ? "bg-green-500" : "bg-blue-500"
              } text-lg text-gray-50`}
            >
              {post ? "Update" : "Post"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
