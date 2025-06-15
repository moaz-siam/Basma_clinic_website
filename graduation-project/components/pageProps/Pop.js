// components/Popup.jsx
import React from "react";

export default function Popup({ isOpen , width = "100%" , children }) {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000B2]">
      <div className={`bg-white rounded-2xl p-[28px] relative shadow-lg animate-fadeIn`} style={{ width }}>
        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button> */}

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
