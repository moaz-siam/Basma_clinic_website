"use client";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";
import Popup from "@/components/pageProps/Pop";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BsExclamationCircle } from "react-icons/bs";
import Reschedule from "@/components/dashboard/Reschedule";
import Loading from "@/components/pageProps/loading";
import { formatFullArabicDate } from "@/components/pageProps/FormatedDT";
import {
  appointment_status_doc,
  get_Consultations_Doc_detiles,
} from "@/redux/slice/doctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";

export default function AppointmentsidPage() {
  const [content, setContent] = useState("main");
  const [isPopupOpen, setisPopupOpen] = useState({
    btn: false,
    lable: "",
  });

  const { appointmentsid } = useParams();
  const [consultationId, setConsultationId] = useState([]);
  const [formData, setFormData] = useState({
    consultation_id: appointmentsid,
    appointment_status: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, isError, doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(get_Consultations_Doc_detiles(appointmentsid)).then((res) => {
      if (res?.payload?.success) {
        // setConsultationId(res.payload.data?.[0]);
        
      }
    });
  }, [dispatch, appointmentsid]);

  useEffect(() => {
    if (doctor?.length > 0) {
      setConsultationId(doctor[0]);
    }
  }, [doctor]);

  // const formatDate = formatFullArabicDate(consultationId?.created_at);

  const handleSubmit = () => {
    dispatch(appointment_status_doc(formData)).then((res) => {
      if (res?.payload?.success) {
        if (formData.appointment_status == "accepted") {
          setisPopupOpen({
            ...isPopupOpen,
            btn: true,
            lable: "accepted",
          });
        } else {
          setisPopupOpen({ ...isPopupOpen, btn: true, lable: "cancel" });
        }
      } else {
        showToast.error(res?.payload?.message, {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          icon: "",
          sound: false,
        });
      }
    });
  };

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
    <div className="">
      {content == "main" ? (
        <div className="">
          <Breadcrumb
            titleTop={"تفاصيل الموعد"}
            titlesection={"المواعيد الواردة "}
            path={["تفاصيل الموعد"]}
          />
          {consultationId.appointment_status == "pending" && (
            <div className="flex items-center gap-[24px] mt-[40px]">
              <button
                onClick={() => {
                  setFormData({ ...formData, appointment_status: "accepted" });
                  handleSubmit();
                }}
                className="py-[9px] px-[30px] text-[14px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
              >
                قبول الموعد
              </button>
              <button
                onClick={() => {
                  setisPopupOpen({
                    ...isPopupOpen,
                    btn: true,
                    lable: "reschedule",
                  });
                }}
                className="py-[9px] px-[30px] text-[14px] bg-[#E0E6FF] text-Basic rounded-[8px] cursor-pointer duration-300 ease-in-out focus:outline-none"
              >
                إعادة الجدولة
              </button>
              <button
                onClick={() => {
                  setFormData({ ...formData, appointment_status: "cancelled" });
                  handleSubmit();
                }}
                className="py-[9px] px-[30px] border-[1px] border-Basic text-Basic text-[14px] rounded-[8px] cursor-pointer duration-300 ease-in-out focus:outline-none"
              >
                إلغاء الموعد
              </button>
            </div>
          )}
          <div className="mt-[30px]">
            <div>
              <div className="w-full flex justify-between items-center">
                <h3 className=" text-[#483535] text-[22px] font-[700]">
                  {consultationId.id}#
                </h3>
                <span className="text-[#616161] text-[17px]">
                  {consultationId.appointment_time}
                </span>
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
            {/*  */}
            <div className="mt-[24px]">
              <h3 className="text-[#212121] text-[22px] font-[700]">المريض</h3>
              <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-custom  px-[24px] py-[26px] space-y-[5px] relative flex justify-between items-center w-full">
                <div className="flex items-center gap-[16px]">
                  <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#EEF1FF] text-Basic text-[18px] font-[500]">
                    {consultationId?.patient_name_ar?.slice(0 , 2)}
                  </div>
                  <div className=" space-y-[5px]">
                    <h3 className=" text-[15px] font-[700] text-[#212121]">
                      {/* د. {consultationId.doctor_name_ar} */}
                    </h3>
                    <span className="text-[#616161] text-[16px] font-[500]">
                      {consultationId.patient_name_ar}
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
              <h3 className="text-[#212121] text-[22px] font-[700]">
                سؤال المريض
              </h3>
              <div className="mt-[16px] bg-white rounded-[16px] shadow-custom p-[24px]">
                <p className="text-[16px] text-[#424242] font-[600]">
                  {consultationId.question}
                </p>
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
              </div>
            </div>
          </div>
          <Popup isOpen={isPopupOpen.btn} width="516px">
            {isPopupOpen.lable == "accepted" ? (
              <div className="flex flex-col justify-center items-center text-center w-full gap-[20px]">
                <FaRegCircleCheck className="text-[75px] text-Basic" />

                <h3 className="text-[20px] font-[700] text-[#212121]">
                  تم قبول الموعد بنجاح
                </h3>
                <p className="text-[15px] text-[#757575]">
                  سوف يتم ارسال اشعار للمريض بإخطاره أن موعد الاستشارة تم قبوله
                </p>
                <button
                  onClick={() => setisPopupOpen({ ...isPopupOpen, btn: false })}
                  className="py-[9px] w-full text-[14px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
                >
                  العودة للرئيسية
                </button>
              </div>
            ) : isPopupOpen.lable == "reschedule" ? (
              <div className="flex flex-col justify-center items-center text-center w-full gap-[20px]">
                <BsExclamationCircle className="text-[75px] text-Basic" />

                <h3 className="text-[20px] font-[700] text-[#212121]">
                  هل أنت متأكد من إعادة الجدولة؟
                </h3>
                <p className="text-[15px] text-[#757575]">
                  هذا الإجراء سيؤدي إلى تغيير موعد الاستشارة الحالي. تأكد من
                  اختيار موعد يناسبك.
                </p>
                <div className="flex items-center justify-between text-center gap-[15px] w-full">
                  <button
                    onClick={() => {
                      setContent("reschedule");
                      setisPopupOpen({ ...isPopupOpen, btn: false });
                    }}
                    className="py-[9px] w-full text-[14px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
                  >
                    إعادة الجدولة
                  </button>
                  <button
                    onClick={() =>
                      setisPopupOpen({ ...isPopupOpen, btn: false })
                    }
                    className="py-[9px] w-full border-[1px] border-[#F75555] text-[#F75555] text-[14px] rounded-[8px] cursor-pointer duration-300 ease-in-out focus:outline-none"
                  >
                    إلغاء الموعد
                  </button>
                </div>
              </div>
            ) : isPopupOpen.lable == "cancel" ? (
              <div className="flex flex-col justify-center items-center text-center w-full gap-[20px]">
                <FaRegCircleCheck className="text-[75px] text-Basic" />

                <h3 className="text-[20px] font-[700] text-[#212121]">
                  تم إلغاء الموعد بنجاح
                </h3>
                <p className="text-[15px] text-[#757575]">
                  سوف يتم ارسال اشعار للمريض بإخطاره أن موعد الاستشارة قد ألغي{" "}
                </p>
                <button
                  onClick={() => setisPopupOpen({ ...isPopupOpen, btn: false })}
                  className="py-[9px] w-full text-[14px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
                >
                  العودة للرئيسية
                </button>
              </div>
            ) : null}
          </Popup>
        </div>
      ) : content == "reschedule" ? (
        <div className="">
          <Breadcrumb
            titleTop={"إعادة جدولة الاستشارة"}
            titlesection={"تفاصيل الموعد"}
            path={[" إعادة جدول الاستشارة"]}
          />
          <Reschedule
            type={"doctor"}
            consultation_id={appointmentsid}
            setContent={setContent}
          />
        </div>
      ) : null}
    </div>
  );
}
