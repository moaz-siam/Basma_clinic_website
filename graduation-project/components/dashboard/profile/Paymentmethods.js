"use client";
import Image from "next/image";
import React, { useState } from "react";
import NoCreditCard from "@/assets/dashboard-img/NoCreditCard.png";
import { CiMenuKebab } from "react-icons/ci";
import { RiVisaLine } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";
import jawwal_logo from "@/assets/dashboard-img/jawwal.png";
import cash_logo from "@/assets/dashboard-img/cash.png";
import palpay_logo from "@/assets/dashboard-img/palpay.png";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function Paymentmethods() {
  const [data, setData] = useState(["1"]);
  const [createpage, setCreatepage] = useState(false);
  const [checked, setChecked] = useState({
    isopen: false,
    checkedname: "",
  });
  const [setting, setSetting] = useState(false);

  return (
    <div className="w-full">
      {data.length === 0 && createpage == false ? (
        <div className="flex items-center justify-center flex-col gap-[10px]">
          <Image
            src={NoCreditCard}
            alt="Error image"
            width={0}
            height={0}
            className="w-auto h-[300px] object-cover"
          />
          <h3 className="text-[24px] text-[#212121] font-[600]">
            لا يوجد بطاقات مضافه بعد!
          </h3>
          <p className="text-[18px] text-[#616161] font-[400]">
            {" "}
            لم تقم بإضافة أي بطاقة حتى الآن. لإتمام عمليات الدفع، يُرجى إضافة
            وسيلة دفع صالحة.
          </p>
          <button
            onClick={() => setCreatepage(true)}
            className=" bg-Basic focus:outline-none rounded-[8px] px-[40px] py-[9px] font-[600] text-[14px] text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
          >
            + أضف بطاقة جديدة
          </button>
        </div>
      ) : data.length > 0 && createpage == false ? (
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-[18px] font-[700] ">طرق الدفع</h3>
            <button
              onClick={() => setCreatepage(true)}
              className=" bg-Basic focus:outline-none rounded-[8px] px-[40px] py-[9px] font-[600] text-[14px] text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
            >
              + أضف بطاقة جديدة
            </button>
          </div>
          <div className="w-full mt-[14px]">
            <div className=" w-full bg-white px-[24px] py-[16px] rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11F] flex justify-between relative">
              <div className="flex flex-col gap-[10px]">
                <span className="text-[15px] text-[#616161] font-[500]">
                  بنك فلسطين{" "}
                </span>
                <h3 className="text-[18px] font-[600]">**** **** **** 4111</h3>
                <span className="text-[15px] text-[#616161] font-[500]">
                  معاذ صيام
                </span>
                <p className="text-[13px] text-[#9E9E9E] font-[600]">
                  تاريخ الانتهاء 08 / 2027
                </p>
              </div>
              <div className="flex flex-col justify-between text-end items-end">
                <CiMenuKebab
                  className=" cursor-pointer"
                  onClick={() => setSetting(!setting)}
                />
                <RiVisaLine className="text-[50px] text-[#222357]" />
              </div>
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
          </div>
        </div>
      ) : null}
      {createpage && (
        <div className="">
          {/* طرق الدفع */}
          <h3 className=" text-black font-bold text-[20px]">طرق الدفع</h3>
          <div className="w-full bg-white p-[24px] shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-[16px] mt-[20px]">
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
                    onChange={() =>
                      setChecked({
                        isopen: true,
                        checkedname: "credit_card",
                      })
                    }
                    // checked={selected === option.value}
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
                      <label htmlFor="" className="text-[16px] text-[#424242]">
                        اسم صاحب البطاقة (Cardholder Name)
                      </label>
                      <input
                        type="text"
                        className=" focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-[14px] rounded-[16px] shadow-[0px_4px_20px_#A1A1A126] py-[13px] px-[16px] mt-[8px]"
                        placeholder="اسم صاحب البطاقة "
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="text-[16px] text-[#424242]">
                        رقم البطاقة (Card Number)
                      </label>
                      <input
                        type="text"
                        className=" focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-[14px] rounded-[16px] shadow-[0px_4px_20px_#A1A1A126] py-[13px] px-[16px] mt-[8px]"
                        placeholder="XXXX XXXX XXXX XXXX"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="" className="text-[16px] text-[#424242]">
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
                      <label htmlFor="" className="text-[16px] text-[#424242]">
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
                  onChange={() =>
                    setChecked({
                      isopen: true,
                      checkedname: "cash",
                    })
                  }
                  // checked={selected === option.value}
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
                  onChange={() =>
                    setChecked({
                      isopen: true,
                      checkedname: "pal_pay",
                    })
                  }
                  // checked={selected === option.value}
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
                  onChange={() =>
                    setChecked({
                      isopen: true,
                      checkedname: "jawwal_pay",
                    })
                  }
                  // checked={selected === option.value}
                />
                <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
              </label>
            </div>
          </div>
          <button
            onClick={() => setCreatepage(false)}
            className=" w-full bg-Basic focus:outline-none rounded-[8px] px-[40px] py-[9px] font-[600] text-[14px] text-center text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
          >
            اضافة
          </button>
        </div>
      )}
    </div>
  );
}
