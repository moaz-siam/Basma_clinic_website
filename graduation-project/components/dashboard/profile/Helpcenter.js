"use client";
import React, { useState } from "react";
import { BiSupport } from "react-icons/bi";
import { TiMessages } from "react-icons/ti";
import { MdOutlineSecurity } from "react-icons/md";
import { FaFileCircleExclamation } from "react-icons/fa6";
import Accordion from "@/components/pageProps/Accordion";
import { FAQs } from "@/assets";

const HelpcenterCard = [
  {
    id: 1,
    icon: <FaFileCircleExclamation />,
    lable: "الشروط والأحكام",
    parg: "تعرف على القوانين والسياسات التي تنظم استخدامك لخدمات الموقع.",
    path: "terms",
  },
  {
    id: 2,
    icon: <MdOutlineSecurity />,
    lable: "سياسة الخصوصية",
    parg: "تعرف على كيفية جمع بياناتك الشخصية، واستخدامها، وحمايتها ضمن المنصة.",
    path: "security",
  },
  {
    id: 3,
    icon: <BiSupport />,
    lable: "الدعم الفني",
    parg: "تواصل مع فريق الدعم الفني في حال واجهتِ أي مشكلة أثناء استخدام المنصة.",
    path: "support",
  },
  {
    id: 4,
    icon: <TiMessages />,
    lable: "الأسئلة الشائعة",
    parg: "اطّلع على إجابات لأكثر الأسئلة التي تصلنا من المستخدمين بشكل متكرر.",
    path: "messages",
  },
];

export default function Helpcenter() {
  const [currentcontent, setCurrentcontent] = useState(null);
  return (
    <div className="w-full">
      {currentcontent == "terms" ? (
        <div className="">
        <div className=" flex justify-between items-center">
            <h3 className="text-[20px] font-[700]">الشروط و الاحكام</h3>
            <span
              className=" text-Basic font-[600] cursor-pointer"
              onClick={() => setCurrentcontent(null)}
            >
              الرجوع لمركز المساعدة
            </span>
          </div>
          <div className="mt-[30px]">
            <div className="mt-[24px]">
              <h3 className="md:text-[22px] text-[18px] font-[600]">
                الشروط العامة
              </h3>
              <p className="md:text-[16px] text-[14px] text-[#616161] mt-[15px]">
                بمجرد استخدامك لموقع بصمة طبية، فإنك توافق على هذه الشروط
                والأحكام. هذه الشروط تطبق على جميع الزوار والمستخدمين للموقع{" "}
              </p>
            </div>
            <div className="mt-[24px]">
              <h3 className="md:text-[22px] text-[18px] font-[600]">
                الخدمات المقدمة
              </h3>
              <p className="md:text-[16px] text-[14px] text-[#616161] mt-[15px]">
                نحن نقدم خدمات طبية استشارية، فحوصات، وتحاليل، بالإضافة إلى بعض
                الخدمات المتخصصة مثل الرعاية الصحية للنساء الحوامل والأمهات
                الجدد. جميع الخدمات متاحة حسب سياسة الشركة.
              </p>
            </div>
            <div className="mt-[24px]">
              <h3 className="md:text-[22px] text-[18px] font-[600]">
                المسؤولية
              </h3>
              <p className="md:text-[16px] text-[14px]  text-[#616161] mt-[15px]">
                نحن نقدم خدمات طبية مبنية على أعلى المعايير، ولكن لا نتحمل
                المسؤولية عن أي آثار غير متوقعة قد تحدث نتيجة لاستخدام الخدمات
                أو المعلومات التي تم تقديمها عبر الموقع.
              </p>
            </div>
            <div className="mt-[24px]">
              <h3 className="md:text-[22px] text-[18px] font-[600]">
                حقوق الملكية
              </h3>
              <p className="md:text-[16px] text-[14px]  text-[#616161] mt-[15px]">
                المحتوى الموجود على الموقع (مثل النصوص، الصور، والشعارات) هو ملك
                لـ بصمة طبية ولا يجوز لك نسخه أو توزيعه دون إذن مسبق.
              </p>
            </div>
            <div className="mt-[24px]">
              <h3 className="md:text-[22px] text-[18px] font-[600]">
                تعديل الشروط
              </h3>
              <p className="md:text-[16px] text-[14px]  text-[#616161] mt-[15px]">
                نحتفظ بحق تعديل الشروط والأحكام في أي وقت، وسيتم إشعار
                المستخدمين بأي تغييرات من خلال الموقع.
              </p>
            </div>
          </div>
        </div>
      ) : currentcontent == "security" ? (
        <div className="">
        <div className=" flex justify-between items-center">
            <h3 className="text-[20px] font-[700]">سياسة الخصوصية</h3>
            <span
              className=" text-Basic font-[600] cursor-pointer"
              onClick={() => setCurrentcontent(null)}
            >
              الرجوع لمركز المساعدة
            </span>
          </div>
          <div className="my-[30px]">
            <p className="md:text-[16px] text-[14px] text-[#616161]">
              {" "}
              في بصمة طبية، نحن نأخذ خصوصيتك على محمل الجد وملتزمون بحماية
              معلوماتك الشخصية. تشرح هذه السياسة كيفية جمع واستخدام وحماية
              البيانات التي تقدمها لنا عند استخدامك للموقع.
            </p>
            <div className="mt-[24px]">
              <h3 className="md:text-[22px] text-[18px] font-[600]">
                جمع البيانات
              </h3>
              <p className="md:text-[16px] text-[14px] text-[#616161] mt-[15px]">
                قوم بجمع المعلومات الشخصية مثل الاسم، العمر، العنوان، التفاصيل
                الصحية، وأي معلومات إضافية يتم تقديمها أثناء التسجيل أو استخدام
                الخدمات.
              </p>
            </div>
            <div className="mt-[24px]">
              <h3 className="md:text-[22px] text-[18px] font-[600]">
                كيفية استخدام البيانات
              </h3>
              <p className="md:text-[16px] text-[14px] text-[#616161] mt-[15px]">
                نستخدم البيانات التي نجمعها لتحسين خدماتنا وتقديم استشارات طبية
                دقيقة. يمكننا أيضًا إرسال إشعارات حول حالة طلباتك أو العروض
                الجديدة
              </p>
            </div>
            <div className="mt-[24px]">
              <h3 className="md:text-[22px] text-[18px] font-[600]">
                كيفية استخدام البيانات
              </h3>
              <p className="md:text-[16px] text-[14px] text-[#616161] mt-[15px]">
                نلتزم بحماية بياناتك باستخدام تقنيات متطورة مثل التشفير. لن
                نشارك معلوماتك مع أطراف ثالثة دون موافقتك المسبقة. التعديلات على
                السياسة
              </p>
            </div>
            <p className="md:text-[20px] text-[18px] text-[#424242] mt-[24px]">
              قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر، لذا ننصحك بمراجعتها
              بشكل دوري
            </p>
          </div>
        </div>
      ) : currentcontent == "messages" ? (
        <div className="">
        <div className=" flex justify-between items-center">
            <h3 className="text-[20px] font-[700]">الاسئلة الشائعة</h3>
            <span
              className=" text-Basic font-[600] cursor-pointer"
              onClick={() => setCurrentcontent(null)}
            >
              الرجوع لمركز المساعدة
            </span>
          </div>
          {FAQs.map((ele, index) => (
            <div key={index} className="mt-[20px]">
              <Accordion title={ele.title} content={ele.content} />
            </div>
          ))}
        </div>
      ) : currentcontent == "support" ? (
        <div className="w-full">
          <div className=" flex justify-between items-center">
            <h3 className="text-[20px] font-[700]"> الدعم الفني</h3>
            <span
              className=" text-Basic font-[600] cursor-pointer"
              onClick={() => setCurrentcontent(null)}
            >
              الرجوع لمركز المساعدة
            </span>
          </div>
          <p className="text-[15px] text-[#616161] mt-[15px]">
            نحن دائمًا هنا لمساعدتك في بصمة طبية. إذا واجهت أي مشكلة، لا تتردد
            في التواصل معنا
          </p>
          <div className="mt-[30px]">
            <h3 className="text-[18px] font-[600]">رسالتك</h3>
            <textarea
              // onChange={(e) => handleSymptoms(e)}
              name=""
              id=""
              className="w-full mt-[10px] h-[300px] focus:outline-none bg-white rounded-[16px] shadow-sm py-[13px] px-[16px] placeholder:text-[#DADADA]"
              placeholder="اكتب مشكلتك هنا .. وسنتواصل معك في أقرب وقت "
            ></textarea>
          </div>
          <button className=" bg-Basic focus:outline-none rounded-[8px] mt-[24px] py-[9px] font-[600] text-[14px] w-full text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out">
            ارسال
          </button>
        </div>
      ) : (
        <div className="">
          <h3 className="text-[20px] font-[700]">مركز المساعدة</h3>
          <div className="mt-[24px] w-full">
            <h3 className="text-[22px] font-[600] text-center">
              كيف يمكننا مساعدتك؟
            </h3>
            <div className="grid  lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[16px] w-full mt-[24px]">
              {HelpcenterCard.map((ele) => (
                <div
                  key={ele.id}
                  onClick={() => setCurrentcontent(ele.path)}
                  className="bg-white p-[35px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex flex-col w-full items-center justify-center rounded-[16px] gap-[5px] cursor-pointer group hover:bg-Basic duration-200 ease-in-out"
                >
                  <div className=" text-Basic group-hover:text-white">
                    {ele.icon}
                  </div>
                  <h3 className="text-[15px] text-[#424242] font-[600] group-hover:text-white">
                    {ele.lable}
                  </h3>
                  <p className="text-[#616161] text-[12px] font-[600] text-center group-hover:text-white">
                    {ele.parg}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[24px]">
            <h3 className="text-[22px] font-[700]">الأسئلة الشائعة</h3>
            <div className=" space-y-[16px] mt-[16px]">
              <Accordion
                title={"هل البيانات الشخصية والطبية محفوظة بشكل آمن؟"}
              />
              <Accordion title={"هل يوجد دعم فني في حال واجهت مشكلة؟"} />
              <Accordion title={"كيف أستفيد من خدمة دعم حديثات الولادة؟"} />
              <Accordion
                title={"هل يمكنني استخدام الموقع من الهاتف المحمول؟"}
              />
              <Accordion title={"كيف يمكنني معرفة أن حالتي تحتاج تدخل طارئ؟"} />
              <Accordion title={"هل يوجد محتوى تعليمي أو توعوي داخل الموقع؟"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
