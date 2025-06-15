"use client";
import React, { useState } from "react";
import { FaApple } from "react-icons/fa";
import logo_google from "@/assets/logo_google.png";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { TbLockFilled } from "react-icons/tb";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { MdError } from "react-icons/md";


import Link from "next/link";
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";

export default function RegisterPage() {
  const [eyepassword, setEyepassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    national_id: "",
    email: "",
    gender: "",
    phone: "",
    birth_date: "",
    password: "",
  });
  const [errorvalidat, setErrovalidatr] = useState({
    full_name: "",
    national_id: "",
    email: "",
    gender: "",
    phone: "",
    birth_date: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    //
  };
  const validateForm = () => {
    const errors = {};

    if (!form.full_name.trim()) {
      errors.name = "الاسم مطلوب";
    }

    if (!form.national_id.trim()) {
      errors.nic = "رقم الهوية مطلوب";
    }

    if (!form.email.trim()) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "بريد إلكتروني غير صالح";
    }

    if (!form.gender) {
      errors.gender = "الجنس مطلوب";
    }

    if (!form.phone.trim()) {
      errors.phone = "رقم الهاتف مطلوب";
    }

    if (!form.birth_date) {
      errors.dob = "تاريخ الميلاد مطلوب";
    }

    if (!form.password.trim()) {
      errors.password = "كلمة المرور مطلوبة";
    } else if (form.password.length < 6) {
      errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrovalidatr(errors);
    } else {
      setErrovalidatr({});
      
      
      // أرسل البيانات إلى السيرفر أو قم بإجراء آخر
      dispatch(registerUser(form)).then((res) => {
        if (res?.payload?.success) {
          
          router.push("/");
          showToast.success(res?.payload?.message, {
            duration: 4000,
            progress: true,
            position: "top-center",
            transition: "fadeIn",
            icon: "",
            sound: true,
          });
        } else {
          
          showToast.error(res?.payload?.message, {
            duration: 4000,
            progress: true,
            position: "top-center",
            transition: "fadeIn",
            icon: "",
            sound: true,
          });
        }
      });
      
    }
  };

  return (
    <div className="bg-[url(../assets/backgroundauth.png)] bg-cover bg-center min-h-screen w-full flex items-center justify-center">
      <div className="container mx-auto flex justify-center items-center w-full h-full px-4">
        <div className="bg-[#FAFAFA] md:px-[80px] px-6 py-[32px] rounded-[32px] w-full max-w-[700px] shadow-lg">
          {/* النص */}
          <div className="text-center w-full">
            <h3 className="text-[24px] md:text-[32px] text-Basic font-bold">
              إنشاء حساب جديد
            </h3>
            <p className="text-[#9E9E9E] text-[16px] md:text-[18px]">
              أنشئ حسابك في بصمة واحصل على استشاراتك الطبية الأن
            </p>
          </div>

          {/* الأزرار */}
          <div className="mt-8 flex justify-center items-center gap-4 flex-wrap">
            <div className="py-[12px] px-[70px] bg-white rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] cursor-pointer">
              <FaApple className="w-5 h-5" />
            </div>
            <div className="py-[12px] px-[70px] bg-white rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] cursor-pointer">
              <FaFacebookF className="w-5 h-5 text-[#2F88FF]" />
            </div>
            <div className="py-[12px] px-[70px] bg-white rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] cursor-pointer">
              <Image
                src={logo_google}
                alt="Google Logo"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
          </div>

          {/* فاصل */}
          <div className="w-full h-px bg-[#E0E0E0] mt-6 relative">
            <h3 className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-[14px] md:text-[16px] bg-[#FAFAFA] px-4 text-[#212121]">
              أو التسجيل من خلال
            </h3>
          </div>

          {/* النموذج */}
          <div className="mt-6">
            {/* الهوية */}
            <div className="flex justify-center items-center w-full gap-[25px]">
              <div className="flex flex-col w-full">
                <label htmlFor="">الاسم</label>
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                  placeholder="اسمك الكامل"
                />
                <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                  {errorvalidat.full_name && form.full_name.length <= 0 && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat.full_name}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="">رقم الهوية</label>
                <input
                  name="national_id"
                  value={form.national_id}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                  placeholder="X XXXX XXXX"
                />
                <div className="min-h-[20px] mt-1">
                  {errorvalidat.national_id && form.national_id.length <= 0 && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat.national_id}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full gap-[25px]">
              <div className="flex flex-col w-full">
                <label htmlFor="">الايميل</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                  placeholder="example@gamil.com"
                />
                <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                  {errorvalidat.email && form.email.length <= 0 && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="">الجنس</label>
                <input
                  name="gender"
                  value={form.gender}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                  placeholder="ادخل الجنس"
                />
                <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                  {errorvalidat.gender && form.gender.length <= 0 && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat.gender}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full gap-[25px]">
              <div className="flex flex-col w-full">
                <label htmlFor="">رقم الجوال</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                  placeholder="XXXXX XXXXX"
                />
                <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                  {errorvalidat.phone && form.phone.length <= 0 && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat.phone}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="">تاريج الميلاد</label>
                <input
                  name="birth_date"
                  value={form.birth_date}
                  onChange={(e) => handleChange(e)}
                  type="date"
                  className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                  placeholder="يوم/شهر/سنة"
                />
                <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                  {errorvalidat.birth_date && form.birth_date.length <= 0 && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat.birth_date}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* كلمة المرور */}
            <div className="flex flex-col mt-4">
              <label htmlFor="">كلمة السر</label>
              <div className="w-full bg-white shadow-[0px_4px_25px_0px_#A1A1A11F] flex items-center rounded-[8px] py-[14px] px-[20px] mt-[10px] gap-3">
                <TbLockFilled className="text-[#BDBDBD] w-5 h-5" />
                <input
                  name="password"
                  value={form.password}
                  onChange={(e) => handleChange(e)}
                  type={`${eyepassword ? "text" : "password"}`}
                  className="focus:outline-none w-full placeholder:text-[#E0E0E0] placeholder:text-sm"
                  placeholder="**********"
                />
                {eyepassword ? (
                  <IoEye
                    className="text-[#BDBDBD] w-5 h-5 cursor-pointer hover:text-Basic duration-200 ease-in-out"
                    onClick={() => setEyepassword(false)}
                  />
                ) : (
                  <IoEyeOff
                    className="text-[#BDBDBD] w-5 h-5 cursor-pointer hover:text-Basic duration-200 ease-in-out"
                    onClick={() => setEyepassword(true)}
                  />
                )}
              </div>
              <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                {errorvalidat.password && form.password.length <= 0 && (
                  <p className="text-red-500 text-sm flex items-center gap-[3px]">
                    <MdError />
                    {errorvalidat.password}
                  </p>
                )}
              </div>
            </div>

            {/* تذكرني + نسيت كلمة المرور */}
            <div className="w-full mt-4 flex-wrap gap-2 text-sm">
              <label className="flex items-center gap-2 text-[#9E9E9E]">
                <input type="checkbox" className="hidden peer" />
                <div className="w-4 h-4 border-2 border-[#E0E0E0] rounded-[2px] flex justify-center items-center peer-checked:bg-Basic peer-checked:border-Basic peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:text-xs  cursor-pointer "></div>
                أوافق على{" "}
                <Link href="" className="text-Basic font-bold">
                  الشروط والأحكام
                </Link>{" "}
                و{" "}
                <Link href="" className="text-Basic font-bold">
                  سياسية الخصوصية
                </Link>{" "}
                المتعلقة ببصمة طبية
              </label>
            </div>

            {/* زر الدخول */}
            <button
              onClick={handleSubmit}
              className="w-full focus:outline-none bg-Basic text-white font-bold rounded-[8px] mt-4 py-3 cursor-pointer hover:bg-[#2F247F] transition duration-300"
            >
              تسجيل
            </button>

            {/* تسجيل */}
            <div className="mt-4 w-full text-center">
              <h3 className="text-sm md:text-[16px]">
                لديك حساب؟
                <Link href="/auth/login" className="text-Basic font-bold">
                  دخول
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
