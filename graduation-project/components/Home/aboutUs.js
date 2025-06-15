import React from 'react'
import TitleTop from './titleTop'
import Image from 'next/image'
import Aboutus from '@/assets/aboutus.png'
export default function AboutUs() {
  return (
    <div className='w-full h-full'>
      <div className='mx-auto container md:flex justify-between items-center my-[33px] px-4'>
        <div className='md:text-start text-center md:w-1/2'>
          <TitleTop title1={"معلومات عنا"} title2={'من هي بصمة طبية؟'} Mediation1={'start'} Mediation2={'start'}/>
          <p className='mt-[16px] text-[#616161] text-[14px] md:text-[20px] max-w-[520px]'>بصمة طبية منصة طبية متخصصة لقطاع غزة، تقدم خدمات صحية موثوقة واستشارات طبية، إضافة إلى دليل للأطباء والمرافق الصحية لمساعدتك في اتخاذ قرارات صحية سليمة.</p>
        </div>
        <Image src={Aboutus} className='w-auto h-[450px] md:w-1/2' alt='About Faild'/>
      </div>
    </div>
  )
}
