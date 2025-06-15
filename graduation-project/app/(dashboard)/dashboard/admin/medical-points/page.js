"use client";
import DataTable from "@/components/dashboard/admin/DataTable";
import Loading from "@/components/pageProps/loading";
import Popup from "@/components/pageProps/Pop";
import {
  activity_status_md,
  add_medical_point,
  get_pharmacists,
  getAllMD,
  getAllUsers,
  update_medical_point,
} from "@/redux/slice/adminSlice";
import { showToast } from "nextjs-toast-notify";
import React, { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function MedicalPointsPage() {
  // Define columns for the users table
  const userColumns = [
    { key: "name", label: "اسم النقطة الطبية" },
    { key: "address", label: "رقم الهوية" },
    { key: "pharmaceutical_name", label: "اسم الصيدلي المسؤول" },
    { key: "pharmaceutical_national_id", label: "رقم هوية الصيدلي" },
    { key: "pharmaceutical_phone", label: "رقم جوال الصيدلي" },
    {
      key: "created_at",
      label: "تاريخ الإضافة",
      render: (value) => (
        <span className="">{new Date(value).toISOString().split("T")[0]}</span>
      ),
    },
    { key: "activity_status", label: "الحالة" },
  ];

  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState([]);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const { admin, isLoading } = useSelector((state) => state.admin);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [loadingbtn, setLoadingbtn] = useState(false);
  const [pharmacistsNames, setPharmacistsNames] = useState([]);
  const [edit, setEdit] = useState(false);
  //get All Doctors
  useEffect(() => {
    dispatch(getAllMD());
  }, [dispatch]);

  useEffect(() => {
    dispatch(get_pharmacists()).then((res) => {
      if (res?.payload?.success) {
        setPharmacistsNames(res?.payload.data);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (admin?.length > 0) {
      setUsersData(admin);
    }
  }, [admin]);

  useEffect(() => {
    if (!isLoading && !hasLoadedOnce && usersData) {
      setHasLoadedOnce(true);
    }
  }, [isLoading, usersData, hasLoadedOnce]);

  const handleActive = (id, status) => {
    const form = {
      md_id: id,
      activity_status: status,
    };
    dispatch(activity_status_md(form)).then((res) => {
      if (res?.payload.success) {
        dispatch(getAllMD());
      } else {
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

  const handleAddNew = () => {
    setIsOpenPopup(true);
  };
  const [form, setForm] = useState({
    name: "",
    address: "",
    pharmacist_id: "",
  });
  const [errorvalidat, setErrovalidatr] = useState({
    name: "",
    address: "",
    pharmacist_id: "",
  });
  const validateForm = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = "الاسم مطلوب";
    }
    if (!form.address.trim()) {
      errors.address = "العنوان مطلوب";
    }
    if (!form.pharmacist_id) {
      errors.pharmacist_id = "اسم الصيدلي مطلوب";
    }
    return errors;
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    //
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingbtn(true);
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrovalidatr(errors);
      

      setLoadingbtn(false);
    } else {
      setErrovalidatr({});

      dispatch(add_medical_point(form)).then((res) => {
        if (res?.payload?.success) {
          setLoadingbtn(false);
          setIsOpenPopup(false);
          dispatch(getAllMD());
          showToast.success(res?.payload?.message, {
            duration: 2000,
            progress: true,
            position: "top-center",
            transition: "fadeIn",
            icon: "",
            sound: false,
          });
          setForm({
            name: "",
            address: "",
            pharmacist_id: "",
          });
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
    }
  };
  const handleEdit = (row) => {
    setEdit(true);
    setIsOpenPopup(true);
    setForm({
      name: row.name,
      address: row.address,
      pharmacist_id: row.pharmacist_id,
      id: row.id,
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    setLoadingbtn(true);
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setLoadingbtn(false);
      setErrovalidatr(errors);
    } else {
      
      setErrovalidatr({});

      dispatch(update_medical_point(form)).then((res) => {
        if (res?.payload?.success) {
          setEdit(false);
          setLoadingbtn(false);
          setIsOpenPopup(false);
          dispatch(getAllMD());
          showToast.success(res?.payload?.message, {
            duration: 2000,
            progress: true,
            position: "top-center",
            transition: "fadeIn",
            icon: "",
            sound: false,
          });
          setForm({
            name: "",
            address: "",
            pharmacist_id: "",
          });
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
    }
  };

  const handleDelete = (id) => {
    alert(`حذف العنصر رقم ${id}`);
  };

  const handlePrint = () => {
    alert("طباعة البيانات");
  };
  if (isLoading && !hasLoadedOnce) {
    return <Loading />;
  }
  return (
    <div className="w-full">
      <div className="container mx-auto overflow-x-hidden">
        <DataTable
          title="النقاط الطبية"
          columns={userColumns}
          data={usersData}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPrint={handlePrint}
          addButtonLabel="إضافة نقطة طبية جديدة"
          onActive={handleActive}
        />
        {isOpenPopup && (
          <Popup isOpen={isOpenPopup} width="530px">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] text-Basic font-[700]">
                إضافة نقطة طبية جديدة
              </h3>
              <div
                onClick={() => {
                  setIsOpenPopup(false);
                  setForm({
                    name: "",
                    address: "",
                    pharmacist_id: "",
                  });
                  setEdit(false);
                }}
                className="w-[35px] h-[35px] flex items-center justify-center shadow-custom cursor-pointer rounded-[4px] bg-[#F5F7FA] text-[25px]"
              >
                x
              </div>
            </div>
            <div className="mt-[24px]">
              <div className="flex flex-col w-full">
                <label htmlFor="">الاسم</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                  placeholder="الاسم كامل (ثلاثي/رباعي)"
                />
                <div className="min-h-[20px] mt-1 transition duration-200 ease-in-out">
                  {errorvalidat.name && form.name == "" && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="">العنوان</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                  placeholder="الاسم كامل (ثلاثي/رباعي)"
                />
                <div className="min-h-[20px] mt-1 transition duration-200 ease-in-out">
                  {errorvalidat.address && form.address == "" && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat.address}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="">تعيين الصيدلي المسؤول</label>
                <select
                  name="pharmacist_id"
                  value={form.pharmacist_id}
                  id=""
                  onChange={(e) => handleChange(e)}
                  className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                >
                  <option value="اختر">اختر</option>
                  {pharmacistsNames.map((ele) => (
                    <option key={ele.id} value={ele.id}>
                      {ele.full_name_ar}
                    </option>
                  ))}
                </select>
                <div className="min-h-[20px] mt-1 transition duration-200 ease-in-out">
                  {errorvalidat.pharmacist_id && form.pharmacist_id == "" && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat.pharmacist_id}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-end justify-end gap-2">
                <button
                  onClick={() => {
                    setIsOpenPopup(false);
                    setForm({
                      name: "",
                      address: "",
                      pharmacist_id: "",
                    });
                    setEdit(false);
                  }}
                  className="flex items-center justify-center gap-2 py-[12px] px-[40px] bg-[#F5F5F5] font-[700] text-[#757575] text-center rounded-[8px] duration-300 ease-in-out cursor-pointer"
                >
                  الغاء
                </button>
                <button
                  onClick={edit ? handleSubmitEdit : handleSubmit}
                  className="flex items-center justify-center gap-2 py-[12px] px-[40px] bg-Basic font-[700] text-white text-center rounded-[8px] hover:bg-[#2F247F] duration-300 ease-in-out cursor-pointer"
                >
                  {edit ? "تحديث" : "حفظ"}
                  {loadingbtn && (
                    <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
                  )}
                </button>
              </div>
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
}
