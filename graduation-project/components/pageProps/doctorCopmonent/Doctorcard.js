import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import doctor1 from '@/assets/doctor-img/doctor1.png'
function Doctorcard({img , rating , name , namepath }) {
  return (
    <div className="p-[15px] bg-white shadow-sm w-full rounded-2xl">
      <div className="p-[10px] relative bg-[#F5F5F5] w-full rounded-lg">
        <Image src={img ? img : doctor1} className="w-auto mx-auto" alt="Error Img" width={300} height={300}/>
        <div className="bg-black/20 rounded-full px-2 absolute left-3 top-3">
          <div className="flex items-center gap-[5px]">
            <span className="text-white font-[700]">{rating}</span>
            <FaStar className="text-yellow-400" />
          </div>
        </div>
      </div>
      <div className="mt-[15px] text-center space-y-[8px]">
        <h3 className="text-[15px] text-black font-[700]">
          د. {name}
        </h3>
        <Link
          className="flex items-center justify-center text-Basic space-x-[5px]"
          href={`/doctors/${namepath}`}
        >
          <p className="text-[16px]">المزيد</p>
          <FaArrowLeftLong />
        </Link>
      </div>
    </div>
  );
}

export default Doctorcard;

{
  /* <div className="p-[15px] bg-white shadow-md w-full rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105">
<div className="p-[10px] relative bg-[#F5F5F5] w-full rounded-lg">
  <Image src={doctorimg} className="w-auto mx-auto" alt="Error Img" />
  <div className="bg-black/20 rounded-full px-2 absolute left-3 top-3">
    <div className="flex items-center gap-[5px]">
      <span className="text-white font-[700]">4.4</span>
      <FaStar className="text-yellow-400" />
    </div>
  </div>
</div>
<div className="mt-[15px] text-center space-y-[8px]">
  <h3 className="text-[15px] text-black font-[700]">
    د. محمد أكرم حمودة
  </h3>
  <Link
    className="flex items-center justify-center text-Basic space-x-[5px] transition-colors duration-300 hover:text-[#4535C1]"
    href={""}
  >
    <p className="text-[16px]">المزيد</p>
    <FaArrowLeftLong />
  </Link>
</div>
</div> */
}
