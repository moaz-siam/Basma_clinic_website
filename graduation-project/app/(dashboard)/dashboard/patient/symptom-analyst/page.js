"use client";

import Breadcrumb from "@/components/pageProps/Breadcrumb";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuSend } from "react-icons/lu";
import { symptom_analyst } from "@/redux/slice/patientSlice";

export default function SymptomanalystPage() {
  const [changecontent, setChangecontent] = useState(false);
  const [message, setMessage] = useState({ message: "" });
  const [resultDtat, setResultDtat] = useState(null);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const { patient, isLoading, isError } = useSelector((state) => state.patient);

  useEffect(() => {
    let interval;
    if (isLoading) {
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
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(symptom_analyst(message)).then((res) =>
      setResultDtat(res?.payload?.result)
    );
    
    

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

  return (
    <div className="w-full">
      <div className=" container mx-auto">
        <Breadcrumb titleTop={"مدقق الأعراض"} titlesection={"مدقق الأعراض"} />
        <div className="">
          {isLoading ? (
            <div className="">
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
          ) : resultDtat ? (
            <div className="w-full mt-[20px]">
              <div className="">
                {sections.map((section, index) => (
                  <div key={index} className="mb-6">
                    <h2 className="text-xl font-bold text-[#212121] mb-[16px]">
                      {section.title}
                    </h2>
                    <p className="text-[#616161]">{section.content}</p>
                  </div>
                ))}
                <div className="">
                  <p className="text-[20px] text-[#424242]">
                    هذا التحليل يعتمد على الأعراض التي قدمتها، وهو مبدئي فقط.
                    استشر الطبيب المختص من خلال منصتنا للحصول على الدعم والرعاية
                    الصحيحة.
                  </p>
                </div>
                <div className="p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-[16px] bg-white w-full flex items-center justify-between gap-1 group focus-within:border-Basic focus-within:border-[1px] duration-200 ease-in-out mt-[10px]">
                <input
                  type="text"
                  className="w-full placeholder:text-[#BDBDBD] focus:outline-none focus:group"
                  placeholder="اكتب الأعراض هنا مثل: صداع، ألم في الصدر، سعال مستمر"
                  onChange={(e) => setMessage({...message , message : e.target.value})}
                />
                <button className="focus:outline-none" onClick={handleSubmit}><LuSend className=" cursor-pointer text-[20px] text-[#9E9E9E] group-focus-within:text-Basic" /></button>
              </div>
              </div>
            </div>
          ) : (
            <div className=" text-center w-full space-y-[10px] mt-30">
              <h3 className="text-[25px] font-[700] text-[#212121]">
                أهلًا وسهلًا في محلل الأعراض
              </h3>
              <p className="text-[18px] text-[#616161]">
                اكتب أعراضك، وخلال لحظات رح تحصل على تشخيص مبدئي ونصائح مفيدة!{" "}
              </p>
              <div className="p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-[16px] bg-white w-full flex items-center justify-between gap-1 group focus-within:border-Basic focus-within:border-[1px] duration-200 ease-in-out">
                <input
                  type="text"
                  className="w-full placeholder:text-[#BDBDBD] focus:outline-none focus:group"
                  placeholder="اكتب الأعراض هنا مثل: صداع، ألم في الصدر، سعال مستمر"
                  onChange={(e) => setMessage({...message , message : e.target.value})}
                />
                <button className="focus:outline-none" onClick={handleSubmit}><LuSend className=" cursor-pointer text-[20px] text-[#9E9E9E] group-focus-within:text-Basic" /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
