import Footer from "@/components/Home/footer";
import Search from "@/components/Home/Search";
import Image from "next/image";
import SwiperArticles from "@/components/pageProps/swiper/SwiperArticles ";
import searchEmpty from "@/assets/Search_empty.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";

import Link from "next/link";
import { Suspense } from "react";
async function getSearch(query) {
  const res = await fetch(`http://localhost:4000/api/search?query=${query}`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });

  if (!res.ok) {
    throw new Error("فشل في جلب البيانات");
  }

  return res.json();
}

export default async function SearchPage({ searchParams }) {
  const { query } = (await searchParams) || ""; // استخراج قيمة `q` من `searchParams`
  let result = null;

  if (query) {
    result = await getSearch(query);
  }
  // console.log();

  return (
    <div className="w-full bg-[#FAFAFA]">
      <div className="container mx-auto px-4 pt-[40px]">
        <div className={``}>
          <Search data={result} />
          {!query && (
            <div className="w-full mt-[64px]">
              <p className=" text-Basic text-[30px] text-center font-bold">
                اكتب شيئًا للبحث ...
              </p>
              <SwiperArticles id={"articlesearch"} />
            </div>
          )}
          {query && !result.success && (
            <div className="w-full mt-[64px] text-center flex justify-center items-center flex-col">
              <Image src={searchEmpty} className="w-auto" alt="Error img" />
              <h3 className="md:text-[30px] text-[25px]">لا يوجد نتائج بحث</h3>
              <p className="tetx-[20px] text-[#616161]">
                عذرًا لا يوجد نتائج بحث مطابقة لهذا البحث حاول مرة أخرى
              </p>
            </div>
          )}
          {query && result.success && result.data.length > 0 && (
            <div className=" w-full">
              {/* display result */}
              <div className="mt-[40px] text-center">
                <h3 className="md:text-[30px] text-[25px] font-[700]">
                  {query}
                </h3>
                <span className="mt-[4px] text-[#616161] md:text-[20px] text-[18px]">
                  {result.data.length} نتيجة
                </span>
              </div>
              {/* filter */}
              <div className=" flex justify-between items-center mt-[40px]">
                <button className=" flex justify-center items-center gap-[8px] px-[40px] py-[8px] bg-white rounded-lg text-[18px] shadow-md cursor-pointer hover:bg-Basic hover:text-white duration-300 ease-in-out">
                  فلتر
                  <CiFilter />
                </button>
                <button className="flex justify-center items-center gap-[8px] px-[16px] py-[8px] bg-white rounded-lg text-[18px] shadow-md cursor-pointer hover:bg-Basic hover:text-white duration-300 ease-in-out">
                  الأطباء المتاحين
                  <RiArrowDropDownLine />
                </button>
              </div>
              <Suspense
                fallback={<p className="text-gray-500">جارٍ التحميل...</p>}
              >
                <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[16px] mt-[40px]">
                  {result?.data.map((res) => (
                    <div
                      key={res.id}
                      className="p-[16px] shadow-md rounded-2xl md:text-start text-center bg-white"
                    >
                      <div>
                        <Image
                          src={res.image_url}
                          width={384}
                          height={175}
                          className="w-auto h-full object-fill mb-[15px]"
                          alt="Error Img"
                        />
                      </div>
                      <h3 className="text-[18px] mb-[8px]">{res.title}</h3>
                      <p className="mb-[20px] text-[#757575]">
                        صائح فعّالة للتعامل مع القلق وطرق التخفيف منه لتحقيق
                        حياة أكثر استقرارًا
                      </p>
                      <Link
                        className="flex items-center md:justify-start justify-center text-Basic space-x-[5px]"
                        // href={`/resources/articles/${art.doctor_name_en.split(" ").join("-")}/${art.id}`}
                        href={""}
                      >
                        <p className="text-[16px] underline ">قراءة المزيد</p>
                        <FaArrowLeftLong />
                      </Link>
                    </div>
                  ))}
                </div>
              </Suspense>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
