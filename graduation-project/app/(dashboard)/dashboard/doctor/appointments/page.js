"use client";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { get_Consultations_Doctor } from "@/redux/slice/doctorSlice";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const {isLoading} = useSelector((state) => state.doctor)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_Consultations_Doctor()).then((res) => {
      setAppointments(res?.payload?.data);
    });
  }, [dispatch]);

  const filterConsultations = appointments.filter((cons) =>
    cons.status.includes("مجدولة")
  );

  
  
  return (
    <div className="w-full">
      <Breadcrumb
        titleTop={"تفاصيل الموعد"}
        titlesection={"المواعيد الواردة "}
        path={["تفاصيل الموعد"]}
      />
      <div className="w-full flex justify-between items-center my-[40px]">
        <h3 className="text-[#212121] text-[20px] font-[700]">
          المواعيد الواردة
        </h3>
        <Link
          href={""}
          className={` text-Basic text-[14px] font-[500] underline cursor-pointer`}
        >
          عرض الكل
        </Link>
      </div>
      {isLoading ? (
        <SkeletonCard/>
      ) : filterConsultations.length === 0 ? (
        <div className="">
          <div className="flex flex-col items-center justify-center gap-[15px] text-center">
            <IoCalendarOutline className="text-[100px] text-Basic" />
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
        <div className=" w-full flex flex-col gap-[24px]">
          {filterConsultations.length > 0 &&
            filterConsultations.map((ele, index) => (
              <div
                key={index}
                className="bg-white rounded-[16px] shadow-custom px-[40px] py-[25px] w-full flex flex-col items-start gap-[10px] relative"
              >
              {console.log(ele)}
                <span className=" font-[700] text-[#212121] text-[20px]">
                  #{ele.id}
                </span>
                <div className="flex items-center gap-2">
                  <CiUser />
                  <h3 className="text-[#424242] font-[500] text-[14px]">
                    {/* د. {doctor_name_ar} */}
                    المريض : {ele.patient_name_ar}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <BiCategory />
                  <h3 className="text-[#424242] font-[500] text-[14px]">
                    {/* {main_service} ({sub_service}) */}
                    استشارة {ele.main_service} ({ele.sub_service})
                  </h3>
                </div>
                <Link
                  href={`/dashboard/doctor/appointments/${ele.id}`}
                  className="py-[7px] mt-[15px] px-[18px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
                >
                  تفاصيل الموعد
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
