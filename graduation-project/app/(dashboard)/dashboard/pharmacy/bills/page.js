"use client";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { LuTicket } from "react-icons/lu";
import PharmacyCard from "@/components/dashboard/pharmacyCard";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { get_prescriptions } from "@/redux/slice/pharmacySlice";
import Loading from "@/components/pageProps/loading";

export default function BillsPage() {
  const statuslable = ["الكل", "فواتير مضافة", "فواتير لم تضاف"];
  const [selectedstatus, setSelectedStatus] = useState({
    status: "الكل",
    btn: false,
  });
  const [bills, setBills] = useState(["1"]);

  const { isLoading } = useSelector((state) => state.pharmacy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_prescriptions()).then((res) => {
      if (res?.payload?.success) {
        setBills(res?.payload?.data);
      }
    });
  }, [dispatch]);

  const addedInvoices = bills.filter((order) => order.invoice_id !== null);
  const notAddedInvoices = bills.filter((order) => order.invoice_id === null);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <Breadcrumb titleTop={"الفواتير"} titlesection={"الفواتير"} />
      <div className="mt-[30px]">
        <div className=" flex justify-between items-center w-full">
          <div className="flex flex-wrap gap-2">
            {statuslable.map((ele, index) => (
              <div
                key={index}
                className={` rounded-[8px] py-[6px] text-center cursor-pointer duration-300 ease-in-out ${
                  selectedstatus.status == ele
                    ? " bg-Basic text-white font-bold px-[40px]"
                    : " text-Basic px-[16px]"
                }`}
                onClick={() => setSelectedStatus({ status: ele, btn: true })}
              >
                {ele}
              </div>
            ))}
          </div>
          <div className=" flex  shadow-[0px_4px_25px_0px_#A1A1A11A] bg-white rounded-[8px]">
            <button className="flex justify-center items-center gap-[8px] px-[16px] py-[6px] text-[18px]  cursor-pointer hover:bg-Basic hover:text-white duration-300 ease-in-out">
              الاحدث
              <RiArrowDropDownLine />
            </button>
          </div>
        </div>
        <div className="mt-[24px]">
          {(selectedstatus.status === "الكل" && bills.length === 0) ||
          (selectedstatus.status === "فواتير مضافة" &&
            addedInvoices.length === 0) ||
          (selectedstatus.status === "فواتير لم تضاف" &&
            notAddedInvoices.length === 0) ? (
            <div className="flex items-center justify-center flex-col gap-[10px]">
              <LuTicket className="text-[150px] text-Basic" />
              <h3 className="text-[24px] text-[#212121] font-[600]">
                لا يوجد فواتير حاليًا
              </h3>
              <p className="text-[18px] text-[#616161] font-[400] max-w-[675px] text-center">
                يبدو أنه لا توجد فواتير في الوقت الحالي. يمكنك متابعة المعاملات
                القادمة أو إضافة فواتير جديدة لتبدأ المتابعة.
              </p>
            </div>
          ) : (
            <div className="w-full mt-[24px]">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-[24px]">
                {/* <PharmacyCard data={userFake} dispaly_status={true} /> */}
                {selectedstatus.status == "الكل" ? (
                  <>
                    {bills.map((ele, index) => (
                      <PharmacyCard
                        key={index}
                        data={ele}
                        dispaly_status={true}
                        link={'bills'}
                      />
                    ))}
                  </>
                ) : selectedstatus.status == "فواتير مضافة" ? (
                  <>
                    {addedInvoices.map((ele, index) => (
                      <PharmacyCard
                        key={index}
                        data={ele}
                        dispaly_status={true}
                        link={'bills'}
                      />
                    ))}
                  </>
                ) : selectedstatus.status == "فواتير لم تضاف" ? (
                  <>
                    {notAddedInvoices.map((ele, index) => (
                      <PharmacyCard
                        key={index}
                        dispaly_status={true}
                        data={ele}
                        link={'bills'}
                      />
                    ))}
                  </>
                ) : null}
              </div>
              <Link
                href={""}
                className={`flex mt-[15px] items-center w-full text-center mx-auto  justify-center text-Basic space-x-[5px] cursor-pointer`}
              >
                <p className="text-[16px] underline">عرض المزيد</p>
                <FaArrowLeftLong />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
