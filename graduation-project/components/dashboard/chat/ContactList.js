"use client";
import React, { useState } from "react";
import { ContactItem } from "./contact-item";
import doctor from "@/assets/doctor-img/doctor1.png";
import { LiaEdit } from "react-icons/lia";
import { RiSearch2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
const CONTACTS = [
  {
    id: "1",
    name: "د. جميلة أحمد غازي",
    title: "طبيب جلدية",
    avatar: doctor,
    lastMessage: "نعم، بدأت على العلاج وهو يشعر بالتحسن كثيرًا",
    time: new Date(),
    unread: 0,
    isOnline: true,
  },
  {
    id: "2",
    name: "د. إبراهيم علي النجار",
    title: "طبيب أمراض باطنية",
    avatar: doctor,
    lastMessage: "هل بدأت تشعرين بتحسن الأعراض؟",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unread: 3,
    isOnline: false,
  },
  {
    id: "3",
    name: "د. سارة محمد",
    title: "طبيب أطفال",
    avatar: doctor,
    lastMessage: "يمكنك إحضار الطفل غدًا للكشف",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: 0,
    isOnline: true,
  },
  {
    id: "4",
    name: "د. سارة محمد",
    title: "طبيب أطفال",
    avatar: doctor,
    lastMessage: "يمكنك إحضار الطفل غدًا للكشف",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: 0,
    isOnline: true,
  },
  {
    id: "5",
    name: "د. سارة محمد",
    title: "طبيب أطفال",
    avatar: doctor,
    lastMessage: "يمكنك إحضار الطفل غدًا للكشف",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: 0,
    isOnline: true,
  },
  {
    id: "6",
    name: "د. سارة محمد",
    title: "طبيب أطفال",
    avatar: doctor,
    lastMessage: "يمكنك إحضار الطفل غدًا للكشف",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: 0,
    isOnline: true,
  },
  {
    id: "7",
    name: "د. سارة محمد",
    title: "طبيب أطفال",
    avatar: doctor,
    lastMessage: "يمكنك إحضار الطفل غدًا للكشف",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: 0,
    isOnline: true,
  },
];

export default function ContactList() {
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = CONTACTS.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="h-full flex flex-col border-l border-gray-200 bg-[#FCFCFC] p-[25px]">
      <div className="relative">
        <div className="w-full flex items-center justify-between cursor-pointer">
          <h3 className="text-[18px] font-[700] text-[#212121]">
            {user?.full_name}
          </h3>
          <LiaEdit className="text-[20px]" />
        </div>
        <div className="w-full flex items-center rounded-[8px] bg-white shadow-[0px_4px_25px_0px_#A1A1A11A] px-[20px] py-[10px] mt-[15px]">
          <RiSearch2Line className="text-[#E0E0E0]" />
          <input
            type="text"
            className=" focus:outline-none placeholder:text-[#E0E0E0] px-[5px] h-full w-full"
            placeholder="البحث"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <h3 className="text-[15px] text-[#616161] font-[600] mt-[24px]">
          رسائلك
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 w-full">
        {filteredContacts.map((contact) => (
          <ContactItem
            key={contact.id}
            id={contact.id}
            name={contact.name}
            avatar={contact.avatar}
            lastMessage={contact.lastMessage}
            time={contact.time}
            unread={contact.unread}
            isOnline={contact.isOnline}
            // isActive={activeContactId === contact.id}
            // onClick={() => onSelectContact(contact.id)}
          />
        ))}
      </div>
    </div>
  );
}
