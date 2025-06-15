"use client";

// import { cn } from "@/lib/utils";
// import { Check, CheckCheck } from "lucide-react";
// import { format } from "date-fns";
// import { ar } from "date-fns/locale";
import { LuCheckCheck } from "react-icons/lu";
import { LuCheck } from "react-icons/lu";

export function MessageBubble({
  content,
  timestamp,
  isOutgoing,
  status = "sent",
}) {
  // const formattedTime = format(timestamp, "hh:mm a", { locale: ar });

  return (
    <div
      className={`flex max-w-[70%] md:max-w-[60%] ${
        isOutgoing ? "mr-auto" : "ml-auto"
      }`}
    >
      <div
        className={`rounded-[8px] p-3 my-1 ${
          isOutgoing
            ? "bg-[#5D4FBF] text-white rounded-bl-none"
            : "bg-gray-100 text-gray-800 rounded-br-none"
        }`}
      >
        <p className="text-sm mb-1">{content}</p>
        <div
          className={`flex items-center justify-end gap-1 text-xs ${
            isOutgoing ? "text-gray-200" : "text-gray-500"
          }`}
        >
          {/* <span>{formattedTime}</span> */}
          {isOutgoing && (
            <span>
              {status === "sent" && <LuCheck size={14} />}
              {status === "delivered" && <LuCheckCheck size={14} />}
              {status === "read" && (
                <LuCheckCheck size={14} className="text-blue-400" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
