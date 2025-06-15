// import { useEffect, useState } from "react";
// import Breadcrumb from "@/components/pageProps/Breadcrumb";
// import Image from "next/image";
// import { FaStar } from "react-icons/fa6";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import Link from "next/link";
// import commentimg from "@/assets/commentimg.png";
// import Consultation from "@/components/pageProps/Consultation";
import ReviewDoctor from "@/components/Home/ReviewDoctor";

// async function getDoctor(doctorname) {
//   try {
//     const res = await fetch(`http://localhost:4000/api/doctors/${doctorname}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`Error: ${res.status} ${res.statusText}`);
//     }

//     return res.json();
//   } catch (error) {
//     throw error;
//   }
// }

export default async function ReviewPage({ params }) {

  const { doctorname } = await params;

  
  
  return (
    <div className="w-full">  
      <div className="container mx-auto px-4">
        <ReviewDoctor doctorname ={doctorname}/>
      </div>
    </div>
  );
}
