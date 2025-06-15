import React from "react";

export default function Notificationsettings() {
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-[700]">الاشعارات</h3>
      <div className="mt-[24px] space-y-[15px]">
        <div className="w-full flex justify-between items-center bg-white rounded-[16px] px-[16px] py-[20px] shadow-[0px_4px_25px_0px_#A1A1A11A]">
          <div className=" space-y-[5px]">
            <h3 className="text-[15px] text-[#424242] font-[600]">
              إشعارات عامة
            </h3>
            <p className="text-[13px] text-[#757575] font-[500]">
              {" "}
              تنبيهات صحية عامة وتوصيات طبية من الفريق المختص.
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#9E9E9E] cursor-pointer">
              <input
                type="checkbox"
                // checked={selected.includes(option.value)}
                // onChange={() => handleChange(option.value)}
                className="hidden peer"
              />
              <div className="w-[18px] h-[18px] border-2 border-[#E0E0E0] rounded-[2px] flex justify-center items-center peer-checked:bg-Basic peer-checked:border-Basic peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:text-[14px]"></div>{" "}
            </label>
          </div>
        </div>
        <div className="w-full flex justify-between items-center bg-white rounded-[16px] px-[16px] py-[20px] shadow-[0px_4px_25px_0px_#A1A1A11A]">
          <div className=" space-y-[5px]">
            <h3 className="text-[15px] text-[#424242] font-[600]">
            الوصفات الطبية
            </h3>
            <p className="text-[13px] text-[#757575] font-[500]">
              {" "}
              تنبيه عند إصدار وصفة طبية جديدة أو تعديل وصفة سابقة.
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#9E9E9E]  cursor-pointer">
              <input
                type="checkbox"
                // checked={selected.includes(option.value)}
                // onChange={() => handleChange(option.value)}
                className="hidden peer"
              />
              <div className="w-[18px] h-[18px] border-2 border-[#E0E0E0] rounded-[2px] flex justify-center items-center peer-checked:bg-Basic peer-checked:border-Basic peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:text-[14px]"></div>{" "}
            </label>
          </div>
        </div>
        <div className="w-full flex justify-between items-center bg-white rounded-[16px] px-[16px] py-[20px] shadow-[0px_4px_25px_0px_#A1A1A11A]">
          <div className=" space-y-[5px]">
            <h3 className="text-[15px] text-[#424242] font-[600]">
            المواعيد والمتابعة
            </h3>
            <p className="text-[13px] text-[#757575] font-[500]">
              {" "}
              تذكير بالمواعيد الطبية القادمة، أو إشعارات بأي تعديل عليها.
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#9E9E9E]  cursor-pointer">
              <input
                type="checkbox"
                // checked={selected.includes(option.value)}
                // onChange={() => handleChange(option.value)}
                className="hidden peer"
              />
              <div className="w-[18px] h-[18px] border-2 border-[#E0E0E0] rounded-[2px] flex justify-center items-center peer-checked:bg-Basic peer-checked:border-Basic peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:text-[14px]"></div>{" "}
            </label>
          </div>
        </div>
        <div className="w-full flex justify-between items-center bg-white rounded-[16px] px-[16px] py-[20px] shadow-[0px_4px_25px_0px_#A1A1A11A]">
          <div className=" space-y-[5px]">
            <h3 className="text-[15px] text-[#424242] font-[600]">
            إشعارات الطوارئ الصحية
            </h3>
            <p className="text-[13px] text-[#757575] font-[500]">
              {" "}
              تنبيهات عاجلة من الفريق الطبي في الحالات الصحية الطارئة.
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#9E9E9E]  cursor-pointer">
              <input
                type="checkbox"
                // checked={selected.includes(option.value)}
                // onChange={() => handleChange(option.value)}
                className="hidden peer"
              />
              <div className="w-[18px] h-[18px] border-2 border-[#E0E0E0] rounded-[2px] flex justify-center items-center peer-checked:bg-Basic peer-checked:border-Basic peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:text-[14px]"></div>{" "}
            </label>
          </div>
        </div>
        <div className="w-full flex justify-between items-center bg-white rounded-[16px] px-[16px] py-[20px] shadow-[0px_4px_25px_0px_#A1A1A11A]">
          <div className=" space-y-[5px]">
            <h3 className="text-[15px] text-[#424242] font-[600]">
            عدم إرسال رسائل ترويجية
            </h3>
            <p className="text-[13px] text-[#757575] font-[500]">
              {" "}
              يرجى الملاحظة أنكِ ستستمرين في استلام الرسائل الضرورية مثل مواعيد الأطباء أو تفاصيل الوصفات.
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-[11px] filterAnim">
            <label className="flex items-center gap-2 text-[#9E9E9E]  cursor-pointer">
              <input
                type="checkbox"
                // checked={selected.includes(option.value)}
                // onChange={() => handleChange(option.value)}
                className="hidden peer"
              />
              <div className="w-[18px] h-[18px] border-2 border-[#E0E0E0] rounded-[2px] flex justify-center items-center peer-checked:bg-Basic peer-checked:border-Basic peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:text-[14px]"></div>{" "}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
