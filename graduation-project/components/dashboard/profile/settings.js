"use client";
import { change_password } from "@/redux/slice/authSlice";
import { showToast } from "nextjs-toast-notify";
import React, { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useDispatch } from "react-redux";
export default function Settings() {
  const [eyepassword, setEyepassword] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: ""
  });
  const [loadingbtn, setLoadingbtn] = useState(false);
  const handleChange = (e) => {
      setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
  };

  const SubmitData = (e) => {
    e.preventDefault();
    setLoadingbtn(true);
    dispatch(change_password(formData)).then((res) => {
      if (res?.payload?.success) {
        setLoadingbtn(false);
        showToast.success(res?.payload?.message, {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          icon: "",
          sound: false,
        });
        // إعادة تعيين الـ form بعد النجاح
        setFormData({
          old_password: "",
          new_password: ""
        });
      } else {
        setLoadingbtn(false);
        showToast.error(res?.payload?.message, {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          icon: "",
          sound: false,
        });
      }
    });
  };

  return (
    <div className="w-full">
      <h3 className="text-[20px] font-[700]">إعدادات الحساب</h3>
      <div className="mt-[24px]">
        <h3 className="text-[18px] font-[700]">كلمة المرور</h3>
        <div className="flex flex-col mt-4">
          <label htmlFor="">الكلمة القديمة</label>
          <div className="w-full bg-white shadow-[0px_4px_25px_0px_#A1A1A11F] flex items-center rounded-[8px] py-[14px] px-[20px] mt-[10px] gap-3">
            <input
              name="old_password"
              value={formData.old_password?? ""}
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
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="">الكلمة الجديدة</label>
          <div className="w-full bg-white shadow-[0px_4px_25px_0px_#A1A1A11F] flex items-center rounded-[8px] py-[14px] px-[20px] mt-[10px] gap-3">
            <input
              name="new_password"
              value={formData.new_password?? ""}
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
        </div>
        <button
          onClick={SubmitData}
          className=" bg-Basic mt-[20px] flex items-center justify-center gap-2 focus:outline-none rounded-[8px] py-[9px] font-[600] text-[14px] w-full text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
        >
          حفظ التغييرات
          {loadingbtn && (
            <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
          )}
        </button>
      </div>
    </div>
  );
}
