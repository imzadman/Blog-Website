import React from "react";

export function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      {...props}
      className={`${className} py-1 px-3 rounded font-mono duration-100 hover:opacity-[85%] active:text-sm `}
    >
      {children}
    </button>
  );
}

// export default Button;
