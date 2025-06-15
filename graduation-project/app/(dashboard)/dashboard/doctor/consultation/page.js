"use client";

import Breadcrumb from "@/components/pageProps/Breadcrumb";
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getConsultations } from "@/redux/slice/patientSlice";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
import Image from "next/image";
import Link from "next/link";
import ConsultationCard from "@/components/dashboard/consultationCard";
import messages from "@/assets/dashboard-img/messages.png";
import { get_Consultations_Doctor } from "@/redux/slice/doctorSlice";

export default function ConsultationsReviewPage() {
  const statuslable = ["نشطة", "مجدولة", "مكتملة", "ملغية"];
  const [selectedstatus, setSelectedStatus] = useState({
    status: "نشطة",
    btn: false,
  });
  // const { patient, isLoading } = useSelector((state) => state.patient);
  const isLoading = false;
  const [consultations_doctor, setConsultations_doctor] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_Consultations_Doctor()).then((res) =>
      setConsultations_doctor(res?.payload?.data)
    );
  }, [dispatch]);

  const filterConsultations = consultations_doctor.filter((cons) =>
    cons.status.includes(selectedstatus.status)
  );


  return (
    <div className="w-full">
      <div className=" container mx-auto">
        <Breadcrumb titleTop={"استشاراتي"} titlesection={"استشاراتي"} />
        <div className="mt-[35px]">
          <div className=" flex justify-between items-center w-full md:flex-row flex-col md:gap-0 gap-3">
            <div className="flex flex-wrap gap-2">
              {statuslable.map((ele, index) => (
                <div
                  key={index}
                  className={` rounded-[8px] py-[6px] text-center cursor-pointer duration-300 ease-in-out ${
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
            <div className=" flex items-center shadow-[0px_4px_25px_0px_#A1A1A11A] bg-white rounded-[8px]">
              <button
                className=" flex justify-center items-center gap-[8px] border-l-1 border-[#E0E0E0] px-[44px] py-[6px] text-[18px]cursor-pointer hover:bg-Basic hover:text-white duration-300 ease-in-out"
                onClick={() => setFiltersidenav(true)}
              >
                فلتر
                <CiFilter />
              </button>
              <button className="flex justify-center items-center gap-[8px] px-[16px] py-[6px] text-[18px]  cursor-pointer hover:bg-Basic hover:text-white duration-300 ease-in-out">
                الأطباء المتاحين
                <RiArrowDropDownLine />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          {isLoading ? (
            <div className="space-y-[24px] mt-[24px]">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : filterConsultations.length === 0 ? (
            <div className="w-full mt-[30px]">
              <div className="flex flex-col items-center justify-center gap-[15px] text-center">
                <Image
                  src={messages}
                  width={0}
                  height={0}
                  alt="error img"
                  className="w-auto"
                />
                <h3 className="text-[30px] font-[600] text-[#212121]">
                  لا توجد استشارات لمراجعتها
                </h3>
                <p className="text-[18px] text-[#616161] font-[400] max-w-[881px]">
                  عندما يتم إرسال استشارة من أحد المرضى، ستظهر هنا لتتمكن من
                  مراجعتها والرد عليها
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full mt-[24px]">
              <div className="space-y-[24px]">
                {filterConsultations.map((cons, index) => (
                  <div key={index} className=" ">
                    <ConsultationCard consultation={cons} />
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
