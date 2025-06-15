"use client";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { checkAuth } from "@/redux/slice/authSlice";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LayoutPatient({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // حالة السايدبار
  const pathname = usePathname();

  const isProfilePage =
    pathname.startsWith("/dashboard/patient/profile") ||
    pathname.startsWith("/dashboard/patient/chat");

  if (isProfilePage) {
    return <>{children}</>;
  }

  return (
    <div className="w-full h-screen relative flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div
        className={`flex-1 flex-col transition-all duration-300 ${
          sidebarOpen ? "md:mr-[255px]" : "md:mr-[120px]"
        } mr-0`}
      >
        <Header isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="md:px-[50px] px-[25px] w-full">{children}</div>
      </div>
    </div>
  );
}
