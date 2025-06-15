"use client";
import React, { useEffect, useState } from "react";
import { TbClipboardText } from "react-icons/tb";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";

import Link from "next/link";
import Image from "next/image";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
import { useDispatch, useSelector } from "react-redux";
import PharmacyCard from "@/components/dashboard/pharmacyCard";
import { get_prescriptions } from "@/redux/slice/pharmacySlice";
import Loading from "@/components/pageProps/loading";

export default function MainPharmacyPage() {
  const [data, setData] = useState([]);
  // const { patient, isLoading } = useSelector((state) => state.patient);
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.pharmacy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_prescriptions()).then((res) => {
      if (res?.payload?.success) {
        setData(res?.payload?.data);
      }
    });
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const filter_orders = data.filter(
    (ele) => ele.prescription_status == "في انتظار الصرف"
  );

  return (
    <div className="w-full">
      <h3 className="text-[25px] font-[600] text-[#212121]">
        أهلاً بك معاذ صيام 👋🏻!
      </h3>
      <div className="mt-[40px] grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-[24px]">
        <div className="px-[16px] py-[20px] bg-white rounded-[16px] space-y-[5px] shadow-custom">
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#616161] font-[500]">
              عدد الروشتات الكليّة
            </span>
            <HiOutlineDocumentText className="w-[20px] h-[20px] text-Basic" />
          </div>
          <h3 className="text-[18px] font-bold text-black">152 </h3>
        </div>
        <div className="px-[16px] py-[20px] bg-white rounded-[16px] space-y-[5px] shadow-custom">
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#616161] font-[500]">
              الروشتات المصروفة
            </span>
            <CiCircleCheck className="w-[20px] h-[20px] text-[#07BD74]" />
          </div>
          <h3 className="text-[18px] font-bold text-black">97</h3>
        </div>
        <div className="px-[16px] py-[20px] bg-white rounded-[16px] space-y-[5px] shadow-custom">
          <div className="flex justify-between items-center">
            <span className="text-[14px] text-[#616161] font-[500]">
              الروشتات المرفوضة
            </span>
            <IoIosCloseCircleOutline className="w-[20px] h-[20px] text-[#F75555]" />
          </div>
          <h3 className="text-[18px] font-bold text-black">18</h3>
        </div>
      </div>
      <div className="mt-[30px]">
        {filter_orders.length === 0 ? (
          <div className="w-full">
            <div className="flex flex-col items-center justify-center gap-[15px] text-center">
              {/* <Image
                src={messages}
                width={0}
                height={0}
                alt="error img"
                className="w-auto"
              /> */}
              <TbClipboardText className=" text-Basic w-[150px] h-[150px]" />
              <h3 className="text-[30px] font-[600] text-[#212121]">
                لا توجد طلبات لمراجعتها
              </h3>
              <p className="text-[18px] text-[#616161] font-[400] max-w-[726px]">
                حالياً، لا يوجد أي طلب وارد من المرضى، وستظهر الطلبات هنا
                تلقائياً بمجرد استلامها لتتمكن من مراجعتها والتصرف بها بكل
                سهولة.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full mt-[24px]">
            <div className="w-full flex justify-between items-center mb-[24px]">
              <h3 className="text-[#212121] text-[22px] font-[700]">
                طلبات واردة
              </h3>
              <Link
                href={""}
                className={` text-Basic text-[14px] font-[500] underline cursor-pointer`}
              >
                عرض الكل
              </Link>
            </div>
            <div className="mt-[32px]">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-[24px]">
                {filter_orders.map((ele, index) => (
                  <PharmacyCard
                    key={index}
                    data={ele}
                    dispaly_status={false}
                    link={'order'}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
