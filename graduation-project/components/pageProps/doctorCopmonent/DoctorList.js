"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import axios from "axios";
import Doctorcard from "@/components/pageProps/doctorCopmonent/Doctorcard";
import { IoIosClose } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import Link from "next/link";

function DoctorList({ doctors }) {
  const [selected, setSelected] = useState("الاحدث");

  const [filtersidenav, setFiltersidenav] = useState(false);

  const [filterselectnav, setFilterselectnav] = useState({
    filter1: false,
    filter2: false,
    filter3: false,
    filter4: false,
    filter5: false,
    filter6: false,
    filter7: false,
  });
  const Sortoptions = [
    { label: "الأطباء المتاحين ", value: "الأطباء المتاحين " },
    { label: "الأعلى تقييمًا", value: "الأعلى تقييمًا" },
    { label: "الأكثر خبرة", value: "الأكثر خبرة" },
    { label: "الأقرب إليك جغرافيًا", value: "الأقرب إليك جغرافيًا" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    services: searchParams.get("services")?.split(",") || [],
    location: searchParams.get("location")?.split(",") || [],
    specialty: searchParams.get("specialty") || [],
    type: searchParams.get("type")?.split(",") || [],
    rating: searchParams.get("rating") || [],
    sort: searchParams.get("sort")?.split(",") || [],
  });

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        params.set(key, value.join(","));
      } else if (value) {
        params.set(key, value);
      }
    });

    router.push(`/doctors?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 relative">
        <Breadcrumb titleTop={"أطباء"} titlesection={"أطباء"} />
        <div className=" flex justify-between items-center mt-[40px]">
          <button
            className=" flex justify-center items-center gap-[8px] px-[40px] py-[8px] bg-white rounded-lg text-[18px] shadow-md cursor-pointer hover:bg-Basic hover:text-white duration-300 ease-in-out"
            onClick={() => setFiltersidenav(true)}
          >
            فلتر
            <CiFilter />
          </button>
          <button className="flex justify-center items-center gap-[8px] px-[16px] py-[8px] bg-white rounded-lg text-[18px] shadow-md cursor-pointer hover:bg-Basic hover:text-white duration-300 ease-in-out">
            الأطباء المتاحين
            <RiArrowDropDownLine />
          </button>
        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-[16px] w-full mt-[70px]">
          {doctors.data.map((ele) => (
            <div key={ele.doctor_id}>
              <Doctorcard
                img={ele.image_url}
                name={ele.full_name_ar}
                rating={ele.average_rating}
                namepath={
                  ele?.full_name_en?.split(" ").join("-") || ele?.full_name_en
                }
              />
            </div>
          ))}
        </div>

        {filtersidenav && (
          <div className="fixed top-0 left-0 w-full h-screen bg-black/60 bg-opacity-80 z-50 ">
            <div className="w-[316px] h-full animate bg-white shadow-lg hederAnim relative px-[24px] py-[30px]  overflow-y-scroll">
              <div className="flex items-center justify-end">
                <button
                  className="flex justify-center items-center bg-black/10 w-[30px] h-[30px] rounded-full cursor-pointer"
                  onClick={() => setFiltersidenav(false)}
                >
                  <IoIosClose />
                </button>
              </div>
              <h3 className="text-[30px] font-[700]">فلتر</h3>
              <div className="mt-[24px]">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setFilterselectnav({
                      ...filterselectnav,
                      filter1: !filterselectnav.filter1,
                    })
                  }
                >
                  <h3 className="text-[#616161] text-[18px]">الخدمات الطبية</h3>
                  {filterselectnav.filter1 ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
                {filterselectnav.filter1 && (
                  <CheckboxGroup
                    options={[
                      { label: "حديثات الولادة والحمل", value: "available" },
                      { label: "الدعم والصحة النفسية", value: "specialist" },
                      { label: "التغذية للأمراض المزمنة", value: "top_rated" },
                      { label: "التحاليل والفحوصات", value: "top_rated2" },
                      { label: "الطوارئ والإسعافات", value: "top_rated3" },
                    ]}
                    selected={filters.services}
                    onChange={(val) =>
                      setFilters({ ...filters, services: val })
                    }
                  />
                )}
              </div>
              <div className="mt-[24px]">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setFilterselectnav({
                      ...filterselectnav,
                      filter2: !filterselectnav.filter2,
                    })
                  }
                >
                  <h3 className="text-[#616161] text-[18px]">
                    المناطق الجغرافية
                  </h3>
                  {filterselectnav.filter2 ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
                {filterselectnav.filter2 && (
                  <CheckboxGroup
                    options={[
                      { label: "شمال غزة", value: "شمال غزة" },
                      { label: "غزة", value: "غزة" },
                      { label: "الجنوب: خان يونس", value: "خان يونس" },
                      { label: "الجنوب: رفح", value: "رفح" },
                      { label: "الوسطى: البريج", value: "البريج" },
                      { label: "الوسطى: دير البلح", value: "دير البلح" },
                      { label: "الوسطى: النصيرات", value: "النصيرات" },
                    ]}
                    selected={filters.location}
                    onChange={(val) =>
                      setFilters({ ...filters, location: val })
                    }
                  />
                )}
              </div>
              <div className="mt-[24px]">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setFilterselectnav({
                      ...filterselectnav,
                      filter3: !filterselectnav.filter3,
                    })
                  }
                >
                  <h3 className="text-[#616161] text-[18px]">الدكتور المختص</h3>
                  {filterselectnav.filter3 ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
                {filterselectnav.filter3 && (
                  <RadioGroup
                    options={[
                      {
                        label: "استشاري نساء وولادة",
                        value: "استشاري نساء وولادة",
                      },
                      {
                        label: "أطباء الصحة النفسية",
                        value: "أطباء الصحة النفسية",
                      },
                      { label: "اختصاصي تغذية", value: "اختصاصي تغذية" },
                      {
                        label: "أطباء متخصصون في الأمراض المزمنة",
                        value: "أطباء متخصصون في الأمراض المزمنة",
                      },
                      {
                        label: "أطباء تحاليل وفحوصات",
                        value: "أطباء تحاليل وفحوصات",
                      },
                      {
                        label: "أطباء الطوارئ والإسعافات",
                        value: "أطباء الطوارئ والإسعافات",
                      },
                    ]}
                    selected={filters.specialty}
                    onChange={(val) =>
                      setFilters({ ...filters, specialty: val })
                    }
                  />
                )}
              </div>
              <div className="mt-[24px]">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setFilterselectnav({
                      ...filterselectnav,
                      filter4: !filterselectnav.filter4,
                    })
                  }
                >
                  <h3 className="text-[#616161] text-[18px]">نوع الخدمة</h3>
                  {filterselectnav.filter4 ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
                {filterselectnav.filter4 && (
                  <CheckboxGroup
                    options={[
                      { label: "استشارات طبية", value: "استشارات طبية" },
                      { label: "فحوصات طبية", value: "فحوصات طبية" },
                      { label: "خدمات الطوارئ", value: "خدمات الطوارئ" },
                      { label: "دعم نفسي", value: "دعم نفسي" },
                      { label: "نصائح غذائية", value: "نصائح غذائية" },
                    ]}
                    selected={filters.type}
                    onChange={(val) => setFilters({ ...filters, type: val })}
                  />
                )}
              </div>
              <div className="mt-[24px]">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setFilterselectnav({
                      ...filterselectnav,
                      filter5: !filterselectnav.filter5,
                    })
                  }
                >
                  <h3 className="text-[#616161] text-[18px]">التقييمات</h3>
                  {filterselectnav.filter5 ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
                {filterselectnav.filter5 && (
                  <RadioGroup
                    options={[
                      {
                        label: "أعلى تقييمات من المرضى",
                        value: "أعلى تقييمات من المرضى",
                      },
                      { label: "تقييمات الأطباء", value: "تقييمات الأطباء" },
                      {
                        label: "آراء من مرضى سابقين",
                        value: "آراء من مرضى سابقين",
                      },
                    ]}
                    selected={filters.rating}
                    onChange={(val) => setFilters({ ...filters, rating: val })}
                  />
                )}
              </div>
              <div className="mt-[24px]">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setFilterselectnav({
                      ...filterselectnav,
                      filter6: !filterselectnav.filter6,
                    })
                  }
                >
                  <h3 className="text-[#616161] text-[18px]">الوقت</h3>
                  {filterselectnav.filter6 ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
                {filterselectnav.filter6 && (
                  <RadioGroup
                    options={[
                      { label: "خدمات طوارئ (مباشرة)", value: "خدمات طوارئ" },
                      {
                        label: "خدمات خلال ساعات العمل",
                        value: "خدمات خلال ساعات العمل",
                      },
                      {
                        label: "خدمات خارج ساعات العمل",
                        value: "خدمات خارج ساعات العمل",
                      },
                    ]}
                    selected={""}
                    onChange={(val) => setFilters({ ...filters, time: "" })}
                  />
                )}
              </div>
              <div className="mt-[24px]">
                <h3 className="text-[20px] text-[#616161]">الترتيب</h3>
                <div className="mt-[10px] border-1 border-[#E0E0E0] rounded-md">
                  <div
                    className="flex justify-between items-center cursor-pointer px-[16px] py-[7px]"
                    onClick={() =>
                      setFilterselectnav({
                        ...filterselectnav,
                        filter7: !filterselectnav.filter7,
                      })
                    }
                  >
                    <h3 className="text-[#616161] text-[18px]">
                      {filters.sort.length <= 0 || filters.sort == ""
                        ? "الاحدث"
                        : filters.sort}
                    </h3>
                    {filterselectnav.filter7 ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </div>
                </div>
                {filterselectnav.filter7 && (
                  <div className="bg-white shadow-md p-[16px]">
                    <div className="flex flex-col gap-2 mt-[11px]">
                      {Sortoptions.map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center justify-between gap-2 text-[#9E9E9E] cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="radio-group"
                            className="peer hidden"
                            onChange={() =>
                              setFilters({ ...filters, sort: option.value })
                            }
                            checked={filters.sort === option.value}
                            onClick={() =>
                              setFilterselectnav({
                                ...filterselectnav,
                                filter7: false,
                              })
                            }
                          />
                          {option.label}
                          <div className="w-5 h-5 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:text-[12px]"></div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button className="w-full py-[7px] bg-Basic text-white mt-[15px] rounded-md hover:bg-[#2F247F] duration-300 ease-in-out cursor-pointer text-center">
                تطبيق الفلترة
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorList;
