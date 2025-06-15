import DonateComponent from "@/components/Home/DonateComponent";

export default function DonatePage() {

  const dataall = []

  
  
  return (
    <div className="md:px-20 px-4 w-full">
      <div className="container mx-auto p-[30px] bg-white shadow-sm rounded-[16px]">
        <h3 className="md:text-[20px] text-[17px] font-[700]">
          أهلاً وسهلاً بك في صفحة التبرع لـ بصمة طبية .
        </h3>
        <p className="md:text-[18px] text-[16px] text-[#757575] mt-[16px]">
          {" "}
          مساهمتك تصنع فرقًا حقيقيًا في حياة الكثيرين، فبدعمك، نوفر الرعاية
          الصحية لمن يحتاجها في غزة. كن جزءًا من الأمل، وامنح بصمتك اليوم.{" "}
        </p>
        <div>
          <DonateComponent data={dataall}/>
        </div>
      </div>
    </div>
  );
}
