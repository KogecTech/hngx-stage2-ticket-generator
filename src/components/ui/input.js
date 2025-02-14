import React from "react";

const Input = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`w-full px-4 py-3 rounded-md border bg-[#07333c] text-white border-[#0e464f] focus:outline-none focus:ring-2 focus:ring-[#23a0b5] ${className}`}
    />
  );
};

export default Input;
