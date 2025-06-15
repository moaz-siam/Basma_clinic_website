import Footer from "@/components/Home/footer";
import Header from "@/components/Home/header";
import { checkAuth } from "@/components/pageProps/auth/check-Auth";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function SymptomanalystPage() {
  
  return (
    <div className="">
      <Header/>
      <div className="w-full">
        <div className="container mx-auto px-4">
          <Breadcrumb titleTop={"محلل الأعراض"} titlesection={"محلل الأعراض"} />
          <div className="mt-[40px]">
            <div className="mt-[24px]">
              <h3 className="md:text-[30px] text-[25px] font-[600]">
                عن الخدمة
              </h3>
              <p className="md:text-[20px] text-[18px] text-[#616161] mt-[15px]">
                محلل الأعراض هو خدمة تعتمد على الذكاء الاصطناعي تساعدك على تحليل
                الأعراض التي تشعر بها. ببساطة، قم بإدخال الأعراض التي تعاني
                منها، وسيقوم المحلل بتقديم تشخيص مبدئي، بالإضافة إلى اقتراحات
                للأدوية، المصادر، والنصائح التي قد تساعدك في التعامل مع حالتك
                الصحية
              </p>
            </div>
            <div className="mt-[24px]">
              <h3 className="md:text-[30px] text-[25px] font-[600]">
                ألية عمل محلل الأعراض
              </h3>
              <ul className="md:text-[20px] text-[18px] text-[#616161] mt-[15px] list-decimal">
                <li>
                  تحديد الجنس والعضو المصاب : ابدأ بتحديد جنسك (ذكر/أنثى) والعضو
                  الذي تعاني منه (مثل الأنف، الحلق، المعدة، إلخ).{" "}
                </li>
                <li>
                  إدخال الأعراض : اكتب الأعراض التي تشعر بها بالتفصيل، مثل
                  الصداع، السعال، أو الحمى.
                </li>
                <li>
                  تحليل الأعراض بالذكاء الاصطناعي : يقوم النظام بتحليل الأعراض
                  بناءً على العضو المحدد ومدخلاتك، ليعطيك تشخيصًا مبدئيًا
                  لحالتك.
                </li>
                <li>
                  عرض النتائج والتوصيات ستحصل على تحليل مبدئي لحالتك الصحية، مع
                  توصيات تشمل:
                  <ul className=" list-disc">
                    <li>
                      التشخيص المحتمل (مثل نزلة برد، التهاب، حساسية، إلخ).
                    </li>
                    <li>
                      نصائح للتعامل مع الأعراض (مثل الراحة، شرب السوائل، تغيير
                      نمط الحياة).
                    </li>
                    <li>
                      اقتراحات للأدوية (إن لزم الأمر، مع تحذير بضرورة استشارة
                      طبيب).
                    </li>
                    <li>مصادر موثوقة لمساعدتك على فهم حالتك بشكل أفضل.</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="mt-[40px]">
            <Link href={'/symptom-analyst/start'} className="py-[9.5px] px-[44px] bg-Basic text-white rounded-[8px] hover:bg-[#2F247F] duration-300 ease-in-out">بدأ التحليل</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
