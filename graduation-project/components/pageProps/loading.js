import React from "react";

export default function Loading() {
  return (
    <div className="grid h-[calc(100vh-200px)] w-full place-items-center overflow-x-scroll rounded-lg lg:overflow-visible">
      <div className="loader"></div>
    </div>
  );
}
