"use client";

import Image from "next/image";
import logoFull from "@/assets/Logo.png";
import logoMini from "@/assets/LogoMini.png"; // أضف نسخة مصغرة من اللوغو
import { SidebarPatientLink } from "@/assets";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar({ setIsOpen, isOpen }) {
  const [activeLink, setActiveLink] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const handleLinkClick = (index) => setActiveLink(index);

  const handlechange = () => {
    setCollapsed(!collapsed);
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-[#FFFFFF] flex flex-col fixed top-0 right-0 h-screen z-99 shadow-[0px_4px_25px_0px_#A1A1A11A] transition-all duration-300 ease-in-out ${
        collapsed ? "w-[120px]" : "w-[255px]"
      } px-[20px] py-[30px] ${isOpen ? "block" : "hidden"} md:block`}
    >
      {/* زر تصغير السايدبار */}
      <div className="relative w-full h-[30px] mb-4">
        <button
          onClick={handlechange}
          className="text-2xl absolute left-0 top-0 cursor-pointer"
        >
          {collapsed ? "☰" : "×"}
        </button>
      </div>

      {/* الشعار */}
      <div className="w-full mx-auto flex justify-center items-center">
        <Image
          src={collapsed ? logoMini : logoFull}
          alt="Logo"
          className="h-[56px] w-auto"
          width={0}
          height={0}
        />
      </div>

      {/* روابط القائمة */}
      <div className="flex flex-col items-center gap-[20px] mt-[30px]">
        {SidebarPatientLink.map((link, index) => (
          <Link
            onClick={() => handleLinkClick(index)}
            href={link.path}
            key={link.id}
            className={`w-full flex items-center ${
              collapsed ? "justify-center" : ""
            } gap-[10px] py-[7px] px-[10px] duration-200 ease-in-out ${
              activeLink === index
                ? "bg-[#EEF1FF] text-Basic font-[700] rounded-[8px]"
                : "text-[#212121] font-[500]"
            }`}
          >
            <div>{link.icon}</div>
            {!collapsed && <span>{link.title}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
