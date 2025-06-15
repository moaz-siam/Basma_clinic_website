import { FAQsConsult } from "@/assets";
import Accordion from "@/components/pageProps/Accordion";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Consultation from "@/components/pageProps/Consultation";
import React from "react";

export default function ConsultPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <Breadcrumb titleTop={"اطلب استشارتك"} titlesection={"اطلب استشارتك"} />
        <div className="mt-[25px]">
          <div className="mt-[24px]">
            <h3 className="md:text-[30px] text-[25px] font-[600]">
              اطلب استشارتك الآن بكل سهولة!
            </h3>
            <p className="md:text-[20px] text-[18px] text-[#616161] mt-[15px]">
              إذا كنت بحاجة إلى استشارة طبية موثوقة، نوفر لك خدمة الاستشارات
              الطبية عن بُعد مع مختصين في مختلف المجالات الصحية. احصل على نصيحة
              طبية دقيقة وأنت في مكانك، دون الحاجة إلى زيارة العيادة.
            </p>
          </div>
          <div className="mt-[24px]">
            <h3 className="md:text-[30px] text-[25px] font-[600]">
              لماذا تختار خدمتنا؟
            </h3>
            <ul className="md:text-[20px] text-[18px] text-[#616161] mt-[15px] list-decimal">
              <li>
                راحة وسهولة – احصل على استشارتك الطبية من منزلك أو أي مكان آخر
              </li>
              <li>
                أطباء متخصصون – نخبة من الأطباء الموثوقين في مختلف التخصصات
              </li>
              <li>سرية تامة – جميع استشاراتك تبقى خاصة وآمنة</li>
              <li>دقة ووضوح – إجابات واضحةونصائح عملية لحالتك الصحية</li>
              <li>
                متابعة شاملة – إمكانية المتابعة والاستفسار عن حالتك عند الحاجة
              </li>
            </ul>
          </div>
          <div className="mt-[24px]">
            <h3 className="md:text-[30px] text-[25px] font-[600]">
              كيف تعمل الخدمة؟
            </h3>
            <ul className="md:text-[20px] text-[18px] text-[#616161] mt-[15px] list-decimal">
              <li>احجز استشارتك عبر الموقع أو التطبيق بكل سهولة</li>
              <li> حدد حالتك الصحية واختر التخصص المناسب</li>
              <li> تحدث مع الطبيب مباشرة عبر مكالمة صوتية أو كتابية</li>
              <li>
                احصل على توصيات وإرشادات طبية دقيقة تساعدك في اتخاذ القرار
                الصحيح
              </li>
            </ul>
          </div>
          <div className="mt-[24px]">
            <h3 className="md:text-[30px] text-[25px] font-[600]">
              الأسئلة الشائعة
            </h3>
            {FAQsConsult.map((ele, index) => (
              <div key={index} className="mt-[20px]">
                <Accordion title={ele.title} content={ele.content} />
              </div>
            ))}
          </div>
          <div>
            <Consultation title_top={'ابدأ الآن واحصل على استشارتك الخاصة !'} title_bottom={'سواء كنت تعاني من مشكلة صحية، تحتاج إلى استشارة طبية متخصصة، أو تبحث عن نصيحة موثوقة، نحن هنا لمساعدتك. لا تنتظر حتى تتفاقم الأعراض استشر طبيبًا الآن واتخذ الخطوة الأولى نحو صحتك المثالية.'}/>
          </div>
        </div>
      </div>
    </div>
  );
}
