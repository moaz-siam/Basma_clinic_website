"use client";
import DataTable from "@/components/dashboard/admin/DataTable";
import { formatDate } from "@/components/pageProps/FormatedDT";
import Loading from "@/components/pageProps/loading";
import Popup from "@/components/pageProps/Pop";
import {
  activity_status,
  addUser,
  getAllUsers,
  update_user,
} from "@/redux/slice/adminSlice";
import { showToast } from "nextjs-toast-notify";
import React, { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function UsersPage() {
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState([]);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const { admin, isLoading } = useSelector((state) => state.admin);
  // Define columns for the users table
  const userColumns = [
    { key: "full_name_ar", label: "الاسم" },
    { key: "national_id", label: "رقم الهوية" },
    { key: "phone", label: "رقم الجوال" },
    {
      key: "birth_date",
      label: "تاريخ الميلاد",
      render: (value) => (
        <span className="">{new Date(value).toISOString().split("T")[0]}</span>
      ),
    },
    { key: "address", label: "العنوان" },
    {
      key: "created_at",
      label: "تاريخ الإضافة",
      render: (value) => (
        <span className="">{new Date(value).toISOString().split("T")[0]}</span>
      ),
    },
    { key: "activity_status", label: "الحالة" },
  ];
  //get_all_users
  useEffect(() => {
    dispatch(getAllUsers());
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

  //state popup
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleDelete = (id) => {
    alert(`حذف العنصر رقم ${id}`);
  };

  const handlePrint = () => {
    alert("طباعة البيانات");
  };
  const handleAddNew = () => {
    setIsOpenPopup(true);
  };

  // send new user;
  const [loadingbtn, setLoadingbtn] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    national_id: "",
    email: "",
    gender: "",
    phone: "",
    birth_date: "",
    password: "",
    addres: "",
    role: "",
  });
  const [errorvalidat, setErrovalidatr] = useState({
    full_name: "",
    national_id: "",
    email: "",
    gender: "",
    phone: "",
    birth_date: "",
    password: "",
    addres: "",
    role: "",
  });
  const validateForm = () => {
    const errors = {};

    if (!form.full_name.trim()) {
      errors.full_name = "الاسم مطلوب";
    }

    if (!form.national_id.trim()) {
      errors.national_id = "رقم الهوية مطلوب";
    }

    if (!form.email.trim()) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "بريد إلكتروني غير صالح";
    }

    if (!form.gender) {
      errors.gender = "الجنس مطلوب";
    }

    if (!form.phone.trim()) {
      errors.phone = "رقم الهاتف مطلوب";
    }

    if (!form.birth_date) {
      errors.dob = "تاريخ الميلاد مطلوب";
    }

    if (!form.password.trim()) {
      errors.password = "كلمة المرور مطلوبة";
    } else if (form.password.length < 6) {
      errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }
    if (!form.addres.trim()) {
      errors.addres = "العنوان مطلوب";
    }
    if (!form.role.trim()) {
      errors.role = "الصلاحية مطلوب";
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
      
      
    } else {
      setErrovalidatr({});
      
      

      dispatch(addUser(form)).then((res) => {
        if (res?.payload?.success) {
          setLoadingbtn(false);
          dispatch(getAllUsers());
          showToast.success(res?.payload?.message, {
            duration: 2000,
            progress: true,
            position: "top-center",
            transition: "fadeIn",
            icon: "",
            sound: false,
          });
          setForm({
            full_name: "",
            national_id: "",
            email: "",
            gender: "",
            phone: "",
            birth_date: "",
            password: "",
            addres: "",
            role: "",
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
  // activity_status

  const handleActive = (id, status) => {
    const form = {
      user_id: id,
      activity_status: status,
    };
    dispatch(activity_status(form)).then((res) => {
      if (res?.payload.success) {
        dispatch(getAllUsers());
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

  // update data user
  const [loadingbtn2, setLoadingbtn2] = useState(false);

  const [isOpenPopup2, setIsOpenPopup2] = useState(false);
  const [form2, setForm2] = useState({
    id: "",
    national_id: "",
    birth_date: "",
    role: "",
  });
  const [errorvalidat2, setErrovalidatr2] = useState({
    national_id: "",
    birth_date: "",
    role: "",
  });
  const validateForm2 = () => {
    const errors = {};

    if (!form2.national_id.trim()) {
      errors.national_id = "رقم الهوية مطلوب";
    }

    if (!form2.birth_date) {
      errors.birth_date = "تاريخ الميلاد مطلوب";
    }

    if (!form2.role.trim()) {
      errors.role = "الصلاحية مطلوب";
    }
    return errors;
  };
  const handleChange2 = (e) => {
    setForm2({
      ...form2,
      [e.target.name]: e.target.value,
    });
    //
  };

  const handleEdit = (row) => {
    setIsOpenPopup2(true);
    setForm2({
      id: row.id,
      national_id: row.national_id,
      birth_date: new Date(row.birth_date).toISOString().split("T")[0],
      role: row.role,
    });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    setLoadingbtn2(true);
    const errors = validateForm2();
    if (Object.keys(errors).length > 0) {
      setErrovalidatr2(errors);
      
    } else {
      
      setErrovalidatr2({});

      dispatch(update_user(form2)).then((res) => {
        if (res?.payload?.success) {
          setLoadingbtn2(false);
          setIsOpenPopup2(false);
          dispatch(getAllUsers());
          showToast.success(res?.payload?.message, {
            duration: 2000,
            progress: true,
            position: "top-center",
            transition: "fadeIn",
            icon: "",
            sound: false,
          });
          setForm2({
            id: "",
            national_id: "",
            birth_date: "",
            role: "",
          });
        } else {
          setLoadingbtn2(false);
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

  if (isLoading && !hasLoadedOnce) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="container mx-auto overflow-x-hidden">
        <DataTable
          title="المستخدمين"
          columns={userColumns}
          data={usersData}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPrint={handlePrint}
          onActive={handleActive}
          addButtonLabel="إضافة مستخدم جديد"
        />
        {isOpenPopup && (
          <Popup isOpen={isOpenPopup} width={"650px"}>
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] text-Basic font-[700]">
                إضافة مستخدم جديد
              </h3>
              <div
                onClick={() => setIsOpenPopup(false)}
                className="w-[35px] h-[35px] flex items-center justify-center shadow-custom cursor-pointer rounded-[4px] bg-[#F5F7FA] text-[25px]"
              >
                x
              </div>
            </div>
            <div className="mt-[24px]">
              {/* 1 */}
              <div className="flex justify-center items-center w-full gap-[25px]">
                {/* input1 */}
                <div className="flex flex-col w-full">
                  <label htmlFor="">الاسم</label>
                  <input
                    name="full_name"
                    value={form.full_name}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                    placeholder="الاسم كامل (ثلاثي/رباعي)"
                  />
                  <div className="min-h-[20px] mt-1 transition duration-200 ease-in-out">
                    {errorvalidat.full_name && form.full_name == "" && (
                      <p className="text-red-500 text-sm flex items-center gap-[3px]">
                        <MdError />
                        {errorvalidat.full_name}
                      </p>
                    )}
                  </div>
                </div>
                {/* input2 */}
                <div className="flex flex-col w-full">
                  <label htmlFor="">رقم الهوية</label>
                  <input
                    name="national_id"
                    value={form.national_id}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                    placeholder="XXX XXX XXX"
                  />
                  <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                    {errorvalidat.national_id && form.national_id == "" && (
                      <p className="text-red-500 text-sm flex items-center gap-[3px]">
                        <MdError />
                        {errorvalidat.national_id}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="flex justify-center items-center w-full gap-[25px]">
                {/* input1 */}
                <div className="flex flex-col w-full">
                  <label htmlFor="">الايميل</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={(e) => handleChange(e)}
                    type="email"
                    className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                    placeholder="example@gmail.com"
                  />
                  <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                    {errorvalidat.email && !form.email.includes("@") && (
                      <p className="text-red-500 text-sm flex items-center gap-[3px]">
                        <MdError />
                        {errorvalidat.email}
                      </p>
                    )}
                  </div>
                </div>
                {/* input2 */}
                <div className="flex flex-col w-full">
                  <label htmlFor="">الجنس</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={(e) => handleChange(e)}
                    id=""
                    className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                  >
                    <option value="اختر">اختر</option>
                    <option value="ذكر">ذكر</option>
                    <option value="انثى">انثى</option>
                  </select>
                  <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                    {errorvalidat.gender && form.gender == "" && (
                      <p className="text-red-500 text-sm flex items-center gap-[3px]">
                        <MdError />
                        {errorvalidat.gender}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="flex justify-center items-center w-full gap-[25px]">
                {/* input1 */}
                <div className="flex flex-col w-full">
                  <label htmlFor="">تاريخ الميلاد</label>
                  <input
                    name="birth_date"
                    value={form.birth_date}
                    onChange={(e) => handleChange(e)}
                    type="date"
                    className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                    placeholder="يوم/شهر/سنة"
                  />
                  <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                    {errorvalidat.birth_date && form.birth_date == "" && (
                      <p className="text-red-500 text-sm flex items-center gap-[3px]">
                        <MdError />
                        {errorvalidat.birth_date}
                      </p>
                    )}
                  </div>
                </div>
                {/* input2 */}
                <div className="flex flex-col w-full">
                  <label htmlFor="">العنوان</label>
                  <input
                    name="addres"
                    value={form.addres}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                    placeholder="المدينة, الحي , الشارع"
                  />
                  <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                    {errorvalidat.addres && form.addres == "" && (
                      <p className="text-red-500 text-sm flex items-center gap-[3px]">
                        <MdError />
                        {errorvalidat.addres}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center w-full gap-[25px]">
                {/* input1 */}
                <div className="flex flex-col w-full">
                  <label htmlFor="">رقم الجوال</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                    placeholder="056/9 XXXXXXX"
                  />
                  <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                    {errorvalidat.phone && form.phone == "" && (
                      <p className="text-red-500 text-sm flex items-center gap-[3px]">
                        <MdError />
                        {errorvalidat.phone}
                      </p>
                    )}
                  </div>
                </div>
                {/* input2 */}
                <div className="flex flex-col w-full">
                  <label htmlFor="">كلمة السر</label>
                  <input
                    name="password"
                    value={form.password}
                    onChange={(e) => handleChange(e)}
                    type="password"
                    className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                    placeholder="**********"
                  />
                  <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                    {errorvalidat.password && form.password.length < 6 && (
                      <p className="text-red-500 text-sm flex items-center gap-[3px]">
                        <MdError />
                        {errorvalidat.password}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="">الصلاحيات</label>
                <select
                  name="role"
                  value={form.role}
                  id=""
                  onChange={(e) => handleChange(e)}
                  className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                >
                  <option value="اختر">اختر</option>
                  <option value="patient">مريض</option>
                  <option value="admin">صيدلي</option>
                  <option value="pharmacist">ادمن</option>
                </select>
                <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                  {errorvalidat.role && form.role == "" && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat.role}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-end justify-end gap-2">
              <button
                onClick={() => setIsOpenPopup(false)}
                className="flex items-center justify-center gap-2 py-[12px] px-[40px] bg-[#F5F5F5] font-[700] text-[#757575] text-center rounded-[8px] duration-300 ease-in-out cursor-pointer"
              >
                الغاء
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 py-[12px] px-[40px] bg-Basic font-[700] text-white text-center rounded-[8px] hover:bg-[#2F247F] duration-300 ease-in-out cursor-pointer"
              >
                حفظ
                {loadingbtn && (
                  <div className="w-4 h-4 border-2 border-t-Basic border-gray-300 rounded-full animate-spin"></div>
                )}
              </button>
            </div>
          </Popup>
        )}
        {isOpenPopup2 && (
          <Popup isOpen={isOpenPopup2} width="530px">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] text-Basic font-[700]">
                تحديث بيانات مستخدم
              </h3>
              <div
                onClick={() => setIsOpenPopup2(false)}
                className="w-[35px] h-[35px] flex items-center justify-center shadow-custom cursor-pointer rounded-[4px] bg-[#F5F7FA] text-[25px]"
              >
                x
              </div>
            </div>
            <div className="mt-[24px]">
              <div className="flex flex-col w-full">
                <label htmlFor="">رقم الهوية</label>
                <input
                  name="national_id"
                  value={form2.national_id}
                  onChange={(e) => handleChange2(e)}
                  type="text"
                  className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                  placeholder="XXX XXX XXX"
                />
                <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                  {errorvalidat2.national_id && form2.national_id == "" && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat2.national_id}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="">تاريخ الميلاد</label>
                <input
                  name="birth_date"
                  value={form2.birth_date}
                  onChange={(e) => handleChange2(e)}
                  type="date"
                  className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                  placeholder="يوم/شهر/سنة"
                />
                <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                  {errorvalidat2.birth_date && form2.birth_date == "" && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat2.birth_date}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="">الصلاحيات</label>
                <select
                  name="role"
                  value={form2.role}
                  id=""
                  onChange={(e) => handleChange2(e)}
                  className="focus:outline-none placeholder:text-[#E0E0E0] placeholder:text-sm rounded-[8px] border-1 border-[#E0E0E0] shadow-[0px_4px_25px_0px_#A1A1A11F] py-[14px] px-[20px] mt-[10px]"
                >
                  <option value="اختر">اختر</option>
                  <option value="patient">مريض</option>
                  <option value="admin">صيدلي</option>
                  <option value="pharmacist">ادمن</option>
                </select>
                <div className="min-h-[20px] mt-1 transition  duration-200 ease-in-out">
                  {errorvalidat2.role && form2.role == "" && (
                    <p className="text-red-500 text-sm flex items-center gap-[3px]">
                      <MdError />
                      {errorvalidat.role}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-end justify-end gap-2">
                <button
                  onClick={() => setIsOpenPopup2(false)}
                  className="flex items-center justify-center gap-2 py-[12px] px-[40px] bg-[#F5F5F5] font-[700] text-[#757575] text-center rounded-[8px] duration-300 ease-in-out cursor-pointer"
                >
                  الغاء
                </button>
                <button
                  onClick={handleSubmit2}
                  className="flex items-center justify-center gap-2 py-[12px] px-[40px] bg-Basic font-[700] text-white text-center rounded-[8px] hover:bg-[#2F247F] duration-300 ease-in-out cursor-pointer"
                >
                  نحديث
                  {loadingbtn2 && (
                    <div className="w-4 h-4 border-2  border-t-Basic border-gray-300 rounded-full animate-spin"></div>
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
