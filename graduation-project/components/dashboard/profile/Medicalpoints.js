"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { TbBuildingHospital } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  add_medical_points,
  get_medical_points,
  get_patient_medical_points,
} from "@/redux/slice/patientSlice";
import Loading from "@/components/pageProps/loading";
import { showToast } from "nextjs-toast-notify";

export default function Medicalpoints() {
  const [data, setData] = useState([]);
  const [medicalpointsall, setMedicalPointsAll] = useState([]);
  const [createpage, setCreatepage] = useState(false);
  const [setting, setSetting] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, medical_points } = useSelector((state) => state.patient);

  const [formData, setFormData] = useState({
    medical_point_id: "",
    is_default: false,
  });
  const [selectvalue, setSelectValue] = useState([]);
  const [loadingbtn, setLoadingbtn] = useState(false);

  useEffect(() => {
    dispatch(get_patient_medical_points());
  }, [dispatch]);

  useEffect(() => {
    if (medical_points?.length > 0) {
      setData(medical_points);
    }
  }, [medical_points]);

  useEffect(() => {
    dispatch(get_medical_points()).then((res) => {
      if (res?.payload?.success) {
        setMedicalPointsAll(res?.payload?.data);
      }
    });
  }, [dispatch]);

  const SubmitData = (e) => {
    e.preventDefault();
    setLoadingbtn(true);
    dispatch(add_medical_points(formData)).then((res) => {
      if (res?.payload?.success) {
        setLoadingbtn(false);
        setCreatepage(false);
        dispatch(get_patient_medical_points());
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
          medical_point_id: "",
          is_default: false,
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
      {data.length == 0 && createpage == false ? (
        <div className="flex items-center justify-center flex-col gap-[10px]">
          <TbBuildingHospital className="text-[150px] text-Basic" />
          <h3 className="text-[24px] text-[#212121] font-[600]">
            لا يوجد نقاط طبية مضافة بعد!
          </h3>
          <p className="text-[18px] text-[#616161] font-[400]">
            لم تقم بإضافة أي نقطة طبية حتى الآن. لإتمام طلب الادوية، يُرجى إضافة
            نقطة طبية.
          </p>
          <button
            onClick={() => setCreatepage(true)}
            className=" bg-Basic focus:outline-none rounded-[8px] px-[40px] py-[9px] font-[600] text-[14px] text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
          >
            + أضف نقطة طبية جديدة
          </button>
        </div>
      ) : data.length > 0 && createpage == false ? (
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-[18px] font-[700] ">النقاط الطبية</h3>
            <button
              onClick={() => setCreatepage(true)}
              className=" bg-Basic focus:outline-none rounded-[8px] px-[40px] py-[9px] font-[600] text-[14px] text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
            >
              + إضافة نقطة طبية جديدة
            </button>
          </div>
          <div className="w-full mt-[14px]">
            {data.map((ele, index) => (
              <div
                key={index}
                className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] flex justify-between rounded-[16px] relative"
              >
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
                <CiMenuKebab
                  className=" cursor-pointer"
                  onClick={() => setSetting(!setting)}
                />
                {setting && (
                  <div className=" absolute left-6 top-14 bg-white p-[16px] w-[210px] shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-[8px]">
                    <div className="flex items-center justify-between cursor-pointer text-[15px] font-[500] text-black">
                      <span className="">تعديل</span>
                      <GoPencil />
                    </div>
                    <div className="flex items-center justify-between cursor-pointer text-[15px] font-[500] text-[#F75555] mt-[15px]">
                      <span className="">حذف</span>
                      <RiDeleteBin5Line />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {createpage && (
        <div className="w-full">
          <h3 className=" text-black font-bold text-[20px]">
            إضافة نقطة طبية جديدة
          </h3>
          <div className="flex flex-col w-full gap-[25px] mt-[24px]">
            <select
              name="medicalpointsall"
              id="medicalpointsall"
              className="w-50 cursor-pointer focus:outline-none border-1 border-Basic shadow-custom px-[15px] py-[10px] rounded-[8px]"
              value={formData.medical_point_id || ""}
              onChange={(e) => {
                const selected = medicalpointsall.find(
                  (mp) => mp.id === parseInt(e.target.value)
                );
                setSelectValue(selected);
                setFormData({ ...formData, medical_point_id: e.target.value });
              }}
            >
              <option value="" disabled>
                اختر النقطة الطبية
              </option>
              {medicalpointsall.map((ele, index) => (
                <option key={index} value={ele.id}>
                  {ele.name}
                </option>
              ))}
            </select>
            <div className="flex flex-col w-full">
              <label htmlFor="">اسم النقطة الطبية</label>
              <input
                name="name"
                value={selectvalue.name || ""}
                onChange={(e) =>
                  setSelectValue({ ...selectvalue, name: e.target.value })
                }
                type="text"
                className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                placeholder="اسممثل صيدلية الشفاء  صاحب البطاقة "
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="">الموقع</label>
              <input
                name="address"
                value={selectvalue.address || ""}
                onChange={(e) =>
                  setSelectValue({ ...selectvalue, address: e.target.value })
                }
                type="text"
                className="focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                placeholder="بيت لاهيا ، شارع الفالوجا ، مقابل مستشفى الرنتيسي"
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-4 flex-wrap gap-2 text-sm">
            <label className="flex items-center gap-2 text-[#9E9E9E]">
              <input
                type="checkbox"
                className="hidden peer"
                onChange={() =>
                  setFormData({ ...formData, is_default: !formData.is_default })
                }
              />
              <div className="w-4 h-4 border-2 border-[#E0E0E0] rounded-[2px] flex justify-center items-center peer-checked:bg-Basic peer-checked:border-Basic peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:text-xs cursor-pointer "></div>
              احفظ النقطة الطبية كخيار افتراضي
            </label>
          </div>
          <button
            onClick={SubmitData}
            className=" w-full bg-Basic flex items-center justify-center gap-2 focus:outline-none rounded-[8px] px-[40px] py-[9px] font-[600] text-[14px] text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out mt-[15px]"
          >
            اضافة
            {loadingbtn && (
              <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
