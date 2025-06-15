"use client";

// import { cn } from "@/lib/utils";
import Image from "next/image";
// import { format, isToday, isYesterday } from "date-fns";
// import { ar } from "date-fns/locale";

export function ContactItem({
  name,
  avatar,
  lastMessage,
  time,
  unread = 0,
  isOnline = false,
  isActive = false,
  onClick,
}) {
  // Format date in Arabic
  // const formatMessageDate = (date: Date) => {
  //   if (isToday(date)) {
  //     return format(date, "hh:mm a", { locale: ar });
  //   } else if (isYesterday(date)) {
  //     return "الأمس";
  //   } else {
  //     return format(date, "dd/MM/yyyy", { locale: ar });
  //   }
  // };

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-center rounded-lg cursor-pointer transition-colors hover:bg-gray-50 w-full p-3
        ${isActive && "bg-gray-100"}
      `}
    >
      <div className="relative">
        <Image
          src={avatar}
          alt={name}
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>
      <div className="mr-3 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <span className="text-xs text-gray-500">
            {/* {formatMessageDate(time)} */}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 truncate max-w-[200px]">
            {lastMessage}
          </p>
          {unread > 0 && (
            <span className="bg-[#5D4FBF] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
