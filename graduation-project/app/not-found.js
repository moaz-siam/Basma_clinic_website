import Link from "next/link";
import not_found from "@/assets/not-found.png";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image
        src={not_found}
        width={0}
        height={0}
        alt="error img"
        className=""
      />
      <h3 className="text-[30px] text-[#212121] mt-4">الصفحة غير موجودة</h3>
      <p className="mt-4 text-[18px] text-[#616161] max-w-[800px]">
        عذرًا، لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم تغيير
        الرابط أو لم تعد الصفحة متاحة. يمكنك العودة إلى الصفحة الرئيسية أو
        استخدام البحث للوصول إلى ما تحتاجه
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-Basic text-white rounded-[8px]"
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
}
