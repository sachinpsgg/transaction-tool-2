import React from 'react';

const DataField = ({ label, value, labelClass = '', valueClass = '' }) => {
  console.log(valueClass);
  return (
    <div className="flex flex-col gap-1">
      <p className={`text-[#3A3541] text-[14px] font-normal leading-[16.8px] ${labelClass}`}>{label}</p>
      <p className={` text-[#2C2B2D] text-[14px] font-semibold leading-[19.2px] ${valueClass}`}>{value}</p>
    </div>
  );
};

export default DataField;
