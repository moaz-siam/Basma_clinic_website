"use client";
import { ProfileDoctorMenu, ProfileMenu } from "@/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function SidebarProfile({ role, isOpen, setIsOpen }) {
  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index) => setActiveLink(index);
  const pathname = usePathname();

  return (
    <div
      className={`
        fixed top-0 right-0 z-50 h-full bg-white shadow-[0px_4px_25px_0px_#A1A1A11A]
        transition-transform duration-300 ease-in-out w-[250px] p-[20px]
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        md:static md:translate-x-0 md:flex flex-col md:w-[280px] md:h-[calc(100vh-200px)] md:shadow-none
      `}
    >
      <div
        className="md:hidden block flex items-end justify-end cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center">
          x
        </div>
      </div>
      <h3 className="text-[22px] font-[700]">الإعدادات</h3>
      <>
        {role == "patient" ? (
          <div className="flex flex-col items-center space-y-[3px] mt-[20px]">
            {ProfileMenu.map((link, index) => (
              <Link
                // onClick={() => handleLinkClick(index)}
                href={link.path}
                key={link.id}
                className={`w-full flex items-center gap-[10px] py-[7px] px-[10px] duration-200 ease-in-out ${
                  pathname === link.path
                    ? "bg-[#EEF1FF] text-Basic font-[700] rounded-[8px]"
                    : "text-[#212121] font-[500]"
                }`}
              >
                <div>{link.icon}</div>
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        ) : role == "doctor" ? (
          <div className="flex flex-col items-center space-y-[20px] mt-[20px]">
            {ProfileDoctorMenu.map((link, index) => (
              <Link
                // onClick={() => handleLinkClick(index)}
                href={link.path}
                key={link.id}
                className={`w-full flex items-center gap-[10px] py-[7px] px-[10px] duration-200 ease-in-out ${
                  pathname === link.path
                    ? "bg-[#EEF1FF] text-Basic font-[700] rounded-[8px]"
                    : "text-[#212121] font-[500]"
                }`}
              >
                <div>{link.icon}</div>
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        ) : null}
      </>
    </div>
  );
}
