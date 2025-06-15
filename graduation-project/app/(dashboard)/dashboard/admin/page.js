"use client";
import React, { useEffect, useState } from "react";
import AreaChart from "@/components/charts/AreaChart";
import ColumnChart from "@/components/charts/ColumnChart";
import PieChart from "@/components/charts/PieChart";
import { LuUsers } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { TbBuildingHospital } from "react-icons/tb";
import { TiMessages } from "react-icons/ti";
import { AiOutlineUserAdd } from "react-icons/ai";
import { LiaPenSolid } from "react-icons/lia";
import { CiStethoscope } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { dashboard_stats } from "@/redux/slice/adminSlice";
import Loading from "@/components/pageProps/loading";
import Link from "next/link";

export default function MainAdminPage() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(dashboard_stats()).then((res) => {
      if (res?.payload?.success) {
        setData(res?.payload?.data[0]);
      }
    });
  }, [dispatch]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-[24px] w-full ">
        <div className="px-[16px] py-[20px] bg-white rounded-[16px] space-y-[5px] shadow-custom">
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#616161] font-[500]">
              إجمالي المستخدمين
            </span>
            <LuUsers className="w-[20px] h-[20px] text-Basic" />
          </div>
          <h3 className="text-[18px] font-bold text-black">{data.total_users}</h3>
        </div>
        <div className="px-[16px] py-[20px] bg-white rounded-[16px] space-y-[5px] shadow-custom">
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#616161] font-[500]">
              إجمالي الأطباء
            </span>
            <PiUsersThree className="w-[20px] h-[20px] text-Basic" />
          </div>
          <h3 className="text-[18px] font-bold text-black">{data.total_doctors}</h3>
        </div>
        <div className="px-[16px] py-[20px] bg-white rounded-[16px] space-y-[5px] shadow-custom">
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#616161] font-[500]">
              النقاط الطبية
            </span>
            <TbBuildingHospital className="w-[20px] h-[20px] text-Basic" />
          </div>
          <h3 className="text-[18px] font-bold text-black">{data.total_medical_points}</h3>
        </div>
        <div className="px-[16px] py-[20px] bg-white rounded-[16px] space-y-[5px] shadow-custom">
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#616161] font-[500]">
              الاستشارات اليومية
            </span>
            <TiMessages className="w-[20px] h-[20px] text-Basic" />
          </div>
          <h3 className="text-[18px] font-bold text-black">{data.daily_consultations}</h3>
        </div>
      </div>
      <div className="mt-[30px]">
        <div className="bg-white p-[32px] rounded-[16px] shadow-custom">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-[600]">التسجيلات اليومية</h3>
            <div className="flex items-center justify-center gap-[16px]">
              <button className=" focus:outline-none py-[6px] px-[16px] bg-[#F8F8F8] rounded-[8px] text-[12px] cursor-pointer">
                أسبوعي
              </button>
              <button className=" focus:outline-none py-[6px] px-[16px] bg-[#F8F8F8] rounded-[8px] text-[12px] cursor-pointer">
                شهري
              </button>
              <button className=" focus:outline-none py-[6px] px-[16px] bg-[#F8F8F8] rounded-[8px] text-[12px] cursor-pointer">
                سنوي
              </button>
            </div>
          </div>
          <div className="mt-[30px]">
            <AreaChart />
          </div>
        </div>
      </div>
      <div className="mt-[30px]">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-[24px]">
          <div className="bg-white py-[24px] px-[16px] rounded-[16px] shadow-custom md:col-span-5">
            <h3 className="text-[18px] font-[700]">التخصصات الطبية</h3>
            <div className="mt-[22px]">
              <PieChart />
            </div>
          </div>
          <div className="bg-white py-[24px] px-[16px] rounded-[16px] shadow-custom md:col-span-7">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-[700]">مستوى النشاط</h3>
              <button className=" focus:outline-none py-[6px] px-[16px] bg-[#F8F8F8] rounded-[8px] text-[12px] cursor-pointer">
                أخر 7 أيام
              </button>
            </div>
            <div className="mt-[22px]">
              <ColumnChart />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[30px]">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-[24px]">
          <div className="bg-white p-[24px] rounded-[16px] shadow-custom md:col-span-7">
            {/* الانشطة الحديثة */}
            <h3 className="text-[18px] font-[600] ">الأنشطة الحديثة</h3>
            <div className="mt-[24px] space-y-[16px]">
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] bg-[#E0E6FF] text-Basic flex items-center justify-center rounded-full">
                  <AiOutlineUserAdd />
                </div>
                <div className=" space-y-[5px]">
                  <h3 className=" text-[15px] font-[500] text-black">
                    تم تسجيل د.محمد الأحطب كطبيب جديد
                  </h3>
                  <p className=" text-[13px] text-[#616161]">منذ 35 دقيقة</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] bg-[#F4FFE4] text-[#6EC207] flex items-center justify-center rounded-full">
                  <TbBuildingHospital />
                </div>
                <div className=" space-y-[5px]">
                  <h3 className=" text-[15px] font-[500] text-black">
                    تم إضافة مركز الرعاية الأولية كنقطة طبية جديدة
                  </h3>
                  <p className=" text-[13px] text-[#616161]">منذ ساعتين</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] bg-[#F4FFE4] text-[#6EC207] flex items-center justify-center rounded-full">
                  <TbBuildingHospital />
                </div>
                <div className=" space-y-[5px]">
                  <h3 className=" text-[15px] font-[500] text-black">
                    قام عبد الله الحربي بتحديث بيانات ملفه الشخصي
                  </h3>
                  <p className=" text-[13px] text-[#616161]">منذ 3 ساعات</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] bg-[#F4FFE4] text-[#6EC207] flex items-center justify-center rounded-full">
                  <TbBuildingHospital />
                </div>
                <div className=" space-y-[5px]">
                  <h3 className=" text-[15px] font-[500] text-black">
                    تم حجز موعد جديد مع د. سارة الشريف
                  </h3>
                  <p className=" text-[13px] text-[#616161]">منذ 5 ساعات</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] bg-[#F4FFE4] text-[#6EC207] flex items-center justify-center rounded-full">
                  <TbBuildingHospital />
                </div>
                <div className=" space-y-[5px]">
                  <h3 className=" text-[15px] font-[500] text-black">
                    تم إلغاء موعد سهى العرايشي مع د. سارة الشريف
                  </h3>
                  <p className=" text-[13px] text-[#616161]">منذ 8 ساعات</p>
                </div>
              </div>
            </div>
          </div>
          {/* جراءات سريعة */}
          <div className="bg-white p-[24px] rounded-[16px] shadow-custom md:col-span-5">
            <h3 className="text-[18px] font-[600] ">إجراءات سريعة</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-[24px] mt-[24px] ">
              <Link href={'/dashboard/admin/users'} className="bg-[#F8F8F8] flex items-center justify-center flex-col rounded-[8px] py-[16px] gap-[8px] group hover:bg-Basic duration-200 ease-in-out cursor-pointer">
                <div className="w-[40px] h-[40px] text-[20px] bg-[#E6EEFF] text-[#246BFD] flex items-center justify-center rounded-full">
                  <AiOutlineUserAdd />
                </div>
                <h3 className="text-[14px] font-[500] group-hover:text-white">
                  إضافة مستخدم{" "}
                </h3>
              </Link>
              <Link href={'/dashboard/admin/medical-points'} className="bg-[#F8F8F8] flex items-center justify-center flex-col rounded-[8px] py-[16px] gap-[8px] group hover:bg-Basic duration-200 ease-in-out cursor-pointer">
                <div className="w-[40px] h-[40px] text-[20px] bg-[#F4FFE4] text-[#6EC207]  flex items-center justify-center rounded-full">
                  <TbBuildingHospital />
                </div>
                <h3 className="text-[14px] font-[500] group-hover:text-white">
                  إضافة نقطة طبية
                </h3>
              </Link>
              <Link href={'/dashboard/admin/doctors'} className="bg-[#F8F8F8] flex items-center justify-center flex-col rounded-[8px] py-[16px] gap-[8px] group hover:bg-Basic duration-200 ease-in-out cursor-pointer">
                <div className="w-[40px] h-[40px] text-[20px] bg-[#EEF1FF] text-Basic flex items-center justify-center rounded-full">
                  <CiStethoscope />
                </div>
                <h3 className="text-[14px] font-[500] group-hover:text-white">
                  إضافة طبيب
                </h3>
              </Link>
              <div className="bg-[#F8F8F8] flex items-center justify-center flex-col rounded-[8px] py-[16px] gap-[8px] group hover:bg-Basic duration-200 ease-in-out cursor-pointer">
                <div className="w-[40px] h-[40px] text-[20px] bg-[#FFF2E3] text-[#F9A744] flex items-center justify-center rounded-full">
                  <IoSettingsOutline />
                </div>
                <h3 className="text-[14px] font-[500] group-hover:text-white">
                  الإعدادات
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
