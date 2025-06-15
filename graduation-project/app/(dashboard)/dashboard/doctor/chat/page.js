"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import doctorimg from "@/assets/doctor-img/doctor1.png";
import { CiCircleMore } from "react-icons/ci";
import Conversation from "@/components/dashboard/chat/Conversation";
import ContactList from "@/components/dashboard/chat/ContactList";

export default function ChatDoctorPage() {
  // const [messages, setMessages] = useState([
  //   { id: 1, text: "مرحبًا، كيف أقدر أساعدك؟", from: "bot" },
  //   { id: 2, text: "احتاج مساعدة بخصوص الخدمة", from: "user" },
  // ]);
  // const [input, setInput] = useState("");

  // const handleSend = () => {
  //   if (!input.trim()) return;
  //   setMessages([...messages, { id: Date.now(), text: input, from: "user" }]);
  //   setInput("");
  // };

  const [showMobileConversation, setShowMobileConversation] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Initialize window width for responsive views
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectContact = (contactId) => {
    setShowMobileConversation(true);
  };

  const handleBackClick = () => {
    setShowMobileConversation(false);
  };

  const isMobile = windowWidth < 768;
  return (
    <div className="flex flex-1 h-[calc(100vh-185px)] overflow-hidden">
      {/* Contact list - hidden on mobile when showing conversation */}
      {(!isMobile || !showMobileConversation) && (
        <div className={`${isMobile ? "w-full" : "w-1/3"}`}>
          <ContactList
          // onSelectContact={handleSelectContact}
          // activeContactId={activeContactId}
          />
        </div>
      )}

      {/* Conversation - shown on mobile only when selected */}
      {(!isMobile || showMobileConversation) && (
        <div className={`${isMobile ? "w-full" : "w-2/3"}`}>
          <Conversation
          // contactId={activeDoctor.id}
          // name={activeDoctor.name}
          // avatar={activeDoctor.avatar}
          // status={activeDoctor.status}
          // onBackClick={isMobile ? handleBackClick : undefined}
          />
        </div>
      )}
    </div>
  );
}
