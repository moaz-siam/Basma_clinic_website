"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

import { MdOutlineNotificationsActive } from "react-icons/md";
import { TbLayoutSidebar } from "react-icons/tb";
import { useSelector } from "react-redux";

export default function HeaderAdmin({ setIsOpen, isOpen }) {
  const path = usePathname();
  const page_name = path.split("/")[3];
  

  const { user } = useSelector((state) => state.auth);
  const [hasScrolled, setHasScrolled] = useState(0);
  const [profilemenu, setProfilemenu] = useState(false);
  const [notifications, setNotifications] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`w-full ${
        hasScrolled ? "backdrop-blur-xl bg-[#F6F6F6]/0" : "bg-[#FFFFFF]"
      } sticky top-0 z-50 py-[20px] px-[20px]`}
    >
      <div
        className={`mx-auto container relative  ${
          hasScrolled ? "scrolled" : ""
        }  `}
      >
        <div className={`flex items-center justify-between gap-[34px]`}>
          <div className="flex items-center gap-[16px]">
            <button
              className=" focus:outline-none cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <TbLayoutSidebar className="text-[20px]" />
            </button>
            <div className="w-[2px] h-[28px] bg-[#EEEEEE]"></div>
            <div className="flex items-center gap-2">
              <h3 className=" text-Basic font-[600] text-[16px]">الرئيسية </h3>
              <h3 className=" text-[#EEEEEE] font-[600] text-[16px]">{page_name == null ? null : '/'}</h3>
              <h3 className=" text-[#616161] font-[600] text-[16px]">
                {page_name == "users"
                  ? "المستخدمين"
                  : page_name == "doctors"
                  ? "الأطباء"
                  : page_name == "medical-points"
                  ? "النقاط الطبية"
                  : null}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-[24px]">
            <Link
              href={""}
              className="hover:text-[#4535C1] text-[22px]"
              onClick={() => setNotifications(!notifications)}
            >
              <IoMdNotificationsOutline />
            </Link>
            <button
              // onClick={() => setProfilemenu(!profilemenu)}
              className={`w-[45px] h-[45px] bg-[#F5F7FA] text-[#212121] shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-full flex justify-center items-center text-center mx-auto cursor-pointer ${
                profilemenu && "outline-1 outline-Basic"
              }`}
            >
              {user?.full_name?.slice(0, 2) || "ما"}
              
            </button>
          </div>

          {notifications && (
            <div className="bg-white w-[280px] shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-[8px] absolute left-0 top-15">
              <div className="flex justify-between items-center p-[16px]">
                <h3 className="text-[15px] text-[#212121] font-[600]">
                  الاشعارات
                </h3>
                <Link href={""} className=" text-Basic text-[13px]">
                  {" "}
                  الاعدادات
                </Link>
              </div>
              <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
              <div className="p-[16px] w-full flex flex-col gap-[15px]">
                {/* Notifications items */}
                <div className="w-ful flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-[40px] h-[40px] bg-[#E0E6FF] text-Basic flex items-center justify-center rounded-full text-[20px]">
                      <MdOutlineNotificationsActive />
                    </div>
                    <div className=" space-y-[5px]">
                      <h3 className=" text-[13px] font-bold text-black">
                        طرق الدفع
                      </h3>
                      <p className=" text-[11px] text-[#616161]">
                        تم ربط حسابك البنكي بالموقع بنجاح
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p className=" text-[12px] text-[#9E9E9E]">3 س</p>
                  </div>
                </div>
                <div className="w-ful flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-[40px] h-[40px] bg-[#E0E6FF] text-Basic flex items-center justify-center rounded-full text-[20px]">
                      <MdOutlineNotificationsActive />
                    </div>
                    <div className=" space-y-[5px]">
                      <h3 className=" text-[13px] font-bold text-black">
                        طرق الدفع
                      </h3>
                      <p className=" text-[11px] text-[#616161]">
                        تم ربط حسابك البنكي بالموقع بنجاح
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <p className=" text-[12px] text-[#9E9E9E]">3 س</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
              <div className="p-[16px] w-full text-center">
                <Link
                  href={"/dashboard/patient/notification"}
                  className=" text-Basic text-[16px] font-bold"
                >
                  عرض الكل
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
