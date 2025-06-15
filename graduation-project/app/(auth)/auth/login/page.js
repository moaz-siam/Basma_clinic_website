"use client";
import React, { useState } from "react";
import { FaApple } from "react-icons/fa";
import logo_google from "@/assets/logo_google.png";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { TbLockFilled } from "react-icons/tb";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/slice/authSlice";
import { showToast } from "nextjs-toast-notify";

export default function LoginPage() {
  const [eyepassword, setEyepassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    national_id: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    //
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      
      // أرسل البيانات إلى السيرفر أو قم بإجراء آخر
      dispatch(loginUser(form)).then((res) => {
        if (res?.payload?.success) {
          
          router.push("/");
          showToast.success(res?.payload?.message, {
            duration: 3000,
            progress: true,
            position: "top-center",
            transition: "fadeIn",
            sound: false,
          });
        } else {
          
          showToast.error(res?.payload?.message, {
            duration: 3000,
            progress: true,
            position: "top-center",
            transition: "fadeIn",
            sound: false,
          });
        }
      });
      
  };
  return (
    <div className="bg-[url(../assets/backgroundauth.png)] bg-cover bg-center min-h-screen w-full flex items-center justify-center">
      <div className="container mx-auto flex justify-center items-center w-full h-full px-4 ">
        <div className="bg-[#FAFAFA] md:px-[80px] px-6 py-[32px] rounded-[32px] w-full max-w-[700px] shadow-lg">
          {/* النص */}
          <div className="text-center w-full">
            <h3 className="text-[24px] md:text-[32px] text-Basic font-bold">
              أهلاً بعودتك
            </h3>
            <p className="text-[#9E9E9E] text-[16px] md:text-[18px]">
              أهلاً بعودتك الى بصمة طبية!
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
              أو الدخول من خلال
            </h3>
          </div>

          {/* النموذج */}
          <div className="mt-6">
            {/* الهوية */}
            <div className="flex flex-col">
              <label htmlFor="">رقم الهوية</label>
              <input
                name="national_id"
                value={form.national_id}
                onChange={(e) => handleChange(e)}
                type="text"
                className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                placeholder="X XXXX XXXX"
              />
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
              {/* <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                {errorvalidat.password && form.password.length <= 0 && (
                  <p className="text-red-500 text-sm flex items-center gap-[3px]">
                    <MdError />
                    {errorvalidat.password}
                  </p>
                )}
              </div> */}
            </div>

            {/* تذكرني + نسيت كلمة المرور */}
            <div className="flex justify-between items-center w-full mt-4 flex-wrap gap-2 text-sm">
              <label className="flex items-center gap-2 text-[#9E9E9E]">
                <input type="checkbox" className="hidden peer" />
                <div className="w-4 h-4 border-2 border-[#E0E0E0] rounded-[2px] flex justify-center items-center peer-checked:bg-Basic peer-checked:border-Basic peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:text-xs cursor-pointer "></div>
                تذكرني
              </label>
              <Link href={'/auth/login/reset-password'} className="text-[#F75555]">هل نسيت كلمة السر؟</Link>
            </div>

            {/* زر الدخول */}
            <button onClick={handleSubmit} className="w-full focus:outline-none bg-Basic text-white font-bold rounded-[8px] mt-4 py-3 hover:bg-[#2F247F] transition duration-300  cursor-pointer ">
              دخول
            </button>

            {/* تسجيل */}
            <div className="mt-4 w-full text-center">
              <h3 className="text-sm md:text-[16px]">
                ليس لديك حساب؟{" "}
                <Link href={"/auth/register"} className="text-Basic font-bold">
                  تسجيل
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
