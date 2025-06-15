"use client";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import { PiPhoneLight, PiPillLight } from "react-icons/pi";
import { MdOutlineSms } from "react-icons/md";
import { LuFileText } from "react-icons/lu";
import { RxDownload } from "react-icons/rx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getConsultationId } from "@/redux/slice/patientSlice";
import { useEffect, useState } from "react";
import Image from "next/image";
import user from "@/assets/dashboard-img/user_icon.png";
import { formatFullArabicDate } from "@/components/pageProps/FormatedDT";
import Loading from "@/components/pageProps/loading";
import { GoClock } from "react-icons/go";
export default function ConsultationIdPage() {
  const { consultationid } = useParams();
  const dispatch = useDispatch();
  const { patient, isLoading, isError } = useSelector((state) => state.patient);
  const [consultation, setConsultation] = useState([]);
  useEffect(() => {
    dispatch(getConsultationId(consultationid)).then((res) =>
      setConsultation(res?.payload?.data[0])
    );
  }, [dispatch, consultationid]);

  const date_time = formatFullArabicDate(consultation.created_at);
  

  return (
    <div className="w-full">
      <div className=" container mx-auto">
        <Breadcrumb
          titleTop={"تفاصيل الاستشارة"}
          titlesection={"استشاراتك الحالية"}
          path={["تفاصيل الاستشارة"]}
        />
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <p>isError</p>
        ) : (
          <div className="mt-[40px]">
            {/* box id */}
            <div>
              <div className="w-full flex justify-between items-center">
                <h3 className=" text-[#212121] text-[22px] font-[700]">
                  {consultation.id}#
                </h3>
                <span className="text-[#616161] text-[17px]">{date_time}</span>
              </div>
              <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] px-[24px] py-[26px] space-y-[5px] relative">
                <h3 className="text-[#212121] font-[600] text-[16px]">
                  نوع الخدمة:{" "}
                  <span className="text-[#616161]">
                    {consultation.main_service}
                  </span>
                </h3>
                <h3 className="text-[#212121] font-[600] text-[16px]">
                  الخدمة الفرعية:{" "}
                  <span className="text-[#616161]">
                    {consultation.sub_service}
                  </span>
                </h3>
                <div
                  className={`absolute top-5 left-5 px-[23px] py-[5px] rounded-[8px] ${
                    consultation.status === "نشطة"
                      ? "bg-[#45B36926] text-[#07BD74]"
                      : consultation.status === "مكتملة"
                      ? "bg-[#007BFF26] text-[#007BFF]"
                      : consultation.status === "مجدولة"
                      ? "bg-[#FFC10726] text-[#FFC107]"
                      : consultation.status === "ملغية"
                      ? "bg-[#FF000026] text-[#FF0000]"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {consultation.status}
                </div>
              </div>
            </div>
            {/* box doctor */}
            <div className="mt-[24px]">
              <h3 className="text-[#212121] text-[22px] font-[700]">
                الطبيب المشرف
              </h3>
              <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] px-[24px] py-[26px] space-y-[5px] relative flex justify-between items-center w-full">
                <div className="flex items-center gap-[16px]">
                  <Image
                    src={
                      consultation.doctor_img ? consultation.doctor_img : user
                    }
                    alt="error img"
                    className="w-auto h-[90px] object-cover"
                    width={0}
                    height={0}
                  />
                  <div className=" space-y-[5px]">
                    <h3 className=" text-[15px] font-[700] text-[#212121]">
                      د. {consultation.doctor_name_ar}
                    </h3>
                    <span className="text-[#616161] text-[13px] font-[500]">
                      #616161
                    </span>
                  </div>
                </div>
                <div className=" flex items-center gap-[10px]">
                  <Link
                    href={""}
                    className="w-[40px] h-[40px] text-[18px] rounded-full bg-[#EEF1FF] text-Basic flex items-center justify-center"
                  >
                    <PiPhoneLight />
                  </Link>
                  <Link
                    href={""}
                    className="w-[40px] h-[40px] text-[18px] rounded-full bg-[#EEF1FF] text-Basic flex items-center justify-center"
                  >
                    <MdOutlineSms />
                  </Link>
                </div>
              </div>
            </div>
            {/* box file */}
            <div className="mt-[24px]">
              <h3 className="text-[#212121] text-[22px] font-[700]">
                الملفات والتقارير
              </h3>
              <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] px-[24px] py-[26px] relative flex flex-col gap-[10px] w-full">
                {consultation.attachment_url ? (
                  <div className="flex items-center gap-2">
                    <LuFileText className="text-[#9E9E9E] text-[17px] " />
                    <span className="text-[#424242] text-[18px] font-[600]">
                      تقرير الفحص الأولي.PDF
                    </span>
                    <a
                      href={consultation.attachment_url}
                      download={`استشارة-${consultation.id}.png`}
                      className=" text-Basic text-[16px] flex items-center gap-1 cursor-pointer"
                    >
                      <span className=" underline">تحميل</span>
                      <RxDownload />
                    </a>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LuFileText className="text-[#9E9E9E] text-[17px] " />
                    <div>لايوجد تقارير او ملفات واردة منك</div>
                  </div>
                )}
                {consultation.prescriptions_pdf && (
                  <div className="flex items-center gap-2">
                    <LuFileText className="text-[#9E9E9E] text-[17px] " />
                    <span className="text-[#424242] text-[18px] font-[600]">
                      {consultation.prescriptions_pdf_name}
                    </span>
                    <a
                      href={consultation.prescriptions_pdf}
                      download={`استشارة-${consultation.id}.png`}
                      className=" text-Basic text-[16px] flex items-center gap-1 cursor-pointer"
                    >
                      <span className=" underline">تحميل</span>
                      <RxDownload />
                    </a>
                  </div>
                )}
              </div>
            </div>
            {consultation.prescription_items && (
              <div className="mt-[24px]">
                <h3 className="mb-[15px] font-[700]">الادوية</h3>
                <div className=" bg-white rounded-[16px] px-[24px] py-[32px] shadow-custom  w-full">
                  {Array.isArray(consultation.prescription_items) &&
                    consultation.prescription_items.map((ele, index) => (
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
            <div className="my-[24px]">
              <h3 className="text-[#212121] text-[22px] font-[700]">
                رد الطبيب على الاستشارة
              </h3>
              <div className="bg-white p-[24px] w-full rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] mt-[16px] h-[220px] overflow-y-auto">
                {consultation.consultation_reply
                  ? consultation.consultation_reply
                  : "لا يوجد رد من الدكتور بعد ... الرجاء الانتظار وشكرا لك"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
