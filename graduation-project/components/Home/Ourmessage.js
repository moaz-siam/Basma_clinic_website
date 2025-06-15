import React from "react";
import TitleTop from "./titleTop";
import { RiMessage3Line } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function Ourmessage() {
  return (
    <div className="w-full h-full">
      <div className="mx-auto container py-[32px]  md:px-0 px-4">
        <TitleTop
          title1={"رسالتنا ورؤيتنا"}
          title2={"رؤيتنا ورسالتنا – نحو رعاية صحية "}
          title3={"أفضل"}
          Mediation1={"center"}
          Mediation2={"center"}
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[24px] mt-[36px] w-full px-10">
          <div className="flex md:flex-row flex-col md:text-start text-center p-[24px] bg-white gap-[10px] rounded-2xl max-w-[600px]">
            <div className="px-[3px] flex justify-center items-center md:block">
              <div className="w-[40px] h-[40px] flex justify-center items-center bg-Basic text-white rounded-full text-[20px] ">
                <RiMessage3Line />
              </div>
            </div>
            <div className="">
              <h3 className="text-[20px] font-[700]">رسالتنا</h3>
              <p className="text-[#757575] w-full mt-[6px] md:text-[16px] text-[14px]">
                نسعى لأن نكون المنصة الطبية الرقمية الرائدة في قطاع غزة، حيث
                نقدم معلومات موثوقة، واستشارات طبية متميزة، ونوفر وصولًا سهلاً
                إلى الخدمات الصحية، مما يساهم في تحسين جودة الحياة وتعزيز الوعي
                الصحي للمجتمع.
              </p>
            </div>
          </div>
          <div className="flex md:flex-row flex-col md:text-start text-center p-[24px] bg-white gap-[10px] rounded-2xl max-w-[600px]">
            <div className="px-[3px] flex justify-center items-center md:block">
              <div className="w-[40px] h-[40px] flex justify-center items-center bg-Basic text-white rounded-full text-[20px] ">
              <MdOutlineRemoveRedEye />
              </div>
            </div>
            <div className="">
              <h3 className="text-[20px] font-[700]">رؤيتنا</h3>

              <p className="text-[#757575] w-full mt-[6px] md:text-[16px] text-[14px]">
                نلتزم بتقديم خدمات طبية موثوقة وسهلة الوصول، من خلال ربط المرضى
                بالأطباء المتخصصين، وتوفير محتوى صحي دقيق، وتمكين الأفراد من
                اتخاذ قرارات صحية سليمة، بهدف بناء مجتمع أكثر وعيًا وصحةً.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
