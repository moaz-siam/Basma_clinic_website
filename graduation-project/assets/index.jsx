import icon1 from "@/assets/icon1.png";
import icon2 from "@/assets/icon2.png";
import icon3 from "@/assets/icon3.png";
import icon4 from "@/assets/icon4.png";
import icon5 from "@/assets/icon5.png";
import icon6 from "@/assets/icon6.png";
import icon7 from "@/assets/icon7.png";
import icon8 from "@/assets/icon8.png";
import icon9 from "@/assets/icon9.png";
import icon10 from "@/assets/icon10.png";
import { HiMiniUsers } from "react-icons/hi2";
import { HiMiniUserGroup } from "react-icons/hi2";

// sidebar icon

import { RiHome5Fill } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { FaNotesMedical } from "react-icons/fa6";
import { RiMedicineBottleLine } from "react-icons/ri";
import { FaFileMedicalAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";

// profile menu

import { IoMdNotificationsOutline } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { TbBuildingHospital } from "react-icons/tb";
import { FaMoneyBills } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { PiWarningCircleLight } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { LiaNotesMedicalSolid } from "react-icons/lia";

export const LinksHeader = [
  {
    id: 1,
    path: "/",
    title: "الرئيسية",
  },
  {
    id: 2,
    path: "",
    title: " خدمات",
    subServicer: [
      {
        id: 1,
        path: "/services/mental-health-support",
        title: "الدعم والصحة النفسية",
      },
      {
        id: 2,
        path: "/services/pregnancy-and-childbirth",
        title: "حديثات الحمل والولادة",
      },
      {
        id: 3,
        path: "/services/medical-tests-and-checkups",
        title: "التحاليل والفحوصات",
      },
      {
        id: 4,
        path: "/services/chronic-disease-nutrition",
        title: "التغذية للأمراض المزمنة",
      },
      {
        id: 5,
        path: "/services/emergency-first-aid",
        title: "الطوارئ والإسعافات الأولية ",
      },
    ],
  },
  { id: 3, path: "/doctors", title: "أطباء" },
  { id: 4, path: "/resources", title: "موارد" },
  { id: 5, path: "/consult", title: "أطلب استشارتك" },
  { id: 6, path: "/symptom-analyst", title: "محلل الاعراض" },
];
export const QuickLinks = [
  {
    id: 1,
    path: "/",
    title: "الرئيسية",
  },
  { id: 2, path: "", title: "من نحن" },
  { id: 3, path: "", title: "أطباء" },
  { id: 4, path: "", title: "موارد" },
  { id: 5, path: "", title: "أطلب استشارتك" },
  { id: 6, path: "", title: "محلل الاعراض" },
  { id: 7, path: "", title: "التبرع" },
];
export const Services = [
  { id: 1, path: "", title: "حديثات الحمل والولادة" },
  { id: 2, path: "", title: "الدعم والصحة النفسية" },
  { id: 3, path: "", title: "التحاليل والفحوصات" },
  { id: 4, path: "", title: "التغذية للأمراض المزمنة" },
  { id: 5, path: "", title: "الطوارئ والإسعافات" },
];

export const Help = [
  {
    id: 1,
    path: "/FAQs",
    title: "الاسئلة الشائعة",
  },
  {
    id: 2,
    path: "/Terms&Conditions",
    title: " الشروط والاحكام",
  },
  {
    id: 3,
    path: "/privacypolicy",
    title: "سياسة الخصوصية",
  },
];

export const Communication = [
  { id: 1, path: "", title: "+972 5638210362" },
  { id: 2, path: "", title: "Basma@gmail.com" },
  { id: 3, path: "", title: "الدعم الفني" },
  { id: 4, path: "", title: "لايف شات" },
];
export const ServicesHomePage = [
  {
    id: 1,
    title: "الدعم والصحة النفسية",
    parg: "خدمة دعم نفسي تهدف لتحسين الصحة النفسية من خلال جلسات استشارية ودعم مستمر.",
    icon: icon1,
  },
  {
    id: 2,
    title: "التحاليل والفحوصات الطبية",
    parg: " .خدمة التحاليل والفحوصات تقدم اختبارات طبية دقيقة وموثوقة لتشخيص الصحة والوقاية من الأمراض",
    icon: icon2,
  },
  {
    id: 3,
    title: "التحاليل والفحوصات الطبية",
    parg: "خدمة الطوارئ والإسعافات تقدم رعاية سريعة وفعّالة لحالات الطوارئ والإصابات الطبية العاجلة",
    icon: icon3,
  },
  {
    id: 4,
    title: "حديثات الحمل والولادة",
    parg: "خدمة شاملة لدعم النساء الحوامل والحديثات الولادة، تقدم استشارات ورعاية صحية متخصصة وموثوقة.",
    icon: icon4,
  },
  {
    id: 5,
    title: "التغذية للأمراض المزمنة",
    parg: "خدمة التغذية للأمراض المزمنة توفر استشارات غذائية متخصصة لتحسين الصحة وإدارة الأمراض المزمنة.",
    icon: icon5,
  },
  {
    id: 6,
    title: "محلل الأعراض",
    parg: "خدمة مدعومة بالذكاء الاصطناعي تحلل أعراض المستخدم بناءً على مدخلاته وتوضح له الأسباب المحتملة للمشكلة.",
    icon: icon6,
  },
];
export const FeaturessectionTiltle = [
  {
    id: 1,
    title: "استشارات طبية مريحة وسهلة",
    parg: "احصل على استشارات طبية من أطباء مختصين عبر الإنترنت بسهولة.",
    icon: icon7,
  },
  {
    id: 2,
    title: "دعم نفسي مخصص",
    parg: "دعم نفسي متخصص لمساعدتك في التعامل مع التوتر والقلق بفعالية.",
    icon: icon8,
  },
  {
    id: 3,
    title: "محتوى صحي موثوق ودقيق",
    parg: "مقالات طبية موثوقة ومحدثة لدعم معرفتك الصحية بشكل دائم.",
    icon: icon9,
  },
  {
    id: 4,
    title: "خدمات مخصصة وفقًا لاحتياجاتك",
    parg: "خدمات طبية ونفسية مصممة لتلبية احتياجاتك الصحية.",
    icon: icon10,
  },
];

export const month = [
  { monthNumber: "01", monthName: "يناير" },
  { monthNumber: "02", monthName: "فبراير" },
  { monthNumber: "03", monthName: "مارس" },
  { monthNumber: "04", monthName: "أبريل" },
  { monthNumber: "05", monthName: "مايو" },
  { monthNumber: "06", monthName: "يونيو" },
  { monthNumber: "07", monthName: "يوليو" },
  { monthNumber: "08", monthName: "أغسطس" },
  { monthNumber: "09", monthName: "سبتمبر" },
  { monthNumber: "10", monthName: "أكتوبر" },
  { monthNumber: "11", monthName: "نوفمبر" },
  { monthNumber: "12", monthName: "ديسمبر" },
];

export const FAQs = [
  {
    title: "ما هي خدمات بصمة طبية؟",
    content:
      " بصمة طبية تقدم مجموعة من الخدمات الصحية التي تشمل الاستشارات الطبية عن بُعد، فحوصات طبية، خدمات حديثات الولادة، دعم نفسي، خدمة التغذية للأمراض المزمنة، بالإضافة إلى الطوارئ والإسعافات الأولية.",
  },
  {
    title: "كيف يمكنني الاستفادة من خدماتكم؟",
    content:
      " بصمة طبية تقدم مجموعة من الخدمات الصحية التي تشمل الاستشارات الطبية عن بُعد، فحوصات طبية، خدمات حديثات الولادة، دعم نفسي، خدمة التغذية للأمراض المزمنة، بالإضافة إلى الطوارئ والإسعافات الأولية.",
  },
  {
    title: "هل يمكنني استشارة الأطباء عبر الموقع؟",
    content:
      " بصمة طبية تقدم مجموعة من الخدمات الصحية التي تشمل الاستشارات الطبية عن بُعد، فحوصات طبية، خدمات حديثات الولادة، دعم نفسي، خدمة التغذية للأمراض المزمنة، بالإضافة إلى الطوارئ والإسعافات الأولية.",
  },
  {
    title: "هل يمكنني معرفة نتائج التحاليل عبر الموقع؟",
    content:
      " بصمة طبية تقدم مجموعة من الخدمات الصحية التي تشمل الاستشارات الطبية عن بُعد، فحوصات طبية، خدمات حديثات الولادة، دعم نفسي، خدمة التغذية للأمراض المزمنة، بالإضافة إلى الطوارئ والإسعافات الأولية.",
  },
  {
    title: "هل يوجد دعم للمحتاجين؟",
    content:
      " بصمة طبية تقدم مجموعة من الخدمات الصحية التي تشمل الاستشارات الطبية عن بُعد، فحوصات طبية، خدمات حديثات الولادة، دعم نفسي، خدمة التغذية للأمراض المزمنة، بالإضافة إلى الطوارئ والإسعافات الأولية.",
  },
];
export const FAQsConsult = [
  {
    title: "كيف يمكنني حجز استشارة طبية؟",
    content:
      "يمكنك حجز استشارتك بسهولة من خلال الموقع أو التطبيق، فقط اختر التخصص المناسب واتبع الخطوات لحجز موعدك.",
  },
  {
    title: "هل الاستشارة تتم عبر مكالمة فيديو أم صوتية؟",
    content:
      "يمكنك حجز استشارتك بسهولة من خلال الموقع أو التطبيق، فقط اختر التخصص المناسب واتبع الخطوات لحجز موعدك.",
  },
  {
    title: "كم مدة الاستشارة؟",
    content:
      "يمكنك حجز استشارتك بسهولة من خلال الموقع أو التطبيق، فقط اختر التخصص المناسب واتبع الخطوات لحجز موعدك.",
  },
  {
    title: "هل الاستشارات سرية؟",
    content:
      "يمكنك حجز استشارتك بسهولة من خلال الموقع أو التطبيق، فقط اختر التخصص المناسب واتبع الخطوات لحجز موعدك.",
  },
  {
    title: "هل يمكنني استشارة طبيب معين؟",
    content:
      "يمكنك حجز استشارتك بسهولة من خلال الموقع أو التطبيق، فقط اختر التخصص المناسب واتبع الخطوات لحجز موعدك.",
  },
  {
    title: "ماذا لو احتجت لمتابعة بعد الاستشارة؟",
    content:
      "يمكنك حجز استشارتك بسهولة من خلال الموقع أو التطبيق، فقط اختر التخصص المناسب واتبع الخطوات لحجز موعدك.",
  },
];

export const SidebarPatientLink = [
  {
    id: 1,
    path: "/dashboard/patient",
    icon: <RiHome5Fill />,
    title: "الرئيسية",
  },
  {
    id: 2,
    path: "/dashboard/patient/consultation",
    icon: <TiMessages />,
    title: "استشاراتي",
  },
  {
    id: 3,
    path: "/dashboard/patient/symptom-analyst",
    icon: <FaFileMedicalAlt />,
    title: "مدقق الأعراض",
  },
  {
    id: 4,
    path: "/dashboard/patient/medication-tracker",
    icon: <RiMedicineBottleLine />,
    title: "متعقب الأدوية",
  },
  {
    id: 5,
    path: "/dashboard/patient/doctors",
    icon: <CiUser />,
    title: "أطباء",
  },
  {
    id: 6,
    path: "/dashboard/patient/resources",
    icon: <FaNotesMedical />,
    title: "موارد",
  },
  {
    id: 7,
    path: "/dashboard/patient/medical_points",
    icon: <TbBuildingHospital />,
    title: "النقاط الطبية",
  },
];

export const ProfileMenu = [
  {
    id: 1,
    path: "/dashboard/patient/profile/personal-information",
    icon: <CiUser />,
    title: "المعلومات الشخصية",
  },
  {
    id: 2,
    path: "/dashboard/patient/profile/",
    icon: <LiaNotesMedicalSolid />,
    title: "السجل الطبي",
  },
  {
    id: 3,
    path: "/dashboard/patient/profile/payment-methods",
    icon: <MdPayment />,
    title: "طرق الدفع",
  },
  {
    id: 5,
    path: "/dashboard/patient/profile/medical-points",
    icon: <TbBuildingHospital />,
    title: "النقاط الطبية",
  },
  {
    id: 6,
    path: "/dashboard/patient/profile/bills",
    icon: <FaMoneyBills />,
    title: "الفواتير",
  },
  {
    id: 7,
    path: "/dashboard/patient/profile/",
    icon: <CgFileDocument />,
    title: "الوصفات الطبية",
  },
  {
    id: 8,
    path: "/dashboard/patient/profile/settings",
    icon: <IoSettingsOutline />,
    title: "إعدادات الحساب",
  },
  {
    id: 9,
    path: "/dashboard/patient/profile/notification-settings",
    icon: <IoMdNotificationsOutline />,
    title: "الإشعارات",
  },
  {
    id: 10,
    path: "/dashboard/patient/profile/help-center",
    icon: <PiWarningCircleLight />,
    title: "مركز المساعدة",
  },
  {
    id: 11,
    path: "/dashboard/patient/profile/delete-account",
    icon: <TbLogout />,
    title: "تسجيل الخروج",
  },
];

export const ServicesConsultations = [
  {
    id: 1,
    title: "حديثات الحمل والولادة",
    subServices: [
      { id: 1, title: "التربية الحديثة الذكية" },
      { id: 2, title: "الصحة النفسية للأم" },
      { id: 3, title: "التغذية للأم والطفل" },
      { id: 4, title: "الرضاعة الطبيعية والتغذية" },
    ],
  },
  {
    id: 2,
    title: "الدعم والصحة النفسية",
    subServices: [
      { id: 1, title: "علاج الاكتئاب والقلق" },
      { id: 2, title: "برنامج العناية النفسية" },
      { id: 3, title: "إرشادات للراحة النفسية" },
      { id: 4, title: "دعم نفسي للأسر" },
    ],
  },
  {
    id: 3,
    title: "التحاليل والفحوصات",
    subServices: [
      { id: 1, title: "تحاليل الدم الأساسية" },
      { id: 2, title: "فحوصات وظائف الكبد" },
      { id: 3, title: "تحاليل الغدة الدرقية" },
      { id: 4, title: "فحوصات أمراض القلب" },
    ],
  },
  {
    id: 4,
    title: "التغذية للأمراض المزمنة",
    subServices: [
      { id: 1, title: "خطط غذائية مخصصة" },
      { id: 2, title: "إدارة السكري بالتغذية" },
      { id: 3, title: "التغذية لأمراض القلب" },
      { id: 4, title: "الحمية لمرضى الضغط" },
    ],
  },
  {
    id: 5,
    title: "الطوارئ والإسعافات",
    subServices: [
      { id: 1, title: "دليل الاسعافات" },
      { id: 2, title: "الإنعاش القلبي الرئوي" },
      { id: 3, title: "إسعاف الجروح والنزيف" },
      { id: 4, title: "التعامل مع الصدمات" },
    ],
  },
];

export const SidebarDoctorLink = [
  {
    id: 1,
    path: "/dashboard/doctor",
    icon: <RiHome5Fill />,
    title: "الرئيسية",
  },
  {
    id: 2,
    path: "/dashboard/doctor/consultation",
    icon: <TiMessages />,
    title: "مراجعة الاستشارات",
  },
  {
    id: 3,
    path: "/dashboard/doctor/appointments",
    icon: <IoCalendarOutline />,
    title: "مراجعة المواعيد",
  },
  {
    id: 4,
    path: "/dashboard/doctor/prescriptions",
    icon: <CgFileDocument />,
    title: "الوصفات الطبية",
  },
];

export const ProfileDoctorMenu = [
  {
    id: 1,
    path: "/dashboard/doctor/profile/personal-information",
    icon: <CiUser />,
    title: "المعلومات الشخصية",
  },
  {
    id: 2,
    path: "/dashboard/doctor/profile/settings",
    icon: <IoSettingsOutline />,
    title: "إعدادات الحساب",
  },
  {
    id: 3,
    path: "/dashboard/doctor/profile/notification-settings",
    icon: <IoMdNotificationsOutline />,
    title: "الإشعارات",
  },
  {
    id: 4,
    path: "/dashboard/doctor/profile/help-center",
    icon: <PiWarningCircleLight />,
    title: "مركز المساعدة",
  },
  {
    id: 5,
    path: "/dashboard/doctor/profile/delete-account",
    icon: <TbLogout />,
    title: "حذف الحساب",
  },
];
export const SidebarPharmacyLink = [
  {
    id: 1,
    path: "/dashboard/pharmacy",
    icon: <RiHome5Fill />,
    title: "الرئيسية",
  },
  {
    id: 2,
    path: "/dashboard/pharmacy/bills",
    icon: <FaMoneyBills />,
    title: "الفواتير",
  },
  {
    id: 3,
    path: "/dashboard/pharmacy/prescriptions",
    icon: <CgFileDocument />,
    title: "الوصفات الطبية",
  },
];
export const SideBarAdminLink = [
  {
    id: 1,
    path: "/dashboard/admin",
    icon: <RiHome5Fill />,
    title: "الرئيسية",
  },
  {
    id: 2,
    path: "/dashboard/admin/users",
    icon: <HiMiniUsers />,
    title: "المستخدمين",
  },
  {
    id: 3,
    path: "/dashboard/admin/doctors",
    icon: <HiMiniUserGroup />,
    title: "الأطباء",
  },
  {
    id: 4,
    path: "/dashboard/admin/medical-points",
    icon: <TbBuildingHospital />,
    title: "النقاط الطبية",
  },
];
