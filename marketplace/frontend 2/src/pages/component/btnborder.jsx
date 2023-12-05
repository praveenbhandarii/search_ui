import React from "react";

const Btnborder = ({ children }) => {
  return (
    <button className="font-medium tracking-wide bg-white border-2 border-primarycolor hover:border-secondrycolor hover:text-secondrycolor text-primarycolor px-4 py-1 rounded-full transition-colors duration-200">
      {children}
    </button>
  );
};

export default Btnborder;
