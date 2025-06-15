

export default function CheckboxGroup({ options, selected, onChange }) {
  

  const handleChange = (value) => {
    const updated = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-2 mt-[11px] filterAnim">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 text-[#9E9E9E]"
        >
          <input
            type="checkbox"
            checked={selected.includes(option.value)}
            onChange={() => handleChange(option.value)}
            className="hidden peer"
          />
          <div className="w-[18px] h-[18px] border-2 border-[#E0E0E0] rounded-[2px] flex justify-center items-center peer-checked:bg-Basic peer-checked:border-Basic peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:text-[14px]"></div>{" "}
          {option.label}
        </label>
      ))}
    </div>
  );
}