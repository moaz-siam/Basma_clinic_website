"use client";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import React, { useState } from "react";
import Notifications from "@/assets/dashboard-img/Notifications.png";
import Image from "next/image";
import { MdOutlineNotificationsActive } from "react-icons/md";

export default function NotificationDoctorPage() {
  const [data, setData] = useState(["1"]);
  return (
    <div className="w-full h-full">
      <Breadcrumb titleTop={"الاشعارات"} titlesection={"الاشعارات"} />
      {data.length === 0 ? (
        <div className="flex items-center justify-center flex-col h-[calc(100vh-250px)]">
          <Image
            src={Notifications}
            alt="error img"
            width={0}
            height={0}
            className="w-auto h-[190px]"
          />
          <h3 className="text-[18px] text-[#212121] font-[600]">
            لا يوجد لديك اشعارات بالوقت الحالي
          </h3>
        </div>
      ) : (
        <div className=" space-y-[18px] mt-[24px]">
          <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex items-start justify-between rounded-[16px]">
            <div className="flex items-center gap-2">
              <div className="w-[40px] h-[40px] bg-[#E0E6FF] text-Basic flex items-center justify-center rounded-full text-[20px]">
                <MdOutlineNotificationsActive />
              </div>
              <div className=" space-y-[5px]">
                <h3 className=" text-[15px] font-bold text-black">طرق الدفع</h3>
                <p className=" text-[13px] text-[#616161]">
                  تم ربط حسابك البنكي بالموقع بنجاح
                </p>
              </div>
            </div>
            <div className="">
              <p className=" text-[15px] text-[#9E9E9E]">3 ساعات</p>
            </div>
          </div>
          <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex items-start justify-between rounded-[16px]">
            <div className="flex items-center gap-2">
              <div className="w-[40px] h-[40px] bg-[#E0E6FF] text-Basic flex items-center justify-center rounded-full text-[20px]">
                <MdOutlineNotificationsActive />
              </div>
              <div className=" space-y-[5px]">
                <h3 className=" text-[15px] font-bold text-black">طرق الدفع</h3>
                <p className=" text-[13px] text-[#616161]">
                  تم ربط حسابك البنكي بالموقع بنجاح
                </p>
              </div>
            </div>
            <div className="">
              <p className=" text-[15px] text-[#9E9E9E]">3 ساعات</p>
            </div>
          </div>
          <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex items-start justify-between rounded-[16px]">
            <div className="flex items-center gap-2">
              <div className="w-[40px] h-[40px] bg-[#E0E6FF] text-Basic flex items-center justify-center rounded-full text-[20px]">
                <MdOutlineNotificationsActive />
              </div>
              <div className=" space-y-[5px]">
                <h3 className=" text-[15px] font-bold text-black">طرق الدفع</h3>
                <p className=" text-[13px] text-[#616161]">
                  تم ربط حسابك البنكي بالموقع بنجاح
                </p>
              </div>
            </div>
            <div className="">
              <p className=" text-[15px] text-[#9E9E9E]">3 ساعات</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
