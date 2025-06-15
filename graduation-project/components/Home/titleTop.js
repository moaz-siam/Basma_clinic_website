import React from 'react'

export default function TitleTop({title1 , title2 , Mediation1 , Mediation2 , title3}) {
  return (
    <div className=''>
      <p className={`text-[#6EC207] text-[16px] text-center md:text-${Mediation1}`}>{title1}</p>
      <h3 className={`text-[30px] font-[700] text-center md:text-${Mediation2}`}>{title2}<span className='text-Basic'>{title3}</span></h3>
    </div>
  )
}
