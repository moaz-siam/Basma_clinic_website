import Header from "@/components/dashboard/Header";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import React from "react";

export default function LayoutChatPage({ children }) {
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col h-screen">
        <div className="">
          <Header logohandle={true} />
          <div className="px-[50px] mt-[10px]">
            <Breadcrumb titleTop={"الرسائل"} titlesection={"الرسائل"} />
          </div>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
