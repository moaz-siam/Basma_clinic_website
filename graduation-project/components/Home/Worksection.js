import React from "react";
import TitleTop from "./titleTop";
import Image from "next/image";
import worksecimg1 from "@/assets/worksecimg1.png";
import worksecimg2 from "@/assets/worksecimg2.png";
import worksecimg3 from "@/assets/worksecimg3.png";
import worksecimg4 from "@/assets/worksecimg4.png";
import worksecimg5 from "@/assets/worksecimg5.png";

const TitleDiv = ({ title, parg }) => {
  return (
    <div className="space-x-[15px] my-[70px]">
      <h3 className=" text-[18px] font-[700]">{title}</h3>
      <p className="text-[14px] text-[#757575] max-w-[425px]">{parg}</p>
    </div>
  );
};
function Worksection() {
  return (
    <div className="w-full h-full">
      <div className="mx-auto container py-[32px] px-4">
        <TitleTop
          title1={"ألية عملنا"}
          title2={"كيف تعمل منصتنا؟"}
          Mediation1={"center"}
          Mediation2={"center"}
        />
        <div className="w-full h-full flex md:flex-row flex-col items-center justify-center md:space-x-[55px] mt-[40px]">
          <div className="">
            <Image
              src={worksecimg1}
              alt={"Error Img"}
              className="w-auto h-[200px]"
            />
            <TitleDiv
              title={"حجز استشارة طبية بسهولة"}
              parg={
                "احجز موعدًا مع طبيب مختص خلال دقائق عبر منصتنا. نوفر لك استشارات مباشرة أو عن بُعد لمساعدتك أينما كنت. استلم تأكيد الحجز وتواصل مع طبيبك في الوقت المحدد"
              }
            />
            <Image
              src={worksecimg2}
              alt={"Error Img"}
              className="w-auto h-[200px]"
            />
            <TitleDiv
              title={"الاستفادة من الدعم النفسي"}
              parg={
                "احصل على استشارات نفسية تساعدك في التعامل مع التوتر والقلق. تواصل مع مختصين في الصحة النفسية لدعمك في رحلتك العلاجية. استكشف نصائح وتمارين لتعزيز صحتك العقلية والعاطفية."
              }
            />
            <Image
              src={worksecimg3}
              alt={"Error Img"}
              className="w-auto h-[200px]"
            />
          </div>
          <div className="w-[5px]  hidden rounded-3xl h-[1090px] bg-Basic md:flex flex-col justify-center items-center space-y-50">
            <div className="w-[24px] h-[24px] bg-Basic outline-8 outline-[#4535C11A] rounded-full"></div>
            <div className="w-[24px] h-[24px] bg-Basic outline-8 outline-[#4535C11A] rounded-full"></div>
            <div className="w-[24px] h-[24px] bg-Basic outline-8 outline-[#4535C11A] rounded-full"></div>
            <div className="w-[24px] h-[24px] bg-Basic outline-8 outline-[#4535C11A] rounded-full"></div>
            <div className="w-[24px] h-[24px] bg-Basic outline-8 outline-[#4535C11A] rounded-full"></div>
          </div>
          <div className="">
            <TitleDiv
              title={"البحث عن الخدمات الطبية"}
              parg={
                "تصفح خدماتنا المتنوعة، مثل الاستشارات الطبية، الدعم النفسي، والدليل الطبي. نوفر لك حلولًا صحية مصممة لتناسب احتياجاتك بسهولة. ابحث عن الخدمة المناسبة لك وابدأ رحلتك الصحية بثقة"
              }
            />
            <Image
              src={worksecimg4}
              alt={"Error Img"}
              className="w-auto h-[200px]"
            />
            <TitleDiv
              title={"الوصول إلى محتوى طبي موثوق"}
              parg={
                "اقرأ مقالات موثوقة حول مواضيع الصحة الجسدية والنفسية. يتم مراجعة المحتوى من قبل مختصين لضمان دقته وفائدته. ابقَ على اطلاع دائم بأحدث المعلومات الصحية الموثوقة."
              }
            />
            <Image
              src={worksecimg5}
              alt={"Error Img"}
              className="w-auto h-[200px]"
            />
            <TitleDiv
              title={"الاشتراك في الخدمات الطبية المخصصة"}
              parg={
                "تابع أحدث الخدمات والبرامج الصحية المصممة لاحتياجاتك. احصل على توصيات طبية وشخصية تناسب حالتك الصحية. استمتع بتجربة مريحة وسهلة للوصول إلى الرعاية التي تحتاجها."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Worksection;
