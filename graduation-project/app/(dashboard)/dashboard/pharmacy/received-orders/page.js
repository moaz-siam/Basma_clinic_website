"use client";
import PharmacyCard from "@/components/dashboard/pharmacyCard";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Loading from "@/components/pageProps/loading";
import { get_prescriptions } from "@/redux/slice/pharmacySlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { TbClipboardText } from "react-icons/tb";

export default function ReceivedordersPage() {
  const [data, setData] = useState([]);
  const { isLoading } = useSelector((state) => state.pharmacy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_prescriptions()).then((res) => {
      if (res?.payload?.success) {
        setData(res?.payload?.data);
      }
    });
  }, [dispatch]);

  const filter_orders = data.filter(
    (ele) => ele.prescription_status == "في انتظار الصرف"
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <Breadcrumb titleTop={"طلباتك الواردة"} titlesection={"طلباتك الواردة"} />
      <div className="mt-[40px]">
        {filter_orders.length > 0 ? (
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
        ) : (
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
        )}
      </div>
      {filter_orders.length > 0 && (
        <Link
          href={""}
          className={`flex mt-10 items-center w-full text-center mx-auto  justify-center text-Basic space-x-[5px] cursor-pointer`}
        >
          <p className="text-[16px] underline ">عرض المزيد</p>
          <FaArrowLeftLong />
        </Link>
      )}
    </div>
  );
}
