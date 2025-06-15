import Breadcrumb from "@/components/pageProps/Breadcrumb";
import SwiperMedicalguide from "@/components/pageProps/swiper/SwiperMedicalGuide";

async function getMedicalguide() {
  const res = await fetch(`http://localhost:4000/api/resources`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });
  if (!res.ok) {
    throw new Error("حدث خطا غير متوقع");
  }

  return res.json();
}

export default async function medicalguidePage() {
  const { Medical_Guide } = await getMedicalguide();

  const categories = {};

  Medical_Guide.forEach((guide) => {
    if (!categories[guide.category]) {
      categories[guide.category] = [];
    }
    categories[guide.category].push(guide);
  });

  return (
    <div className="w-full">
      <div className="mx-auto container px-4">
        <Breadcrumb
          titleTop={"دليل طبي"}
          titlesection={"موارد"}
          path={["دليل طبي"]}
        />
        {Object.entries(categories).map(([category, guide], index) => (
          <div key={index} className="mb-8">
            <SwiperMedicalguide id={`guide-${index}`} medicalguide={guide} />
          </div>
        ))}
      </div>
    </div>
  );
}
