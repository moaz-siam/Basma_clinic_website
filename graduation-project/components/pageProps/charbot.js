"use client";
import React, { useState } from "react";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { SlEarphonesAlt } from "react-icons/sl";
import { TbSend } from "react-icons/tb";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div
      className={`fixed left-0 bottom-0 z-50 ${
        isOpen ? "bg-[#00000080] w-full h-full" : ""
      }`}
    >
      <div className="fixed left-18 bottom-10">
        <div className="flex flex-col items-end">
          {isOpen && (
            <div className="w-[343px] ml-[50px]  transition-all duration-300 ease-in-out transform animate-fade-in-up">
              {/* Header */}
              <div className="bg-Basic flex items-center px-6 py-3 gap-2 rounded-t-2xl">
                <div className="flex items-center justify-center w-10 h-10 bg-white text-Basic rounded-full">
                  <SlEarphonesAlt />
                </div>
                <div>
                  <h3 className="text-sm text-white">لايف شات</h3>
                  <p className="text-xs text-white">
                    أنت الآن تتحدث مع فريق الدعم
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="bg-[#F5F5F5] p-[16px] w-full">
                <h3 className="text-[#9E9E9E] text-[14px] text-center">
                  اليوم
                </h3>
              </div>
              {/* send message */}
              <div className="bg-white p-2 rounded-b-2xl">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full focus:outline-none bg-gray-200 placeholder-gray-400 px-4 py-3 rounded-md"
                    placeholder="اكتب رسالتك ..."
                  />
                  <button
                    className="absolute left-2 top-4 cursor-pointer"
                    aria-label="Send message"
                  >
                    <TbSend className="text-gray-400 text-xl" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Toggle Button */}
          <div
            className="w-12 h-12 flex items-center justify-center bg-Basic rounded-full text-white cursor-pointer mt-5
             transition-all duration-300 ease-in-out 
             hover:scale-110 hover:shadow-lg active:scale-95 animate-pop"
            onClick={toggleChat}
            aria-label={isOpen ? "Close Chat" : "Open Chat"}
          >
            {isOpen ? (
              <IoIosClose className="text-2xl" />
            ) : (
              <HiOutlineChatBubbleLeftRight className="text-xl" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
