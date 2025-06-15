"use client";
import PharmacyCard from "@/components/dashboard/pharmacyCard";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Loading from "@/components/pageProps/loading";
import { get_prescriptions } from "@/redux/slice/pharmacySlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const { isLoading } = useSelector((state) => state.pharmacy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_prescriptions()).then((res) => {
      if (res?.payload?.success) {
        setPrescriptions(res?.payload?.data);
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
          <div className="my-[32px] grid md:grid-cols-2 grid-cols-1 gap-[24px]">
            {prescriptions.map((ele, index) => (
              <PharmacyCard key={index} data={ele} dispaly_status={true} link={'prescriptions'} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
