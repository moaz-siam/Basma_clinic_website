"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ProfileDoctorMenu, ProfileMenu } from "@/assets";
import { TbLogout } from "react-icons/tb";

import logo from "@/assets/Logo.png";
import Image from "next/image";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import { logoutUser } from "@/redux/slice/authSlice";

export default function HeaderDoctor({ logohandle, setIsOpen, isOpen }) {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [hasScrolled, setHasScrolled] = useState(0);
  const [profilemenu, setProfilemenu] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

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

  const handlelogout = () => {
    dispatch(logoutUser()).then((res) => {
      if (res?.payload?.success) {
        router.push("/auth/login");
        showToast.success(res?.payload?.message, {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          icon: "",
          sound: false,
        });
      } else {
        showToast.error(res?.payload?.message, {
          duration: 3000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          icon: "",
          sound: false,
        });
      }
    });
  };
  return (
    <div
      className={`w-full ${
        hasScrolled ? "backdrop-blur-xl bg-[#F6F6F6]/0" : "bg-[#FAFAFA]"
      } sticky top-0 z-50 py-[25px] px-[50px]`}
    >
      <div
        className={`mx-auto container relative  ${
          hasScrolled ? "scrolled" : ""
        }  `}
      >
        <div className={`flex items-center justify-between gap-[34px]`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-2xl block mb-4 self-end cursor-pointer ${logohandle ? "md:hidden block" : "visible md:invisible"}`}
          >
            ☰
          </button>
          {/* <h3 className="text-2xl mb-4 self-end cursor-pointer md:hidden block">☰</h3> */}
          {logohandle && (
            <Image
              src={logo}
              width={0}
              height={0}
              alt="error img"
              className=" w-auto h-[50px] object-cover md:block hidden"
            />
          )}
          <div className="flex items-center gap-[24px]">
            <Link
              href={""}
              className="hover:text-[#4535C1] text-[22px]"
              onClick={() => setNotifications(!notifications)}
            >
              <IoMdNotificationsOutline />
            </Link>
            <Link href={""} className="hover:text-[#4535C1] text-[22px]">
              <AiOutlineMessage />
            </Link>
            <button
              onClick={() => setProfilemenu(!profilemenu)}
              className={`w-[45px] h-[45px] bg-white shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-full flex justify-center items-center text-center mx-auto cursor-pointer overflow-hidden ${
                profilemenu && "outline-1 outline-Basic"
              }`}
            >
              {isLoading ? (
                <div className="w-[45px] h-[45px] overflow-hidden bg-white shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-full animate-pulse" />
              ) : user?.image ? (
                <Image
                  src={user?.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={45}
                  height={45}
                />
              ) : (
                user?.full_name?.slice(0, 2) || "ما"
              )}
            </button>
          </div>
          {profilemenu && (
            <div className=" bg-white w-[300px] shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-[16px] absolute left-0 top-15">
              <div className="flex gap-[5px] p-[16px]">
                <div>
                  <div className="w-[45px] h-[45px] bg-[#F5F5F5] shadow-[0px_4px_25px_0px_#A1A1A11A] rounded-full flex justify-center items-center text-center mx-auto">
                    {user?.full_name?.slice(0, 2) || "ما"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-[700] text-[14px]">#{user?.id}</h3>
                  <h3 className="font-[500] text-[16px] text-[#616161]">
                    {user?.full_name || "يوزر وهمي"}
                  </h3>
                </div>
              </div>
              <div className="bg-[#E0E0E0] w-full h-[2px]"></div>
              <div className="p-[16px]">
                {ProfileDoctorMenu.filter((ele) => ele.id !== 5).map((ele) => (
                  <Link
                    href={ele.path}
                    className="flex items-center gap-[8px] mb-[10px] duration-200 ease-in-out text-[#212121] hover:text-Basic"
                    key={ele.id}
                  >
                    <div>{ele.icon}</div>
                    {ele.title}
                  </Link>
                ))}
                <button
                  className="flex items-center gap-[8px] mb-[10px] duration-200 ease-in-out text-[#212121] text-[#F75555] cursor-pointer"
                  onClick={handlelogout}
                >
                  <TbLogout />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          )}
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
