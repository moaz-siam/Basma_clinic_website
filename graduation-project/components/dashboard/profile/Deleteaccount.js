"use client";
import Popup from "@/components/pageProps/Pop";
import React, { useState } from "react";

export default function Deleteaccount() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-[600]">حذف الحساب</h3>
      <div className="mt-[24px] space-y-[16px]">
        <div className="w-full bg-white rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] px-[24px] py-[21px] flex items-center justify-between">
          <h3 className="text-[15px] text-[#424242] font-[600]">
            لم أعد استخدم الموقع
          </h3>
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                className="peer hidden"
                // onChange={() =>
                //   setChecked({
                //     isopen: true,
                //     checkedname: "pal_pay",
                //   })
                // }
                // checked={selected === option.value}
              />
              <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
            </label>
          </div>
        </div>
        <div className="w-full bg-white rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] px-[24px] py-[21px] flex items-center justify-between">
          <h3 className="text-[15px] text-[#424242] font-[600]">
            الموقع لديه بعض المشاكل
          </h3>
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                className="peer hidden"
                // onChange={() =>
                //   setChecked({
                //     isopen: true,
                //     checkedname: "pal_pay",
                //   })
                // }
                // checked={selected === option.value}
              />
              <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
            </label>
          </div>
        </div>
        <div className="w-full bg-white rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] px-[24px] py-[21px] flex items-center justify-between">
          <h3 className="text-[15px] text-[#424242] font-[600]">
            مخاوف تتعلق بالخصوصية
          </h3>
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                className="peer hidden"
                // onChange={() =>
                //   setChecked({
                //     isopen: true,
                //     checkedname: "pal_pay",
                //   })
                // }
                // checked={selected === option.value}
              />
              <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
            </label>
          </div>
        </div>
        <div className="w-full bg-white rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] px-[24px] py-[21px] flex items-center justify-between">
          <h3 className="text-[15px] text-[#424242] font-[600]">
            أفضل عدم ذكر السبب
          </h3>
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                className="peer hidden"
                // onChange={() =>
                //   setChecked({
                //     isopen: true,
                //     checkedname: "pal_pay",
                //   })
                // }
                // checked={selected === option.value}
              />
              <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
            </label>
          </div>
        </div>
        <div className="w-full bg-white rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] px-[24px] py-[21px] flex items-center justify-between">
          <h3 className="text-[15px] text-[#424242] font-[600]">شي أخر</h3>
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                className="peer hidden"
                // onChange={() =>
                //   setChecked({
                //     isopen: true,
                //     checkedname: "pal_pay",
                //   })
                // }
                // checked={selected === option.value}
              />
              <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
            </label>
          </div>
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className=" bg-Basic focus:outline-none rounded-[8px] py-[9px] font-[600] text-[14px] w-full text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
        >
          حذف الحساب
        </button>
      </div>
      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} width={"538px"}>
          <div className=" text-center space-y-[10px] w-full">
            <h3 className="text-[24px] font-[700] text-[#212121]">
              هل أنت متأكد من حذف الحساب؟
            </h3>
            <p className="text-[16px] font-[400] text-[#616161]">
              سيتم حذف جميع البيانات من خدمتنا، بما في ذلك ملفك الشخصي ومعلوماتك
              وصورتك ومراجعاتك.
            </p>
            <button className=" focus:outline-none text-[#F75555] text-[22px] border-y-[1px] py-[12px] border-[#E0E0E0] w-full cursor-pointer">
              حذف
            </button>
            <button onClick={() => setIsPopupOpen(false)} className=" focus:outline-none text-[22px] text-[#9E9E9E] w-full cursor-pointer">
              الغاء
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
}
