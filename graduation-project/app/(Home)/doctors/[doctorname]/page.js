import Breadcrumb from "@/components/pageProps/Breadcrumb";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaRegAddressCard } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import commentimg from "@/assets/commentimg.png";
import Consultation from "@/components/pageProps/Consultation";
import { FaUserCircle } from "react-icons/fa";

async function getDoctor(doctorname) {
  try {
    const res = await fetch(`http://localhost:4000/api/doctors/${doctorname}`, {
      cache: "no-store", // يمنع التخزين المؤقت
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
async function DoctornamePage({ params }) {
  let { doctorname } = await params;
  let result;

  result = await getDoctor(doctorname);

  if (!result || !result.doctor || result.doctor.length === 0) {
    return (
      <div className="text-center w-full h-[calc(100vh-100px)] flex justify-center items-center flex-col space-y-[10px]">
        <p className="text-red-500 font-bold">الدكتور غير موجود</p>
        <Link
          href={"/"}
          className=" bg-Basic text-white px-[10px] py-[5px] rounded-[5px]"
        >
          الرجوع الى الصفحة الرئسية
        </Link>
      </div>
    );
  }
  let doctor = result.doctor[0];

  let comments_doctor = result.comments_doctor || [];
  const numberRating = [1, 2, 3, 4, 5];
  const totalRatings = Object.values(doctor?.rating_distribution).reduce(
    (sum, val) => sum + val,
    0
  );

  return (
    <div className="w-full">
      <div className="mx-auto container px-4">
        <Breadcrumb
          titleTop={`د. ${doctor.full_name_ar}`}
          titlesection={"أطباء"}
        />
        {/* Dr. Information section */}
        <div className="flex justify-center items-center flex-col gap-[15px]">
          {doctor.image_url ? (
            <Image
              src={doctor.image_url}
              className=" rounded-full"
              alt="errror img"
              width={200}
              height={200}
            />
          ) : (
            <div className="">
              <FaUserCircle className="text-gray-200 text-[120px]" />
            </div>
          )}
          <h3 className="md:text-[25px] text-[20px]">{`د. ${doctor?.full_name_ar}`}</h3>
          <span className="text-[#616161] text-[15px]">{doctor?.specialty}</span>
          <div className="flex md:justify-between justify-center items-center md:flex-row flex-col md:space-y-0 space-y-[10px]">
            <div className="flex items-center space-x-[5px] px-[30px] md:border-l-1 md:border-[#E0E0E0]">
              <FaStar className="text-[#FFCB2B]" />
              <span className="font-bold">
                {parseFloat(doctor.average_rating).toFixed(1)}
              </span>
              <span className="text-[#9E9E9E]">تقييم</span>
            </div>
            <div className="flex items-center space-x-[5px] px-[30px] md:border-l-1 md:border-[#E0E0E0]">
              <HiOutlineUserGroup className=" text-Basic" />
              <span className="font-bold">+{doctor.total_patients}</span>
              <span className="text-[#9E9E9E]">عدد المرضى</span>
            </div>
            <div className="flex items-center space-x-[5px] px-[30px]">
              <FaRegAddressCard className=" text-Basic" />
              <span className="font-bold">+{doctor.years_of_experience}</span>
              <span className="text-[#9E9E9E]">سنوات الخبرة</span>
            </div>
          </div>
          <div className="flex items-center justify-center md:flex-row flex-col md:space-x-[16px] md:space-y-0 space-y-[5px]">
            <Link
              href={"/dashboard/patient/consultation/create"}
              className="py-[14px] px-[100px] bg-Basic text-white rounded-[8px] font-[700]"
            >
              استشارة
            </Link>
            <Link
              href={""}
              className="py-[14px] px-[100px] text-Basic border-1 border-Basic rounded-[8px] font-[700]"
            >
              مراسلة
            </Link>
          </div>
        </div>
        {/* bio section */}
        <div className="mt-[32px]">
          <div className="">
            <h3 className="text-[25px] font-[700] mb-[20px]">عن الدكتور/ة :</h3>
            {doctor.bio ? (
              <p className="text-[#616161] text-[18px]">{doctor.bio}</p>
            ) : (
              <p className="text-[#616161] text-[18px]">
                د. {doctor.full_name_ar} هو طبيب متمرس يتمتع بخبرة تزيد عن{doctor.years_of_experience}
                عامًا في مجال الرعاية الصحية. يختص في [التخصص الطبي]، ويُعرف
                بقدرته على تقديم رعاية طبية عالية الجودة تركز على المريض
                واحتياجاته الفردية. يحرص دائمًا على البقاء على اطلاع بأحدث
                المستجدات الطبية والتقنيات العلاجية الحديثة لضمان تقديم أفضل
                خدمة ممكنة لمرضاه. يؤمن د. [اسم الطبيب] بأن العلاقة بين الطبيب
                والمريض مبنية على الثقة، التواصل الفعّال، والاحترام المتبادل.
                لذلك يضع راحة المريض واطمئنانه على رأس أولوياته في كل زيارة.
              </p>
            )}
          </div>
          <div className="mt-[24px]">
            <h3 className="text-[25px] font-[700] mb-[20px]">خدماتي :</h3>
            <ul className="list-decimal mt-[15px]">
              {doctor?.my_services?.split(".").map((sentence, index) => (
                <li key={index} className="mb-2 text-[#616161]">
                  {sentence}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* reviews section */}
        <div className="mt-[32px]">
          <h3 className="font-[700] text-[25px] md:text-start text-center">
            أراء المرضى{" "}
          </h3>
          <div className="flex md:justify-between items-center md:flex-row flex-col justify-center md:space-x-[32px] mt-[24px]">
            <div className="w-full space-y-[15px]">
              {numberRating.map((num) => {
                const count = doctor?.rating_distribution[num] || 0;
                const percentage = totalRatings
                  ? (count / totalRatings) * 100
                  : 0;

                return (
                  <div
                    key={num}
                    className="flex items-center w-full space-x-[25px]"
                    dir="rtl"
                  >
                    {/* النجمة ورقم التقييم */}
                    <div className="flex items-center space-x-[5px]">
                      <FaStar className="text-[#FFCB2B]" />
                      <h3 className="font-bold text-[20px]">{num}</h3>
                    </div>

                    {/* شريط التقدم */}
                    <div className="flex-1 h-[11px] bg-[#E0E6FF] rounded-[8px] relative overflow-hidden">
                      <div
                        className="h-full bg-Basic rounded-[8px] transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    {/* عدد الأشخاص */}
                    <h3 className="text-[20px] font-semibold min-w-[30px] text-center">
                      {count}
                    </h3>
                  </div>
                );
              })}
            </div>
            <div className="bg-[#EEF1FF] rounded-[16px] w-full">
              <div className="md:py-[52px] md:px-[200px] py-[20px] text-center space-y-[12px]">
                <h3 className="text-[30px] font-[600]">
                  {parseFloat(doctor.average_rating).toFixed(1)}
                </h3>
                <div className="flex justify-center items-centers space-x-[14px]">
                  <FaStar className="text-[#FFCB2B]" width={30} height={30} />
                  <FaStar className="text-[#FFCB2B]" width={30} height={30} />
                  <FaStar className="text-[#FFCB2B]" width={30} height={30} />
                  <FaStar className="text-[#FFCB2B]" width={30} height={30} />
                  <FaStar className="text-[#FFCB2B]" width={30} height={30} />
                </div>
                <h3 className="text-[20px] font-[500]">5 الف من التقييمات</h3>
              </div>
            </div>
          </div>
        </div>
        {/* comments section */}
        <div className="mt-[15px] w-full">
          <div className="flex justify-between items-center">
            <h3 className="md:text-[20px] text-[14px]">
              يوجد أكثر من <span className=" text-Basic">1000</span> مراجعة
            </h3>
            <button className="flex justify-center items-center gap-[8px] px-[16px] py-[8px] bg-white rounded-lg md:text-[18px] text-[14px] shadow-md cursor-pointer hover:bg-Basic hover:text-white duration-300 ease-in-out">
              من الأحدث للأقدم
              <RiArrowDropDownLine />
            </button>
          </div>
          <div className="mt-[20px] w-full">
            {comments_doctor.map((comment, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-[16px] mb-[20px]"
              >
                <div className="flex items-center md:flex-row flex-col px-[24px] py-[29px] gap-[16px]">
                  <div className="w-[50px] h-[50px] flex justify-center items-center bg-[#EEF1FF] rounded-full ">
                    <Image src={commentimg} alt="Error img" />
                  </div>
                  <div className="">
                    <h3 className="text-[16px] font-[500] mb-[4px] md:text-start text-center">
                      {comment.reviewer_name_ar}
                    </h3>
                    <div className="flex items-centers md:justify-start justify-center space-x-[6px] mb-[15px]">
                      <FaStar
                        className="text-[#FFCB2B]"
                        width={30}
                        height={30}
                      />
                      <FaStar
                        className="text-[#FFCB2B]"
                        width={30}
                        height={30}
                      />
                      <FaStar
                        className="text-[#FFCB2B]"
                        width={30}
                        height={30}
                      />
                      <FaStar
                        className="text-[#FFCB2B]"
                        width={30}
                        height={30}
                      />
                      <FaStar
                        className="text-[#FFCB2B]"
                        width={30}
                        height={30}
                      />
                    </div>
                    <p className="text-[14px] text-[#757575] font-[400] max-w-[1106px] md:text-start text-center">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-[16px] w-full text-center text-[18px] text-Basic cursor-pointer">
              <Link
                href={`/doctors/${doctor.full_name_en
                  .split(" ")
                  .join("-")}/review`}
                className="underline"
              >
                عرض المزيد
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-[10px]">
          <Consultation
            title_top={"استشر طبيبك الآن"}
            title_bottom={
              "إذا كنت تعاني من القلق والتوتر لفترة طويلة، لا تتردد في طلب المساعدة من أخصائي نفسي. العلاج المبكر يساعد في تجنب المضاعفات وتحسين نوعية حياتك."
            }
          />
        </div>
      </div>
    </div>
  );
}

export default DoctornamePage;
