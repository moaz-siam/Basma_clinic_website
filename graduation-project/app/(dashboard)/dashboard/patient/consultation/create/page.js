"use client";

import { ServicesConsultations } from "@/assets";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { RxUpload } from "react-icons/rx";
import Popup from "@/components/pageProps/Pop";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { consultation_create, getDoctors } from "@/redux/slice/patientSlice";
import Doctorcard from "@/components/pageProps/doctorCopmonent/Doctorcard";
import { showToast } from "nextjs-toast-notify";
import Loading from "@/components/pageProps/loading";
import Reschedule from "@/components/dashboard/Reschedule";

export default function ConsultationsCreate() {
  const dispatch = useDispatch();
  const { patient, isLoading } = useSelector((state) => state.patient);
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    patient_id: user.id,
    mainservice: "الدعم والصحة النفسية", // ✅ قيمة مبدئية مباشرة
    subservices: "",
    doctor: "",
    question: "",
    file: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dataDoctor, setDataDoctor] = useState([]);
  const [checked, setChecked] = useState(0);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [filename, setFilename] = useState("");
  const [loadingbtn, setLoadingbtn] = useState(false);

  const [currentPageAppo, setCurrentPageAppo] = useState(false);
  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
    setFilename(e.target.files[0].name);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const hadnleChangeDoc = (id, index) => {
    setForm({
      ...form,
      doctor: id,
    });
    setChecked(index);
  };

  const filteredDoctors = dataDoctor.filter((doctor) =>
    doctor.full_name_ar.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  useEffect(() => {
    dispatch(getDoctors()).then((res) => setDataDoctor(res?.payload?.data));
  }, [dispatch]);

  const SubmitData = (e) => {
    e.preventDefault();
    setLoadingbtn(true);

    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("patient_id", form.patient_id);
    formData.append("mainservice", form.mainservice);
    formData.append("subservices", form.subservices);
    formData.append("doctor", form.doctor);
    formData.append("question", form.question);

    dispatch(consultation_create(formData)).then((res) => {
      if (res?.payload?.success) {
        setLoadingbtn(false);
        showToast.success(res?.payload?.message, {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          icon: "",
          sound: true,
        });
        setForm({
          patient_id: "",
          mainservice: "الدعم والصحة النفسية",
          subservices: "",
          doctor: "",
          question: "",
          file: null,
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
      <div className="container mx-auto">
        {currentPageAppo ? (
          <div className="">
            <Breadcrumb
              titleTop={"حجز موعد استشارة"}
              titlesection={"تفاصيل الموعد"}
            />
            <Reschedule type={"patient"} />
          </div>
        ) : (
          <div className="">
            <Breadcrumb
              titleTop={"حجز استشارة"}
              titlesection={"استشاراتك الحالية"}
              path={["حجز استشارة"]}
            />
            <div className="flex items-center justify-end">
              <button
                onClick={() => setCurrentPageAppo("true")}
                href={"/dashboard/patient/consultation/create"}
                className="py-[6px] px-[25px] mt-[10px] bg-Basic text-white rounded-[8px] cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out focus:outline-none"
              >
                حجز موعد
              </button>
            </div>

            {/* اختيار نوع الخدمة */}
            <div className="mt-[40px]">
              <h3 className="mb-[15px] font-[700]">نوع الخدمة</h3>
              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-[16px] w-full">
                {ServicesConsultations.map((ele, index) => (
                  <div
                    key={index}
                    className="py-[16px] bg-white shadow-sm rounded-[8px] px-[5px] w-full"
                  >
                    <label className="flex items-center gap-2 text-[#616161] cursor-pointer w-full">
                      <input
                        type="radio"
                        name="mainservice"
                        className="peer hidden"
                        value={ele.title}
                        checked={form.mainservice === ele.title}
                        onChange={(e) => handleChange(e)}
                      />
                      <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic peer-checked:outline-1 peer-checked:outline-Basic"></div>
                      {ele.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* الخدمات الفرعية */}
            <div className="mt-[40px]">
              <h3 className="mb-[15px] font-[700]">الخدمات الفرعية</h3>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-[16px] w-full">
                {ServicesConsultations.map((sub, index) =>
                  sub.title === form.mainservice
                    ? sub.subServices.map((ele) => (
                        <div
                          key={ele.id}
                          className="py-[16px] bg-white shadow-sm rounded-[8px] px-[5px] w-full"
                        >
                          <label className="flex items-center gap-2 text-[#616161] cursor-pointer w-full">
                            <input
                              type="radio"
                              name="subservices"
                              className="peer hidden"
                              value={ele.title}
                              checked={form.subservices === ele.title}
                              onChange={(e) => handleChange(e)}
                            />
                            <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic peer-checked:outline-1 peer-checked:outline-Basic"></div>
                            {ele.title}
                          </label>
                        </div>
                      ))
                    : null
                )}
              </div>
            </div>
            <div className="mt-[32px]">
              <h3 className="mb-[15px] font-[700]">الاطباء</h3>
              <div className="flex justify-between items-center">
                <div className="w-[339px] flex items-center rounded-[8px] bg-white shadow-[0px_4px_25px_0px_#A1A1A11A] px-[20px] py-[14px]">
                  <RiSearch2Line className="text-[#E0E0E0]" />
                  <input
                    type="text"
                    onChange={(e) => setSearchDoctor(e.target.value)}
                    className=" focus:outline-none placeholder:text-[#E0E0E0] px-[5px]"
                    placeholder="البحث"
                  />
                </div>
                <div className=" flex items-center shadow-[0px_4px_25px_0px_#A1A1A11A] bg-white rounded-[8px]">
                  <button
                    className=" flex justify-center items-center gap-[8px] border-l-1 border-[#E0E0E0] px-[44px] py-[14px] text-[18px]cursor-pointer hover:bg-Basic hover:text-white duration-300 ease-in-out"
                    // onClick={() => setFiltersidenav(true)}
                  >
                    فلتر
                    <CiFilter />
                  </button>
                  <button className="flex justify-center items-center gap-[8px] px-[16px] py-[14px] text-[18px]  cursor-pointer hover:bg-Basic hover:text-white duration-300 ease-in-out">
                    الأطباء المتاحين
                    <RiArrowDropDownLine />
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mt-[20px]">
                {filteredDoctors.slice(0, 4).map((doc, index) => (
                  <div
                    key={index}
                    className={`${
                      checked == index ? " border-2 border-Basic" : ""
                    } cursor-pointer rounded-2xl`}
                    onClick={() => hadnleChangeDoc(doc.doctor_id, index)}
                  >
                    <Doctorcard
                      img={doc.image_url}
                      name={doc.full_name_ar}
                      rating={doc.average_rating}
                      namepath={doc.full_name_en.split(" ").join("-")}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-[32px]">
              <h3 className="mb-[15px] font-[700]">اسأل الطبيب</h3>
              <div className="mt-[36px]">
                <h3 className="text-[18px] font-[600]">السؤال</h3>
                <textarea
                  name="question"
                  value={form.question}
                  id=""
                  onChange={(e) => handleChange(e)}
                  className="w-full mt-[10px] h-[181px] focus:outline-none bg-white rounded-[16px] shadow-sm py-[13px] px-[16px] placeholder:text-[#DADADA]"
                  placeholder="اكتب سؤالك هنا ..."
                ></textarea>
              </div>
            </div>
            <div
              className="w-fit my-[16px] cursor-pointer"
              onClick={() => setIsPopupOpen(true)}
            >
              <div className=" shadow-[0px_4px_25px_0px_#A1A1A11A] border-1 border-Basic text-Basic hover:text-white hover:bg-Basic duration-200 ease-in-out rounded-[8px] px-[25px] py-[10px] flex justify-center items-center gap-[8px]">
                <h3 className="">ارفاق ملف</h3>
                <RxUpload />
              </div>
            </div>
            {form.file && (
              <div className="p-[16px] border-1 border-[#E0E0E0] my-[16px] rounded-[8px] w-full">
                <div className="flex items-start w-full gap-[12px]">
                  <div>
                    <BsFileEarmarkArrowUp className="text-[50px] text-red-500" />
                  </div>
                  <div className=" space-y-[10px] w-full">
                    <div className="flex justify-between items-center w-full">
                      <h3 className="text-[14px] text-[#212121]">{filename}</h3>
                      <div className="text-[#07BD74] text-[14px] flex items-center gap-1">
                        مكتمل
                        <FaCheckCircle />
                      </div>
                    </div>
                    <div className="bg-[#E0E6FF] w-full h-[5px] rounded-[8px]">
                      <div
                        className="bg-[#07BD74] h-full w-full rounded-[8px] transition-all duration-200 ease-in-out"
                        // style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="text-[#9E9E9E] text-[12px]">
                      2 ميجابايت من 2 ميجابايت
                    </span>
                    <div className="flex items-center gap-[8px] mt-[10px]">
                      <button className=" rounded-[4px] focus:outline-none bg-[#F5F5F5] text-[#757575] px-[20px] py-[4px] cursor-pointer">
                        تغير
                      </button>
                      <button className=" rounded-[4px] focus:outline-none bg-[#F48E8E26] text-[#F75555] px-[20px] py-[4px] cursor-pointer">
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full mb-[10px] ">
              <button
                onClick={SubmitData}
                className="w-full flex items-center justify-center gap-2 py-[13px] bg-Basic font-[700] text-white text-center rounded-[8px] hover:bg-[#2F247F] duration-300 ease-in-out cursor-pointer"
              >
                حجز الاستشارة
                {loadingbtn && (
                  <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
                )}
              </button>
            </div>
            <Popup isOpen={isPopupOpen} width={741}>
              <div className="flex gap-[8px] w-full pl-[400px] mb-[16px]">
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
                    onChange={(e) => handleFileChange(e)} // (اختياري)
                  />
                </label>
              </div>
              {form.file && (
                <div className="p-[16px] border-1 border-[#E0E0E0] mt-[16px] rounded-[8px] w-full">
                  <div className="flex items-center w-full gap-[12px]">
                    <div>
                      <BsFileEarmarkArrowUp className="text-[50px] text-red-500" />
                    </div>
                    <div className=" space-y-[10px]">
                      <div className="flex justify-between items-center w-full">
                        <h3 className="text-[14px] text-[#212121]">
                          {filename}
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
        )}
      </div>
    </div>
  );
}
