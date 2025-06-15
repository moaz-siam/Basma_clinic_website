import Accordion from "@/components/pageProps/Accordion";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import { SplitStringSmart } from "@/components/pageProps/splitStringSmart";
import { CiSaveDown2 } from "react-icons/ci";

async function getGuide(id) {
  const res = await fetch(`http://localhost:4000/api/getmedicalguide/${id}`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });
  if (!res.ok) {
    throw new Error('حدث خطا غير متوقع')
  }
  return res.json();
}
export default async function SingleGuidePage({ params }) {
  const { guideid } = await params;
  const guide = await getGuide(guideid[1]);
  const guide_data = guide.data[0];

  const content = SplitStringSmart(guide_data.content);
  const FAQsQuestions = SplitStringSmart(guide_data.FAQsQuestions);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <Breadcrumb
          titleTop={`دليلك ${guide_data.category}`}
          titlesection={`دليلك ${guide_data.category}`}
          path={[guide_data.title]}
        />
        <div className="mt-[32px]">
          {content.map((ele) => (
            <div key={ele.title} className="mt-[20px]">
              <h1 className="md:text-[25px] text-[18px]  text-[#212121] font-[700]">
                {ele.title}
              </h1>
              <p className="mt-[16px] text-[#616161]">{ele.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-[20px]">
          <h3 className="md:text-[25px] text-[18px]  text-[#212121] font-[700]">
            الأسئلة الشائعة
          </h3>
          {FAQsQuestions.map((ele, index) => (
            <div key={index} className="mt-[20px]">
              <Accordion title={ele.title} content={ele.content} />
            </div>
          ))}
        </div>
        <div className="bg-[#EEF1FF80] flex justify-center items-center text-center py-[40px] mt-[24px]">
          <div className="flex justify-center items-center flex-col">
            <h3 className="md:text-[30px] text-[20px]">
              حمّل دليلك نحو صحة نفسية متوازنة!
            </h3>
            <p className="text-[#616161] text-[18px] mt-[10px]">
              اكتشف استراتيجيات فعالة للحفاظ على صحتك النفسية وتحسين جودة حياتك
              اليومية.
            </p>
            <button className="mt-[20px] px-[34px] py-[10px] flex items-center justify-center bg-Basic text-white rounded-[8px] gap-[8px] cursor-pointer">
            تحميل الدليل
            <CiSaveDown2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
