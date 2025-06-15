"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaStar } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";

import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Consultation from "@/components/pageProps/Consultation";
import commentimg from "@/assets/commentimg.png";

export default function ReviewDoctor() {
  const { doctorname } = useParams();

  const [doctorData, setDoctorData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!doctorname) return;

    const fetchDoctor = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/doctors/${doctorname}`,
          { cache: "no-store" }
        );
        const data = await res.json();

        setDoctorData(data?.doctor?.[0] || null);
        setComments(data?.comments_doctor || []);
        setLoading(false);
      } catch (err) {
        setError("حدث خطأ أثناء تحميل البيانات");
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorname]);

  const handleSubmit = () => {
    if (rating && comment) {
      alert(`تم إرسال التقييم: ${rating} نجوم \nالتعليق: ${comment}`);
      setComment("");
      setRating(0);
    }
  };

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>{error}</div>;
  if (!doctorData) return <div>لا يوجد بيانات لهذا الطبيب</div>;

  const ratingDoc = JSON.parse(doctorData.rating_distribution || '{}');
  const numberRating = [1, 2, 3, 4, 5];

  return (
    <div>
      <Breadcrumb
        titleTop="أراء المرضى"
        titlesection="أطباء"
        path={[doctorData.specialty, `د. ${doctorData.full_name_ar}`, "أراء المرضى"]}
      />

      <div className="mt-8">
        <h3 className="font-bold text-2xl text-center md:text-start">أراء المرضى</h3>

        <div className="flex md:flex-row flex-col justify-center md:justify-between items-center gap-8 mt-6">
          <div className="w-full space-y-4">
            {numberRating.map((num) => (
              <div key={num} className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <FaStar className="text-[#FFCB2B]" />
                  <h3 className="font-bold text-lg">{num}</h3>
                </div>
                <div className="w-full h-[11px] bg-[#E0E6FF] rounded-md">
                  <div className="h-full bg-Basic rounded-md w-[20%]"></div>
                </div>
                <h3 className="text-lg font-semibold">{ratingDoc[num] || 0}</h3>
              </div>
            ))}
          </div>

          <div className="bg-[#EEF1FF] rounded-xl w-full">
            <div className="py-12 px-4 text-center space-y-3">
              <h3 className="text-3xl font-semibold">
                {parseFloat(doctorData.average_rating).toFixed(1)}
              </h3>
              <div className="flex justify-center gap-2">
                {Array(5).fill(0).map((_, i) => (
                  <FaStar key={i} className="text-[#FFCB2B]" />
                ))}
              </div>
              <h3 className="text-lg font-medium">5 الف من التقييمات</h3>
            </div>
          </div>
        </div>
      </div>

      {/* تقييم */}
      <div className="mt-[25px]">
        <h2 className=" text-start text-[25px]">قيّم الدكتور</h2>

        {/* Stars */}
        <div className="flex justify-start mb-4 mt-[10ox]">
          {[...Array(5)].map((_, index) => {
            const current = index + 1;
            return (
              <FaStar
                key={index}
                className={`cursor-pointer w-6 h-6 duration-300 ease-in-out ${
                  (hoverRating || rating) >= current
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(current)}
                onMouseEnter={() => setHoverRating(current)}
                onMouseLeave={() => setHoverRating(null)}
              />
            );
          })}
        </div>

        {/* Comment */}
        <input
          type="text"
          placeholder="اكتب تعليقك هنا..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Basic mb-4  duration-300 ease-in-out"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!rating || !comment}
          className=" w-full focus:outline-none bg-Basic text-white font-bold rounded-[8px] py-[10px] text-center cursor-pointer  hover:bg-[#2F247F] duration-300 ease-in-out"
        >
          إرسال التقييم
        </button>
      </div>

      {/* التعليقات */}
      <div className="mt-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg md:text-xl">
            يوجد أكثر من <span className="text-Basic">1000</span> مراجعة
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm md:text-base shadow hover:bg-Basic hover:text-white transition">
            من الأحدث للأقدم <RiArrowDropDownLine />
          </button>
        </div>

        {comments.map((item, index) => (
          <div key={index} className="bg-white shadow rounded-xl mb-4 p-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#EEF1FF] rounded-full">
                <Image src={commentimg} alt="user" />
              </div>
              <div>
                <h4 className="font-medium text-base mb-1">{item.reviewer_name_ar}</h4>
                <div className="flex gap-1 mb-2">
                  {Array(item.rating).fill(0).map((_, i) => (
                    <FaStar key={i} className="text-[#FFCB2B]" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{item.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Consultation
          title_top="استشر طبيبك الآن"
          title_bottom="إذا كنت تعاني من القلق والتوتر لفترة طويلة، لا تتردد في طلب المساعدة من أخصائي نفسي. العلاج المبكر يساعد في تجنب المضاعفات وتحسين نوعية حياتك."
        />
      </div>
    </div>
  );
}
