"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import test_med from "@/assets/dashboard-img/test_med.png";
import Image from "next/image";
import { CgFileDocument } from "react-icons/cg";
import { LuDownload } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BsExclamationCircle } from "react-icons/bs";
import Popup from "@/components/pageProps/Pop";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Loading from "@/components/pageProps/loading";
import { formatFullArabicDate } from "@/components/pageProps/FormatedDT";
import {
  add_order_status,
  get_prescriptions_details,
} from "@/redux/slice/pharmacySlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { CiUser } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { showToast } from "nextjs-toast-notify";
export default function OrderidPage() {
  const [isPopupOpen, setisPopupOpen] = useState({
    btn: false,
    lable: "",
  });
  const { orderid } = useParams();
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.pharmacy);
  const [formData, setFormData] = useState({
    order_id: "",
    order_status: "",
  });
  const [loadingbtn, setLoadingbtn] = useState(false);

  useEffect(() => {
    dispatch(get_prescriptions_details(orderid)).then((res) => {
      if (res?.payload?.success) {
        setPrescriptionDetails(res?.payload?.data[0]);
      }
    });
  }, [dispatch, orderid]);
  

  const date = formatFullArabicDate(prescriptionDetails.created_at);

  const SubmitData = (e, data) => {
    e.preventDefault();
    setLoadingbtn(true);

    dispatch(add_order_status(data)).then((res) => {
      if (res?.payload?.success) {
        setLoadingbtn(false);
        if (data.order_status == "ملغية") {
          setisPopupOpen({
            ...isPopupOpen,
            btn: false,
            lable: "cancel",
          });
        } else {
          setisPopupOpen({
            ...isPopupOpen,
            btn: true,
            lable: "accepted",
          });
        }
        setFormData({ ...formData, order_status: "", order_id: "" });
      } else {
        setLoadingbtn(false);
        showToast.error(res?.payload?.message, {
          duration: 2000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          icon: "",
          sound: false,
        });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  // if (isError) {
  //   return <p>{isError}</p>;
  // }
  return (
    <div className="w-full">
      <Breadcrumb
        titleTop={"تفاصيل الطلب"}
        titlesection={"طلباتك الواردة "}
        path={["تفاصيل الطلب"]}
      />
      <div className="my-[30px]">
        {prescriptionDetails.prescription_status == "في انتظار الصرف" && (
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                const newFormData = {
                  ...formData,
                  order_status: "تم الصرف",
                  order_id: prescriptionDetails.order_id,
                };
                setFormData(newFormData);
                SubmitData(e, newFormData);
              }}
              className="py-[9px] px-[30px] flex items-center justify-center gap-2 text-[14px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
            >
              تاكيد صرف الدواء
              {loadingbtn && (
                <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
              )}
            </button>
            <button
              onClick={(e) => {
                setisPopupOpen({
                  ...isPopupOpen,
                  btn: true,
                  lable: "cancel_order",
                });
              }}
              className="py-[9px] flex items-center justify-center gap-2 px-[30px] bg-[#E0E6FF] text-Basic text-[14px] rounded-[8px] cursor-pointer duration-300 ease-in-out focus:outline-none"
            >
              الغاء الطلب
              {loadingbtn && (
                <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
              )}
            </button>
          </div>
        )}
        <div className="w-full flex justify-between items-center mt-[24px]">
          <h3 className=" text-[#483535] text-[22px] font-[700]">
            {prescriptionDetails.id}#
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
                  المريض : {prescriptionDetails.patient_name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <CiCircleInfo />
                <h3 className="text-[#424242] font-[500] text-[14px]">
                  المرض: {prescriptionDetails.sub_service}
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
                  د. {prescriptionDetails.doctor_name}
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
              {prescriptionDetails?.prescription_items?.map((ele, index) => (
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
            {prescriptionDetails.pdf_url ? (
              <div className="flex items-center gap-1">
                <CgFileDocument className="w-[20px] h-[20px] " />
                <div className="flex items-center gap-2">
                  <h3 className="text-[#424242] font-[500] text-[14px] ">
                    {prescriptionDetails.pdf_name}
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
      </div>
      {/* popup */}
      <Popup isOpen={isPopupOpen.btn} width="516px">
        {isPopupOpen.lable == "accepted" ? (
          <div className="flex flex-col justify-center items-center text-center w-full gap-[20px]">
            <FaRegCircleCheck className="text-[75px] text-Basic" />

            <h3 className="text-[20px] font-[700] text-[#212121]">
              تم صرف الدواء بنجاح!
            </h3>
            <p className="text-[15px] text-[#757575]">
              سوف يتم ارسال اشعار للطبيب بإخطاره أن الدواء قد تم صرفه
            </p>
            <button
              onClick={() => setisPopupOpen({ ...isPopupOpen, btn: false })}
              className="py-[9px] w-full text-[14px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
            >
              العودة للرئيسية
            </button>
          </div>
        ) : isPopupOpen.lable == "cancel" ? (
          <div className="flex flex-col justify-center items-center text-center w-full gap-[20px]">
            <FaRegCircleCheck className="text-[75px] text-Basic" />

            <h3 className="text-[20px] font-[700] text-[#212121]">
              تم إلغاء الطلب بنجاح!
            </h3>
            <p className="text-[15px] text-[#757575]">
              سوف يتم ارسال اشعار للمريض بإخطاره أن الدواء قد تم إلغاء طلبه
            </p>
            <button
              onClick={() => setisPopupOpen({ ...isPopupOpen, btn: false })}
              className="py-[9px] w-full text-[14px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
            >
              العودة للرئيسية
            </button>
          </div>
        ) : isPopupOpen.lable == "cancel_order" ? (
          <div className="flex flex-col justify-center items-center text-center w-full gap-[20px]">
            <BsExclamationCircle className="text-[75px] text-[#F75555]" />
            <h3 className="text-[20px] font-[700] text-[#212121]">
              هل أنت متأكد من إلغاء الطلب؟
            </h3>
            <p className="text-[15px] text-[#757575] max-w-[359px]">
              هل ترغب في إلغاء هذا الطلب لعدم توفر بعض الأدوية؟ سوف يتم اخطاء
              الطبيب بالغاء الطلب
            </p>
            <div className="flex items-center justify-center gap-[16px] w-full">
              <button
                onClick={(e) => {
                  const newFormData = {
                    ...formData,
                    order_status: "ملغية",
                    order_id: prescriptionDetails.order_id,
                  };
                  setFormData(newFormData);
                  SubmitData(e, newFormData);
                }}
                className="py-[9px] w-full text-[14px] bg-[#F75555] text-white rounded-[8px] cursor-pointer duration-300 ease-in-out focus:outline-none"
              >
                تاكيد الغاء الطلب
              </button>
              <button
                onClick={() => setisPopupOpen({ ...isPopupOpen, btn: false })}
                className="py-[9px] w-full  text-[14px] bg-[#EEEEEE] text-black rounded-[8px] cursor-pointer duration-300 ease-in-out focus:outline-none"
              >
                رجوع
              </button>
            </div>
          </div>
        ) : null}
      </Popup>
    </div>
  );
}
