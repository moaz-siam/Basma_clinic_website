"use client";

import Breadcrumb from "@/components/pageProps/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsultations } from "@/redux/slice/patientSlice";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
import Image from "next/image";
import Link from "next/link";
import ConsultationCard from "@/components/dashboard/consultationCard";
import messages from "@/assets/dashboard-img/messages.png";

export default function ConsultationsPage() {
  const statuslable = ["نشطة", "مجدولة", "مكتملة", "ملغية"];
  const [selectedstatus, setSelectedStatus] = useState({
    status: "نشطة",
    btn: false,
  });
  const { patient, isLoading } = useSelector((state) => state.patient);
  const [consultations, setConsultations] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConsultations()).then((res) =>
      setConsultations(res?.payload?.data)
    );
  }, [dispatch]);

  const filterConsultations = consultations.filter((cons) =>
    cons.status.includes(selectedstatus.status)
  );


  return (
    <div className="w-full">
      <div className=" container mx-auto">
        <Breadcrumb titleTop={"استشاراتي"} titlesection={"استشاراتي"} />
        <div className="mt-[35px]">
          <div className="flex justify-between items-center md:flex-row flex-col md:gap-0 gap-5 w-full">
            <div className="flex flex-wrap gap-2">
              {statuslable.map((ele, index) => (
                <div
                  key={index}
                  className={` rounded-[8px] py-[6px] text-center cursor-pointer duration-300 ease-in-out  ${
                    selectedstatus.status == ele
                      ? " bg-Basic text-white font-bold px-[40px]"
                      : " text-Basic px-[16px]"
                  }`}
                  onClick={() => setSelectedStatus({ status: ele, btn: true })}
                >
                  {ele}
                </div>
              ))}
            </div>

            <Link href={'/dashboard/patient/consultation/create'} className="py-[6px] px-[18px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none">
              انشاء استشارة
            </Link>
          </div>
        </div>
        <div className="mt-[24px]">
          {isLoading ? (
            <div className="space-y-[24px] mt-[24px]">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : filterConsultations.length === 0 ? (
            <div className="w-full">
              <h3 className="font-[700] text-[20px] mb-[25px]">
                استشاراتك الحالية
              </h3>
              <div className="flex flex-col items-center justify-center gap-[15px] text-center">
                <Image
                  src={messages}
                  width={0}
                  height={0}
                  alt="error img"
                  className="w-auto"
                />
                <h3 className="text-[30px] font-[600] text-[#212121]">
                  لا توجد استشارات حالية بعد
                </h3>
                <p className="text-[18px] text-[#616161] font-[400] max-w-[881px]">
                  لا توجد استشارات {selectedstatus.status} حاليًا، لكن يمكنك بدء
                  استشارة جديدة بسهولة! اختر الخدمة التي تناسبك، وحدد موعدًا
                  مناسبًا، ودع خبراءنا يساعدونك
                </p>
                <Link
                  href={"/dashboard/patient/consultation/create"}
                  className=" bg-Basic px-[55px] py-[10px] rounded-[8px] font-[700] text-white hover:bg-[#2F247F] duration-300 ease-in-out"
                >
                  ابدأ استشارتك
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full mt-[24px]">
              <div className="space-y-[24px]">
                {filterConsultations.map((cons, index) => (
                  <div key={index} className=" ">
                    <ConsultationCard type={'patient'} consultation={cons} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
