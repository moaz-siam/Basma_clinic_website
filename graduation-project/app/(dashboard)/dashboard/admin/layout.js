"use client";
import HeaderAdmin from "@/components/dashboard/admin/HeaderAdmin";
import SidebarAdmin from "@/components/dashboard/admin/SidebarAdmin";

import { useState } from "react";

export default function LayoutAdmin({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // حالة السايدبار

  return (
    <div className="w-full h-screen relative flex ">
      <SidebarAdmin isOpen={sidebarOpen} setIsopen={setSidebarOpen} />
      <div
        className={`flex-1 flex-col transition-all duration-300 ${
          sidebarOpen ? "md:mr-[255px] mr-0" : "md:mr-[0] mr-0"
        }`}
      >
        <HeaderAdmin isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="px-4 sm:px-6 md:px-10 py-6">{children}</div>
      </div>
    </div>
  );
}
