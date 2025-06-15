import Breadcrumb from '@/components/pageProps/Breadcrumb'
import SwiperArticles from '@/components/pageProps/swiper/SwiperArticles '
import SwiperVideos from '@/components/pageProps/swiper/SwiperVideos';
import React from 'react'

async function getVideos() {
  const res = await fetch(`http://localhost:4000/api/resources`, {
    cache: "no-store", // جلب البيانات مباشرة من السيرفر دائمًا (يمكن تغييره حسب الحاجة)
  });
  if (!res.ok) {
    throw new Error('حدث خطا غير متوقع')
  }
  return res.json();
}
export default async function Articlespage() {
  const videos_data = await getVideos();

  const most_viewed = videos_data.videos.filter((art) => art.category == "الأكثر مشاهدة")
  const recommended_yourself = videos_data.videos.filter((art) => art.category == "موصى به لك")
  const videos = videos_data.videos.filter((art) => art.category == "فيديوهات")
  const most_benefit = videos_data.videos.filter((art) => art.category == "الأكثر فائدة")
  
  // 
  
  
  return (
    <div className='w-full'>
      <div className="container mx-auto px-4">
        <Breadcrumb titleTop={`فيديوهات`} titlesection={"موارد"} path={['فيديوهات']} />
        <div className=''>
          <SwiperVideos id={'videos1'} videos={most_viewed}/>
        </div>
        <div className=''>
          <SwiperVideos id={'videos2'} videos={recommended_yourself}/>
        </div>
        <div className=''>
          <SwiperVideos id={'videos3'} videos={videos}/>
        </div>
        <div className=''>
          <SwiperVideos id={'videos4'} videos={most_benefit}/>
        </div>
      </div>
    </div>
  )
}
