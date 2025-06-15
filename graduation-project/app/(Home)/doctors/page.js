// import Breadcrumb from "@/components/pageProps/Breadcrumb";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { CiFilter } from "react-icons/ci";
// import axios from "axios";
// import Doctorcard from "@/components/pageProps/doctorCopmonent/Doctorcard";
// import { IoIosClose } from "react-icons/io";
import DoctorList from "@/components/pageProps/doctorCopmonent/DoctorList";

async function getDoctors(filter = "") {
  const res = await fetch(`http://localhost:4000/api/doctors`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });
  if (!res.ok) {
    throw new Error("حدث خطا غير متوقع");
  }
  return res.json();
}

async function Doctors() {
  let doctors = await getDoctors();

  return <DoctorList doctors={doctors} />;
}

export default Doctors;
