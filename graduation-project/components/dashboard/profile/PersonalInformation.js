"use client";
import Popup from "@/components/pageProps/Pop";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import upload_img from "@/assets/dashboard-img/upload-img.png";
import { personal_information_update } from "@/redux/slice/authSlice";
import { showToast } from "nextjs-toast-notify";
import { useRouter } from "next/navigation";
import { MdError } from "react-icons/md";

export default function PersonalInformation({ role }) {
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [loadingbtn, setLoadingbtn] = useState(false);

  const [formData, setFormData] = useState({
    file: "",
    full_name: "",
    full_name_en: "",
    phone: "",
    email: "",
    address: "",
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      //set img profile
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Base64 image string
      };
      reader.readAsDataURL(file);
      //save in form data
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
      setIsPopupOpen(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [errorvalidat, setErrovalidatr] = useState({
    file: "",
    full_name: "",
    full_name_en: "",
    phone: "",
    email: "",
    address: "",
  });
  const validateForm = () => {
    const errors = {};
    if (!formData.full_name.trim()) {
      errors.full_name = "الاسم مطلوب";
    }
    if (!formData.full_name_en.trim()) {
      errors.full_name_en = "الاسم بالنجليزي مطلوب";
    }
    if (!formData.phone.trim()) {
      errors.phone = "رقم الجوال مطلوب";
    }
    if (!formData.email.trim()) {
      errors.email = "الايميل مطلوب";
    }
    if (!formData.address.trim()) {
      errors.address = "العنوان مطلوب";
    }
    return errors;
  };

  const SubmitData = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrovalidatr(errors);
    } else {
      setErrovalidatr({});

      setLoadingbtn(true);
      const send_form = new FormData();
      send_form.append("file", formData.file);
      send_form.append("full_name", formData.full_name);
      send_form.append("full_name_en", formData.full_name_en);
      send_form.append("phone", formData.phone);
      send_form.append("email", formData.email);
      send_form.append("address", formData.address);

      dispatch(personal_information_update(send_form)).then((res) => {
        if (res?.payload?.success) {
          setLoadingbtn(false);
          router.push(`/dashboard/patient`);
          showToast.success(res?.payload?.message, {
            duration: 3000,
            progress: true,
            position: "top-center",
            transition: "fadeIn",
            icon: "",
          });
          setFormData({
            file: "",
            full_name: "",
            full_name_en: "",
            phone: "",
            email: "",
            address: "",
          });
        } else {
          setLoadingbtn(false);
          showToast.error(res?.payload?.message, {
            duration: 3000,
            progress: true,
            position: "top-center",
            transition: "fadeIn",
            icon: "",
          });
        }
      });
    }
  };

  return (
    <div className="">
      <h3 className="text-[18px] font-[700] ">المعلومات الشخصية</h3>
      <div className="mt-[16px]">
        <div className="flex items-center justify-center">
          <div className="flex items-center flex-col gap-[10px]">
            <div className="w-[70px] h-[70px] overflow-hidden bg-[#F5F5F5] shadow-[0px_4px_25px_0px_#A1A1A11A] text-[25px] font-[500] rounded-full flex justify-center items-center text-center mx-auto">
              {isLoading ? (
                <div className="w-[70px] h-[70px] overflow-hidden bg-white shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-full" />
              ) : user?.image && !profileImage ? (
                <Image
                  src={user?.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={70}
                  height={70}
                />
              ) : profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={70}
                  height={70}
                />
              ) : (
                user?.full_name?.slice(0, 2) || "ما"
              )}
            </div>
            <h3
              className=" text-Basic text-[18px] font-[500] cursor-pointer"
              onClick={() => setIsPopupOpen(true)}
            >
              تغيير صورة الملف الشخصي
            </h3>
          </div>
        </div>
        <div className="mt-[30px] w-full">
          <h3 className="text-[18px] font-[700] ">معلوماتك الشخصية</h3>
          <div className="flex justify-center items-center w-full gap-[25px] mt-[24px]">
            <div className="flex flex-col w-full">
              <label htmlFor="">الاسم</label>
              <input
                name="full_name"
                value={formData.full_name}
                onChange={(e) => handleChange(e)}
                type="text"
                className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                placeholder="اسمك الكامل"
              />
              <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                {errorvalidat.full_name && !formData.full_name && (
                  <p className="text-red-500 text-sm flex items-center gap-[3px]">
                    <MdError />
                    {errorvalidat.full_name}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="">الاسم بالانجليزي</label>
              <input
                name="full_name_en"
                value={formData.full_name_en}
                onChange={(e) => handleChange(e)}
                type="text"
                className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                placeholder="الاسم بالانجليزي"
              />
              <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                {errorvalidat.full_name_en && !formData.full_name_en && (
                  <p className="text-red-500 text-sm flex items-center gap-[3px]">
                    <MdError />
                    {errorvalidat.full_name_en}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex justify-center items-center w-full gap-[25px] my-[24px]">
            <div className="flex flex-col w-full">
              <label htmlFor="">رقم الجوال</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={(e) => handleChange(e)}
                type="text"
                className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                placeholder="XXXXX XXXXX"
              />
              <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                {errorvalidat.phone && !formData.phone && (
                  <p className="text-red-500 text-sm flex items-center gap-[3px]">
                    <MdError />
                    {errorvalidat.phone}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="">الايميل</label>
              <input
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                type="email"
                className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                placeholder="الايميل"
              />
              <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                {errorvalidat.email && !formData.email && (
                  <p className="text-red-500 text-sm flex items-center gap-[3px]">
                    <MdError />
                    {errorvalidat.email}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mb-[24px]">
            <label htmlFor="">العنوان</label>
            <input
              name="address"
              value={formData.address}
              onChange={(e) => handleChange(e)}
              type="text"
              className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
              placeholder="بيت لاهيا ، شارع الفالوجا ، مقابل مستشفى الرنتيسي"
            />
            <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
              {errorvalidat.address && !formData.address && (
                <p className="text-red-500 text-sm flex items-center gap-[3px]">
                  <MdError />
                  {errorvalidat.address}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={SubmitData}
            className="flex items-center justify-center gap-2 bg-Basic focus:outline-none rounded-[8px] py-[9px] font-[600] text-[14px] w-full text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
          >
            حفظ التغييرات
            {loadingbtn && (
              <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
            )}
          </button>
        </div>
      </div>
      <Popup isOpen={isPopupOpen} width={"552px"}>
        <div className="w-full">
          <div
            className="flex justify-end"
            onClick={() => setIsPopupOpen(false)}
          >
            <button className="w-[25px] h-[25px] bg-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11A] text-[20px] font-[500] rounded-full flex justify-center items-center  cursor-pointer">
              x
            </button>
          </div>
          <div className="flex items-center justify-center mt-[10px]">
            <Image
              className="w-auto h-[130px] object-cover"
              src={upload_img}
              width={0}
              height={0}
              alt="error img"
            />
          </div>
          <div className="text-center">
            <h3 className="text-[20px] text-[#757575] font-[600]">
              تصفح صورك ..
            </h3>
            <span className="text-[16px] text-[#BDBDBD] font-[400] mt-[5px]">
              JPG, GIF OR PNG. Max 4MG
            </span>
          </div>
          <label className="bg-Basic rounded-[8px] py-[9px] font-[600] text-[14px] w-full inline-block text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out mt-[15px]">
            + رفع صورة جديدة
            <input
              name="file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
        </div>
      </Popup>
    </div>
  );
}
