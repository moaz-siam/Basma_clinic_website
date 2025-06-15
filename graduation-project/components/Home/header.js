"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/Logo.png";
import { LinksHeader, QuickLinks } from "@/assets";
import Link from "next/link";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiDollar } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { useGlobalState } from "@/hooks/useModel";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import {  logoutUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";

function Header() {
  const {
    sidenav,
    setSidenav,
    activeLink,
    setActiveLink,
    hasScrolled,
    setHasScrolled,
  } = useGlobalState();
  const dispatch = useDispatch();
  const router = useRouter();
  const {isAuthenticated} = useSelector((state) => state.auth)

  const handleLinkClick = (index) => {
    setActiveLink(index);
    //  // تحديث الرابط النشط
    //  // تحديث الرابط النشط
  };

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
  }, [setHasScrolled]);
  

  const handlelogout = () => {
    dispatch(logoutUser()).then((res) => {
      if (res?.payload?.success) {
        router.push("/auth/login");
        showToast.success(res?.payload?.message, {
          duration: 4000,
          progress: true,
          position: "top-center",
          transition: "fadeIn",
          icon: "",
          sound: true,
        });
      } else {
        
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

  //   if (loading) {
  //   return <p>loading....</p>;
  // }

  return (
    <div
      className={`w-full ${
        hasScrolled ? "backdrop-blur-xl bg-[#F6F6F6]/0" : "bg-[#FAFAFA]"
      } sticky top-0 z-50`}
    >
      <div
        className={`mx-auto container relative h-full pt-[20px] pb-[15px] ${
          hasScrolled ? "scrolled" : ""
        } `}
      >
        <div className="flex justify-between items-center bg-white rounded-full py-[10px] px-4 md:px-[20px] lg:px-[40px] shadow-sm">
          <Image
            src={logo}
            className="h-[45px] w-auto object-cover"
            alt="logo failed"
          />
          <div className="md:flex hidden justify-center items-center md:gap-[20px] lg:gap-[40px] mx-auto pr-10 relative">
            {LinksHeader.map((ele, index) => (
              <div key={ele.id} className={`${ele.id === 2 ? "group" : ""}`}>
                <Link
                  href={ele.path}
                  onClick={() => handleLinkClick(index)}
                  className={`${
                    ele.id == 2
                      ? "flex justify-center items-center gap-[5px]"
                      : null
                  } ${
                    activeLink === index
                      ? "font-[700] text-Basic"
                      : "font-[500]"
                  } `}
                >
                  {ele.title}
                  {ele.id == 2 ? <RiArrowDropDownLine /> : null}
                </Link>
                {ele.id == 2 && ele.subServicer?.length > 0 && (
                  <div className="bg-[#FFFFFF] absolute top-25 left-62 rounded-2xl z-10 opacity-0 transition-all duration-300 ease-out group-hover:top-13 group-hover:opacity-100 scale-95 group-hover:scale-100">
                    {ele.subServicer.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex justify-between items-center border-b-1 border-[#F5F5F5] p-[15px] space-x-10 hover:text-Basic"
                      >
                        <Link
                          href={sub.path}
                          className="text-[15px] font-[600]"
                        >
                          {sub.title}
                        </Link>
                        <RiArrowDropLeftLine className="w-[15px] h-[15px]" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center space-x-[16px] ">
            <Link href={"/search"} className="hover:text-[#4535C1] text-[25px]">
              <CiSearch />
            </Link>
            <Link href={"/donate"} className="hover:text-[#4535C1] text-[25px]">
              <CiDollar />
            </Link>
            {isAuthenticated ? (
              <div className="hover:text-[#4535C1] text-[25px] transition duration-300 cursor-pointer group">
                <CiUser className="" />
                <div className="bg-[#FFFFFF] absolute top-25 left-5 rounded-[10px] z-10 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 scale-95 group-hover:scale-100">
                  <Link
                    href={"/dashboard/patient"}
                    className="flex text-black text-[16px] justify-between items-center border-b-1 border-[#F5F5F5] p-[15px] space-x-10 hover:text-Basic"
                  >
                    لوحة التحكم
                  </Link>
                  <div
                    onClick={handlelogout}
                    className="flex text-black text-[16px] justify-between items-center border-b-1 border-[#F5F5F5] p-[15px] space-x-10 hover:text-Basic"
                  >
                    تسجيل الخروج
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-[12px] flex items-center gap-[5px] bg-Basic text-white rounded-[8px] px-2 py-2  cursor-pointer hover:bg-[#2F247F] transition duration-300 ">
                <Link
                  href={"/auth/login"}
                  className=" hover:font-black duration-300 ease-in-out"
                >
                  دخول
                </Link>
                <span>/</span>
                <Link
                  href={"/auth/register"}
                  className=" hover:font-black  duration-300 ease-in-out"
                >
                  تسجيل
                </Link>
              </div>
            )}

            <HiMenuAlt2
              onClick={() => setSidenav(true)}
              className="md:hidden inline-block w-8 h-6 cursor-pointer"
            />
          </div>
          {sidenav && (
            <div
              className={`fixed top-0 left-0 w-full h-screen bg-black/60 bg-opacity-80 text-gray-200 z-50 `}
            >
              <div
                className={`w-[60%] h-full animate bg-white shadow-lg hederAnim relative`}
              >
                <div className="w-full h-full bg-white p-6">
                  <Image
                    className="w-28 mb-6 mx-auto"
                    src={logo}
                    alt="logoLight"
                  />
                  <ul className="flex flex-col gap-2 text-black">
                    {LinksHeader.map((item) => (
                      <li
                        className="font-normal hover:font-bold items-center text-lg  hover:text-Basic md:border-l-[2px] duration-200 ease-out border-l-gray-300 hoverEffect last:border-r-0"
                        key={item.id}
                      >
                        <Link href={item.path}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  onClick={() => setSidenav(false)}
                  className="w-8 h-8 m-2 border-[1px] border-black absolute left-0 top-0 text-black text-2xl flex justify-center items-center cursor-pointer hover:border-Basic hover:text-Basic duration-300"
                >
                  <MdClose />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
