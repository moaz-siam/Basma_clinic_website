"use client";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { get_medical_points } from "@/redux/slice/patientSlice";
import Loading from "@/components/pageProps/loading";
export default function MedicalpointsPage() {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.patient);
  const [medicalpoints, setMedicalpoints] = useState([]);
  useEffect(() => {
    dispatch(get_medical_points()).then((res) => {
      if (res?.payload?.success) {
        setMedicalpoints(res?.payload?.data);
      }
    });
  }, [dispatch]);
  
  

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-500">{isError}</p>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <Breadcrumb titleTop={"النقاط الطبية"} titlesection={"النقاط الطبية"} />
        <div className=" flex justify-between items-center mt-[40px]">
          <button className=" flex justify-center items-center gap-[8px] px-[40px] py-[8px] bg-white rounded-lg text-[18px] shadow-md cursor-pointer hover:bg-Basic hover:text-white duration-300 ease-in-out">
            فلتر
            <CiFilter />
          </button>
          <button className="flex justify-center items-center gap-[8px] px-[16px] py-[8px] bg-white rounded-lg text-[18px] shadow-md cursor-pointer hover:bg-Basic hover:text-white duration-300 ease-in-out">
            الأطباء المتاحين
            <RiArrowDropDownLine />
          </button>
        </div>
        <div className="mt-[32px] grid md:grid-cols-2 grid-cols-1 gap-[16px]">
          {medicalpoints.map((ele) => (
            <div
              key={ele.id}
              className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex items-center justify-between rounded-[16px]"
            >
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] bg-[#E0E6FF] text-Basic flex items-center justify-center rounded-full">
                  <IoLocationOutline />
                </div>
                <div className=" space-y-[5px]">
                  <h3 className=" text-[15px] font-bold text-black">
                    {ele.name}
                  </h3>
                  <p className=" text-[13px] text-[#616161]">{ele.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
