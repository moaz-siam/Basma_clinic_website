"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // استيراد وحدة التنقل
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // أيقونات الأسهم
import homereadsec1 from "@/assets/homereadsec1.png";
import homereadsec2 from "@/assets/homereadsec2.png";
import homereadsec3 from "@/assets/homereadsec3.png";
import { FaArrowLeftLong } from "react-icons/fa6";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SkeletonCardSwiper } from "@/components/Skeleton/SkeletonCard";
export default function SwiperArticles({ articles, id, titletop }) {
  const [data, setData] = useState(articles ? articles : []); // لتخزين البيانات المسترجعة من الـ API
  const [loading, setLoading] = useState(articles ? false : true); // لتتبع حالة التحميل
  const [error, setError] = useState(null); // لتخزين الأخطاء إذا حدثت

  useEffect(() => {
    // دالة غير متزامنة لإجراء الطلب
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/resources"); // استبدل بالـ API الفعلي
        if (!response.ok) {
          throw new Error("شبكة غير مستقرة");
        }
        const result = await response.json();
        setData(result.articles); // تعيين البيانات المسترجعة
        setLoading(false); // إنهاء حالة التحميل
      } catch (error) {
        setError(error.message); // تعيين الخطأ في حال حدوثه
        setLoading(false); // إنهاء حالة التحميل
      }
    };

    if (articles?.length === 0 || !articles) {
      fetchData();
    }
  }, [articles]); // [] عني أن الطلب سيحدث عند تحميل المكون فقط
  // 

  if (loading) return <SkeletonCardSwiper />;
  if (error) return <div>حدث خطأ: {error}</div>;

  return (
    <div className="w-full h-full">
      <div className="mx-auto container my-[32px] relative px-4">
        <div className="flex justify-between items-center w-full mb-[30px]">
          <h3 className="text-[25px] font-[700]">
            {titletop || data[0].category}
          </h3>
          <div className="space-x-[8px]">
            <button
              className={`custom-prev-articles-${id} bg-Basic text-white p-1 rounded-full cursor-pointer`}
            >
              <FaChevronRight size={20} />
            </button>
            <button
              className={`custom-next-articles-${id} bg-Basic text-white p-1 rounded-full cursor-pointer`}
            >
              <FaChevronLeft size={20} />
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination]} // تفعيل التنقل بالسهم
          spaceBetween={20} // المسافة بين العناصر
          slidesPerView={3} // عرض 3 بطاقات معًا
          navigation={{
            nextEl: `.custom-next-articles-${id}`,
            prevEl: `.custom-prev-articles-${id}`,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            el: `#custom-pagination-${id}`,
          }}
          breakpoints={{
            1024: { slidesPerView: 3 }, // شاشات اللابتوب: عرض 3 بطاقات
            768: { slidesPerView: 2 }, // شاشات التابلت: عرض بطاقتين
            340: { slidesPerView: 1 }, // شاشات الجوال: عرض بطاقة واحدة
          }}
        >
          {data.map((art) => (
            <SwiperSlide key={art.id}>
              <div className="p-[16px] shadow-md rounded-2xl md:text-start text-center bg-white">
                <Image
                  src={art.image_url}
                  width={384}
                  height={175}
                  className="w-auto h-full object-fill mb-[15px]"
                  alt="Error Img"
                />
                <h3 className="text-[18px] mb-[8px]">{art.title}</h3>
                <p className="mb-[20px] text-[#757575]">
                  صائح فعّالة للتعامل مع القلق وطرق التخفيف منه لتحقيق حياة أكثر
                  استقرارًا
                </p>
                <Link
                  className="flex items-center md:justify-start justify-center text-Basic space-x-[5px]"
                  href={`/resources/articles/${art.doctor_name_en
                    .split(" ")
                    .join("-")}/${art.id}`}
                >
                  <p className="text-[16px] underline ">قراءة المزيد</p>
                  <FaArrowLeftLong />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {data.length == 3 ? (
          <Link
            href={"/resources/articles"}
            className={`mt-[50px] flex items-center md:justify-start justify-center text-Basic space-x-[5px] absolute left-[50%] bottom-[-55px]! cursor-pointer`}
          >
            <p className="text-[16px] underline ">عرض المزيد</p>
            <FaArrowLeftLong />
          </Link>
        ) : (
          <div
            id={`custom-pagination-${id}`}
            className={`custom-pagination mt-4 flex justify-center items-center absolute left-[50%] bottom-[-55px]! cursor-pointer`}
          ></div>
        )}
      </div>
    </div>
  );
}
