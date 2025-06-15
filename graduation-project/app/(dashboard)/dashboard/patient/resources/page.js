import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Link from "next/link";
import React from "react";

export default function ResourcesPage() {
  return (
    <div className=" w-full">
      <div className="mx-auto container">
        <Breadcrumb titleTop={`موارد`} titlesection={"موارد"} />
        <h3 className="text-[22px] font-[700] text-[#212121] mt-[32px]">
          التصنيفات
        </h3>
        <div className=" grid md:grid-cols-2 grid-cols-1 gap-[16px] mt-[24px]">
          <Link
            href={"/resources/articles"}
            className="p-[24px] bg-white shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-[16px]  hover:bg-Basic hover:text-white ease-in-out duration-200 cursor-pointer group"
          >
            <h3 className="text-[18px] font-[700] text-[#212121] group-hover:text-white duration-200 ease-in-out">
              مقالات
            </h3>
            <p className=" text-[15px] font-[400] text-[#757575] mt-[5px] group-hover:text-white duration-200 ease-in-ou">
              {" "}
              مقالات طبية موثوقة تغطي مواضيع متعلقة بالأمراض، الأعراض، الوقاية،
              والصحة العامة بلغة مبسطة وسهلة الفهم.
            </p>
          </Link>
          <Link
            href={"/resources/videos"}
            className="p-[24px] bg-white shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-[16px]  hover:bg-Basic hover:text-white ease-in-out duration-200 cursor-pointer group"
          >
            <h3 className="text-[18px] font-[700] text-[#212121] group-hover:text-white duration-200 ease-in-out">
              فيديوهات
            </h3>
            <p className=" text-[15px] font-[400] text-[#757575] mt-[5px] group-hover:text-white duration-200 ease-in-ou">
              مجموعة فيديوهات توعوية من مختصين، تشرح معلومات طبية بطريقة مرئية
              مبسطة لتسهيل الفهم وزيادة الوعي الصحي.
            </p>
          </Link>
          <Link
            href={"/resources/medicalguide"}
            className="p-[24px] bg-white shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-[16px]  hover:bg-Basic hover:text-white ease-in-out duration-200 cursor-pointer group"
          >
            <h3 className="text-[18px] font-[700] text-[#212121] group-hover:text-white duration-200 ease-in-out">
              دلائل طبية
            </h3>
            <p className=" text-[15px] font-[400] text-[#757575] mt-[5px] group-hover:text-white duration-200 ease-in-ou">
              دلائل شاملة توضح خطوات التعامل مع الحالات الصحية المختلفة، لمساعدة
              المرضى ومقدمي الرعاية باتخاذ قرارات صحية وواعية.
            </p>
          </Link>
          <Link
            href={"/resources/instructions"}
            className="p-[24px] bg-white shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-[16px]  hover:bg-Basic hover:text-white ease-in-out duration-200 cursor-pointer group"
          >
            <h3 className="text-[18px] font-[700] text-[#212121] group-hover:text-white duration-200 ease-in-out">
              الإرشادات والنصائح
            </h3>
            <p className=" text-[15px] font-[400] text-[#757575] mt-[5px] group-hover:text-white duration-200 ease-in-ou">
              نصائح صحية يومية تتناول التغذية، الاكتئاب، العادات الصحية، والصحة
              النفسية، موجهة لتحسين نمط الحياة لجميع أفراد العائلة.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
