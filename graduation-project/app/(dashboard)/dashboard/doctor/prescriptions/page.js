"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Link from "next/link";
import { CgFileDocument } from "react-icons/cg";
import { CiUser } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { LuDownload } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { get_status_prescriptions } from "@/redux/slice/patientSlice";
import Loading from "@/components/pageProps/loading";

const PrescriptionsCard = ({ prescriptions }) => {
  const {
    id,
    patinet_name,
    main_service,
    sub_service,
    prescription_status,
    pdf_name,
    pdf_url,
  } = prescriptions;
  return (
    <div className="">
      <div className="bg-white px-[40px] py-[32px] space-y-1 rounded-[16px] shadow-custom relative">
        <span className=" font-[700] text-[#212121] text-[20px]">{id}#</span>
        <div className="flex items-center gap-2">
          <CiUser className="w-[20px] h-[20px] " />
          <h3 className="text-[#424242] font-[500] text-[14px]">
            المريض: {patinet_name}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <BiCategory className="w-[20px] h-[20px] " />
          <h3 className="text-[#424242] font-[500] text-[14px]">
            {main_service} ({sub_service})
          </h3>
        </div>
        {pdf_url ? (
          <div className="flex items-center gap-1">
            <CgFileDocument className="w-[20px] h-[20px] " />
            <div className="flex items-center gap-2">
              <h3 className="text-[#424242] font-[500] text-[14px] ">
                {pdf_name}
              </h3>
              <div className="flex items-center gap-1 text-Basic text-[14px] cursor-pointer">
                <span className=" underline">تحميل</span>
                <LuDownload />
              </div>
            </div>
          </div>
        ) : null}
        <div
          className={`absolute top-5 left-5 px-[23px] py-[5px] rounded-[8px] ${
            prescription_status === "تم الصرف"
              ? "bg-[#45B36926] text-[#07BD74]"
              : prescription_status === "في انتظار الصرف"
              ? "bg-[#FFC10726] text-[#FFC107]"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {prescription_status || 'لم يطلب'}
        </div>
      </div>
    </div>
  );
};

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState(["1"]);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(get_status_prescriptions()).then((res) => {
      if (res?.payload?.success) {
        setPrescriptions(res.payload.data);
      }
    });
  }, [dispatch]);

  
  

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <Breadcrumb titleTop={"الوصفات الطبية"} titlesection={"الوصفات الطبية"} />
      <div className="mt-[40px]">
        <div className="w-full flex justify-between items-center mb-[24px]">
          <h3 className="text-[#212121] text-[20px] font-[700]">
            الوصفات الطبية للمرضى
          </h3>
          <Link
            href={""}
            className={` text-Basic text-[14px] font-[500] underline cursor-pointer`}
          >
            عرض الكل
          </Link>
        </div>
        {prescriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-[15px] text-center">
            <CgFileDocument className=" text-Basic w-40 h-40" />
            <h3 className="text-[30px] font-[600] text-[#212121]">
              لا توجد وصفات طبية حالياً
            </h3>
            <p className="text-[18px] text-[#616161] font-[400] max-w-[881px]">
              سيتم عرض الوصفات الطبية هنا عند توفر بيانات المرضى والخدمات.
            </p>
          </div>
        ) : (
          <div className="mt-[32px] grid md:grid-cols-2 grid-cols-1 gap-[32px]">
            {prescriptions.map((ele, index) => (
              <PrescriptionsCard key={index} prescriptions={ele} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
