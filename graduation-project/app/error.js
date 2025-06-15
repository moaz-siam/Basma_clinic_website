"use client";

import Header from "@/components/Home/header";
import { useEffect } from "react";
import EmptyState from '@/assets/EmptyState.png'
import Image from "next/image";
export default function Error({ error, reset }) {
  useEffect(() => {
    // يمكنك تسجيل الخطأ هنا أو إرساله إلى خدمة تتبع الأخطاء
    console.error(error);
  }, [error]);

  return (
    <div className="">
      <div className="">
        <Header />
      </div>
      <div className="flex flex-col items-center justify-center h-[85vh] px-4 text-center bg-gray-50">
      <Image src={EmptyState} className="w-auto" alt="error" width={0} height={0}/>
        <h1 className="text-4xl font-bold mb-4 text-Basic">
          عذرًا، حدث خطأ غير متوقع
        </h1>
        <p className="mb-6 text-gray-700">
          نعتذر عن الإزعاج، ولكن هناك مشكلة في تحميل الصفحة.
          
          يرجى المحاولة مرة أخرى.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-Basic text-white rounded-md cursor-pointer transition"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}
