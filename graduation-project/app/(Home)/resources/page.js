import Breadcrumb from "@/components/pageProps/Breadcrumb";
import SwiperArticles from "@/components/pageProps/swiper/SwiperArticles ";
import SwiperInstructions from "@/components/pageProps/swiper/Swiperinstructions";
import SwiperMedicalguide from "@/components/pageProps/swiper/SwiperMedicalGuide";
import SwiperVideos from "@/components/pageProps/swiper/SwiperVideos";
import Link from "next/link";

async function getResources() {
  const res = await fetch(`http://localhost:4000/api/resources`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });
  if (!res.ok) {
    throw new Error("حدث خطا غير متوقع");
  }
  return res.json();
}

async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="w-full">
      <div className=" container mx-auto px-4 ">
        <Breadcrumb titleTop={`موارد`} titlesection={"موارد"} />
        <div>
          <SwiperArticles
            id={"articleres"}
            articles={resources.articles.slice(0, 3)}
            titletop={"المقالات"}
          />
        </div>
        <div className="">
          <SwiperVideos
            id={"videores"}
            titletop={"فيديوهات"}
            videos={resources.videos.slice(0, 3)}
          />
        </div>

        <div className="w-full">
          <h3 className="text-[30px] mb-[20px] font-[700]">تصنيفات</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 w-full gap-[20px]">
            <Link
              href={"/resources/articles"}
              className="px-[100px] py-[25px] bg-white shadow-sm font-[600] rounded-[16px] text-center hover:bg-Basic hover:text-white duration-200 ease-in-out text-[18px] cursor-pointer"
            >
              مقالات
            </Link>
            <Link
              href={"/resources/videos"}
              className="px-[100px] py-[25px] bg-white shadow-sm font-[600] rounded-[16px] text-center hover:bg-Basic hover:text-white duration-200 ease-in-out text-[18px] cursor-pointer"
            >
              فيديوهات
            </Link>
            <Link
              href={"/resources/medicalguide"}
              className="px-[100px] py-[25px] bg-white shadow-sm font-[600] rounded-[16px] text-center hover:bg-Basic hover:text-white duration-200 ease-in-out text-[18px] cursor-pointer"
            >
              دليل طبي
            </Link>
            <Link
              href={"/resources/instructions"}
              className="px-[80px] py-[25px] bg-white shadow-sm font-[600] rounded-[16px] text-center hover:bg-Basic hover:text-white duration-200 ease-in-out text-[18px] cursor-pointer"
            >
              ارشادات و نصائح
            </Link>
          </div>
        </div>

        <div className="">
          <SwiperInstructions
            id={"instructionsres"}
            titletop={"ارشادات"}
            videos={resources.instructions.slice(0, 3)}
          />
        </div>
        <div className="">
          <SwiperMedicalguide
            id={"medicalguide"}
            titletop={"دليل طبي"}
            medicalguide={resources.Medical_Guide.slice(0, 3)}
          />
        </div>
      </div>
    </div>
  );
}

export default ResourcesPage;
