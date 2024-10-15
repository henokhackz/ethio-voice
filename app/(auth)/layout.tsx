import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full justify-center items-center p-5">
      {children}
    </div>
  );
};

export default layout;
