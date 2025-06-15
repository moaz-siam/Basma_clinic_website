"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import messages from "@/assets/dashboard-img/messages.png";
import Link from "next/link";
import { getConsultations } from "@/redux/slice/patientSlice";
import ConsultationCard from "@/components/dashboard/consultationCard";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";

export default function PatientHomePage() {
  const { user } = useSelector((state) => state.auth);
  const { patient, isLoading } = useSelector((state) => state.patient);
  const [consultations, setConsultations] = useState([]);
  const dispatch = useDispatch();  

  useEffect(() => {
    dispatch(getConsultations()).then((res) =>
      setConsultations(res?.payload?.data)
    );
  }, [dispatch]);
  return (
    <div className="w-full">
      <div className=" container mx-auto">
        <h3 className="text-[25px] font-[600] text-[#212121] mb-[50px]">
          أهلاً بك {user?.full_name || 'test'} 👋🏻!
        </h3>
        {isLoading ? (
          <div className="space-y-[24px] mt-[24px]">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : consultations.length === 0 ? (
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
                لا توجد استشارات مجدولة حاليًا، لكن يمكنك بدء استشارة جديدة
                بسهولة! اختر الخدمة التي تناسبك، وحدد موعدًا مناسبًا، ودع
                خبراءنا يساعدونك
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
            <div className="w-full flex justify-between items-center mb-[24px]">
              <h3 className="text-[#212121] text-[22px] font-[700]">
                استشاراتك الحالية
              </h3>
              <Link
                href={"/dashboard/patient/consultation/current"}
                className={` text-Basic text-[14px] font-[500] underline cursor-pointer`}
              >
                عرض الكل
              </Link>
            </div>
            <div className="space-y-[24px]">
              {consultations.slice(0, 2).map((cons, index) => (
                <div key={index} className=" ">
                  <ConsultationCard type={'patient'} consultation={cons} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
