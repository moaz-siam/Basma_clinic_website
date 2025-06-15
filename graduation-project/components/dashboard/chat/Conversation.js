import React from "react";
import ConversationHeader from "./ConversationHeader";
import MessageInput from "./MessageInput";
import { MessageBubble } from "./MessageBubble";

export default function Conversation() {
  return (
    <div className="flex flex-col h-full">
      <ConversationHeader />
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <MessageBubble
          content={"amsflkafklnflsd"}
          timestamp={""}
          isOutgoing={true}
          status={"read"}
        />

        {/* <div ref={messagesEndRef} /> */}
      </div>
      <MessageInput />
    </div>
  );
}
