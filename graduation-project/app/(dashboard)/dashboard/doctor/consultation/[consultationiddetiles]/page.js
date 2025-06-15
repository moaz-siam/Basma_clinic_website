"use client";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { RxUpload } from "react-icons/rx";
import { MdError } from "react-icons/md";

import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { PiPillLight } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import { LuDownload } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  get_ConsultationId_doctor,
  get_Consultations_Doc_detiles,
} from "@/redux/slice/doctorSlice";
import { useParams } from "next/navigation";
import { formatFullArabicDate } from "@/components/pageProps/FormatedDT";
import Loading from "@/components/pageProps/loading";

export default function ConsultationidreviewPage() {
  const { consultationiddetiles } = useParams();
  const [consultationId, setConsultationId] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const dispatch = useDispatch();
  const { isLoading, isError, doctor } = useSelector((state) => state.doctor);
  

  useEffect(() => {
    dispatch(get_Consultations_Doc_detiles(consultationiddetiles)).then(
      (res) => {
        if (res?.payload?.success) {
          // setConsultationId(res?.payload?.data[0]);
          
        }
      }
    );
  }, [dispatch, consultationiddetiles]);

  useEffect(() => {
    if (doctor?.length > 0) {
      setConsultationId(doctor[0]);
    }
  }, [doctor]);

  const formatDate = formatFullArabicDate(consultationId?.created_at);

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
      <Breadcrumb
        titleTop={"تفاصيل الاستشارة"}
        titlesection={"استشاراتك الحالية"}
        path={["تفاصيل الاستشارة"]}
      />
      <div className="mt-[30px]">
        {/* 1 */}
        <div>
          <div className="w-full flex justify-between items-center">
            <h3 className=" text-[#212121] text-[22px] font-[700]">12345#</h3>
            <span className="text-[#616161] text-[17px]">{formatDate}</span>
          </div>
          <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] px-[24px] py-[26px] space-y-[5px] relative">
            <h3 className="text-[#212121] font-[600] text-[16px]">
              نوع الخدمة:{" "}
              <span className="text-[#616161]">
                {consultationId.main_service}
              </span>
            </h3>
            <h3 className="text-[#212121] font-[600] text-[16px]">
              الخدمة الفرعية:{" "}
              <span className="text-[#616161]">
                {consultationId.sub_service}
              </span>
            </h3>
            <div
              className={`absolute top-5 left-5 px-[23px] py-[5px] rounded-[8px] ${
                consultationId.status === "نشطة"
                  ? "bg-[#45B36926] text-[#07BD74]"
                  : consultationId.status === "مكتملة"
                  ? "bg-[#007BFF26] text-[#007BFF]"
                  : consultationId.status === "مجدولة"
                  ? "bg-[#FFC10726] text-[#FFC107]"
                  : consultationId.status === "ملغية"
                  ? "bg-[#FF000026] text-[#FF0000]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {consultationId.status}
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">المريض</h3>
          <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-custom  px-[24px] py-[26px] space-y-[5px] relative flex justify-between items-center w-full">
            <div className="flex items-center gap-[16px]">
              <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#EEF1FF] text-Basic text-[18px] font-[500]">
                أح
              </div>
              <div className=" space-y-[5px]">
                <h3 className=" text-[15px] font-[700] text-[#212121]">
                  {/* د. {consultation.doctor_name_ar} */}
                  {consultationId.patient_name_ar}
                </h3>
                <span className="text-[#616161] text-[13px] font-[500]">
                  مريض اكتئاب
                </span>
              </div>
            </div>
            <div className=" flex items-center gap-[10px]">
              <Link
                href={""}
                className="w-[40px] h-[40px] text-[18px] rounded-full bg-[#EEF1FF] text-Basic flex items-center justify-center"
              >
                <FaRegEnvelopeOpen />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">سؤال المريض</h3>
          <div className="mt-[16px] bg-white rounded-[16px] shadow-custom p-[24px]">
            <p className="text-[16px] text-[#424242] font-[600]">
              {consultationId.question}
            </p>
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">
            الملفات والتقارير
          </h3>
          <div className="w-full bg-white rounded-[16px] text-center p-[24px] shadow-custom gap-2 mt-[15px]">
            {consultationId.attachment_name && (
              <div className="flex items-center gap-1 mt-[15px]">
                <CgFileDocument className="w-[20px] h-[20px] " />
                <div className="flex items-center gap-2">
                  <h3 className="text-[#424242] font-[500] text-[14px] ">
                    {consultationId.attachment_name
                      ? consultationId.attachment_name
                      : null}
                  </h3>
                  <div className="flex items-center gap-1 text-Basic text-[14px] cursor-pointer">
                    <span className="underline">تحميل</span>
                    <LuDownload />
                  </div>
                </div>
              </div>
            )}
            {consultationId.prescription_url && (
              <div className="flex items-center gap-1 mt-[15px]">
                <CgFileDocument className="w-[20px] h-[20px] " />
                <div className="flex items-center gap-2">
                  <h3 className="text-[#424242] font-[500] text-[14px] ">
                    {consultationId.prescription_name
                      ? consultationId.prescription_name
                      : null}
                  </h3>
                  <div className="flex items-center gap-1 text-Basic text-[14px] cursor-pointer">
                    <span className="underline">تحميل</span>
                    <LuDownload />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {consultationId.prescription_items && (
          <div className="mt-[24px]">
            <h3 className="mb-[15px] font-[700]">الادوية</h3>
            <div className=" bg-white rounded-[16px] px-[24px] py-[32px] shadow-custom  w-full">
              {Array.isArray(consultationId.prescription_items) &&
                consultationId.prescription_items.map((ele, index) => (
                  <div
                    className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-[24px] items-center"
                    key={index}
                  >
                    {console.log(ele)}
                    <div className="">
                      <span className="text-[15px] text-[#212121] font-[600]">
                        {" "}
                        اختيار الدواء
                      </span>
                      <select
                        defaultValue={ele.name}
                        disabled
                        name=""
                        id=""
                        className="w-full rounded-[8px] px-[16px] py-[13px] border-[1px] border-[#E0E0E0] mt-[8px]"
                      >
                        <option value="">{ele.name}</option>
                      </select>
                    </div>
                    <div className="">
                      <span className="text-[15px] text-[#212121] font-[600]">
                        {" "}
                        الجرعة
                      </span>
                      <div className="w-full rounded-[8px] px-[16px] py-[13px] border-[1px] border-[#E0E0E0] flex items-center mt-[8px]">
                        <input
                          type="text"
                          className="h-full w-full focus:outline-none placeholder:text-[#E0E0E0]"
                          placeholder="الجرعة"
                          defaultValue={ele.dosage}
                          disabled
                        />
                        <PiPillLight className="w-[20px] h-[20px] text-[#616161]" />
                      </div>
                    </div>
                    <div className="">
                      <span className="text-[15px] text-[#212121] font-[600]">
                        {" "}
                        وقت الدواء
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-full rounded-[8px] px-[16px] py-[13px] border-[1px] border-[#E0E0E0] flex items-center mt-[8px]">
                          <input
                            type="text"
                            className="h-full w-full focus:outline-none placeholder:text-[#E0E0E0]"
                            placeholder="الوقت"
                            defaultValue={ele.instructions}
                            disabled
                          />
                          <GoClock className="w-[20px] h-[20px] text-[#616161]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div className="mt-[24px]">
          <h3 className="mb-[15px] font-[700]">رد الطبيب على الاستشارة</h3>
          <div className="mt-[36px]">
            <h3 className="text-[18px] font-[600]">السؤال</h3>
            <div
              name="question"
              className="w-full my-[10px] h-[180px] focus:outline-none bg-white rounded-[16px] shadow-custom py-[13px] px-[16px] placeholder:text-[#DADADA] focus:border-[1px] focus:border-Basic duration-200 ease-in-out"
              placeholder="اكتب رسالتك هنا ..."
            >
              {consultationId.consultation_reply_doctor}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
