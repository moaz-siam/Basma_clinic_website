"use client";

import { useEffect } from "react";

export default function Error({ error }) {
  useEffect(() => {
    // يمكنك تسجيل الخطأ هنا أو إرساله إلى خدمة تتبع الأخطاء
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-red-600">
        عذرًا، حدث خطأ غير متوقع
      </h1>
      <p className="mb-6 text-gray-700">
        نعتذر عن الإزعاج، ولكن هناك مشكلة في تحميل الصفحة.
        <br />
        يرجى المحاولة مرة أخرى.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}
