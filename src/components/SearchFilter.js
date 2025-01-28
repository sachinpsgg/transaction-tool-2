import React from 'react';
import { format } from 'date-fns';
import DatePickerInput from './tempComps/DatepickerMui';

const SearchFilter = ({ filters, onChange, onApply, onKeyDown }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md relative">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Date Received</label>
          <DatePickerInput
            className="w-80"
            value={filters.date || ''}
            onChange={(date) => {
              const formattedDate = date ? format(new Date(date), 'yyyy-MM-dd') : null;
              onChange('date', date);
            }}
            name="dateOfService"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Status</label>
          <select
            className="w-full p-2 border"
            value={filters.status}
            onChange={(e) => onChange('status', e.target.value)}>
            <option value="">Select Status</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
      <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded" onClick={onApply}>
        Apply
      </button>
    </div>
  );
};

export default SearchFilter;
