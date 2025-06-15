import Link from "next/link";
import React from "react";

function Consultation({title_top , title_bottom}) {
  return (
    <div className="w-full h-full">
      <div className="mx-auto container py-[32px] md:px-20 px-4 ">
        <div className="bg-Basic rounded-2xl px-2 md:px-[150px] py-[40px] text-center">
          <h3 className="md:text-[30px] text-white mb-[20px] font-[700]">
            {title_top}
          </h3>
          <p className="md:text-[20px] font-[300] text-white mb-[25px]">
            {title_bottom}
          </p>
          <Link href={"/dashboard/patient/consultation/create"} className=" bg-white text-Basic px-[40px] py-[6px] rounded-3xl">
          ابدأ الأن
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Consultation;
