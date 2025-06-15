import React from "react";
import Doctorcard from "./Doctorcard";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
async function getDoctors(filter = "") {
  const res = await fetch(`http://localhost:4000/api/doctors`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });
  if (!res.ok) {
    throw new Error("حدث خطا غير متوقع");
  }
  return res.json();
}
async function DoctorSwiper() {
  let doctorsData = await getDoctors();

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-[16px] w-full">
        {doctorsData?.data?.slice(0, 5).map((ele , index) => (
          <Doctorcard
            key={index}
            img={ele?.image_url}
            name={ele?.full_name_ar}
            rating={ele?.average_rating}
            namepath={ele?.full_name_en?.split(" ").join("-")}
          />
        ))}
      </div>
      <Link
        className="flex items-center text-Basic space-x-[5px] mt-[15px] justify-center"
        href={""}
      >
        <p className="text-[16px] underline">عرض المزيد</p>
        <FaArrowLeftLong />
      </Link>
    </div>
  );
}

export default DoctorSwiper;
