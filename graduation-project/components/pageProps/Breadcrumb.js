import { GoHome } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

export default function Breadcrumb({ titleTop ,titlesection , path }) {
  return (
    <div className="w-full h-full">
      <h3 className="text-[28px] font-[700]">{titleTop}</h3>
      <div className="flex items-center space-x-[10px]">
        <GoHome className="w-[20px] h-[20px] text-Basic" />
        <IoIosArrowBack className="text-[20px] text-[#BDBDBD]" />
        <h3 className=" text-Basic">{titlesection}</h3>
        {path && path.map((ele) => (
          <div className=" flex justify-center items-center" key={ele}>
            <IoIosArrowBack className="text-[20px] text-[#BDBDBD]" />
            <h3>{ele}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
