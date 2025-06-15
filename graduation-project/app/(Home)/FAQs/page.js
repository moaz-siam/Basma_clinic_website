import { FAQs } from "@/assets";
import Accordion from "@/components/pageProps/Accordion";
import Breadcrumb from "@/components/pageProps/Breadcrumb";
import React from "react";

export default function FAQsPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <Breadcrumb
          titleTop={"الأسئلة الشائعة"}
          titlesection={"المساعدة"}
          path={["الأسئلة الشائعة"]}
        />
        {FAQs.map((ele, index) => (
          <div key={index} className="mt-[20px]">
            <Accordion title={ele.title} content={ele.content} />
          </div>
        ))}
      </div>
    </div>
  );
}
