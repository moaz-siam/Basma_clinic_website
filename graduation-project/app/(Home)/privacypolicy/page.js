import Breadcrumb from "@/components/pageProps/Breadcrumb";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <Breadcrumb
          titleTop={"سياسة الخصوصية"}
          titlesection={"المساعدة"}
          path={["ساسية الخصوصية"]}
        />
        <div className="my-[30px]">
          <p className="md:text-[20px] text-[18px] text-[#616161]">
            {" "}
            في بصمة طبية، نحن نأخذ خصوصيتك على محمل الجد وملتزمون بحماية
            معلوماتك الشخصية. تشرح هذه السياسة كيفية جمع واستخدام وحماية
            البيانات التي تقدمها لنا عند استخدامك للموقع.
          </p>
          <div className="mt-[24px]">
            <h3 className="md:text-[30px] text-[25px] font-[600]">جمع البيانات</h3>
            <p className="md:text-[20px] text-[18px] text-[#616161] mt-[15px]">
              قوم بجمع المعلومات الشخصية مثل الاسم، العمر، العنوان، التفاصيل
              الصحية، وأي معلومات إضافية يتم تقديمها أثناء التسجيل أو استخدام
              الخدمات.
            </p>
          </div>
          <div className="mt-[24px]">
            <h3 className="md:text-[30px] text-[25px] font-[600]">كيفية استخدام البيانات</h3>
            <p className="md:text-[20px] text-[18px] text-[#616161] mt-[15px]">
            نستخدم البيانات التي نجمعها لتحسين خدماتنا وتقديم استشارات طبية دقيقة. يمكننا أيضًا إرسال إشعارات حول حالة طلباتك أو
            العروض الجديدة
            </p>
          </div>
          <div className="mt-[24px]">
            <h3 className="md:text-[30px] text-[25px] font-[600]">كيفية استخدام البيانات</h3>
            <p className="md:text-[20px] text-[18px] text-[#616161] mt-[15px]">
            نلتزم بحماية بياناتك باستخدام تقنيات متطورة مثل التشفير. لن نشارك معلوماتك مع أطراف ثالثة دون موافقتك المسبقة.
            التعديلات على السياسة
            </p>
          </div>
            <p className="md:text-[20px] text-[18px] text-[#424242] mt-[24px]">
            قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر، لذا ننصحك بمراجعتها بشكل دوري
            </p>
        </div>
      </div>
    </div>
  );
}
