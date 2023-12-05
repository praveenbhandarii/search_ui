import React from "react";

const BtnFill = ({ children }) => {
  return (
    <button className="font-medium tracking-wide bg-primarycolor text-white px-4 py-1 rounded-full transition-colors duration-200  hover:bg-secondrycolor">
      {children}
    </button>
  );
};

export default BtnFill;
