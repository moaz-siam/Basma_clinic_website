import React, { useEffect, useState } from "react";

function ToggleSwitch({ id, initialValue, onActive }) {
  const [isOn, setIsOn] = useState(false);

  // استلام القيمة من API مرة واحدة عند تحميل المكون
  useEffect(() => {
    setIsOn(initialValue == 1);
  }, [initialValue]);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    const valueToSend = newValue ? 1 : 0;
    onActive(id, valueToSend); // إرسال القيمة
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isOn}
        onChange={handleToggle}
      />
      <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2FD157] hover:peer-checked:bg-[#2FD157]"></div>
    </label>
  );
}

export default ToggleSwitch;
