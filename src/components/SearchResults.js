// import React, { useMemo, useState } from 'react';
// import Pagination from '@mui/material/Pagination';
// import MenuListComposition from './tempComps/MUIFIlter';
//
// const SearchResults = ({ data, onViewItem }) => {
//   const [showFilter, setShowFilter] = useState(false);
//   const [filters, setFilters] = useState({ date: null, status: '', direction: '' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//
//   const handleFilterChange = (filterKey, value) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
//   };
//
//   const applyFilters = () => {
//     setShowFilter(false);
//     setCurrentPage(1);
//   };
//
//   const filteredData = useMemo(() => {
//     return Object.keys(data).filter((key) => {
//       const item = data[key];
//
//       if (filters.date && item.dos !== filters.date) return false;
//       if (filters.status && item.status !== filters.status) return false;
//       if (filters.direction && item.direction !== filters.direction) return false;
//
//       return true;
//     });
//   }, [data, filters]);
//
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//
//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredData.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredData, currentPage, itemsPerPage]);
//
//   const handlePageChange = (_, page) => {
//     setCurrentPage(page);
//   };
//
//   const handleItemsPerPageChange = (event) => {
//     setItemsPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   };
//
//   return (
//     <div className="relative p-2">
//       <div className="flex justify-between items-center z-20 py-4 relative">
//         <h1 className="text-2xl font-normal text-[#3A3541] -z-10">Search Results</h1>
//         <MenuListComposition filters={filters} onChange={handleFilterChange} onApply={applyFilters} />
//       </div>
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex justify-center items-center mt-4">
//           <Pagination
//             count={totalPages}
//             page={currentPage}
//             onChange={handlePageChange}
//             color="secondary"
//             sx={{
//               '& .MuiPaginationItem-root': {
//                 '&.Mui-selected': {
//                   backgroundColor: '#6E39CB',
//                 },
//               },
//             }}
//           />
//         </div>
//         <div>
//           <label htmlFor="rowsPerPage" className="mr-2 text-gray-700">
//             Show
//           </label>
//           <select
//             id="rowsPerPage"
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//             className="border-none bg-white text-gray-700  z-20 focus:outline-0 focus:border-none">
//             {[5, 10, 15, 20].map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="relative">
//         {paginatedData.map((key) => {
//           const item = data[key];
//           return (
//             <div key={key} className="bg-white py-4 px-4 rounded border mb-4 flex justify-start items-center">
//               <div className="grid grid-cols-6 gap-2 w-full">
//                 {[
//                   { label: 'Member ID', value: item.pat_member_id },
//                   { label: 'DOB', value: item.pat_dob },
//                   { label: 'DOS', value: item.dos },
//                   { label: 'Physician NPI', value: item.physicians_npi },
//                   { label: 'Patient Last Name', value: item.pat_lname },
//                   {
//                     label: 'Status',
//                     value: (
//                       <span
//                         className={`font-semibold ${item.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
//                         {item.status}
//                       </span>
//                     ),
//                   },
//                 ].map(({ label, value }, index) => (
//                   <div key={index} className="flex flex-col justify-start items-start">
//                     <p className="text-[#3A3541] text-md">{label}</p>
//                     <p className="font-semibold text-[#2C2B2D] text-md">{value}</p>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={() => onViewItem(item.id)}
//                 className="ml-4 px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50">
//                 View
//               </button>
//             </div>
//           );
//         })}
//         {paginatedData.length === 0 && <p className="text-gray-500 text-center mt-4">No results found.</p>}
//       </div>
//     </div>
//   );
// };
//
// export default SearchResults;

import React, { useMemo, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import MenuListComposition from './tempComps/MUIFIlter';

const SearchResults = ({ data, onViewItem }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ date: null, status: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const handleFilterChange = (filterKey, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
  };

  const applyFilters = () => {
    setShowFilter(false);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    const newDirection = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction: newDirection });
  };

  const sortedAndFilteredData = useMemo(() => {
    let filteredData = Object.keys(data).filter((key) => {
      const item = data[key];
      if (filters.date && item.dos !== filters.date) return false;
      if (filters.status && item.status !== filters.status) return false;
      if (filters.direction && item.direction !== filters.direction) return false;
      return true;
    });

    if (sortConfig.key) {
      filteredData.sort((aKey, bKey) => {
        const a = data[aKey][sortConfig.key];
        const b = data[bKey][sortConfig.key];

        if (a < b) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a > b) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filteredData;
  }, [data, filters, sortConfig]);

  const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredData, currentPage, itemsPerPage]);

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };
  console.log(data)
  return (
    <div className="relative p-2">
      <div className="flex justify-between items-center z-20 py-4 relative">
        <h1 className="text-2xl font-normal text-[#3A3541] -z-10">Search Results</h1>
        <MenuListComposition filters={filters} onChange={handleFilterChange} onApply={applyFilters} />
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-center items-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="secondary"
            sx={{
              '& .MuiPaginationItem-root': {
                '&.Mui-selected': {
                  backgroundColor: '#6E39CB',
                },
              },
            }}
          />
        </div>
        <div>
          <label htmlFor="rowsPerPage" className="mr-2 text-gray-700">
            Show
          </label>
          <select
            id="rowsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border-none bg-white text-gray-700 z-20 focus:outline-0 focus:border-none">
            {[5, 10, 15, 20].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="relative overflow-auto">
        <table className="table-auto w-full bg-white border-collapse border border-gray-300 rounded-xl">
          <thead>
            <tr className="bg-gray-100">
              {[
                { label: 'Member ID', key: 'pat_member_id' },
                { label: 'Date Received', key: 'claim_date_recieved' },
                { label: 'Pharmacy NPI', key: 'physicians_npi' },
                { label: 'Group Number', key: 'group_number' },
                { label: 'Status', key: 'status' },
                { label: 'Actions', key: '' },
              ].map(({ label, key }) => (
                <th
                  key={key || label}
                  className="text-left px-4 py-2 text-gray-700 cursor-pointer"
                  onClick={() => key && handleSort(key)}>
                  {label}
                  {key && (
                    <span className="ml-2 text-sm text-gray-500">
                      {sortConfig.key === key ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((key, index) => {
              const item = data[key];
              return (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-gray-700">{item.pat_member_id}</td>
                  <td className="px-4 py-2 text-gray-700">{item.claim_date_recieved}</td>
                  <td className="px-4 py-2 text-gray-700">{item.physicians_npi}</td>
                  <td className="px-4 py-2 text-gray-700">{item.group_number}</td>
                  <td className="px-4 py-2 text-gray-700">
                    <span className={`font-semibold ${item.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => onViewItem(item.id)}
                      className="px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50">
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {paginatedData.length === 0 && <p className="text-gray-500 text-center mt-4">No results found.</p>}
      </div>
    </div>
  );
};

export default SearchResults;
