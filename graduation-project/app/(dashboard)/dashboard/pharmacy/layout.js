"use client";
import HeaderDoctor from "@/components/dashboard/doctordash/HeaderDoctor";
import SidebarDoctor from "@/components/dashboard/doctordash/SidebarDoctor";
import Header from "@/components/dashboard/Header";
import HeaderPharmacy from "@/components/dashboard/pharmacydash/HeaderPharmacy";
import SidebarPharmacy from "@/components/dashboard/pharmacydash/SidebarPharmacy";
import { checkAuth } from "@/redux/slice/authSlice";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LayoutPharmacy({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // حالة السايدبار

  return (
    <div className="w-full min-h-screen relative flex">
      <SidebarPharmacy isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div
        className={`flex-1 flex-col transition-all duration-300 ${
          sidebarOpen ? " md:mr-[255px]" : "md:mr-[120px]"
        } mr-0`}
      >
        <HeaderPharmacy isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="md:px-[50px] px-[30px]">{children}</div>
      </div>
    </div>
  );
}
