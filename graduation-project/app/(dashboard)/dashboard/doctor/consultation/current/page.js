"use client";
import ConsultationCard from "@/components/dashboard/consultationCard";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
import { getConsultations } from "@/redux/slice/patientSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import messages from "@/assets/dashboard-img/messages.png";
import { get_Consultations_Doctor } from "@/redux/slice/doctorSlice";

export default function CurrentConsultationDoctorpage() {
  const [consultations_doctor, setConsultations_doctor] = useState([]);
  const { doctor, isLoading } = useSelector((state) => state.doctor);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_Consultations_Doctor()).then((res) =>
      setConsultations_doctor(res?.payload?.data)
    );
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="mx-auto container">
        <Breadcrumb
          titleTop={"استشاراتك الحالية"}
          titlesection={"استشاراتك الحالية"}
        />
        {isLoading ? (
          <div className="space-y-[24px] mt-[24px]">
            <SkeletonCard />
          </div>
        ) : consultations_doctor.length === 0 ? (
          <div className="w-full mt-[24px]">
            <h3 className="font-[700] text-[20px] mb-[25px]">
              استشاراتك الحالية
            </h3>
            <div className="flex flex-col items-center justify-center gap-[15px] text-center">
              <Image
                src={messages}
                width={0}
                height={0}
                alt="error img"
                className="w-auto"
              />
              <h3 className="text-[30px] font-[600] text-[#212121]">
              لا توجد استشارات لمراجعتها
              </h3>
              <p className="text-[18px] text-[#616161] font-[400] max-w-[881px]">
              عندما يتم إرسال استشارة من أحد المرضى، ستظهر هنا لتتمكن من مراجعتها والرد عليها
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full mt-[24px]">
            <div className="space-y-[24px]">
              {consultations_doctor.map((cons, index) => (
                <div key={index} className=" ">
                  <ConsultationCard consultation={cons} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
