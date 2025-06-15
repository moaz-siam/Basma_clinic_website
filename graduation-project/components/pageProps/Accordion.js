"use client";

import { useState } from "react";

export default function Accordion({ title, content }) {
  const [isopen, setIsopen] = useState(false);

  return (
    <div
      className="w-full px-[24px] py-[27px] bg-white shadow-sm rounded-[16px] cursor-pointer"
      onClick={() => setIsopen(!isopen)}
    >
      {/* عنوان الأكورديون */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-[20px] font-[600]">{title}</h2>
        <span className="text-[25px] transition-transform duration-300 ease-in-out">
          {isopen ? "-" : "+"}
        </span>
      </div>

      {/* المحتوى مع الأنميشن */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isopen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[#757575] text-[16px]">{content}</p>
      </div>
    </div>
  );
}
