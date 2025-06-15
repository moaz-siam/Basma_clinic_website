"use client";
import React, { useEffect, useState } from "react";
import { MdGroups } from "react-icons/md";
import { MdOutlineGroups } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { CiStar } from "react-icons/ci";
import Link from "next/link";
import ConsultationCard from "@/components/dashboard/consultationCard";
import Image from "next/image";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
import { useDispatch, useSelector } from "react-redux";
import messages from "@/assets/dashboard-img/messages.png";
import { get_Consultations_Doctor } from "@/redux/slice/doctorSlice";

export default function DoctorHomePage() {
  const [consultations_doctor, setConsultations_doctor] = useState([]);
  const { doctor, isLoading } = useSelector((state) => state.doctor);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_Consultations_Doctor()).then((res) =>
      setConsultations_doctor(res?.payload?.data)
    );
  }, [dispatch]);

  
  
  return (
    <div className="w-full">
      <h3 className="text-[25px] font-[600] text-[#212121]">
        أهلاً بك {user?.full_name} 👋🏻!
      </h3>
      <div className="mt-[40px] grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-[24px]">
        <div className="px-[16px] py-[20px] bg-white rounded-[16px] space-y-[5px] shadow-custom">
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#616161] font-[500]">
              عدد المرضى
            </span>
            <MdOutlineGroups className="w-[20px] h-[20px] text-Basic" />
          </div>
          <h3 className="text-[18px] font-bold text-black">{consultations_doctor.length}</h3>
        </div>
        <div className="px-[16px] py-[20px] bg-white rounded-[16px] space-y-[5px] shadow-custom">
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#616161] font-[500]">
              عدد الاستشارات
            </span>
            <TiMessages className="w-[20px] h-[20px] text-Basic" />
          </div>
          <h3 className="text-[18px] font-bold text-black">{consultations_doctor.length}</h3>
        </div>
        <div className="px-[16px] py-[20px] bg-white rounded-[16px] space-y-[5px] shadow-custom">
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#616161] font-[500]">
              عدد التقيمات
            </span>
            <CiStar className="w-[20px] h-[20px] text-Basic" />
          </div>
          <h3 className="text-[18px] font-bold text-black">30 ألف </h3>
        </div>
      </div>
      <div className="mt-[30px]">
        {isLoading ? (
          <div className="space-y-[24px] mt-[24px]">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : consultations_doctor.length === 0 ? (
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
            <div className="w-full flex justify-between items-center mb-[24px]">
              <h3 className="text-[#212121] text-[22px] font-[700]">
                استشاراتك الحالية
              </h3>
              <Link
                href={"/dashboard/doctor/consultation/current"}
                className={` text-Basic text-[14px] font-[500] underline cursor-pointer`}
              >
                عرض الكل
              </Link>
            </div>
            <div className="space-y-[24px]">
              {consultations_doctor.slice(0, 2).map((cons, index) => (
                <div key={index} className=" ">
                  <ConsultationCard consultation={cons} type={"doctor"} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
