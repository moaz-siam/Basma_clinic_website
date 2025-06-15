"use client";

import { useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { FaApple } from "react-icons/fa";
import logo_paypal from "@/assets/logo_paypal.png";
import logo_google from "@/assets/logo_google.png";
import Image from "next/image";
import Link from "next/link";
import Popup from "../pageProps/Pop";
import donatesuccess from "@/assets/donatesuccess.png";
export default function DonateComponent({ data }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const amountAll = [2000, 1250, 1000, 750, 500, 200];
  const [selectedAmount, setSelectedAmount] = useState({
    amount: 0,
    btn: false,
  });
  const [checked, setChecked] = useState({
    isopen: false,
    checkedname: "",
  });

  return (
    <div className="mt-[30px] relative">
      <h3 className="md:text-[18px] text-[16px] font-[700] ">أدخل تبرعك</h3>
      <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-[25px] mt-[24px]">
        {amountAll.map((ele, index) => (
          <div
            key={index}
            className={` rounded-[16px] shadow-sm py-[17px] text-center font-bold text-[#616161] cursor-pointer duration-300 ease-in-out ${
              selectedAmount.amount === ele
                ? " bg-Basic text-white"
                : " bg-white text-black"
            }`}
            onClick={() => setSelectedAmount({ amount: ele, btn: true })}
          >
            ${ele}
          </div>
        ))}
      </div>
      <div className="bg-white px-[24px] py-[10px] flex justify-between items-center rounded-[16px] shadow-sm mt-[22px]">
        <span className="md:text-[25px] text-[20px] font-[700]">
          {selectedAmount.amount}.00
        </span>
        <div className="flex flex-col items-center font-[700]">
          <span>$</span>
          <span>USD</span>
        </div>
      </div>
      {/* payment method */}
      <div className="mt-[32px]">
        <h3 className="md:text-[18px] text-[16px] font-[700] ">طرق الدفع</h3>
        {/* Credit/Debit Card */}
        <div className="px-[40px] py-[30px] border-1 border-[#E0E0E0] mt-[24px] rounded-[16px]">
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                className="peer hidden"
                onChange={() =>
                  setChecked({ isopen: true, checkedname: "credit_card" })
                }
                // checked={selected === option.value}
              />
              <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
              <CiCreditCard1 className="w-[20px] h-[20px]" />
              Credit/Debit Card
            </label>
          </div>
          {/*checked  */}
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
              {/*  */}
              <div className="mt-[30px]">
                <h3 className="text-[18px] font-[700] text-[#212121]">
                  معلومات الفاتورة (Billing Information)
                </h3>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-[21px] mt-[20px]">
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-[16px] text-[#424242]">
                      العنوان (Address)
                    </label>
                    <input
                      type="text"
                      className=" focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-[14px] rounded-[16px] shadow-[0px_4px_20px_#A1A1A126] py-[13px] px-[16px] mt-[8px]"
                      placeholder="عنوانك"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-[16px] text-[#424242]">
                      البريد الالكتروني (Email)
                    </label>
                    <input
                      type="text"
                      className=" focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-[14px] rounded-[16px] shadow-[0px_4px_20px_#A1A1A126] py-[13px] px-[16px] mt-[8px]"
                      placeholder="البريد الالكرتوني"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-[16px] text-[#424242]">
                      {" "}
                      الدولة (Country)
                    </label>
                    <input
                      type="text"
                      className=" focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-[14px] rounded-[16px] shadow-[0px_4px_20px_#A1A1A126] py-[13px] px-[16px] mt-[8px]"
                      placeholder="دولتك"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-[16px] text-[#424242]">
                      الرمز البريدي (Postal/ZIP Code)
                    </label>
                    <input
                      type="text"
                      className=" focus:outline-none bg-white placeholder:text-[#E0E0E0] placeholder:text-[14px] rounded-[16px] shadow-[0px_4px_20px_#A1A1A126] py-[13px] px-[16px] mt-[8px]"
                      placeholder="الرمز البريدي"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-[16px]">
                <label className="flex items-center gap-[10px] text-[#212121]">
                  <input
                    type="checkbox"
                    // checked={selected.includes(option.value)}
                    // onChange={() => handleChange(option.value)}
                    className="hidden peer"
                  />
                  <div className="w-[18px] h-[18px] border-2 border-[#E0E0E0] rounded-[2px] flex justify-center items-center peer-checked:bg-Basic peer-checked:border-Basic peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:text-[14px]"></div>{" "}
                  احفظ البطاقة للتبرعات المستقبلية
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="px-[40px] py-[30px] border-1 border-[#E0E0E0] mt-[24px] rounded-[16px]">
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                className="peer hidden"
                onChange={() =>
                  setChecked({ isopen: true, checkedname: "pay_pal" })
                }
                // checked={selected === option.value}
              />
              <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
              <Image
                src={logo_paypal}
                alt="Error logo"
                width={17}
                height={17}
                className="w-auto"
              />
              PayPal
            </label>
          </div>
          {/*checked  */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              checked.isopen && checked.checkedname == "pay_pal"
                ? "max-h-[550px] opacity-100 mt-[30px]"
                : "max-h-0 opacity-0"
            }`}
          >
            adasd
          </div>
        </div>
        <div className="px-[40px] py-[30px] border-1 border-[#E0E0E0] mt-[24px] rounded-[16px]">
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                className="peer hidden"
                onChange={() =>
                  setChecked({ isopen: true, checkedname: "apple_pay" })
                }
                // checked={selected === option.value}
              />
              <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
              <FaApple className="w-[20px] h-[20px]" />
              Apple Pay
            </label>
          </div>
          {/*checked  */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              checked.isopen && checked.checkedname == "apple_pay"
                ? "max-h-[550px] opacity-100 mt-[30px]"
                : "max-h-0 opacity-0"
            }`}
          >
            adasd
          </div>
        </div>
        <div className="px-[40px] py-[30px] border-1 border-[#E0E0E0] mt-[24px] rounded-[16px]">
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#424242] cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                className="peer hidden"
                onChange={() =>
                  setChecked({ isopen: true, checkedname: "google_pay" })
                }
                // checked={selected === option.value}
              />
              <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
              <Image
                src={logo_google}
                alt="Error logo"
                width={17}
                height={17}
                className="w-auto"
              />
              Google Pay
            </label>
          </div>
          {/*checked  */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              checked.isopen && checked.checkedname == "google_pay"
                ? "max-h-[550px] opacity-100 mt-[30px]"
                : "max-h-0 opacity-0"
            }`}
          >
            adasd
          </div>
        </div>
      </div>
      <div className="mt-[32px]">
        <div className="py-[32px] border-t-1 border-[#EEEEEE]">
          <div className="flex justify-between items-center">
            <h3 className="text-[#616161] text-[18px]">
              تبرعك (Your Donation)
            </h3>
            <span className="text-[22px] text-[#212121] font-[700]">
              ${selectedAmount.amount}.00
            </span>
          </div>
          <div className="flex justify-between items-center mt-[16px]">
            <h3 className="text-[#616161] text-[18px]">
              قيمة الرسوم (Fee Amount)
            </h3>
            <span className="text-[22px] text-[#212121] font-[700]">
              $50.00
            </span>
          </div>
        </div>
        {/*  */}
        <div className="py-[32px] border-t-1 border-[#EEEEEE]">
          <div className="flex justify-between items-center">
            <h3 className="text-[#616161] text-[18px]">
              المبلغ الإجمالي (Total Amount)
            </h3>
            <span className="text-[22px] text-[#212121] font-[700]">
              ${selectedAmount.amount + Number(50)}.00
            </span>
          </div>
        </div>
      </div>
      <div className="mt-[40px] w-full">
        <button
          className="w-full focus:outline-none bg-Basic text-white font-bold rounded-[8px] py-[10px] text-center cursor-pointer  hover:bg-[#2F247F] duration-300 ease-in-out"
          onClick={() => setIsPopupOpen(true)}
        >
          تبرع الأن
        </button>
      </div>
      <div className="mt-[24px]">
        <p className="text-[18px] text-[#424242]">
          بالنقر على تبرع الآن، فإنك توافق على{" "}
          <Link href={"/Terms&Conditions"} className=" text-Basic ">
            الشروط والأحكام و ساسية الخصوصية
          </Link>{" "}
          الخاصة بـ بصمة طبية. تعرف{" "}
          <Link href={"/privacypolicy"} className=" text-Basic ">
            المزيد
          </Link>{" "}
          حول سياسة بصمة.
        </p>
      </div>
      <Popup isOpen={isPopupOpen} width={515}>
        <div className="flex justify-center items-center flex-col">
          <Image
            src={donatesuccess}
            alt="error img"
            width={0}
            height={0}
            className="w-auto"
          />
          <h3 className="text-[20px] text-[#212121] font-bold">
            تم التبرع بنجاح!
          </h3>
          <p className="text-center text-[#757575] text-[14px] mt-[8px]">
            {" "}
            شكرًا لك على مساهمتك السخية في دعم خدمات بصمة طبية. لقد ساعدت في
            تقديم الرعاية الصحية لمن يحتاجها. ستصلك تفاصيل التبرع عبر بريدك
            الإلكتروني قريبًا.
          </p>
          <button
            className="mt-[16px] w-full focus:outline-none bg-Basic text-white font-bold rounded-[8px] py-[10px] text-center cursor-pointer  hover:bg-[#2F247F] duration-300 ease-in-out"
            onClick={() => setIsPopupOpen(false)}
          >
            العودة للرئيسية
          </button>
        </div>
      </Popup>
    </div>
  );
}
