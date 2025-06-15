"use client";

import Popup from "@/components/pageProps/Pop";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import Paymentmethods from "@/components/dashboard/profile/Paymentmethods";
import Medicalpoints from "@/components/dashboard/profile/Medicalpoints";
import Bills from "@/components/dashboard/profile/Bills";
import Settings from "@/components/dashboard/profile/settings";
import Notificationsettings from "@/components/dashboard/profile/Notificationsettings";
import Helpcenter from "@/components/dashboard/profile/Helpcenter";
import Deleteaccount from "@/components/dashboard/profile/Deleteaccount";
import PersonalInformation from "./profile/PersonalInformation";

export default function ProfileComponent({ profileId, role }) {

  const { user } = useSelector((state) => state.auth);

  return (
      <div className="mx-auto container">
        {profileId == "personal-information" ? (
          <PersonalInformation role={role}/>
        ) : profileId == "payment-methods" && role == 'patient' ? (
          <Paymentmethods />
        ) : profileId == "medical-points" && role == 'patient'? (
          <Medicalpoints />
        ) : profileId == "bills"&& role == 'patient' ? (
          <Bills />
        ) : profileId == "settings" ? (
          <Settings />
        ) : profileId == "notification-settings" ? (
          <Notificationsettings />
        ) : profileId == "help-center" ? (
          <Helpcenter />
        ) : profileId == "delete-account" ? (
          <Deleteaccount />
        ) : null}
      </div>
  );
}
