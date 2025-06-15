
import DoctorList from "@/components/pageProps/doctorCopmonent/DoctorList";

async function getDoctors(filter = "") {
  const res = await fetch(`http://localhost:4000/api/doctors`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });

  if (!res.ok) {
    throw new Error('حدث خطا غير متوقع')
  }

  return res.json();
}

async function DoctorsdashboardPage() {
  let doctors = await getDoctors();

  return <DoctorList doctors={doctors}/>
}

export default DoctorsdashboardPage;
