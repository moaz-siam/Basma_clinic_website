"use client";

import { useSelector } from "react-redux";
import { LiaEdit } from "react-icons/lia";
import { RiSearch2Line } from "react-icons/ri";

import React, { useEffect, useState } from "react";

export default function SidebarChat() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`w-[350px] bg-[#FFFFFF] ${
        hasScrolled
          ? "h-[calc(100vh-210px)] top-[108px]"
          : "top-[210px] h-[100vh]"
      } fixed  right-0 z-10 shadow-[0px_4px_25px_0px_#A1A1A11A] p-[25px] overflow-scroll`}
    >
      <div className="w-full flex items-center justify-between">
        <h3 className="text-[18px] font-[700] text-[#212121]">
          {user?.full_name}
        </h3>
        <LiaEdit />
      </div>
      <div className="w-full flex items-center rounded-[8px] bg-white shadow-[0px_4px_25px_0px_#A1A1A11A] px-[20px] py-[10px] mt-[15px]">
        <RiSearch2Line className="text-[#E0E0E0]" />
        <input
          type="text"
          className=" focus:outline-none placeholder:text-[#E0E0E0] px-[5px] h-full w-full"
          placeholder="البحث"
        />
      </div>
      <h3 className="text-[15px] text-[#616161] font-[600]">رسائلك</h3>
    </div>
  );
}
