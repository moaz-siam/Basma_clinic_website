"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { TbLockFilled } from "react-icons/tb";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showToast } from "nextjs-toast-notify";
import {
  forget_password,
  reset_password,
  verify_code,
} from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

export default function ResetpasswordPage() {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [sucsesscode, setSucsesscode] = useState(false);
  const [checkemail, setCheckemail] = useState(false);
  const [email, setEmail] = useState("");
  const [loadingbtn, setLoadingbtn] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    NewPassword: "",
    ConfirmaPassword: "",
    email: email,
  });

  const handleChangePassword = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const NavigateRouter = useRouter();

  const handleChange = (index, value) => {
    const newCode = [...code];
    if (value.length > 1) {
      const pastedCode = value.slice(0, 5).split(""); // فقط 5 خانات
      for (let i = 0; i < 5; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const focusIndex = newCode.findIndex((digit) => digit === "") || 4;
      inputRefs.current[focusIndex]?.focus();
      if (newCode.every((digit) => digit !== "")) {
        submitCode(newCode.join(""));
      }
    } else {
      newCode[index] = value;
      setCode(newCode);
      // انتقل للعنصر التالي
      if (value && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }

      // // إذا اكتملت الخانات الخمسة
      if (index === 4 && value) {
        const finalCode = [...newCode];
        if (finalCode.every((digit) => digit !== "")) {
          submitCode(finalCode.join(""));
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const submitCode = (enteredCode) => {
    
    // مثال: إرسال ريكوست أو دسباتش أكشن
    dispatch(verify_code({ code: enteredCode, email: email })).then((res) => {
      if (res?.payload?.success) {
        setSucsesscode(true);
        // navigate("/auth/login");
        showToast.success(res?.payload?.message, {
          duration: 2000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          sound: false,
        });
      } else {
        showToast.error(res?.payload?.message, {
          duration: 2000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          sound: false,
        });
      }
    });
  };
  const handle_forget_password = () => {
    setLoadingbtn(true);
    dispatch(forget_password({ email: email.trim() })).then((res) => {
      if (res?.payload?.success) {
        setLoadingbtn(false);
        setCheckemail(true);
        showToast.success(res?.payload?.message, {
          duration: 2000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          sound: false,
        });
      } else {
        setLoadingbtn(false);
        showToast.error(res?.payload?.message, {
          duration: 2000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          sound: false,
        });
      }
    });
  };
  const handle_reset_password = () => {
    setLoadingbtn(true);
    dispatch(reset_password(passwordForm)).then((res) => {
      if (res?.payload?.success) {
        setLoadingbtn(false);
        NavigateRouter.push('/auth/login')
        showToast.success(res?.payload?.message, {
          duration: 2000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          sound: false,
        });
      } else {
        setLoadingbtn(false);
        showToast.error(res?.payload?.message, {
          duration: 2000,
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
      <div className="container mx-auto flex justify-center items-center w-full h-full px-4">
        <div className="bg-[#FAFAFA] md:px-[80px] px-6 py-[32px] rounded-[32px] w-full max-w-[700px] shadow-lg">
          {sucsesscode == false ? (
            <div className="">
              {checkemail ? (
                <div className="">
                  {/* النص */}
                  <div className="text-center w-full">
                    <h3 className="text-[22px] md:text-[32px] text-Basic font-bold">
                      إعادة تعيين كلمة المرور
                    </h3>
                    <p className="text-[#9E9E9E] mt-[4px] text-[16px]  md:text-[18px]">
                      أدخل الكود الذي تم إرساله إلى الايميل الخاص بك
                    </p>
                  </div>
                  {/* الكود */}
                  <div
                    className="flex items-center justify-center mt-[32px] space-x-[24px]"
                    style={{ direction: "ltr" }}
                  >
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        placeholder="0"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className=" focus:outline-none bg-[#FFFFFF] text-[18px] rounded-[8px] shadow-[0px_4px_20px_#A1A1A11F] placeholder:text-[#E0E0E0] w-[60px] h-[60px] text-center"
                      />
                    ))}
                  </div>
                  <div className="w-full text-center mt-[32px]">
                    <h3 className=" text-[#616161]">
                      إعادة إرسال الرمز خلال{" "}
                      <span className=" text-Basic"> 02:00</span>
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="text-center w-full">
                    <h3 className="text-[22px] md:text-[32px] text-Basic font-bold">
                      إعادة تعيين كلمة المرور
                    </h3>
                    <p className="text-[#9E9E9E] mt-[4px] text-[15px] md:text-[18px]">
                      أدخل البريد الإلكتروني الذي تم إرساله إليه الكود
                    </p>
                  </div>
                  <div className="mt-[24px] ">
                    <label
                      htmlFor=""
                      className="text-[15px] font-[500] text-[#212121]"
                    >
                      البريد الإلكتروني
                    </label>
                    <div className="bg-[#FFFFFF] shadow-custom rounded-[5px] p-[16px] w-full flex items-center gap-2 mt-[12px]">
                      <MdEmail className="text-[25px] text-[#BDBDBD]" />
                      <input
                        type="email"
                        className="w-full focus:outline-none"
                        placeholder="ادخل البريد الإلكتروني"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={handle_forget_password}
                      className="w-full flex items-center justify-center gap-2 focus:outline-none bg-Basic text-white font-bold rounded-[8px] mt-4 py-3 hover:bg-[#2F247F] transition duration-300  cursor-pointer "
                    >
                      ارسال
                      {loadingbtn && (
                        <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="">
              {/* النص */}
              <div className="text-center w-full">
                <h3 className="text-[22px] md:text-[32px] text-Basic font-bold">
                  إعادة تعيين كلمة المرور
                </h3>
                <p className="text-[#9E9E9E] mt-[4px] text-[16px]  md:text-[18px]">
                  قم باعادة تعين كلمة سرك الجديدة
                </p>
              </div>
              {/* كلمة المرور */}
              <div className="flex flex-col mt-4">
                <label htmlFor="">كلمة المرور الجديدة</label>
                <div className="w-full bg-white shadow-md flex items-center rounded-[8px] py-[14px] px-[20px] mt-[10px] gap-3">
                  <TbLockFilled className="text-[#BDBDBD] w-5 h-5" />
                  <input
                    name="NewPassword"
                    onChange={(e) => handleChangePassword(e)}
                    type="password"
                    className="focus:outline-none w-full placeholder:text-[#E0E0E0] placeholder:text-sm"
                    placeholder="**********"
                  />
                  <IoEyeOff className="text-[#BDBDBD] w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="">تأكيد كلمة المرور</label>
                <div className="w-full bg-white shadow-md flex items-center rounded-[8px] py-[14px] px-[20px] mt-[10px] gap-3">
                  <TbLockFilled className="text-[#BDBDBD] w-5 h-5" />
                  <input
                    name="ConfirmaPassword"
                    onChange={(e) => handleChangePassword(e)}
                    type="password"
                    className="focus:outline-none w-full placeholder:text-[#E0E0E0] placeholder:text-sm"
                    placeholder="**********"
                  />
                  <IoEyeOff className="text-[#BDBDBD] w-5 h-5" />
                </div>
              </div>
              <button
                onClick={handle_reset_password}
                className="w-full flex items-center justify-center gap-2 focus:outline-none bg-Basic text-white font-bold rounded-[8px] mt-4 py-3 hover:bg-[#2F247F] transition duration-300  cursor-pointer "
              >
                إعادة تعيين
                {loadingbtn && (
                  <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
