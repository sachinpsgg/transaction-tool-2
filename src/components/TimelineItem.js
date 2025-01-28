// import React from 'react';
// import { SheetIcon } from '../helpers/Icons';
//
// export const TimelineItem = ({ status, details, date, statusColor, isLast, extra, isJson, isFile }) => {
//   const parseHtmlTable = (html) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
//     const rows = Array.from(doc.querySelectorAll('tr'));
//     console.log(isJson, isFile);
//     return (
//       <table className="w-full border-collapse border border-gray-300 text-left text-[12px]">
//         <thead className="bg-gray-100">
//           {rows.slice(0, 1).map((row, index) => (
//             <tr key={index}>
//               {Array.from(row.children).map((th, i) => (
//                 <th key={i} className="border border-gray-300 px-4 py-2 text-xs font-medium ">
//                   {th.textContent}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {rows.slice(1).map((row, index) => (
//             <tr key={index}>
//               {Array.from(row.children).map((td, i) => (
//                 <td key={i} className="border border-gray-300 px-4 py-2">
//                   {td.textContent}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   };
//
//   return (
//     <div className="flex items-start mb-6 relative">
//       <div className="flex flex-col items-center">
//         <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-[#4B4B4B]`}>
//           <SheetIcon statusColor={statusColor} />
//         </div>
//         {!isLast && <div className="h-full w-px bg-gray-300 absolute top-8 left-4 z-0"></div>}
//       </div>
//       <div className="ml-4">
//         <div className={`font-bold text-sm ${status !== 'SUCCESS' ? 'text-[#FF0F00]' : 'text-green-700'}`}>
//           {status}
//         </div>
//         <div className="text-gray-800 text-xs">{details}</div>
//         <div className="text-gray-600 text-xs">{date}</div>
//         {extra && <div className="mt-2">{parseHtmlTable(extra)}</div>}
//       </div>
//     </div>
//   );
// };

import { SheetIcon } from '../helpers/Icons';

export const TimelineItem = ({ status, details, date, statusColor, isLast, extra }) => {
  const parseHtmlTable = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rows = Array.from(doc.querySelectorAll('tr'));
    return (
      <table className="w-full border-collapse border border-gray-300 text-left text-[12px]">
        <thead className="bg-gray-100">
          {rows.slice(0, 1).map((row, index) => (
            <tr key={index}>
              {Array.from(row.children).map((th, i) => (
                <th key={i} className="border border-gray-300 px-4 py-2 text-xs font-medium">
                  {th.textContent}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.slice(1).map((row, index) => (
            <tr key={index}>
              {Array.from(row.children).map((td, i) => (
                <td key={i} className="border border-gray-300 px-4 py-2">
                  {td.textContent}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex items-start mb-6 relative">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-[#4B4B4B]`}>
          <SheetIcon statusColor={statusColor} />
        </div>
        {!isLast && <div className="h-full w-px bg-gray-300 absolute top-8 left-4 z-0"></div>}
      </div>
      <div className="ml-4">
        <div className={`font-bold text-sm ${status !== 'SUCCESS' ? 'text-[#FF0F00]' : 'text-green-700'}`}>
          {status}
        </div>
        <div className="text-gray-800 text-xs">{details}</div>
        <div className="text-gray-600 text-xs">{date}</div>
        {extra && <div className="mt-2">{parseHtmlTable(extra)}</div>}
      </div>
    </div>
  );
};
