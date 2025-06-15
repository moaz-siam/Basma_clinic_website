import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Image from "next/image";
import serviceImg from "@/assets/ServiceImg.png";
import axios from "axios";
import icon1 from "@/assets/icon1.png";
import Link from "next/link";
import DoctorSwiper from "@/components/pageProps/doctorCopmonent/DoctorSwiper";
import SwiperArticles from "@/components/pageProps/swiper/SwiperArticles ";
import SwiperVideos from "@/components/pageProps/swiper/SwiperVideos";
import SwiperInstructions from "@/components/pageProps/swiper/Swiperinstructions";
import Consultation from "@/components/pageProps/Consultation";

async function getServiceData(service) {
  const res = await fetch(`http://localhost:4000/api/services/${service}`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });

  if (!res.ok) {
    throw new Error("فشل في جلب البيانات");
  }

  return res.json();
}

async function Servicepage({ params }) {
  const { service } = await params;
  let serviceData = null;
  let subServices = [];
  const data = await getServiceData(service);
  serviceData = data.service?.[0] || [];
  subServices = data.subServices || [];

  return (
    <div className="w-full h-full">
      <div className="container mx-auto px-4">
        <Breadcrumb
          titleTop={"خدمات"}
          titlesection={"خدمات"}
          path={[serviceData.title]}
        />
      </div>
      <Image
        src={serviceImg}
        className="mt-[40px] w-full h-full"
        alt="Error Image"
      />
      <div className="container mx-auto px-4 mt-[30px]">
        <div className=" py-[30px]">
          <h3 className=" text-[30px] text-[700] md:text-start text-center">
            عن الخدمة
          </h3>
          <p className="md:text-[19px] text-[14px] text-[#616161] mt-[15px] md:text-start text-center">
            {serviceData.description}
          </p>
        </div>
        <div className="py-[30px]">
          <h3 className="text-[30px] text-[700] md:text-start text-center">
            الخدمات المقدمة{" "}
          </h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[20px]">
            {subServices.map((ele) => (
              <Link
                href={`/services/${serviceData.path}/${ele.path}`}
                key={ele.id}
                className="flex md:flex-row flex-col md:text-start text-center p-[24px] bg-white hover:bg-Basic group duration-300 ease-in-out gap-[10px] rounded-2xl max-w-[600px]"
              >
                <div className="px-[3px] flex justify-center items-center md:block">
                  <div className="w-[40px] h-[40px] flex justify-center items-center bg-Basic group-hover:bg-[#2F247F] text-white rounded-full text-[20px] ">
                    <Image src={icon1} alt="error icon" />
                  </div>
                </div>
                <div className="">
                  <h3 className="text-[18px] font-[500] group-hover:text-white">
                    {ele.title}
                  </h3>
                  <p className="text-[#757575] w-full mt-[6px] text-[12px] group-hover:text-white">
                    استشارات عائلية ، تواصل صحي، توجيه عاطفي , حلول للمشاكل ,
                    استقرار نفسي
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="py-[30px]">
          <DoctorSwiper />
        </div>
        <div className="">
          <SwiperArticles id={"articleservice"} titletop={"الأكثر قراءة"} />
        </div>
        <div className="">
          <SwiperVideos id={"videoservice"} titletop={"دورات الدعم النفسي"} />
        </div>
        <div className="">
          <SwiperInstructions
            id={"instservice"}
            titletop={"إرشادات لصحة نفسية أفضل"}
          />
        </div>
      </div>
      <Consultation
        title_bottom={
          "سواء كنت تعاني من مشكلة صحية، تحتاج إلى استشارة طبية متخصصة، أو تبحث عن نصيحة موثوقة، نحن هنا لمساعدتك. لا تنتظر حتى تتفاقم الأعراض استشر طبيبًا الآن واتخذ الخطوة الأولى نحو صحتك المثالية."
        }
        title_top={"ابدأ الآن واحصل على استشارتك الخاصة !"}
      />
    </div>
  );
}

export default Servicepage;
