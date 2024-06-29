import React from "react";
import { storageService } from "../appwrite/storageService";
import { Link } from "react-router-dom";

export function Card({ $id, title, featuredImage }) {
  return (
    <div className=" w-[90vw] h-fit lg:w-[40vw] xl:w-[25vw] py-4 px-4 rounded hover:bg-gray-200 group">
      <Link
        to={`/post/${$id}`}
        className="flex flex-col gap-2 object-contain relative "
      >
        <img
          src={storageService.previewFile(featuredImage)}
          alt={title}
          className="rounded"
        />
        <p className="hover:underline text-center font-mono font-medium">
          {title}
        </p>
        <span className="font-mono text-xs absolute right-1 bottom-2 p-1 duration-100 bg-green-500 text-white  opacity-0 group-hover:opacity-100 group-hover:bottom-9">
          View
        </span>
      </Link>
    </div>
  );
}
