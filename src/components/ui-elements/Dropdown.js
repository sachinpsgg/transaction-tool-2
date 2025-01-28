import React, { useState } from 'react';

const SearchableDropdown = ({ label, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm('');
    setFilteredOptions(options);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = options.filter((option) => option.label.toLowerCase().includes(value));
    setFilteredOptions(filtered);
  };

  const handleOptionSelect = (option) => {
    setSearchTerm(option.label);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className="flex flex-col gap-2 col-span-1 relative">
      <label className="block text-[#3A3541] text-[14px]">{label}</label>
      <div
        className="w-full p-2 border rounded bg-[#F4F5F9] text-[#3A3541] cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}>
        <span>{searchTerm || 'Select an option'}</span>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-[#F4F5F9] rounded shadow-lg mt-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 outline-none"
          />
          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, i) => (
                <li
                  key={i}
                  onClick={() => handleOptionSelect(option)}
                  className="p-2 hover:bg-gray-100 text-[#3A3541] cursor-pointer">
                  {option.label}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
