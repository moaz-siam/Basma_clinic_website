"use client";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import React, { useEffect, useState } from "react";
import { LiaPrescriptionBottleAltSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import test_med from "@/assets/dashboard-img/test_med.png";
import Image from "next/image";
import { CiClock2 } from "react-icons/ci";
import { PiPillLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import jawwal_logo from "@/assets/dashboard-img/jawwal.png";
import cash_logo from "@/assets/dashboard-img/cash.png";
import palpay_logo from "@/assets/dashboard-img/palpay.png";
import { LiaPenSolid } from "react-icons/lia";
import Loading from "@/components/pageProps/loading";
import {
  add_order,
  get_medicines,
  get_patient_medical_points,
} from "@/redux/slice/patientSlice";
import { showToast } from "nextjs-toast-notify";
import Link from "next/link";

export default function MedicationtrackerPage() {
  const [medicineData, setMedicineData] = useState([]);
  const [medicalpointsall, setMedicalPointsAll] = useState([]);

  const { medical_points, isLoading, isError } = useSelector(
    (state) => state.patient
  );
  const [currentPage, setCurrentPage] = useState({ id: 1, page: "main" });
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["النقاط الطبية", "طرق الدفع", "المراجعة والتأكيد"];
  const [checked, setChecked] = useState({
    isopen: false,
    checkedname: "",
  });
  const dispatch = useDispatch();
  const goToPage = (page, id) => {
    setCurrentPage({ page, id });
  };
  const handlechangeStep = () => {
    if (currentStep <= 2) {
      setCurrentStep(currentStep + 1);
    }
  };
  // get data from api ==========
  const [loadingbtn, setLoadingbtn] = useState(false);

  const [medicines, setMedicines] = useState([]);
  const [countmedicine, setCountmedicine] = useState(1);
  const [medicines_description, setMedicines_description] = useState(null);
  const [formData, setFormData] = useState({
    pharmacy_id: "1",
    prescription_id: "",
    prescription_items_id: "",
    total_price: "",
    payment_method: "",
    notes: "في انتظار الصرف",
    quantity: "",
    unit_price: "",
  });
  useEffect(() => {
    dispatch(get_medicines()).then((res) => {
      if (res?.payload?.success) {
        setMedicines(res?.payload?.data);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(get_patient_medical_points());
  }, [dispatch]);

  
  

  useEffect(() => {
    if (medical_points?.length > 0) {
      setMedicalPointsAll(medical_points);
    }
  }, [medical_points]);

  
  const handle_submit_order = () => {
    setLoadingbtn(true);
    dispatch(add_order(formData)).then((res) => {
      if (res?.payload?.success) {
        setLoadingbtn(false);
        goToPage("main", 1);
        showToast.success(res?.payload?.message, {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          icon: "",
          sound: true,
        });
        // إعادة تعيين الـ form بعد النجاح
        setFormData({
          pharmacy_id: "",
          prescription_id: "",
          total_price: "",
          payment_method: "",
          notes: "في انتظار الصرف",
          medicine_name: "",
          dosage: "",
          quantity: "",
          unit_price: "",
        });
      } else {
        setLoadingbtn(false);
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
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full">
      <div className=" container mx-auto">
        <Breadcrumb titleTop={"متعقب الأدوية"} titlesection={"متعقب الأدوية"} />
        {medicines.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center gap-[16px] min-h-[calc(100vh-250px)] text-center">
            <LiaPrescriptionBottleAltSolid className="text-[120px] text-Basic" />
            <h3 className="md:text-[30px] text-[20px] text-[#212121] font-[600]">
              لا يوجد أدوية مضافة بعد!
            </h3>
            <p className="text-[18px] font-[400] text-[#616161] max-w-[600px]">
              {" "}
              يبدو أن قائمتك فارغة حاليًا. أضف الأدوية التي وصفها لك الطبيب
              لتتبعها بسهولة والتأكد من تناولها في الوقت المحدد.{" "}
            </p>
          </div>
        ) : currentPage.page == "main" && currentPage.id == 1 ? (
          <div className="mt-[24px]">
            {/* الصفحة الرئيسية */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[16px]">
              {medicines.map((med) => (
                <div
                  key={med.id}
                  className=" bg-white rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] p-[16px]"
                >
                  <div className="w-full bg-[#F5F5F5] flex items-center justify-center">
                    <Image
                      src={test_med}
                      className="w-auto h-[140px] object-cover"
                      alt="error"
                      width={0}
                      height={0}
                    />
                  </div>
                  <div className=" space-y-[5px] my-[10px]">
                    <h3 className="text-[15px] font-[700] text-[#212121]">
                      {med.medicines_name}
                    </h3>
                    <p className="text-[13px] text-[#757575] font-[400]">
                      {med.medicines_description}
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
                  <div className="my-[13px] flex justify-between items-center w-full">
                    <div className="flex items-center gap-1">
                      <CiClock2 className=" text-Basic" />
                      <span className="text-[12px] text-[#757575]">
                        {med.instructions}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <PiPillLight className=" text-Basic" />
                      <span className="text-[12px] text-[#757575]">
                        {med.dosage}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      goToPage("con", 2);
                      setFormData({
                        ...formData,
                        prescription_items_id: med.prescription_items,
                        prescription_id: med.prescriptions_id,
                        medicine_name: med.medicines_name,
                        dosage: med.dosage,
                        unit_price: med.medicines_price,
                        total_price: med.medicines_price,
                      });
                      setMedicines_description(med.medicines_description);
                    }}
                    className=" bg-Basic focus:outline-none rounded-[8px] py-[9px] font-[600] text-[14px] w-full text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
                  >
                    طلب الدواء
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : currentPage.page == "con" && currentPage.id == 2 ? (
          <div className="mt-[40px]">
            {/* اعادة طلب الدواء*/}
            <div className="bg-white rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] p-[24px] w-full flex items-center justify-between">
              <div className="flex items-center gap-[16px]">
                <Image
                  src={test_med}
                  className="w-auto h-[100px] object-cover"
                  alt="error"
                  width={0}
                  height={0}
                />
                <div className=" space-y-[6px]">
                  <h3 className="text-[16px] text-[#212121] font-[600]">
                    {formData.medicine_name}
                  </h3>
                  <p className="text-[14px] font-[400] text-[#757575]">
                    {medicines_description}
                  </p>
                  <span className="text-[14px] font-[700] text-Basic">
                    {formData.total_price} شيكل
                  </span>
                </div>
              </div>
              <div className=" flex items-center gap-2">
                <span
                  onClick={() => {
                    setCountmedicine(countmedicine + 1);
                    setFormData({
                      ...formData,
                      total_price: countmedicine * (formData.unit_price || 0),
                    });
                  }}
                  className=" bg-Basic text-white w-[25px] h-[25px] flex items-center justify-center font-bold rounded-full cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
                >
                  +
                </span>
                <span>{countmedicine}</span>
                <span
                  onClick={() => {
                    setCountmedicine(countmedicine - 1);
                    setFormData({
                      ...formData,
                      total_price: countmedicine * formData.unit_price,
                    });
                  }}
                  className=" bg-Basic text-white w-[25px] h-[25px] flex items-center justify-center font-bold rounded-full cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
                >
                  -
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                goToPage("payment", 3);
                setFormData({
                  ...formData,
                  quantity: countmedicine,
                  total_price: countmedicine * formData.unit_price,
                });
              }}
              className=" bg-Basic mt-[50px] focus:outline-none rounded-[8px] py-[9px] font-[600] text-[14px] w-full text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
            >
              استمر
            </button>
          </div>
        ) : currentPage.page == "payment" && currentPage.id == 3 ? (
          <div className="w-full">
            {/* صفحات دفع الدواء */}
            <div className="flex flex-col items-center">
              {/* الدوائر والخط */}
              <div className="flex justify-center items-center">
                {steps.map((step, index) => (
                  <React.Fragment key={index}>
                    {/* الدائرة */}
                    <div className="flex flex-col items-center relative">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold z-10 ${
                          index < currentStep
                            ? "bg-Basic text-white" // مكتملة
                            : index === currentStep
                            ? "bg-[#C7D0FE] text-white" // الحالية
                            : "border-2 border-[#C7D0FE] text-[#C7D0FE]" // القادمة
                        }`}
                      >
                        {index < currentStep ? "✓" : index + 1}
                      </div>
                    </div>

                    {/* الخط */}
                    {index < steps.length - 1 && (
                      <div
                        className={`w-[150px] h-[3px] ${
                          index <= currentStep - 1 ? "bg-Basic" : "bg-[#C7D0FE]"
                        }`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* النصوص أسفل الدوائر */}
              <div className="flex justify-between gap-30 mt-3">
                {steps.map((step, index) => (
                  <div key={index} className=" text-center">
                    <p
                      className={`text-[14px] font-medium ${
                        index <= currentStep ? "text-Basic" : "text-black"
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-[30px]">
              {currentStep == 0 || currentStep == -1 ? (
                <div className="">
                  {/* النقطة الطبية */}
                  <h3 className=" text-black font-bold text-[20px]">
                    النقاط الطبية
                  </h3>
                  {medicalpointsall.map((ele, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex items-center justify-between rounded-[16px] w-full mt-[10px]"
                    >
                      <div className="">
                        <div className="flex items-center gap-2">
                          <div className="w-[40px] h-[40px] bg-[#E0E6FF] text-Basic flex items-center justify-center rounded-full">
                            <IoLocationOutline />
                          </div>
                          <div className=" space-y-[5px]">
                            <h3 className=" text-[15px] font-bold text-black">
                              {ele.medical_point_name}
                            </h3>
                            <p className=" text-[13px] text-[#616161]">
                              {ele.medical_point_address}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-[11px] filterAnim">
                        <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
                          <input
                            type="radio"
                            name="radio-group"
                            className="peer hidden"
                            onChange={() => {
                              setFormData({
                                ...formData,
                                pharmacy_id: ele.medical_point_id,
                              });
                            }}
                            checked={
                              formData.pharmacy_id == ele.medical_point_id
                            }
                          />
                          <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                  <Link
                    href={"/dashboard/patient/profile/medical-points"}
                    className="flex items-center gap-[8px] mt-[16px] cursor-pointer"
                  >
                    <span className=" bg-Basic text-white w-[25px] h-[25px] flex items-center justify-center font-bold rounded-full cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out">
                      +
                    </span>
                    <p className="text-Basic text-[16px] font-[500]">
                      أضف نقطة طبية جديدة
                    </p>
                  </Link>
                </div>
              ) : currentStep == 1 ? (
                <div className="">
                  {/* طرق الدفع */}
                  <h3 className=" text-black font-bold text-[20px]">
                    طرق الدفع
                  </h3>
                  <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A]  rounded-[16px] mt-[20px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CiCreditCard1 className="text-[40px]" />
                        Credit/Debit Card
                      </div>
                      <div className="flex flex-col gap-2 mt-[11px] filterAnim">
                        <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
                          <input
                            type="radio"
                            name="radio-group"
                            className="peer hidden"
                            onChange={() => {
                              setChecked({
                                isopen: true,
                                checkedname: "credit_card",
                              });
                              setFormData({
                                ...formData,
                                payment_method: "card",
                              });
                            }}
                            checked={checked.checkedname == "credit_card"}
                          />
                          <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
                        </label>
                      </div>
                    </div>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        checked.isopen && checked.checkedname == "credit_card"
                          ? "max-h-[550px] opacity-100 mt-[30px]"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <form action="">
                        <div className="">
                          <h3 className="text-[18px] font-[700] text-[#212121]">
                            معلومات البطاقة (Card Information)
                          </h3>
                          <div className="grid md:grid-cols-2 grid-cols-1 gap-[21px] mt-[20px]">
                            <div className="flex flex-col">
                              <label
                                htmlFor=""
                                className="text-[16px] text-[#424242]"
                              >
                                اسم صاحب البطاقة (Cardholder Name)
                              </label>
                              <input
                                type="text"
                                className=" focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-[14px] rounded-[16px] shadow-[0px_4px_20px_#A1A1A126] py-[13px] px-[16px] mt-[8px]"
                                placeholder="اسم صاحب البطاقة "
                              />
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor=""
                                className="text-[16px] text-[#424242]"
                              >
                                رقم البطاقة (Card Number)
                              </label>
                              <input
                                type="text"
                                className=" focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-[14px] rounded-[16px] shadow-[0px_4px_20px_#A1A1A126] py-[13px] px-[16px] mt-[8px]"
                                placeholder="XXXX XXXX XXXX XXXX"
                              />
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor=""
                                className="text-[16px] text-[#424242]"
                              >
                                {" "}
                                تاريخ الانتهاء (Expiration Date){" "}
                              </label>
                              <input
                                type="text"
                                className=" focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-[14px] rounded-[16px] shadow-[0px_4px_20px_#A1A1A126] py-[13px] px-[16px] mt-[8px]"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div className="flex flex-col">
                              <label
                                htmlFor=""
                                className="text-[16px] text-[#424242]"
                              >
                                رمز الأمان (CVV/CVC)
                              </label>
                              <input
                                type="text"
                                className=" focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-[14px] rounded-[16px] shadow-[0px_4px_20px_#A1A1A126] py-[13px] px-[16px] mt-[8px]"
                                placeholder="XXXX"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex items-center justify-between rounded-[16px] mt-[20px]">
                    <div className="flex items-center gap-2">
                      <Image
                        src={cash_logo}
                        className="w-auto h-[39px] object-cover"
                        alt="error"
                        width={0}
                        height={0}
                      />
                      الدفع كاش
                    </div>
                    <div className="flex flex-col gap-2 mt-[11px] filterAnim">
                      <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
                        <input
                          type="radio"
                          name="radio-group"
                          className="peer hidden"
                          onChange={() => {
                            setChecked({
                              isopen: true,
                              checkedname: "cash",
                            });
                            setFormData({
                              ...formData,
                              payment_method: "cash",
                            });
                          }}
                          checked={checked.checkedname == "cash"}
                        />
                        <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
                      </label>
                    </div>
                  </div>
                  <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex items-center justify-between rounded-[16px] mt-[20px]">
                    <div className="flex items-center gap-2">
                      <Image
                        src={palpay_logo}
                        className="w-auto h-[39px] object-cover"
                        alt="error"
                        width={0}
                        height={0}
                      />
                      PalPay محفظتي
                    </div>
                    <div className="flex flex-col gap-2 mt-[11px] filterAnim">
                      <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
                        <input
                          type="radio"
                          name="radio-group"
                          className="peer hidden"
                          onChange={() => {
                            setChecked({
                              isopen: true,
                              checkedname: "pal_pay",
                            });
                            setFormData({
                              ...formData,
                              payment_method: "walletpalpay",
                            });
                          }}
                          checked={checked.checkedname == "pal_pay"}
                        />
                        <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
                      </label>
                    </div>
                  </div>
                  <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex items-center justify-between rounded-[16px] mt-[20px]">
                    <div className="flex items-center gap-2">
                      <Image
                        src={jawwal_logo}
                        className="w-auto h-[39px] object-cover"
                        alt="error"
                        width={0}
                        height={0}
                      />
                      Jawwal Pay
                    </div>
                    <div className="flex flex-col gap-2 mt-[11px] filterAnim">
                      <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
                        <input
                          type="radio"
                          name="radio-group"
                          className="peer hidden"
                          onChange={() => {
                            setChecked({
                              isopen: true,
                              checkedname: "jawwal_pay",
                            });
                            setFormData({
                              ...formData,
                              payment_method: "walletjawwalpay",
                            });
                          }}
                          checked={checked.checkedname == "jawwal_pay"}
                        />
                        <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="">
                  {/* تاكيد الطلب */}
                  <div className="w-full flex justify-between items-center">
                    <h3 className=" text-[#212121] text-[22px] font-[700]">
                      12345#
                    </h3>
                    <span className="text-[#616161] text-[17px]">
                      الاثنين 10 أبريل 2025 - الساعة 2:00 مساءً
                    </span>
                  </div>
                  <div className="mt-[24px]">
                    <div className="w-full flex justify-between items-center">
                      <h3 className=" text-[#212121] text-[18px] font-[700]">
                        الدواء ({countmedicine} علب)
                      </h3>
                      <LiaPenSolid
                        onClick={() => goToPage("main", 1)}
                        className="text-[#616161] text-[17px] cursor-pointer"
                      />
                    </div>
                    <div className="bg-white rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] p-[24px] w-full flex items-center justify-between mt-[15px]">
                      <div className="flex items-center gap-[16px]">
                        <Image
                          src={test_med}
                          className="w-auto h-[80px] object-cover"
                          alt="error"
                          width={0}
                          height={0}
                        />
                        <div className=" space-y-[6px]">
                          <h3 className="text-[16px] text-[#212121] font-[600]">
                            {formData.medicine_name}
                          </h3>
                          <p className="text-[14px] font-[400] text-[#757575]">
                            {medicines_description}
                          </p>
                          <span className="text-[14px] font-[700] text-Basic">
                            {formData.total_price} شيكل
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[24px]">
                    <div className="w-full flex justify-between items-center">
                      <h3 className=" text-[#212121] text-[18px] font-[700]">
                        النقطة الطبية
                      </h3>
                      <LiaPenSolid
                        onClick={() => setCurrentStep(0)}
                        className="text-[#616161] text-[17px]  cursor-pointer"
                      />
                    </div>
                    <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex items-center justify-between rounded-[16px] mt-[15px]">
                      <div className="flex items-center gap-2">
                        <div className="w-[40px] h-[40px] bg-[#E0E6FF] text-Basic flex items-center justify-center rounded-full">
                          <IoLocationOutline />
                        </div>
                        <div className=" space-y-[5px]">
                          <h3 className=" text-[15px] font-bold text-black">
                            صيدلية الشفاء
                          </h3>
                          <p className=" text-[13px] text-[#616161]">
                            بيت لاهيا، شارع الفالوجا، مقابل مستشفى الإندونيسي
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[24px]">
                    <div className="w-full flex justify-between items-center">
                      <h3 className=" text-[#212121] text-[18px] font-[700]">
                        طرق الدفع
                      </h3>
                      <LiaPenSolid
                        onClick={() => setCurrentStep(1)}
                        className="text-[#616161] text-[17px] cursor-pointer"
                      />
                    </div>
                    <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex items-center justify-between rounded-[16px] mt-[15px]">
                      {checked.checkedname == "credit_card" ? (
                        <div className="flex items-center gap-2">
                          <CiCreditCard1 className="text-[40px]" />
                          Credit/Debit Card
                        </div>
                      ) : checked.checkedname == "pal_pay" ? (
                        <div className="flex items-center gap-2">
                          <Image
                            src={palpay_logo}
                            className="w-auto h-[39px] object-cover"
                            alt="error"
                            width={0}
                            height={0}
                          />
                          PalPay محفظتي
                        </div>
                      ) : checked.checkedname == "cash" ? (
                        <div className="flex items-center gap-2">
                          <Image
                            src={cash_logo}
                            className="w-auto h-[39px] object-cover"
                            alt="error"
                            width={0}
                            height={0}
                          />
                          الدفع كاش
                        </div>
                      ) : checked.checkedname == "jawwal_pay" ? (
                        <div className="flex items-center gap-2">
                          <Image
                            src={jawwal_logo}
                            className="w-auto h-[39px] object-cover"
                            alt="error"
                            width={0}
                            height={0}
                          />
                          Jawwal Pay
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-[32px]">
              <div className="py-[20px]">
                <div className="flex justify-between items-center">
                  <h3 className="text-[#616161] text-[18px]">المبلغ</h3>
                  <span className="text-[22px] text-[#212121] font-[700]">
                    ILS {formData.total_price}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-[16px]">
                  <h3 className="text-[#616161] text-[18px]">خصومات</h3>
                  <span className="text-[22px] text-[#212121] font-[700]">
                    ILS 00.00
                  </span>
                </div>
              </div>
              {/*  */}
              <div className="py-[20px] border-t-1 border-[#EEEEEE]">
                <div className="flex justify-between items-center">
                  <h3 className="text-[#616161] text-[18px]">
                    المبلغ الإجمالي (Total Amount)
                  </h3>
                  <span className="text-[22px] text-[#212121] font-[700]">
                    ILS {formData.total_price}
                  </span>
                </div>
              </div>
            </div>
            <div className=" ">
              <button
                onClick={() => {
                  handlechangeStep();
                  if (currentStep >= 2) {
                    handle_submit_order();
                  }
                }}
                className="flex items-center justify-center gap-2 bg-Basic focus:outline-none rounded-[8px] py-[9px] font-[600] text-[14px] w-full text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
              >
                {currentStep >= 2 ? "تاكيد الطلب" : "استمر"}
                {loadingbtn && currentStep >= 2 && (
                  <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
                )}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
