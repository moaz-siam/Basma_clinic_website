import { CiUser } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import Link from "next/link";
import { formatFullArabicDate } from "../pageProps/FormatedDT";
function ConsultationCard({ consultation, type }) {
  const {
    id,
    doctor_name_ar,
    patient_name_ar,
    main_service,
    sub_service,
    status,
  } = consultation;
  const statusProgress = {
    نشطة: {
      width: "w-[50%]",
    },
    مجدولة: {
      width: "w-[70%]",
    },
    مكتملة: {
      width: "w-[100%]",
    },
    ملغية: {
      width: "w-[0%]",
    },
  };
  const progress = statusProgress[status] || {
    width: "w-[0%]",
  };
  const formatDate = formatFullArabicDate(consultation.scheduled_time);

  return (
    <div className=" bg-white rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11F] px-[40px] py-[25px] w-full flex flex-col items-start gap-[10px] relative">
      <span className=" font-[700] text-[#212121] text-[20px]">#{id}</span>
      <div className="flex items-center gap-2">
        <CiUser />
        {type == "patient" ? (
          <h3 className="text-[#424242] font-[500] text-[14px]">
            د. {doctor_name_ar}
          </h3>
        ) : (
          <h3 className="text-[#424242] font-[500] text-[14px]">
            المريض : {patient_name_ar}
          </h3>
        )}
      </div>
      <div className="flex items-center gap-2">
        <BiCategory />
        <h3 className="text-[#424242] font-[500] text-[14px]">
          {main_service} ({sub_service})
        </h3>
      </div>
      <div className=" text-end w-full text-[#424242] text-[14px]">
        <span>50%</span>
      </div>
      <div className="bg-[#E0E6FF] w-full h-[5px] rounded-[8px] ">
        <div
          className={`bg-Basic h-full ${progress.width} rounded-[8px] transition-all duration-200 ease-in-out`}
          // style={{ width: `${progress}%` }}
        ></div>
      </div>
      {status == "نشطة" ? (
        <div className=" flex items-center gap-2">
          <Link
            href={
              type == "patient"
                ? `/dashboard/patient/consultation/${id}`
                : `/dashboard/doctor/consultation/consultation_reply/${id}`
            }
            className="py-[7px] px-[18px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
          >
            استمر بالاستشارة
          </Link>
          <Link
            href={
              type == "patient"
                ? `/dashboard/patient/consultation/${id}`
                : `/dashboard/doctor/consultation/${id}`
            }
            className="py-[7px] px-[18px] text-Basic "
          >
            عرض التفاصيل
          </Link>
        </div>
      ) : status == "مجدولة" ? (
        <div className=" flex items-center gap-2">
          <Link
            href={
              type == "patient"
                ? `/dashboard/patient/consultation/${id}`
                : `/dashboard/doctor/appointments/${id}`
            }
            className="py-[7px] px-[18px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
          >
            عرض التفاصيل
          </Link>
          <span className="text-[#9E9E9E] text-[15px] font-[600] ">
            متاحة {consultation.appointment_time}
          </span>
        </div>
      ) : status == "مكتملة" ? (
        <div className=" flex items-center gap-2">
          <Link
            href={
              type == "patient"
                ? `/dashboard/patient/consultation/${id}`
                : `/dashboard/doctor/consultation/${id}`
            }
            className="py-[7px] px-[18px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
          >
            عرض التفاصيل
          </Link>
          <Link href={""} className="py-[7px]  px-[18px]  text-Basic ">
            اضافة تقييم
          </Link>
        </div>
      ) : status == "ملغية" ? (
        <div className=" flex items-center gap-2">
          <button className="py-[7px] px-[18px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none">
            إعادة الاستشارة
          </button>
        </div>
      ) : (
        <div className=" flex items-center gap-2">
          <button className="py-[7px] px-[18px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none">
            استمر بالاستشارة
          </button>
          <Link
            href={
              type == "patient"
                ? `/dashboard/patient/consultation/${id}`
                : `/dashboard/doctor/consultation/${id}`
            }
            className="py-[7px] px-[18px]  text-Basic "
          >
            عرض التفاصيل
          </Link>
        </div>
      )}
      <div
        className={`absolute top-5 left-5 px-[23px] py-[5px] rounded-[8px] ${
          status === "نشطة"
            ? "bg-[#45B36926] text-[#07BD74]"
            : status === "مكتملة"
            ? "bg-[#007BFF26] text-[#007BFF]"
            : status === "مجدولة"
            ? "bg-[#FFC10726] text-[#FFC107]"
            : status === "ملغية"
            ? "bg-[#FF000026] text-[#FF0000]"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {status}
      </div>
    </div>
  );
}

export default ConsultationCard;
