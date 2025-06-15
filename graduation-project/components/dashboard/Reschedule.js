"use client";
import {
  get_Consultations_Doc_detiles,
  Reschedule_Doc,
} from "@/redux/slice/doctorSlice";
import { Book_appointment } from "@/redux/slice/patientSlice";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";

// 👇 الدالة لإنشاء الأيام القادمة
const generateAllDaysInYear = () => {
  const weekdays = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const allDays = [];
  const currentYear = new Date().getFullYear();

  const startDate = new Date(currentYear, 0, 1); // 1 يناير
  const endDate = new Date(currentYear, 11, 31); // 31 ديسمبر

  let currentDate = startDate;

  while (currentDate <= endDate) {
    allDays.push({
      day: weekdays[currentDate.getDay()],
      date: currentDate.getDate(),
      month: currentDate.toLocaleString("ar-EG", { month: "long" }),
    });

    // الانتقال لليوم التالي
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return allDays;
};

// 👇 الدالة لإنشاء أوقات المواعيد
const generateTimeSlots = (startHour = 9, endHour = 15, interval = 30) => {
  const slots = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let min = 0; min < 60; min += interval) {
      const h = hour % 12 === 0 ? 12 : hour % 12;
      const ampm = hour < 12 ? "صباحًا" : "مساءً";
      const m = min === 0 ? "00" : min;
      slots.push(`${h}:${m} ${ampm}`);
    }
  }
  return slots;
};

export default function Reschedule({ type, consultation_id, setContent }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [rescheduletime, setRescheduletime] = useState({
    timeFrom: "",
    timeTo: "",
    day: "",
    date: "",
    month: "",
  });

  const [rescheduleselectnav, setRescheduleselectnav] = useState({
    reschedule1: false,
    reschedule2: false,
    reschedule3: false,
    reschedule4: false,
    reschedule5: false,
  });
  const [loadingbtn, setLoadingbtn] = useState(false);

  const [timeSlots, setTimeSlots] = useState([]);
  const [upcomingDays, setUpcomingDays] = useState([]);

  // 👇 استخدام useEffect لجلب البيانات عند تحميل الصفحة
  useEffect(() => {
    const slots = generateTimeSlots(9, 15, 30);
    const days = generateAllDaysInYear();
    setTimeSlots(slots);
    setUpcomingDays(days);
  }, []);

  const renderSelect = (label, name, options, toggleKey) => (
    <div className="w-full">
      <h3 className="text-[20px] text-[#424242]">{label}</h3>
      <div className="mt-[10px] bg-white shadow-custom w-full rounded-[8px]">
        <div
          className="flex justify-between items-center cursor-pointer px-[16px] py-[12px]"
          onClick={() =>
            setRescheduleselectnav({
              ...rescheduleselectnav,
              [toggleKey]: !rescheduleselectnav[toggleKey],
            })
          }
        >
          <h3 className="text-[#E0E0E0] text-[15px]">
            {rescheduletime[name] || `اختر ${label}`}
          </h3>
          {rescheduleselectnav[toggleKey] ? (
            <IoIosArrowUp />
          ) : (
            <IoIosArrowDown />
          )}
        </div>
      </div>
      {rescheduleselectnav[toggleKey] && (
        <div className="bg-white shadow-custom p-[16px] rounded-[8px] overflow-y-scroll h-80 mt-[10px]">
          <div className="flex flex-col gap-2 mt-[11px]">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center justify-between gap-2 text-[#9E9E9E] cursor-pointer"
              >
                <input
                  type="radio"
                  name={`${toggleKey}-group`}
                  className="peer hidden"
                  onChange={() => {
                    setRescheduletime({
                      ...rescheduletime,
                      [name]: option,
                    });
                    setRescheduleselectnav({
                      ...rescheduleselectnav,
                      [toggleKey]: false,
                    });
                  }}
                  checked={rescheduletime[name] === option}
                />
                {option}
                <div className="w-5 h-5 border border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:text-[12px]"></div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // 👇 استخراج الأيام، التواريخ، الأشهر من المصفوفة القادمة
  const daysList = [...new Set(upcomingDays.map((d) => d.day))];
  const datesList = [...new Set(upcomingDays.map((d) => d.date))];
  const monthsList = [...new Set(upcomingDays.map((d) => d.month))];
  const [formData, setFormData] = useState({
    consultation_id: consultation_id || "",
    appointment_time: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      appointment_time: `${rescheduletime.date}-${rescheduletime.month}-${rescheduletime.timeFrom}-${rescheduletime.timeTo}`,
    }));
  }, [rescheduletime]);

  const handleReschedulePatient = (e) => {
    setLoadingbtn(true);
    e.preventDefault();
    dispatch(Book_appointment(formData)).then((res) => {
      
      if (res?.payload?.success) {
        setLoadingbtn(false);
        router.push(
          `/dashboard/patient/consultation/${formData.consultation_id}`
        );
        showToast.success(res?.payload?.message, {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          icon: "",
          sound: false,
        });
      } else {
        setLoadingbtn(false);
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
  const handleRescheduleDoctor = (e) => {
    setLoadingbtn(true);
    e.preventDefault();
    dispatch(
      Reschedule_Doc({ ...formData, appointment_status: "accepted" })
    ).then((res) => {
      
      if (res?.payload?.success) {
        dispatch(get_Consultations_Doc_detiles(consultation_id));
        setLoadingbtn(false);
        setContent("main");
        showToast.success(res?.payload?.message, {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          icon: "",
          sound: false,
        });
      } else {
        setLoadingbtn(false);
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

  return (
    <div className="mt-[40px]">
      {type == "patient" && (
        <div className="mb-[24px]">
          <h3 className="text-[22px] font-[700]">ادخل رقم الاستشارة</h3>
          <input
            onChange={(e) =>
              setFormData({ ...formData, consultation_id: e.target.value })
            }
            type="number"
            placeholder=" رقم الاستشارة"
            className="w-[200px] bg-white shadow-custom rounded-[8px] focus:outline-none px-[16px] py-[12px] mt-[10px]"
          />
        </div>
      )}

      <h3 className="text-[22px] font-[700]">اختيار الوقت</h3>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-[20px] mt-[24px]">
        {renderSelect("من", "timeFrom", timeSlots, "reschedule1")}
        {renderSelect("إلى", "timeTo", timeSlots, "reschedule2")}
      </div>

      <div className="mt-[24px]">
        <h3 className="text-[22px] font-[700]">اختيار التاريخ</h3>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[16px] mt-[24px]">
          {renderSelect("اليوم", "day", daysList, "reschedule3")}
          {renderSelect("التاريخ", "date", datesList, "reschedule4")}
          {renderSelect("الشهر", "month", monthsList, "reschedule5")}
        </div>
      </div>

      <button
        onClick={(e) =>
          type == "patient"
            ? handleReschedulePatient(e)
            : handleRescheduleDoctor(e)
        }
        className="py-[9px] flex items-center justify-center gap-2 w-full mt-[24px] text-[14px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
      >
        إعادة جدولة
        {loadingbtn && (
          <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
        )}
      </button>
    </div>
  );
}
