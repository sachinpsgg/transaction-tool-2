import React from "react";

const Checkbox = () => {
  return (
    <>
      <div className="flex items-center mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" id="remember" className="hidden peer" />
          <span className="w-5 h-5 flex items-center justify-center border-2 border-gray-300 rounded peer-checked:bg-purple-600 peer-checked:border-purple-600 transition duration-300">
            <svg
              className="hidden w-4 h-4 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </span>
          <span className="text-secondary font-lato font-medium">
            Remember me
          </span>
        </label>
      </div>
    </>
  );
};

export default Checkbox;
