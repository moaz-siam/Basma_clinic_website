"use client";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { RxUpload } from "react-icons/rx";
import { MdError } from "react-icons/md";

import { BsFileEarmarkArrowUp } from "react-icons/bs";
import Popup from "@/components/pageProps/Pop";
import { PiPillLight } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import { LuDownload } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  consultation_replie,
  get_ConsultationId_doctor,
  get_Consultations_Doc_detiles,
  get_Medicines,
} from "@/redux/slice/doctorSlice";
import { useParams } from "next/navigation";
import { formatFullArabicDate } from "@/components/pageProps/FormatedDT";
import { showToast } from "nextjs-toast-notify";
import { useRouter } from "next/navigation";
import Loading from "@/components/pageProps/loading";

export default function ConsultationidreviewPage() {
  const { consultationid } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [consultationId, setConsultationId] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loadingbtn, setLoadingbtn] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading } = useSelector((state) => state.doctor);

  const [form, setForm] = useState({
    consultation_id: consultationId.id,
    doctor_id: consultationId.doctor_id,
    patient_id: consultationId.patient_id,
    reply_text: "",
    file: "",
    file_name: "",
    medicines: [
      {
        medicine_id: "",
        dosage: "",
        duration: "",
      },
    ],
  });
  const [errorvalidat, setErrovalidatr] = useState({
    reply_text: "",
    file: "",
  });
  const validateForm = () => {
    const errors = {};
    if (!form.reply_text.trim()) {
      errors.reply_text = "الرد مطلوب";
    }
    if (!form.file) {
      errors.file = "الوصف مطلوب";
    }
    return errors;
  };
  useEffect(() => {
    dispatch(get_ConsultationId_doctor(consultationid)).then((res) =>
      setConsultationId(res?.payload?.data[0])
    );
    dispatch(get_Medicines()).then((res) => setMedicines(res?.payload?.data));
  }, [dispatch, consultationid]);
  useEffect(() => {
    if (consultationId?.id) {
      setForm((prev) => ({
        ...prev,
        consultation_id: consultationId.id,
        doctor_id: consultationId.doctor_id,
        patient_id: consultationId.patient_id,
      }));
    }
  }, [consultationId]);
  //handleFileChange
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        file: file,
        file_name: file.name,
      }));
    }
  };
  //handleMedicineChange
  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...form.medicines];
    newMedicines[index][field] = value;
    setForm({ ...form, medicines: newMedicines });
  };
  // removeMedicine
  const removeMedicine = (index) => {
    const filtered = form.medicines.filter((_, i) => i !== index);
    setForm({ ...form, medicines: filtered });
  };
  // submit data
  const SubmitData = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrovalidatr(errors);
    } else {
      setErrovalidatr({});

      setLoadingbtn(true);
      const formData = new FormData();
      formData.append("file", form.file);
      // البيانات النصية (state)
      formData.append("consultation_id", form.consultation_id);
      formData.append("doctor_id", form.doctor_id);
      formData.append("patient_id", form.patient_id);
      formData.append("reply_text", form.reply_text);
      formData.append("file_name", form.file_name);
      const cleanedMedicines = form.medicines.filter(
        (item) =>
          item.medicine_id.trim() !== "" &&
          item.dosage.trim() !== "" &&
          item.duration.trim() !== ""
      );
      if (cleanedMedicines.length > 0) {
        formData.append("medicines", JSON.stringify(form.medicines));
      } else {
        formData.append("medicines", cleanedMedicines);
      }
      console.log(formData.get("file"));

      dispatch(consultation_replie(formData)).then((res) => {
        if (res?.payload?.success) {
          setLoadingbtn(false);
          dispatch(get_Consultations_Doc_detiles(form.consultation_id))
          router.push(`/dashboard/doctor/consultation/${form.consultation_id}`);
          showToast.success(res?.payload?.message, {
            duration: 3000,
            progress: true,
            position: "top-center",
            transition: "fadeIn",
            icon: "",
          });
          // إعادة تعيين الـ form بعد النجاح
          setForm({
            consultation_id: consultationId.id,
            doctor_id: consultationId.doctor_id,
            patient_id: consultationId.patient_id,
            reply_text: "",
            file: "",
            file_name: "",
            medicines: [
              {
                medicine_id: "",
                dosage: "",
                duration: "",
              },
            ],
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

  

  const formatDate = formatFullArabicDate(consultationId.created_at);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <Breadcrumb
        titleTop={"تفاصيل الاستشارة"}
        titlesection={"استشاراتك الحالية"}
        path={["تفاصيل الاستشارة"]}
      />
      <div className="mt-[30px]">
        {/* 1 */}
        <div>
          <div className="w-full flex justify-between items-center">
            <h3 className=" text-[#212121] text-[22px] font-[700]">12345#</h3>
            <span className="text-[#616161] text-[17px]">{formatDate}</span>
          </div>
          <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11A] px-[24px] py-[26px] space-y-[5px] relative">
            <h3 className="text-[#212121] font-[600] text-[16px]">
              نوع الخدمة:{" "}
              <span className="text-[#616161]">
                {/* {consultation.main_service} */}
                {consultationId.main_service}
              </span>
            </h3>
            <h3 className="text-[#212121] font-[600] text-[16px]">
              الخدمة الفرعية:{" "}
              <span className="text-[#616161]">
                {/* {consultation.sub_service} */}
                {consultationId.sub_service}
              </span>
            </h3>
            <div
              className={`absolute top-5 left-5 px-[23px] py-[5px] rounded-[8px] ${
                consultationId.status === "نشطة"
                  ? "bg-[#45B36926] text-[#07BD74]"
                  : consultationId.status === "مكتملة"
                  ? "bg-[#007BFF26] text-[#007BFF]"
                  : consultationId.status === "مجدولة"
                  ? "bg-[#FFC10726] text-[#FFC107]"
                  : consultationId.status === "ملغية"
                  ? "bg-[#FF000026] text-[#FF0000]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {consultationId.status}
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">المريض</h3>
          <div className="mt-[15px] bg-[#FFFFFF] rounded-[16px] shadow-custom  px-[24px] py-[26px] space-y-[5px] relative flex justify-between items-center w-full">
            <div className="flex items-center gap-[16px]">
              <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#EEF1FF] text-Basic text-[18px] font-[500]">
                أح
              </div>
              <div className=" space-y-[5px]">
                <h3 className=" text-[15px] font-[700] text-[#212121]">
                  {/* د. {consultation.doctor_name_ar} */}
                  {consultationId.patient_name_ar}
                </h3>
                <span className="text-[#616161] text-[13px] font-[500]">
                  مريض اكتئاب
                </span>
              </div>
            </div>
            <div className=" flex items-center gap-[10px]">
              <Link
                href={""}
                className="w-[40px] h-[40px] text-[18px] rounded-full bg-[#EEF1FF] text-Basic flex items-center justify-center"
              >
                <FaRegEnvelopeOpen />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">سؤال المريض</h3>
          <div className="mt-[16px] bg-white rounded-[16px] shadow-custom p-[24px]">
            <p className="text-[16px] text-[#424242] font-[600]">
              {consultationId.question}
            </p>
            <div className="flex items-center gap-1 mt-[15px]">
              <CgFileDocument className="w-[20px] h-[20px] " />
              <div className="flex items-center gap-2">
                <h3 className="text-[#424242] font-[500] text-[14px] ">
                  {consultationId.attachment_name
                    ? consultationId.attachment_name
                    : null}
                </h3>
                <div className="flex items-center gap-1 text-Basic text-[14px] cursor-pointer">
                  <span className="underline">تحميل</span>
                  <LuDownload />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="text-[#212121] text-[22px] font-[700]">
            الملفات والتقارير
          </h3>
          {form.file_name ? (
            <div className="w-full bg-white rounded-[16px] text-center py-[24px] shadow-custom gap-2 mt-[15px]">
              <div className="p-[16px] rounded-[8px] w-full">
                <div className="flex items-center w-full gap-[12px]">
                  <div>
                    <BsFileEarmarkArrowUp className="text-[50px] text-red-500" />
                  </div>
                  <div className=" space-y-[10px] w-full">
                    <div className="flex justify-between items-center w-full">
                      <h3 className="text-[14px] text-[#212121]">
                        {form.file_name}
                      </h3>
                      <span className="text-[#424242]">60%</span>
                    </div>
                    <div className="bg-[#E0E6FF] w-full h-[5px] rounded-[8px]">
                      <div
                        className="bg-Basic h-full w-[100px] rounded-[8px] transition-all duration-200 ease-in-out"
                        // style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full bg-white rounded-[16px] text-center py-[24px] shadow-custom flex flex-col justify-center items-center gap-2 mt-[15px]">
              <BsFileEarmarkArrowUp className="text-[35px] text-[#757575]" />
              <h3 className="font-[700] text-[16px]">
                اختر ملفًا أو اسحبه وأفلته هنا
              </h3>
              <p className="text-[#9E9E9E] text-[14px]">
                JPEG , PNG , MP4, PDF حتى 50 ميجابت{" "}
              </p>
            </div>
          )}
          <div className="flex items-center">
            <div
              className="w-fit my-[16px] cursor-pointer"
              onClick={() => setIsPopupOpen(true)}
            >
              <div className=" shadow-[0px_4px_25px_0px_#A1A1A11A] bg-Basic text-white duration-200 ease-in-out rounded-[8px] px-[25px] py-[10px] flex justify-center items-center gap-[8px]">
                <h3 className="">ارفاق ملف</h3>
                <RxUpload />
              </div>
            </div>
            {errorvalidat.file && (
              <p className="text-red-500 text-sm flex items-center gap-[3px]">
                <MdError />
                {errorvalidat.file}
              </p>
            )}
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="mb-[15px] font-[700]">الادوية</h3>
          <div className=" bg-white rounded-[16px] px-[24px] py-[32px] shadow-custom  w-full">
            {form.medicines.map((ele, index) => (
              <div
                className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-[24px] items-center"
                key={index}
              >
                <div className="">
                  <span className="text-[15px] text-[#212121] font-[600]">
                    {" "}
                    اختيار الدواء
                  </span>
                  <select
                    value={ele.medicine_id}
                    name=""
                    id=""
                    className="w-full rounded-[8px] px-[16px] py-[13px] border-[1px] border-[#E0E0E0] mt-[8px]"
                    onChange={(e) =>
                      handleMedicineChange(index, "medicine_id", e.target.value)
                    }
                  >
                    <option value="">اختار الدواء</option>
                    {medicines.map((med) => (
                      <option value={med.id} key={med.id}>
                        {med.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <span className="text-[15px] text-[#212121] font-[600]">
                    {" "}
                    الجرعة
                  </span>
                  <div className="w-full rounded-[8px] px-[16px] py-[13px] border-[1px] border-[#E0E0E0] flex items-center mt-[8px]">
                    <input
                      type="text"
                      className="h-full w-full focus:outline-none placeholder:text-[#E0E0E0]"
                      placeholder="الجرعة"
                      value={ele.dosage}
                      onChange={(e) =>
                        handleMedicineChange(index, "dosage", e.target.value)
                      }
                    />
                    <PiPillLight className="w-[20px] h-[20px] text-[#616161]" />
                  </div>
                </div>
                <div className="">
                  <span className="text-[15px] text-[#212121] font-[600]">
                    {" "}
                    وقت الدواء
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-full rounded-[8px] px-[16px] py-[13px] border-[1px] border-[#E0E0E0] flex items-center mt-[8px]">
                      <input
                        type="text"
                        className="h-full w-full focus:outline-none placeholder:text-[#E0E0E0]"
                        placeholder="الوقت"
                        value={ele.duration}
                        onChange={(e) =>
                          handleMedicineChange(
                            index,
                            "duration",
                            e.target.value
                          )
                        }
                      />
                      <GoClock className="w-[20px] h-[20px] text-[#616161]" />
                    </div>
                    <button
                      className=" cursor-pointer"
                      onClick={() => removeMedicine(index)}
                    >
                      ❌
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="w-fit my-[16px] cursor-pointer"
            onClick={() =>
              setForm({
                ...form,
                medicines: [
                  ...form.medicines,
                  { medicine_id: "", dosage: "", duration: "" },
                ],
              })
            }
          >
            <div className=" shadow-[0px_4px_25px_0px_#A1A1A11A] bg-Basic text-white duration-200 ease-in-out rounded-[8px] px-[25px] py-[10px] flex justify-center items-center gap-[8px]">
              <h3 className="">أضف دواء ➕</h3>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <h3 className="mb-[15px] font-[700] text-[18px]">
            رد الطبيب على الاستشارة
          </h3>
          <div className="mt-[15px]">
            <textarea
              name="question"
              // value={form.question}
              id=""
              value={form.reply_text}
              onChange={(e) => setForm({ ...form, reply_text: e.target.value })}
              className="w-full mt-[10px] h-[180px] focus:outline-none bg-white rounded-[16px] shadow-custom py-[13px] px-[16px] placeholder:text-[#DADADA] focus:border-[1px] focus:border-Basic duration-200 ease-in-out"
              placeholder="اكتب رسالتك هنا ..."
            ></textarea>
            {errorvalidat.reply_text && (
              <p className="text-red-500 text-sm flex items-center gap-[3px]">
                <MdError />
                {errorvalidat.reply_text}
              </p>
            )}
          </div>
        </div>
        <div className=" my-[10px]">
          <button
            onClick={SubmitData}
            className=" py-[10px] px-[55px] flex items-center gap-2 bg-Basic font-[700] text-white text-center rounded-[8px] hover:bg-[#2F247F] duration-300 ease-in-out cursor-pointer"
          >
            ارسال
            {loadingbtn && (
              <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
            )}
          </button>
        </div>
        {/* popup */}
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
                // value={form.file}
                className="hidden"
                onChange={handleFileChange} // (اختياري)
              />
            </label>
          </div>
          {form.file_name && (
            <div className="p-[16px] border-1 border-[#E0E0E0] mt-[16px] rounded-[8px] w-full">
              <div className="flex items-center w-full gap-[12px]">
                <div>
                  <BsFileEarmarkArrowUp className="text-[50px] text-red-500" />
                </div>
                <div className=" space-y-[10px]">
                  <div className="flex justify-between items-center w-full">
                    <h3 className="text-[14px] text-[#212121]">
                      {form.file_name}
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
      </div>
    </div>
  );
}
