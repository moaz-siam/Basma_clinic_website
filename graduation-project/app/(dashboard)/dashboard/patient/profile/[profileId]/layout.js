"use client";
import Header from "@/components/dashboard/Header";
import SidebarProfile from "@/components/dashboard/profile/sidebar";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import React, { useState } from "react";

export default function LayoutProfile({ children }) {
  const [profilesidebarOpen, setProfileSidebarOpen] = useState(true); // حالة السايدبار

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col h-screen">
        <Header
          logohandle={true}
          isOpen={profilesidebarOpen}
          setIsOpen={setProfileSidebarOpen}
        />
        <div className="px-[50px] mt-[10px]">
          <Breadcrumb
            titleTop={"الحساب الشخصي"}
            titlesection={"الحساب الشخصي"}
          />
        </div>
        <div className=" bg-white flex flex-1 h-[calc(100vh-185px)] overflow-hidden mt-[25px]">
          <SidebarProfile
            role={"patient"}
            isOpen={profilesidebarOpen}
            setIsOpen={setProfileSidebarOpen}
          />
          <div className="p-[30px] flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
