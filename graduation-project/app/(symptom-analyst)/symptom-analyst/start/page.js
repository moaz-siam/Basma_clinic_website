"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/Logo.png";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Home/footer";
import Header from "@/components/Home/header";
import axios from "axios";
export default function SymptomanalystStartPage() {
  const [changecontent, setChangecontent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({
    gender: "",
    affectedmember: "",
    symptoms: "",
  });
  const [resultDtat, setResultDtat] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0); // ابدأ من الصفر
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          // إذا وصلت لـ 90% أوقف التحديث وخلي الباقي على استجابة الـ API
          if (prevProgress < 90) {
            return prevProgress + 1;
          } else {
            return prevProgress;
          }
        });
      }, 100); // كل 100 ملي ثانية زيد 1%
    } else {
      clearInterval(interval); // أوقف التحديث لو توقف التحميل
      setProgress(100); // عند الانتهاء خليه 100%
    }
    return () => clearInterval(interval); // تنظيف الـ interval
  }, [loading]);

  const steps = ["اختيار الفئة", "تحديد العضو المصاب", "تحديد الأعراض"];

  const options = [
    {
      label: "امراة",
      value: "امراة",
    },
    {
      label: "رجل",
      value: "رجل",
    },
    {
      label: "طفل",
      value: "طفل",
    },
  ];
  const options2 = [
    "الرأس والعنق",
    "العيون",
    "الأنف والأذن والحنجرة",
    "الساقين",
    "الصدر والظهر",
    "الكلى والأمعاء",
    "الذراعين واليدين",
    "البطن والحوض",
    "المعدة",
    "الكبد",
    "أخرى",
  ];
  const handleGender = (value) => {
    setForm({ ...form, gender: value });
  };
  const handleAffectedmember = (value) => {
    setForm({ ...form, affectedmember: value });
    setCurrentStep(1);
  };
  const handleSymptoms = (e) => {
    setForm({ ...form, symptoms: e.target.value });
    setCurrentStep(2);
  };

  const handleSubmit = async () => {
    // try {

    setLoading(true);
    const result = await fetch("http://localhost:4000/api/v1/symptom-analyst", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // <-- مهم جداً
      },
      body: JSON.stringify({
        message: form.symptoms, // <-- تأكد من اسم الحقل اللي API يتوقعه
      }),
    });
    const data = await result.json();

    if (data.sucsses) {
      setResultDtat(data.result);
      setLoading(false);
      setChangecontent(true);
      setCurrentStep(0);
      
    } else {
      setLoading(false);
      setChangecontent(false);
      setCurrentStep(0);
    }
  };

  const sections = [];
  const regex = /\*\*(.*?)\*\*([\s\S]*?)(?=\*\*|$)/g;
  let match;

  while ((match = regex.exec(resultDtat)) !== null) {
    sections.push({
      title: match[1].trim(),
      content: match[2].trim(),
    });
  }

  

  if (loading) {
    return (
      <div className="">
        <Header />
        <div className="w-full">
          <div className="container mx-auto px-4 w-full min-h-[calc(100vh-100px)] flex justify-center items-center text-center flex-col gap-[15px]">
            <h3 className="text-[30px]">جاري التحليل</h3>
            <p className="text-[#616161] text-[18px]">
              {progress}% اكتمل .. قد يستغرق دقيقة{" "}
            </p>
            <div className="bg-[#E0E6FF] w-[560px] h-[16px] rounded-[8px]">
              <div
                className="bg-Basic h-full rounded-[8px] transition-all duration-200 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {changecontent ? (
        <div className="">
          <Header />
          <div className="w-full">
            <div className="container mx-auto px-4">
              {sections.map((section, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-xl font-bold text-[#212121] mb-[16px]">
                    {section.title}
                  </h2>
                  <p className="text-[#616161]">
                    {section.content}
                  </p>
                </div>
              ))}
              <div className="">
                <p className="text-[20px] text-[#424242]">هذا التحليل يعتمد على الأعراض التي قدمتها، وهو مبدئي فقط. استشر الطبيب المختص من خلال منصتنا للحصول على الدعم 
                والرعاية الصحيحة.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-between">
          <div className="w-90 h-full bg-white fixed top-0 right-0 shadow-sm">
            <div className="mt-[60px] w-full flex justify-center items-center">
              <Image src={logo} className="w-auto h-[50px]" alt="Error Img" />
            </div>
            <h3 className="text-[24px] w-full text-center mt-[50px] font-[700]">
              خطوات التحليل
            </h3>
            <div className="w-full flex flex-col items-center mx-auto my-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-[24px]">
                  <div className="flex justify-center items-center flex-col">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                        index <= currentStep ? " bg-Basic" : "bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-[2px] rounded-full h-[60px] my-[25px] ${
                          index <= currentStep - 1 ? " bg-Basic" : "bg-gray-300"
                        }`}
                      ></div>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <p
                      className={`text-[18px] font-medium min-w-[155px] mt-[5px] ${
                        index <= currentStep ? " text-Basic" : "text-gray-400"
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pr-99 pl-4 mt-[60px]">
            <div className="">
              <h3 className="text-[18px] font-[600]">الفئة</h3>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[18px] mt-[10px]">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="px-[100px] py-[9px] bg-white shadow-sm rounded-[16px]"
                  >
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-[#616161] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="radio-group"
                        className="peer hidden"
                        onChange={() => handleGender(option.value)}
                        // checked={selected === option.value}
                      />
                      <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* العضو المصاب */}
            <div className="mt-[30px]">
              <h3 className="text-[18px] font-[600]">العضو المصاب</h3>
              <div className="mt-[10px] flex flex-wrap items-center max-w-[880px] gap-[8px]">
                {options2.map((options, index) => (
                  <div
                    onClick={() => handleAffectedmember(options)}
                    key={index}
                    className={` ${
                      form.affectedmember === options
                        ? " bg-Basic text-white font-bold"
                        : " bg-white"
                    } shadow-sm rounded-[128px] py-[8px] px-[25px]  text-black cursor-pointer`}
                  >
                    {options}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-[44px]">
              <h3 className="text-[16px] font-[600]">أخرى</h3>
              <input
                type="text"
                className="w-full focus:outline-none bg-white rounded-[16px] shadow-sm py-[13px] px-[16px] placeholder:text-[#DADADA] mt-[10px]"
                placeholder="أدخل العضو المصاب  الخاص بك"
              />
            </div>
            <div className="mt-[36px]">
              <h3 className="text-[18px] font-[600]">أدخل أعراضك</h3>
              <textarea
                onChange={(e) => handleSymptoms(e)}
                name=""
                id=""
                className="w-full mt-[10px] h-[300px] focus:outline-none bg-white rounded-[16px] shadow-sm py-[13px] px-[16px] placeholder:text-[#DADADA]"
                placeholder="اكتب الأعراض اللي بتعاني منها بشكل واضح، زي مثلاً: صداع مستمر، دوار عند الوقوف، تعب عام، غثيان، أو أي شعور غير طبيعي
 عندك. كلما كنت دقيق أكتر، كلما كان التحليل أدق"
              ></textarea>
            </div>
            <div className="my-[24px] flex items-center gap-2">
              <button
                onClick={handleSubmit}
                className="py-[9.5px] px-[44px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
              >
                بدأ التحليل
              </button>
              <Link
                href={"/"}
                className="py-[9.5px] px-[44px] bg-white text-Basic shadow-sm rounded-[8px] hover:bg-[#2F247F] hover:text-white duration-300 ease-in-out"
              >
                الرجوع الى الصفحة الرئسية
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
