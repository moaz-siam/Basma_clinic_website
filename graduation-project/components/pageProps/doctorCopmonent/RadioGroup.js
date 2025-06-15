export default function RadioGroup({ options, selected, onChange }) {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div className="flex flex-col gap-2 mt-[11px] filterAnim">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 text-[#9E9E9E] cursor-pointer"
        >
          <input
            type="radio"
            name="radio-group"
            className="peer hidden"
            onChange={() => handleChange(option.value)} 
            checked={selected === option.value} 
          />
          <div className="w-4 h-4 border-1 border-[#E0E0E0] rounded-full flex justify-center items-center peer-checked:bg-Basic  peer-checked:outline-1 peer-checked:outline-Basic"></div>
          {option.label}
        </label>
      ))}
    </div>
  );
}
