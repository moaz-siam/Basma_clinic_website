"use client";
import Image from "next/image";
import React from "react";
import doctor from "@/assets/doctor-img/doctor1.png";
import { CiCircleMore } from "react-icons/ci";

export default function ConversationHeader() {
  return (
    <div className=" bg-white px-[24px] py-[16px] flex items-center justify-between border-b-[1px] border-[#E0E0E0]">
      <div className="flex gap-[16px]">
        <div className="bg-[#D9D9D9] flex justify-center items-center mx-auto overflow-hidden rounded-full">
          <Image
            src={doctor}
            width={0}
            height={0}
            alt="error img"
            className="w-auto h-[60px]"
          />
        </div>
        <div className="">
          <h3 className="text-[22px] font-[700]">د. جميلة أحمد غازي</h3>
          <span className="text-[15px] text-[#757575] font-[400]">
            غير متصل
          </span>
        </div>
      </div>
      <div className="cursor-pointer">
        <CiCircleMore className="text-[20px] "/>
      </div>
    </div>
  );
}
