import React from "react";
import { useId } from "react";
import { forwardRef } from "react";

export const Select = forwardRef(function Select(
  { label, options = [], className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 font-mono text-sm">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={`${className} flex p-1 rounded font-mono bg-transparent border border-gray-300 cursor-pointer`}
      >
        {options.map((option) => (
          <option
            className=" p-1 rounded hover:bg-blue-400 duration-100 active:opacity-[70%] hover:text-white"
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});
