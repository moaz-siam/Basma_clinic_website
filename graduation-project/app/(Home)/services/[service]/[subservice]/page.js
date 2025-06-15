import serviceImg from "@/assets/ServiceImg.png";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Consultation from "@/components/pageProps/Consultation";
import DoctorSwiper from "@/components/pageProps/doctorCopmonent/DoctorSwiper";
import SwiperArticles from "@/components/pageProps/swiper/SwiperArticles ";
import SwiperMedicalguide from "@/components/pageProps/swiper/SwiperMedicalGuide";
import SwiperVideos from "@/components/pageProps/swiper/SwiperVideos";
import Image from "next/image";
async function getServiceData(service) {
  const res = await fetch(`http://localhost:4000/api/services/${service}`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });

  if (!res.ok) {
    throw new Error("فشل في جلب البيانات");
  }

  return res.json();
}
async function SubServices({ params }) {
  const { subservice, service } = await params;
  let serviceData, subServices;

  const data = await getServiceData(service);
  serviceData = data.service[0] || [];
  subServices = data.subServices || [];

  const subService_find = subServices.find((ele) => ele.path === subservice);

  if (!serviceData || !subServices || !subService_find) {
    return <p className="text-red-500 text-center">الخدمة غير موجودة!</p>;
  }
  return (
    <div className="w-full h-full">
      <div className="container mx-auto px-4">
        <Breadcrumb
          titleTop={subService_find.title}
          titlesection={"خدمات"}
          path={[serviceData.title, subService_find.title]}
        />
      </div>
      <Image
        src={serviceImg}
        className="mt-[40px] w-full h-full"
        alt="Error Image"
      />
      <div className="container mx-auto px-4 mt-[30px]">
        {subServices.map((ele) => (
          <div key={ele.id} className="">
            {ele.path == subservice && (
              <div className="">
                <div className=" py-[30px]">
                  <h3 className=" text-[30px] text-[700]">عن الخدمة</h3>
                  <p className="text-[19px] text-[#616161] mt-[15px]">
                    {ele.description}
                  </p>
                </div>
                <div className=" py-[30px]">
                  <h3 className=" text-[30px] text-[700]">
                    ماذا تغطي لك هذه الخدمة؟
                  </h3>
                  <ul className="list-decimal mt-[15px]">
                    {ele.coverage
                      .split(".")
                      .slice(0, -1)
                      .map((sentence, index) => (
                        <li key={index} className="mb-2 text-[#616161]">
                          {sentence}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className=" py-[30px]">
                  <h3 className=" text-[30px] text-[700]">
                    ماذا لا تغطي الخدمة؟
                  </h3>
                  <ul className="list-decimal mt-[15px]">
                    {ele.non_coverage
                      .split(".")
                      .slice(0, -1)
                      .map((sentence, index) => (
                        <li key={index} className="mb-2 text-[#616161]">
                          {sentence}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="py-[30px]">
          <DoctorSwiper />
        </div>
        <div className="">
          <SwiperArticles id={"articlesubservice"} titletop={"الأكثر قراءة"} />
        </div>
        <div className="">
          <SwiperVideos
            id={"videosubservice"}
            titletop={"دورات الدعم النفسي"}
          />
        </div>
        <div className="">
          <SwiperMedicalguide
            id={"guidesubservice"}
            titletop={"دليلك للصحة النفسية"}
          />
        </div>
        <Consultation
          title_bottom={
            "سواء كنت تعاني من مشكلة صحية، تحتاج إلى استشارة طبية متخصصة، أو تبحث عن نصيحة موثوقة، نحن هنا لمساعدتك. لا تنتظر حتى تتفاقم الأعراض استشر طبيبًا الآن واتخذ الخطوة الأولى نحو صحتك المثالية."
          }
          title_top={"ابدأ الآن واحصل على استشارتك الخاصة !"}
        />
      </div>
    </div>
  );
}

export default SubServices;
