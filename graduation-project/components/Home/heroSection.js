import Image from "next/image";
import Link from "next/link";
import React from "react";
import hero from '@/assets/HeroSection.png'
export default function HeroSection() {
  return (
    <div className="w-full bg-[#F6F6F6]">
      <div className="mx-auto container md:flex justify-between items-center px-4 w-full">
        <div className="space-y-[24px] md:text-start text-center md:w-1/2">
          <h3 className="text-[24px] md:text-[48px] font-[700]">صحتك أولويتنا! <br/> خبراء في رعايتك الطبية</h3>
          <p className="text-[#757575] text-[18px]">
            في بصمة طبية، نربطك بأفضل الأطباء والخدمات الصحية الموثوقة، لنكون
            دليلك نحو رعاية صحية أفضل
          </p>
          <Link href={''} className="px-[30px] py-[9px] text-white bg-Basic rounded-md w-full">ابدأ استشارتك الأن</Link>
        </div>
        <Image src={hero} alt="Hero Faild" priority className="md:w-1/2 h-[500px] md:pt-0 pt-[24px]"/>
      </div>
    </div>
  );
}
