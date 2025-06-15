import React from "react";
import TitleTop from "./titleTop";
import { ServicesHomePage } from "@/assets";
import Image from "next/image";

export default function Services() {
  
  return (
    <div className="w-full h-full">
      <div className="mx-auto container py-[32px] px-4">
        <TitleTop
          title1={"خدمات"}
          title2={"تعرف على أبرز خدماتنا"}
          
          Mediation1={"start"}
          Mediation2={"start"}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-[16px] mt-[30px]">
          {ServicesHomePage.map((ele) => (
            <div key={ele.id} className="flex md:flex-row flex-col md:text-start text-center p-[24px] bg-white gap-[10px] rounded-2xl max-w-[600px]">
              <div className="px-[3px] flex justify-center items-center md:block">
                <div className="w-[40px] h-[40px] flex justify-center items-center bg-Basic text-white rounded-full text-[20px] ">
                  <Image src={ele.icon} alt="error icon"/>
                </div>
              </div>
              <div className="">
                <h3 className="text-[20px] font-[700]">{ele.title}</h3>
                <p className="text-[#757575] w-full mt-[6px] text-[14px]">
                  {ele.parg}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
