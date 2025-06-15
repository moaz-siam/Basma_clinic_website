"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import test_med from "@/assets/dashboard-img/test_med.png";
import Image from "next/image";
import { CgFileDocument } from "react-icons/cg";
import { LuDownload } from "react-icons/lu";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Loading from "@/components/pageProps/loading";
import { formatFullArabicDate } from "@/components/pageProps/FormatedDT";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { get_order_details, uploadInvoice } from "@/redux/slice/pharmacySlice";
import { CiUser } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { RxUpload } from "react-icons/rx";
import Popup from "@/components/pageProps/Pop";
import { FaRegCircleCheck } from "react-icons/fa6";
import { showToast } from "nextjs-toast-notify";

export default function BillIdPage() {
  const { billid } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);

  const [billDetails, setBillDetails] = useState([]);
  const dispatch = useDispatch();
  const { isLoading, isError, pharmacy } = useSelector(
    (state) => state.pharmacy
  );
  const [formData, setFormData] = useState({
    order_id: "",
    file: "",
    file_name: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      file,
      file_name: file.name,
      order_id: billDetails.order_id,
    }));
  };

  useEffect(() => {
    if (formData.file && formData.file_name.trim()) {
      SubmitData(formData);
    }
  }, [formData.file]);

  useEffect(() => {
    dispatch(get_order_details(billid)).then((res) => {
      if (res?.payload?.success) {
        // setBillDetails(res?.payload?.data[0]);
        
      }
    });
  }, [dispatch, billid]);

  useEffect(() => {
    if (pharmacy?.length > 0) {
      setBillDetails(pharmacy[0]);
    }
  }, [pharmacy]);

  
  

  const date = formatFullArabicDate(billDetails.created_at);

  const SubmitData = (data) => {
    

    if (data.file && data.file_name.trim()) {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("file_name", data.file_name);
      formData.append("order_id", data.order_id);
      dispatch(uploadInvoice(formData)).then((res) => {
        if (res?.payload?.success) {
          setIsPopupOpen2(true);
          setIsPopupOpen(false);
          dispatch(get_order_details(billid));
        } else {
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <Breadcrumb
        titleTop={"الفواتير"}
        titlesection={"الفواتير"}
        path={["فواتير مضافة"]}
      />
      <div className="my-[30px]">
        <div className="w-full flex justify-between items-center mt-[24px]">
          <h3 className=" text-[#483535] text-[22px] font-[700]">
            {billDetails.order_id}#
          </h3>
          <span className="text-[#616161] text-[17px]">{date}</span>
        </div>
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">المريض</h3>
          <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-custom  px-[24px] py-[26px] space-y-[5px] relative w-full">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CiUser />
                <h3 className="text-[#424242] font-[500] text-[14px]">
                  المريض : {billDetails.patient_name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <CiCircleInfo />
                <h3 className="text-[#424242] font-[500] text-[14px]">
                  المرض: {billDetails.sub_service}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">
            الطبيب المشرف
          </h3>
          <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-custom  px-[24px] py-[26px] space-y-[5px] relative flex justify-between items-center w-full">
            <div className="flex items-center gap-[16px]">
              <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#EEF1FF] text-Basic text-[18px] font-[500]">
                <FaUserDoctor />
              </div>
              <div className=" space-y-[5px]">
                <h3 className=" text-[15px] font-[700] text-[#212121]">
                  د. {billDetails.doctor_name}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">
            الادوية الموصوفة
          </h3>
          <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-custom  px-[24px] py-[26px] gap-[5px] relative w-full">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              {billDetails?.prescription_items?.map((ele, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-[16px]"
                >
                  <div className="bg-[#F5F5F5] flex items-center justify-center">
                    <Image
                      src={test_med}
                      className="w-auto h-[100px] object-cover"
                      alt="error"
                      width={0}
                      height={0}
                    />
                  </div>
                  <div className=" space-y-[5px] my-[10px]">
                    <h3 className="text-[15px] font-[700] text-[#212121]">
                      {ele.name}
                    </h3>
                    <p className="text-[13px] text-[#757575] font-[400]">
                      {ele.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">
            الوصفة الطبية
          </h3>
          <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-custom  px-[24px] py-[26px] relative w-full">
            {billDetails.pdf_url ? (
              <div className="flex items-center gap-1">
                <CgFileDocument className="w-[20px] h-[20px] " />
                <div className="flex items-center gap-2">
                  <h3 className="text-[#424242] font-[500] text-[14px] ">
                    {billDetails.pdf_name}
                  </h3>
                  <div className="flex items-center gap-1 text-Basic text-[14px] cursor-pointer">
                    <span className=" underline">تحميل</span>
                    <LuDownload />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {billDetails.invoice_id !== null ? (
          <div className="mt-[24px]">
            <h3 className="text-[#212121] text-[22px] font-[700]">الفاتورة</h3>
            <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-custom  px-[24px] py-[26px] relative w-full">
              <div className="flex items-center gap-1">
                <CgFileDocument className="w-[20px] h-[20px] " />
                <div className="flex items-center gap-2">
                  <h3 className="text-[#424242] font-[500] text-[14px] ">
                    {billDetails.invoice_name}
                  </h3>
                  <div className="flex items-center gap-1 text-Basic text-[14px] cursor-pointer">
                    <span className=" underline">تحميل</span>
                    <LuDownload />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-[24px]">
            <h3 className="text-[#212121] text-[22px] font-[700]">الفاتورة</h3>
            <div className="w-full bg-white rounded-[16px] text-center py-[24px] shadow-custom flex flex-col justify-center items-center gap-2 mt-[15px]">
              <BsFileEarmarkArrowUp className="text-[35px] text-[#757575]" />
              <h3 className="font-[700] text-[16px]">
                اختر ملفًا أو اسحبه وأفلته هنا
              </h3>
              <p className="text-[#9E9E9E] text-[14px]">
                JPEG , PNG , MP4, PDF حتى 50 ميجابت{" "}
              </p>
            </div>
            <div
              className="w-fit my-[16px] cursor-pointer"
              onClick={() => setIsPopupOpen(true)}
            >
              <div className=" shadow-[0px_4px_25px_0px_#A1A1A11A] bg-Basic text-white duration-200 ease-in-out rounded-[8px] px-[25px] py-[10px] flex justify-center items-center gap-[8px]">
                <h3 className="">ارفاق ملف</h3>
                <RxUpload />
              </div>
            </div>
          </div>
        )}
        <Popup isOpen={isPopupOpen} width={"741px"}>
          <div className="flex gap-[8px] w-full mb-[16px]">
            <div>
              <div className="w-[45px] h-[45px] bg-[#EEF1FF] text-Basic shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-full flex justify-center items-center text-center mx-auto">
                <BsFileEarmarkArrowUp />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="font-[700] text-[14px]">رفع الملفات</h3>
              <h3 className="font-[500] text-[16px] text-[#616161]">
                اختار وارفع الملفات التي اخترتها
              </h3>
            </div>
          </div>
          <div className="bg-[#E0E0E0] w-full h-[2px]"></div>
          <div className="w-full border-1 border-[#E0E0E0] border-dashed flex flex-col justify-center items-center gap-[5px] py-[33px] mt-[16px]">
            <BsFileEarmarkArrowUp className="text-[35px] text-[#757575]" />
            <h3 className="font-[700] text-[16px]">
              اختر ملفًا أو اسحبه وأفلته هنا
            </h3>
            <p className="text-[#9E9E9E] text-[14px]">
              JPEG , PNG , MP4, PDF حتى 50 ميجابت{" "}
            </p>
            <label className="px-[16px] py-[8px] rounded-[8px] border border-Basic text-Basic cursor-pointer inline-block hover:bg-Basic hover:text-white duration-200 ease-in-out">
              تصفح الملفات
              <input
                name="file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  handleFileChange(e);
                }} // (اختياري)
              />
            </label>
          </div>
          {formData.file_name && (
            <div className="p-[16px] border-1 border-[#E0E0E0] mt-[16px] rounded-[8px] w-full">
              <div className="flex items-center w-full gap-[12px]">
                <div>
                  <BsFileEarmarkArrowUp className="text-[50px] text-red-500" />
                </div>
                <div className=" space-y-[10px]">
                  <div className="flex justify-between items-center w-full">
                    <h3 className="text-[14px] text-[#212121]">
                      {formData.file_name}
                    </h3>
                    <span className="text-[#424242]">60%</span>
                  </div>
                  <div className="bg-[#E0E6FF] w-[560px] h-[5px] rounded-[8px]">
                    <div
                      className="bg-Basic h-full w-[100px] rounded-[8px] transition-all duration-200 ease-in-out"
                      // style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-[#9E9E9E] text-[12px]">
                    2 ميجابايت من 2 ميجابايت
                  </span>
                </div>
              </div>
            </div>
          )}
          <div
            onClick={() => setIsPopupOpen(false)}
            className=" absolute top-8 left-6 w-[20px] h-[20px] bg-Basic text-white rounded-full flex justify-center items-center cursor-pointer"
          >
            x
          </div>
        </Popup>
        <Popup isOpen={isPopupOpen2} width={"516px"}>
          <div className="flex flex-col justify-center items-center text-center w-full gap-[20px]">
            <FaRegCircleCheck className="text-[75px] text-Basic" />

            <h3 className="text-[20px] font-[700] text-[#212121]">
              تم رفع الملف بنجاح!
            </h3>
            <p className="text-[15px] text-[#757575]">
              تم تحميل الملف بنجاح! يمكنك المتابعة الآن.
            </p>
            <button
              onClick={() => setIsPopupOpen2(false)}
              className="py-[9px] w-full text-[14px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
            >
              العودة للرئيسية
            </button>
          </div>
        </Popup>
      </div>
    </div>
  );
}
