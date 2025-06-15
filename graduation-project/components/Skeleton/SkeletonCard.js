export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-[16px] shadow-[0px_4px_25px_0px_#A1A1A11F] px-[40px] py-[25px] w-full flex flex-col items-start gap-[10px] relative">
      {/* ID */}
      <div className="h-[24px] w-[80px] bg-gray-200 rounded-[6px]" />

      {/* Doctor */}
      <div className="flex items-center gap-2 w-full">
        <div className="h-[20px] w-[20px] bg-gray-300 rounded-full" />
        <div className="h-[16px] w-[120px] bg-gray-200 rounded-[4px]" />
      </div>

      {/* Category */}
      <div className="flex items-center gap-2 w-full">
        <div className="h-[20px] w-[20px] bg-gray-300 rounded-full" />
        <div className="h-[16px] w-[160px] bg-gray-200 rounded-[4px]" />
      </div>

      {/* Percentage */}
      <div className="text-end w-full">
        <div className="h-[14px] w-[40px] bg-gray-200 rounded-[4px] ml-auto" />
      </div>

      {/* Progress bar */}
      <div className="bg-[#E0E6FF] w-full h-[5px] rounded-[8px] overflow-hidden">
        <div className="bg-gray-300 w-[50%] h-full rounded-[8px]" />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mt-2">
        <div className="h-[36px] w-[120px] bg-gray-200 rounded-[8px]" />
        <div className="h-[36px] w-[100px] bg-gray-100 rounded-[8px]" />
      </div>

      {/* Status badge */}
      <div className="absolute top-5 left-5 h-[30px] w-[100px] bg-gray-200 rounded-[8px]" />
    </div>
  );
};

export const SkeletonCardSwiper = () => {
  return (
    <div className="p-[16px] shadow-md rounded-2xl bg-gray-100 h-[320px] flex flex-col">
      <div className="w-full h-[175px] bg-gray-300 rounded-xl mb-[15px]" />
      <div className="h-[20px] bg-gray-300 rounded w-3/4 mb-[10px]" />
      <div className="h-[16px] bg-gray-200 rounded w-full mb-[15px]" />
      <div className="h-[16px] bg-gray-200 rounded w-1/2" />
    </div>
  );
};
