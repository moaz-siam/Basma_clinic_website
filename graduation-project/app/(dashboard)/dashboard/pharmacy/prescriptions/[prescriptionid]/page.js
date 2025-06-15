"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import test_med from "@/assets/dashboard-img/test_med.png";
import Image from "next/image";
import { CgFileDocument } from "react-icons/cg";
import { LuDownload } from "react-icons/lu";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/pageProps/loading";
import { useParams } from "next/navigation";
import { get_prescriptions_details } from "@/redux/slice/pharmacySlice";
import { formatFullArabicDate } from "@/components/pageProps/FormatedDT";
import { CiUser } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
export default function PrescriptionIdPage() {
  const { prescriptionid } = useParams();
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.pharmacy);

  useEffect(() => {
    dispatch(get_prescriptions_details(prescriptionid)).then((res) => {
      if (res?.payload?.success) {
        setPrescriptionDetails(res?.payload?.data[0]);
      }
    });
  }, [dispatch, prescriptionid]);
  

  const date = formatFullArabicDate(prescriptionDetails.created_at);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>لا يوجد وثفةة طبية بهذا الرقم !!!</p>;
  }
  return (
    <div className="w-full">
      <Breadcrumb
        titleTop={"تفاصيل الوصفة"}
        titlesection={"الوصفات الطبية"}
        path={["تفاصيل الوصفة"]}
      />
      <div className="my-[30px]">
        <div className="w-full flex justify-between items-center mt-[24px]">
          <h3 className=" text-[#483535] text-[22px] font-[700]">
            {prescriptionDetails.id}#
          </h3>
          <span className="text-[#616161] text-[17px]">{date}</span>
        </div>
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">المريض</h3>
          <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-custom  px-[24px] py-[26px] space-y-[5px] relative w-full">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CiUser />
                <h3 className="text-[#424242] font-[500] text-[14px]">
                  المريض : {prescriptionDetails.patient_name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <CiCircleInfo />
                <h3 className="text-[#424242] font-[500] text-[14px]">
                  المرض: {prescriptionDetails.sub_service}
                </h3>
              </div>
            </div>
            <div
              className={`absolute top-5 left-5 px-[23px] py-[5px] rounded-[8px] ${
                prescriptionDetails.prescription_status === "تم الصرف"
                  ? "bg-[#45B36926] text-[#07BD74]"
                  : prescriptionDetails.prescription_status ===
                    "في انتظار الصرف"
                  ? "bg-[#FFC10726] text-[#FFC107]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {prescriptionDetails.prescription_status}
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">
            الطبيب المشرف
          </h3>
          <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-custom  px-[24px] py-[26px] space-y-[5px] relative flex justify-between items-center w-full">
            <div className="flex items-center gap-[16px]">
              <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#EEF1FF] text-Basic text-[18px] font-[500]">
                <FaUserDoctor />
              </div>
              <div className=" space-y-[5px]">
                <h3 className=" text-[15px] font-[700] text-[#212121]">
                  د. {prescriptionDetails.doctor_name}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">
            الادوية الموصوفة
          </h3>
          <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-custom  px-[24px] py-[26px] gap-[5px] relative w-full">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              {prescriptionDetails?.prescription_items?.map((ele, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-[16px]"
                >
                  <div className="bg-[#F5F5F5] flex items-center justify-center">
                    <Image
                      src={test_med}
                      className="w-auto h-[100px] object-cover"
                      alt="error"
                      width={0}
                      height={0}
                    />
                  </div>
                  <div className=" space-y-[5px] my-[10px]">
                    <h3 className="text-[15px] font-[700] text-[#212121]">
                      {ele.name}
                    </h3>
                    <p className="text-[13px] text-[#757575] font-[400]">
                      {ele.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">
            الوصفة الطبية
          </h3>
          <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-custom  px-[24px] py-[26px] relative w-full">
            {prescriptionDetails.pdf_url ? (
              <div className="flex items-center gap-1">
                <CgFileDocument className="w-[20px] h-[20px] " />
                <div className="flex items-center gap-2">
                  <h3 className="text-[#424242] font-[500] text-[14px] ">
                    {prescriptionDetails.pdf_name}
                  </h3>
                  <div className="flex items-center gap-1 text-Basic text-[14px] cursor-pointer">
                    <span className=" underline">تحميل</span>
                    <LuDownload />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
