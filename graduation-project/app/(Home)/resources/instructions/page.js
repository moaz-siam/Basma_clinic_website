import Breadcrumb from "@/components/pageProps/Breadcrumb";
import SwiperInstructions from "@/components/pageProps/swiper/Swiperinstructions";

async function getInstructions() {
  const res = await fetch(`http://localhost:4000/api/resources`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });
  if (!res.ok) {
    throw new Error("حدث خطا غير متوقع");
  }

  return res.json();
}
export default async function InstructionsPage() {
  const { instructions } = await getInstructions();

  const categories = {};

  instructions.forEach((instructions) => {
    if (!categories[instructions.category]) {
      categories[instructions.category] = [];
    }
    categories[instructions.category].push(instructions);
  });
  return (
    <div className="w-full">
      <div className="mx-auto container px-4">
        <Breadcrumb
          titleTop={`ارشادات و نصائح`}
          titlesection={"موارد"}
          path={["ارشادات و نصائح"]}
        />
        {Object.entries(categories).map(([category, instructions], index) => (
          <div key={index} className="mb-8">
            <SwiperInstructions
              id={`instructions-${index}`}
              instructions={instructions}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
