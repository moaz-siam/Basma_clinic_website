import { month } from "@/assets";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Image from "next/image";
import { RxCalendar } from "react-icons/rx";
import { CgTime } from "react-icons/cg";
import SwiperArticles from "@/components/pageProps/swiper/SwiperArticles ";
import { SplitStringSmart } from "@/components/pageProps/splitStringSmart";

async function getArticle(id) {
  const res = await fetch(`http://localhost:4000/api/getarticle/${id}`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });
  if (!res.ok) {
    throw new Error('حدث خطا غير متوقع')
  }
  return res.json();
}


export default async function ArticlePage({ params }) {
  const { articleid } = await params;
  const article = await getArticle(articleid[1]);
  const article_data = article.data[0];

  const date = article_data.published_at.split("T")[0].split("-");
  const time = article_data.published_at.split("T")[1].split(":");

  const sections = SplitStringSmart(article_data.content);
  // 
  return (
    <div className="w-full">
      <div className=" container mx-auto px-4">
        <Breadcrumb
          titleTop={`مقالات`}
          titlesection={"موارد"}
          path={["مقالات", article_data.title]}
        />
        <div className="mt-[30px]">
          <h3 className="md:text-[30px] text-[20px] text-[#424242] font-[700]">
            {article_data.title}
          </h3>
          <div className="flex justify-between items-center w-full mt-[24px]">
            <div className="flex items-center space-x-[15px]">
              <Image
                src={article_data.doctor_image_url}
                className="object-fill rounded-full"
                width={70}
                height={70}
                alt="Error img"
              />
              <div className="">
                <h3 className="md:text-[18px] text-[16px] text-[#212121]">
                  د.{article_data.doctor_name_ar}
                </h3>
                <span className="text-[#9E9E9E] text-[14px]">
                  {article_data.specialty}
                </span>
              </div>
            </div>
            <div className="">
              {/* date */}
              <div className="flex items-center space-x-[5px]">
                <RxCalendar className=" text-Basic w-[15px] h-[15px]" />
                <div className="text-[14px] text-[#9E9E9E] flex items-center space-x-[3px]">
                  <span>{date[2]}</span>
                  <h3>
                    {month.map((ele) => (
                      <span key={ele.monthNumber}>
                        {date[1] == ele.monthNumber && ele.monthName.trim()}
                      </span>
                    ))}
                  </h3>
                  <span>{date[0]}</span>
                </div>
              </div>
              {/* time */}
              <div className="flex items-center space-x-[5px]">
                <CgTime className=" text-Basic w-[15px] h-[15px]" />
                <div className="text-[14px] text-[#9E9E9E] flex items-center space-x-[3px]">
                  <span>{time[1]}</span>
                  <span>:</span>
                  <span>{time[0]}</span>
                  <span>مساء</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[24px] w-full">
            <Image
              src={article_data.image_url}
              className="w-full h-auto "
              alt="img Error"
            />
          </div>
          <div className="mt-[30px]">
            {sections.map((ele) => (
              <div key={ele.title} className="mt-[20px]">
                <h1 className="md:text-[25px] text-[18px]  text-[#212121] font-[700]">
                  {ele.title}
                </h1>
                <p className="mt-[16px] text-[#616161]">{ele.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#EEF1FF80] flex justify-center items-center py-[40px] mt-[24px]">
          <div>
            <h3 className="md:text-[30px] text-[20px]">
              هل كان المقال مفيدًا؟
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
          <SwiperArticles id={"articleid"} titletop={'مواضيع قد تهمك'}/>
        </div>
      </div>
    </div>
  );
}
