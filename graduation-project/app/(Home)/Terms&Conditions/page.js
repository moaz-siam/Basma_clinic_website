import Breadcrumb from "@/components/pageProps/Breadcrumb";
import React from "react";

export default function TermsConditionsPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <Breadcrumb
          titleTop={"الشروط والأحكام "}
          titlesection={"المساعدة"}
          path={["الشروط والأحكام "]}
        />
        <div className="mt-[30px]">
          <div className="mt-[24px]">
            <h3 className="md:text-[30px] text-[25px] font-[600]">
              الشروط العامة
            </h3>
            <p className="md:text-[20px] text-[18px] text-[#616161] mt-[15px]">
              بمجرد استخدامك لموقع بصمة طبية، فإنك توافق على هذه الشروط
              والأحكام. هذه الشروط تطبق على جميع الزوار والمستخدمين للموقع{" "}
            </p>
          </div>
          <div className="mt-[24px]">
            <h3 className="md:text-[30px] text-[25px] font-[600]">
              الخدمات المقدمة
            </h3>
            <p className="md:text-[20px] text-[18px] text-[#616161] mt-[15px]">
              نحن نقدم خدمات طبية استشارية، فحوصات، وتحاليل، بالإضافة إلى بعض
              الخدمات المتخصصة مثل الرعاية الصحية للنساء الحوامل والأمهات الجدد.
              جميع الخدمات متاحة حسب سياسة الشركة.
            </p>
          </div>
          <div className="mt-[24px]">
            <h3 className="md:text-[30px] text-[25px] font-[600]">المسؤولية</h3>
            <p className="md:text-[20px] text-[18px] text-[#616161] mt-[15px]">
              نحن نقدم خدمات طبية مبنية على أعلى المعايير، ولكن لا نتحمل
              المسؤولية عن أي آثار غير متوقعة قد تحدث نتيجة لاستخدام الخدمات أو
              المعلومات التي تم تقديمها عبر الموقع.
            </p>
          </div>
          <div className="mt-[24px]">
            <h3 className="md:text-[30px] text-[25px] font-[600]">
              حقوق الملكية
            </h3>
            <p className="md:text-[20px] text-[18px] text-[#616161] mt-[15px]">
              المحتوى الموجود على الموقع (مثل النصوص، الصور، والشعارات) هو ملك
              لـ بصمة طبية ولا يجوز لك نسخه أو توزيعه دون إذن مسبق.
            </p>
          </div>
          <div className="mt-[24px]">
            <h3 className="md:text-[30px] text-[25px] font-[600]">
              تعديل الشروط
            </h3>
            <p className="md:text-[20px] text-[18px] text-[#616161] mt-[15px]">
              نحتفظ بحق تعديل الشروط والأحكام في أي وقت، وسيتم إشعار المستخدمين
              بأي تغييرات من خلال الموقع.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
