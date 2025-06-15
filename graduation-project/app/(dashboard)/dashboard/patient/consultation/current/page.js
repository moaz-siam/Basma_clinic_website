"use client";
import ConsultationCard from "@/components/dashboard/consultationCard";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
import { getConsultations } from "@/redux/slice/patientSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CurrentConsultationpage() {
  const { patient, isLoading } = useSelector((state) => state.patient);
  const [consultations, setConsultations] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConsultations()).then((res) =>
      setConsultations(res?.payload?.data)
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
            <SkeletonCard />
          </div>
        ) : (
          <div className="w-full mt-[24px]">
            <div className="space-y-[24px]">
              {consultations.map((cons, index) => (
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
