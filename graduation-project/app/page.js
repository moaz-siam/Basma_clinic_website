import AboutUs from "@/components/Home/aboutUs";
import Featuressection from "@/components/Home/Featuressection";
import Footer from "@/components/Home/footer";
import Header from "@/components/Home/header";
import HeroSection from "@/components/Home/heroSection";
import Ourmessage from "@/components/Home/Ourmessage";
import Services from "@/components/Home/services";
import Worksection from "@/components/Home/Worksection";
import { checkAuth } from "@/components/pageProps/auth/check-Auth";
import Consultation from "@/components/pageProps/Consultation";
import SwiperArticles from "@/components/pageProps/swiper/SwiperArticles ";
import { useSession } from "@/components/session/use-session";
import { cookies } from "next/headers";

export default async function Home() {  
  
  return (
    <div className="relative">
      <Header />
      <HeroSection />
      <AboutUs />
      <Ourmessage />
      <Services />
      <Featuressection />
      <Worksection />
      <SwiperArticles id={"articelmain"} />
      <Consultation
        title_top={"ابدأ الآن واحصل على استشارتك الخاصة ! "}
        title_bottom={
          "سواء كنت تعاني من مشكلة صحية، تحتاج إلى استشارة طبية متخصصة، أو تبحث عن نصيحة موثوقة، نحن هنا لمساعدتك. لا تنتظر حتى تتفاقم الأعراض استشرطبيبًا الآن واتخذ الخطوة الأولى نحو صحتك المثالية."
        }
      />
      <Footer />
    </div>
  );
}
