"use client";
import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { GoArrowUpRight } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Search({data}) {
  const [open, setOpen] = useState(false);
  const [searchquery, setSearchquery] = useState("");
  const [results, setResults] = useState(data ? data : []);
  const searchParams = useSearchParams();
  // const query = searchParams.get("query"); // جلب قيمة q من URL
  const router = useRouter();
  

  const handleSearch = async () => {
    const params = new URLSearchParams();
    params.set('query' , searchquery);
    router.push(`/search?${params.toString()}`)
    setOpen(false);
  }
  const handleInput = (e) => {
    setSearchquery(e.target.value);
    setOpen(e.target.value.length > 0); // الفتح فقط عند وجود نص

  };
  
  return (
    <div className="flex items-center w-full border-1 gap-[8px] border-[#E0E0E0] px-[15px] rounded-[8px] focus-within:border-Basic transition-colors duration-300 group relative">
      <RiSearch2Line className="text-[#E0E0E0] text-[30px] pl-[8px] border-l-1 border-[#E0E0E0] group-focus-within:border-Basic group-focus-within:text-Basic transition-colors duration-300" />
      <div className="w-full relative">
        <input
          type="text"
          placeholder="البحث"
          value={searchquery}
          onChange={handleInput}
          className="w-full focus:outline-none py-[10px] px-[5px]"
        />
        {open && (
          <button
            className="w-[23px] h-[23px] rounded-full absolute top-[10px] left-0 flex justify-center items-center bg-[#F4F4F4] cursor-pointer hover:bg-Basic hover:text-white duration-200 ease-in-out"
            onClick={() => setSearchquery("")}
          >
            <IoIosClose />
          </button>
        )}
      </div>
      <button
        className=" bg-Basic rounded-[5px] py-[5px] px-[25px] text-white cursor-pointer hover:bg-[#2F247F] duration-300 ease-in-out"
        onClick={handleSearch}
        >
        بحث
      </button>

      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md rounded-[16px] p-[24px] z-50">
          <div className="">
            <h3 className="text-[18px]">الأكثر بحثًا</h3>
            {/* main */}
            <div className="w-full flex justify-between items-center mt-[16px]">
              <div className=" flex items-center space-x-[6px]">
                <RiSearch2Line className="text-[25px] text-Basic" />
                <h3 className="text-[16px] text-[#616161]">
                  اضطرابات النوم وحلها
                </h3>
              </div>
              <div className="text-[25px] text-Basic">
                <GoArrowUpRight />
              </div>
            </div>
            {/* fin main */}
            <div className="w-full flex justify-between items-center mt-[16px]">
              <div className=" flex items-center space-x-[6px]">
                <RiSearch2Line className="text-[25px] text-Basic" />
                <h3 className="text-[16px] text-[#616161]">
                  اضطرابات النوم وحلها
                </h3>
              </div>
              <div className="text-[25px] text-Basic">
                <GoArrowUpRight />
              </div>
            </div>
            <div className="w-full flex justify-between items-center mt-[16px]">
              <div className=" flex items-center space-x-[6px]">
                <RiSearch2Line className="text-[25px] text-Basic" />
                <h3 className="text-[16px] text-[#616161]">
                  اضطرابات النوم وحلها
                </h3>
              </div>
              <div className="text-[25px] text-Basic">
                <GoArrowUpRight />
              </div>
            </div>
            <div className="w-full flex justify-between items-center mt-[16px]">
              <div className=" flex items-center space-x-[6px]">
                <RiSearch2Line className="text-[25px] text-Basic" />
                <h3 className="text-[16px] text-[#616161]">
                  اضطرابات النوم وحلها
                </h3>
              </div>
              <div className="text-[25px] text-Basic">
                <GoArrowUpRight />
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
