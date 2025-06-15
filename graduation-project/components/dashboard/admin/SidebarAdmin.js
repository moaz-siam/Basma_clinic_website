"use client";

import Image from "next/image";
import logoFull from "@/assets/Logo.png";
import logoMini from "@/assets/LogoMini.png"; // أضف نسخة مصغرة من اللوغو
import { SideBarAdminLink, SidebarPharmacyLink } from "@/assets";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function SidebarAdmin({ isOpen , setIsopen }) {
    const pathname = usePathname();

  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index) => setActiveLink(index);

  return (
    <div
      className={`bg-[#FFFFFF] flex flex-col fixed top-0 right-0 min-h-screen z-99 shadow-[0px_4px_25px_0px_#A1A1A11A] transition-all duration-300 ease-in-out ${
        isOpen ? "w-[255px] px-[20px] py-[30px]" : "w-[0px] px-[0px] py-[0px]"
      } `}
      dir="rtl"
    >
      {/* زر تصغير السايدبار */}

      <div className="md:hidden flex justify-end items-end cursor-pointer" onClick={() => setIsopen(!isOpen)}>x</div>
      {/* الشعار */}
      <div
        className={`w-full mx-auto flex justify-center items-center ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={logoFull}
          alt="Logo"
          className="h-[56px] w-auto"
          width={0}
          height={0}
        />
      </div>

      {/* روابط القائمة */}
      <div
        className={`flex flex-col items-center gap-[20px] mt-[30px]  ${
          isOpen ? " opacity-100" : "opacity-0"
        }`}
      >
        {SideBarAdminLink.map((link, index) => (
          <Link
            onClick={() => handleLinkClick(index)}
            href={link.path}
            key={link.id}
            className={`w-full flex items-center  gap-[10px] py-[7px] px-[10px] duration-200 ease-in-out ${
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
    </div>
  );
}
