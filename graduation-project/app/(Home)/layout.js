import Footer from "@/components/Home/footer";
import Header from "@/components/Home/header";
import { checkAuth } from "@/components/pageProps/auth/check-Auth";
import { cookies } from "next/headers";
import React from "react";

export default async function layoutHome( { children }) {
  

  return (
    <div>
      <Header/>
      <div>{children}</div>
      <Footer />
    </div>
  );
}