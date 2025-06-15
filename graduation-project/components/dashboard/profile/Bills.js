"use client";
import React, { useState } from "react";
import { LuTicket } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import palpay_logo from "@/assets/dashboard-img/palpay.png";
import Image from "next/image";
export default function Bills() {
  const [data, setData] = useState(["2"]);
  const [billpage, setBillpage] = useState(false);
  return (
    <div className="w-full">
      {data.length === 0 && billpage == false ? (
        <div className="flex items-center justify-center flex-col gap-[10px]">
          <LuTicket className="text-[150px] text-Basic" />
          <h3 className="text-[24px] text-[#212121] font-[600]">
            لا يوجد فواتير حاليًا
          </h3>
          <p className="text-[18px] text-[#616161] font-[400] max-w-[675px]">
            يبدو أنه لا توجد فواتير في الوقت الحالي. يمكنك متابعة المعاملات
            القادمة أو إضافة فواتير جديدة لتبدأ المتابعة.
          </p>
        </div>
      ) : data.length > 0 && billpage == false ? (
        <div className="w-full">
          <h3 className="text-[18px] font-[700] ">الفواتير</h3>
          <div className="w-full mt-[24px]">
            <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-[16px] relative">
              <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-[10px] w-full">
                <div className=" space-y-[10px]">
                  <h1 className="text-[15px] text-[#212121] font-[600]">
                    إعادة طلب دواء
                  </h1>
                  <span className="text-[#757575] text-[13px] font-[500]">
                    بروفين - 400 مل
                  </span>
                </div>
                <div className=" space-y-[10px] w-full col-span-2">
                  <h1 className="text-[15px] text-[#4e1b1b] font-[600]">
                    التاريخ
                  </h1>
                  <span className="text-[#757575] text-[13px] font-[500]">
                    الخميس، 17 أبريل 2025 الساعة 16:28 بتوقيت غزة (GMT+2)
                  </span>
                </div>
                <div className=" space-y-[10px]">
                  <h1 className="text-[15px] text-[#212121] font-[600]">
                    المبلغ الإجمالي
                  </h1>
                  <span className="text-[#757575] text-[13px] font-[500]">
                    75 شيكل
                  </span>
                </div>
                <div className=" space-y-[10px]">
                  <h1 className="text-[15px] text-[#212121] font-[600]">
                    طريقة الدفع
                  </h1>
                  <span className="text-[#757575] text-[13px] font-[500]">
                    **** **** **** 4111
                  </span>
                </div>
                <div className=" space-y-[10px] flex flex-col justify-end">
                  <button
                    onClick={() => setBillpage(true)}
                    className=" bg-Basic focus:outline-none rounded-[8px] w-full py-[9px] font-[600] text-[14px] text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
                  >
                    عرض الفاتورة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {billpage && (
        <div className="w-full">
          <h3 className="text-[18px] font-[700] text-[#424242]">
            رقم الفاتورة <span className=" text-Basic">#123456789</span>{" "}
          </h3>
          <div className="flex flex-col gap-[8px] mt-[24px]">
            <div className="flex gap-[75px]">
              <span className="text-[16px] text-[#9E9E9E] font-[500]">
                تاريخ الإصدار:
              </span>
              <span className="text-[16px] text-[#9E9E9E] font-[500]">
                تاريخ الاستحقاق:
              </span>
            </div>
            <div className="flex gap-[75px]">
              <span className="text-[14px] text-[#424242] font-[500]">
                17 أبريل 2025
              </span>
              <span className="text-[14px] text-[#424242] font-[500]">
                31 أبريل 2025
              </span>
            </div>
          </div>
          <div className="flex  gap-[95px] mt-[24px]">
            <div className="flex flex-col gap-[8px]">
              <span className="text-[12px] text-[#9E9E9E] font-[500]">
                صادرة من:
              </span>
              <h3 className="text-[16px] text-[#424242] font-[500]">
                بصمة طبية
              </h3>
              <p className="text-[13px] text-[#757575] font-[500] max-w-[250px]">
                8502 Preston Rd. Inglewood, Maine 98380
                basmaMedical@bussiness.com
              </p>
            </div>
            <div className="flex flex-col gap-[8px]">
              <span className="text-[12px] text-[#9E9E9E] font-[500]">
                صادرة لي:
              </span>
              <h3 className="text-[16px] text-[#424242] font-[500]">
                فرح ماجد
              </h3>

              <h3 className="text-[13px] text-[#757575] font-[500] max-w-[239px]">
                2464 Royal Ln. Mesa, New Jersey 45463 farahelzinati@gmail.com
              </h3>
            </div>
          </div>
          <div className="mt-[24px] overflow-x-auto">
            {/* <div className="flex gap-[80px] items-center">
              <h3 className="font-[600] text-[15px] text-[#9E9E9E]">رقم</h3>
              <h3 className="font-[600] text-[15px] text-[#9E9E9E]">وصف</h3>
              <h3 className="font-[600] text-[15px] text-[#9E9E9E]">تكلفة</h3>
              <h3 className="font-[600] text-[15px] text-[#9E9E9E]">كمية</h3>
              <h3 className="font-[600] text-[15px] text-[#9E9E9E]">المدة</h3>
            </div>
            <div className=" h-[2px] bg-[#EEEEEE]"></div> */}
            <table className=" divide-y divide-gray-200 text-sm text-center">
              <thead className=" text-[#9E9E9E]">
                <tr>
                  <th scope="col" className="px-12 py-3">
                  رقم
                  </th>
                  <th scope="col" className="px-12 py-3">
                  وصف
                  </th>
                  <th scope="col" className="px-12 py-3">
                  تكلفة
                  </th>
                  <th scope="col" className="px-12 py-3">
                  كمية
                  </th>
                  <th scope="col" className="px-12 py-3">
                  المدة
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 font-[700]">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">1</td>
                  <td className="px-6 py-4 whitespace-nowrap">بروفين - 400 مل</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  75 شيكل
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  3
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  15 يوم
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-[24px]">
            <h3 className="font-[700]">النقطة الطبية</h3>
            <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex justify-between rounded-[16px] relative mt-[10px]">
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] bg-[#E0E6FF] text-Basic flex items-center justify-center rounded-full">
                  <IoLocationOutline />
                </div>
                <div className=" space-y-[5px]">
                  <h3 className=" text-[15px] font-bold text-black">
                    صيدلية الشفاء
                  </h3>
                  <p className=" text-[13px] text-[#616161]">
                    بيت لاهيا، شارع الفالوجا، مقابل مستشفى الإندونيسي
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[24px]">
            <h3 className="font-[700]">طرق الدفع</h3>
            <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex items-center justify-between rounded-[16px] mt-[10px]">
              <div className="flex items-center gap-2">
                <Image
                  src={palpay_logo}
                  className="w-auto h-[39px] object-cover"
                  alt="error"
                  width={0}
                  height={0}
                />
                PalPay محفظتي
              </div>
            </div>
          </div>
          <div className="mt-[24px]">
            <div className="py-[20px]">
              <div className="flex justify-between items-center">
                <h3 className="text-[#616161] text-[18px]">المبلغ</h3>
                <span className="text-[22px] text-[#212121] font-[700]">
                  ILS 00.75
                </span>
              </div>
              <div className="flex justify-between items-center mt-[16px]">
                <h3 className="text-[#616161] text-[18px]">خصومات</h3>
                <span className="text-[22px] text-[#212121] font-[700]">
                  ILS 00.00
                </span>
              </div>
            </div>
            {/*  */}
            <div className="py-[20px] border-t-1 border-[#EEEEEE]">
              <div className="flex justify-between items-center">
                <h3 className="text-[#616161] text-[18px]">
                  المبلغ الإجمالي (Total Amount)
                </h3>
                <span className="text-[22px] text-[#212121] font-[700]">
                  ILS 00.75
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
