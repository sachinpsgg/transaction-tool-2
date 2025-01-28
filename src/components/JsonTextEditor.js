import React, { useEffect, useState } from 'react';
import { DownArrow, UpArrow } from '../helpers/Icons';

export const JsonTextEditor = ({ jsonData }) => {
  console.log(jsonData);
  const [searchTerm, setSearchTerm] = useState('');
  const [occurrences, setOccurrences] = useState([]);
  const [currentOccurrence, setCurrentOccurrence] = useState(0);
  console.log(jsonData);
  const jsonString = JSON.stringify(jsonData, null, 2);

  useEffect(() => {
    if (searchTerm) {
      const matches = [];
      const jsonString = JSON.stringify(jsonData, null, 2);
      const regex = new RegExp(searchTerm, 'gi');
      let match;

      while ((match = regex.exec(jsonString)) !== null) {
        matches.push(match.index);
      }

      setOccurrences(matches);
      setCurrentOccurrence(0);
    } else {
      setOccurrences([]);
      setCurrentOccurrence(0);
    }
  }, [searchTerm, jsonData]);

  const getHighlightedJson = () => {
    const lines = jsonString.split('\n');
    return lines
      .map((line, lineIndex) => {
        const lineNumber = `<span style="color: gray;">${lineIndex + 1}</span> `;
        if (searchTerm) {
          const regex = new RegExp(searchTerm, 'gi');
          const highlightedLine = line.replace(regex, (match) => `<mark>${match}</mark>`);
          return `${lineNumber}${highlightedLine}`;
        }
        return `${lineNumber}${line}`;
      })
      .join('\n');
  };
  const handleNext = () => {
    setCurrentOccurrence((prev) => (prev + 1) % occurrences.length);
  };

  const handlePrev = () => {
    setCurrentOccurrence((prev) => (prev === 0 ? occurrences.length - 1 : prev - 1));
  };

  return (
    <div className="whitespace-pre-wrap">
      <div className="h-screen overflow-y-auto">
        <div
          className="font-mono italic"
          dangerouslySetInnerHTML={{
            __html: getHighlightedJson(),
          }}
        />
      </div>
      <div className="flex items-center gap-4 bg-[#555555] p-2 w-full z-50">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Find in JSON"
          className="bg-gray-100 text-gray-700 w-56 h-6 rounded outline-none"
        />
        <div className="flex justify-center items-center gap-4">
          <UpArrow onClick={handlePrev} />
          <DownArrow onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};
