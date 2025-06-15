"use client";
import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";

import { CgFileDocument } from "react-icons/cg";
import { LuDownload } from "react-icons/lu";
import Link from "next/link";
export default function PharmacyCard({ data, dispaly_status, link }) {
  const {
    order_id,
    prescription_status,
    prescription_id,
    pdf_url,
    pdf_name,
    main_service,
    sub_service,
    patient_name,
    invoice_id,
  } = data;
  return (
    <div className=" bg-white shadow-custom px-[32px] py-[24px] rounded-[16px] relative flex flex-col gap-2">
      <span className=" font-[700] text-[#212121] text-[20px]">
        {prescription_id}#
      </span>
      <div className="flex items-center gap-2">
        <CiUser />
        <h3 className="text-[#424242] font-[500] text-[14px]">
          المريض : {patient_name}
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <CiCircleInfo />
        <h3 className="text-[#424242] font-[500] text-[14px]">
          المرض: {sub_service}
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
      <Link
        href={
          link == "order"
            ? `/dashboard/pharmacy/received-orders/${prescription_id}`
            : link == "prescriptions"
            ? `/dashboard/pharmacy/prescriptions/${prescription_id}`
            : `/dashboard/pharmacy/bills/${order_id}`
        }
        className="py-[7px] px-[18px] w-fit mt-2 bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
      >
        عرض التفاصيل
      </Link>
      {dispaly_status && (
        <>
          {link == "bills" ? (
            <div
              className={`absolute top-5 left-5 px-[23px] py-[5px] rounded-[8px] ${
                invoice_id !== null
                  ? "bg-[#45B36926] text-[#07BD74]"
                  : invoice_id == null
                  ? "bg-[#FFC10726] text-[#FFC107]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {invoice_id !== null ? "مضافة" : "لم تضاف"}
            </div>
          ) : (
            <div
              className={`absolute top-5 left-5 px-[23px] py-[5px] rounded-[8px] ${
                prescription_status === "تم الصرف"
                  ? "bg-[#45B36926] text-[#07BD74]"
                  : prescription_status === "في انتظار الصرف"
                  ? "bg-[#FFC10726] text-[#FFC107]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {prescription_status}
            </div>
          )}
        </>
      )}
    </div>
  );
}
