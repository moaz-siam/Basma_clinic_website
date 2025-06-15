"use client";
import React, { useState } from "react";
import { VscSend } from "react-icons/vsc";
import { GoLink } from "react-icons/go";

export default function MessageInput() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className=" bg-[#FFFFFF] flex items-center justify-between gap-[10px] px-[13px] py-[15px] rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] mx-[24px] mb-[18px] mt-[0]">
      <button className="text-[20px] text-[#9E9E9E]">
        <GoLink />
      </button>
      <input
        type="text"
        value={message}
        className=" placeholder:text-[#BDBDBD] focus:outline-none h-full w-full"
        placeholder="اكتب رسالتك هنا.."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className={`p-2 rounded-full transition-colors rotate-180 ${
          message.trim()
            ? "bg-[#5D4FBF] text-white hover:bg-[#4A3DB0] cursor-pointer"
            : "bg-gray-200 text-gray-400"
        }`}
      >
        <VscSend size={20} />
      </button>
    </div>
  );
}
