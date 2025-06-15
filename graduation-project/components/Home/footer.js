import { Communication, Help, QuickLinks, Services } from '@/assets'
import React from 'react'
import logo from '@/assets/Logo.png'
import Image from 'next/image'
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';
export default function Footer() {
  return (
<div className="w-full h-full">
      <div className="container mx-auto py-[27px] flex items-center md:space-x-[128px] md:flex-nowrap flex-wrap">
        <div className="flex flex-col items-center justify-center md:w-fit w-full space-y-[15px] py-[78px]">
          <Image src={logo} className="h-[70px] w-auto object-cover" alt="logo" />
          <p>بصمة طبية - “حلول مبتكرة لتأجير مواقع الويب الاحترافية.”</p>
          <div className="flex items-center md:justify-between  space-x-[16px]">
            <a
              href=""
              className="w-7 h-7 text-[#4535C1] bg-white flex justify-center items-center rounded-full hover:text-white hover:bg-[#4535C1] transition duration-500 ease-in-out"
            >
              <FaInstagram />
            </a>
            <a
              href=""
              className="w-7 h-7 text-[#4535C1] bg-white flex justify-center items-center rounded-full hover:text-white hover:bg-[#4535C1] transition duration-500 ease-in-out"
            >
              <FaFacebookF />
            </a>
            <a
              href=""
              className="w-7 h-7 text-[#4535C1] bg-white flex justify-center items-center rounded-full hover:text-white hover:bg-[#4535C1] transition duration-500 ease-in-out"
            >
              <FaTwitter />
            </a>
            <a
              href=""
              className="w-7 h-7 text-[#4535C1] bg-white flex justify-center items-center rounded-full hover:text-white hover:bg-[#4535C1] transition duration-500 ease-in-out"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full space-y-5 md:space-y-0 md:space-x-[55px]">
          <div className="flex md:items-start items-center flex-col">
            <h3 className="font-[700] text-[24px] mb-[15px]">روابط سريعة</h3>
            <div className="flex flex-col  md:items-start items-center space-y-[24px]">
              {QuickLinks.map((ele) => (
                <Link href={ele.path} key={ele.id} className="text-[#616161] text-[15px] hover:text-Basic font-[500] transition duration-300 ease-in-out">
                  {ele.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex  md:items-start items-center flex-col">
            <h3 className="font-[700] text-[24px] mb-[15px]">الخدمات</h3>
            <div className="flex flex-col  md:items-start items-center space-y-[24px]">
              {Services.map((ele) => (
                <Link href={ele.path} key={ele.id} className="text-[#616161] text-[15px] hover:text-Basic font-[500] transition duration-300 ease-in-ou">
                  {ele.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex md:items-start items-center flex-col">
            <h3 className="font-[700] text-[24px] mb-[15px]">المساعدة</h3>
            <div className="flex flex-col  md:items-start items-center space-y-[24px]">
              {Help.map((ele) => (
                <Link href={ele.path} key={ele.id} className="text-[#616161] text-[15px] hover:text-Basic font-[500] transition duration-300 ease-in-ou">
                  {ele.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex md:items-start items-center flex-col">
            <h3 className="font-[700] text-[24px] mb-[15px]">التواصل</h3>
            <div className="flex flex-col  md:items-start items-center space-y-[24px]">
              {Communication.map((ele) => (
                <Link href={ele.path} key={ele.id} className="text-[#616161] text-[15px] hover:text-Basic font-[500] transition duration-300 ease-in-ou">
                  {ele.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-[20px] border-t-[1px] border-[#EEEEEE] text-[#757575]">
      Copyright © 2025 Powered by Basma Medical
      </div>
    </div>
  )
}
