import React from "react";
import TitleTop from "./titleTop";
import { FeaturessectionTiltle } from "@/assets";
import Image from "next/image";

function Featuressection() {
  return (
    <div className="w-full h-full">
      <div className="mx-auto container py-[32px] px-4">
        <TitleTop
          title1={"مميزات"}
          title2={"مميزات بصمة طبية"}
          Mediation1={"center"}
          Mediation2={"center"}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-[16px] mt-[30px] px-10">
          {FeaturessectionTiltle.map((ele) => (
            <div
              key={ele.id}
              className="flex flex-col text-center p-[24px] bg-white gap-[10px] rounded-2xl max-w-[600px]"
            >
              <div className="px-[3px] flex justify-center items-center">
                <div className="w-[40px] h-[40px] flex justify-center items-center bg-Basic text-white rounded-full text-[20px] ">
                  <Image src={ele.icon} alt="error icon" />
                </div>
              </div>
              <div className="">
                <h3 className="text-[16px] font-[700]">{ele.title}</h3>
                <p className="text-[#757575] w-full mt-[8px] text-[12px]">
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

export default Featuressection;
