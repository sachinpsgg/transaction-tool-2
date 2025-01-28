// import React, { forwardRef } from 'react';
//
// const Input = forwardRef(({ onChange, placeholder = 'Enter text', className = '', ...rest }, ref) => {
//   return (
//     <input
//       type="text"
//       placeholder={placeholder}
//       className={`bg-[#F4F5F9] outline-none inp shadow-none border border-[#DBDCDE] focus:outline-none rounded-lg px-3 py-2 h-11 w-full ${className}`}
//       ref={ref}
//       onChange={onChange}
//       {...rest}
//     />
//   );
// });
// Input.displayName = 'Input';
//
// export default Input;

import React, { forwardRef, useState } from 'react';
import { X } from 'lucide-react';

const Input = forwardRef(({ onChange, placeholder = 'Enter text', className = '', value, onClear, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative w-full`}>
      <input
        type="text"
        placeholder={placeholder}
        className={`bg-[#F4F5F9] outline-none inp shadow-none border border-[#DBDCDE] focus:outline-none rounded-lg px-3 py-2 h-11 w-full pr-10 ${className}`}
        ref={ref}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {value && (
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClear}>
          <X size={18} />
        </button>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
