import React from "react";
import { useId } from "react";
import { forwardRef } from "react";

export const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="font-mono text-sm font-medium">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        className={`${className} rounded outline-none py-1 px-2 bg-transparent border border-gray-300`}
        {...props}
      />
    </div>
  );
});
