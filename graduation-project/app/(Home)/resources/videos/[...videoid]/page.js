import Breadcrumb from "@/components/pageProps/Breadcrumb";
import { SplitStringSmart } from "@/components/pageProps/splitStringSmart";
import SwiperArticles from "@/components/pageProps/swiper/SwiperArticles ";
import Image from "next/image";

async function getVideo(id) {
  const res = await fetch(`http://localhost:4000/api/getvideo/${id}`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });
  if (!res.ok) {
    throw new Error("حدث خطا غير متوقع");
  }
  return res.json();
}
export default async function VideosinglePage({ params }) {
  const { videoid } = await params;
  const video = await getVideo(videoid[1]);

  const video_data = video.data[0];
  const sections = SplitStringSmart(video_data.content);
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <Breadcrumb
          titleTop={"فيديوهات"}
          titlesection={"موارد"}
          path={["موارد", video_data.title]}
        />
        <div className="mt-[35px]">
          <div>
            <Image
              src={video_data?.image_url}
              alt="Error img"
              className="object-fill w-full"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="mt-[30px]">
          {sections.map((ele) => (
            <div key={ele.title} className="mt-[20px]">
              <h1 className="md:text-[25px] text-[18px]  text-[#212121] font-[700]">
                {ele.title}
              </h1>
              <div>
                {ele.content.split(".").map((ele, index) => (
                  <p key={index} className="mt-[16px] text-[#616161]">
                    {ele}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#EEF1FF80] flex justify-center items-center py-[40px] mt-[24px]">
          <div>
            <h3 className="md:text-[30px] text-[20px]">
              هل كان الفيديو مفيدًا؟
            </h3>
            <div className="flex justify-center items-center mt-[24px] space-x-[20px]">
              <button className=" flex justify-center items-center w-[80px] h-[80px] border-1 border-Basic rounded-full hover:bg-Basic cursor-pointer hover:text-white font-bold duration-300 ease-in-out">
                نعم
              </button>
              <button className=" flex justify-center items-center w-[80px] h-[80px] border-1 border-Basic rounded-full hover:bg-Basic cursor-pointer hover:text-white font-bold duration-300 ease-in-out">
                لا
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <SwiperArticles id={"articleid"} titletop={"مواضيع قد تهمك"} />
        </div>
      </div>
    </div>
  );
}
