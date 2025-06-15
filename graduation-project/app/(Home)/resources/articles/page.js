import Breadcrumb from "@/components/pageProps/Breadcrumb";
import SwiperArticles from "@/components/pageProps/swiper/SwiperArticles ";
import React from "react";

async function getArticles() {
  const res = await fetch(`http://localhost:4000/api/resources`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });


  if (!res.ok) {
    throw new Error("فشل في جلب البيانات");
  }

  return res.json();
}
export default async function Articlespage() {
  const articles_data = await getArticles();
  const categories = {};

  articles_data.articles.forEach((article) => {
    if (!categories[article.category]) {
      categories[article.category] = []; 
    }
    categories[article.category].push(article); 
  });

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <Breadcrumb
          titleTop={`مقالات`}
          titlesection={"موارد"}
          path={["مقالات"]}
        />
        {/* إنشاء سلايدر لكل تصنيف موجود تلقائيًا */}
        {Object.entries(categories).map(([category, articles], index) => (
          <div key={index} className="mb-8">
            <SwiperArticles
              id={`article-${index}`}
              articles={articles}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
