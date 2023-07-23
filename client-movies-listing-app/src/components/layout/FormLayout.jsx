import React from "react";

const FormLayout = ({ children }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="shadows w-[420px] rounded-[10px] bg-white p-[25px] lg:w-[525px]">
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
