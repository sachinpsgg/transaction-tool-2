import React from 'react';

const Loader = () => {
  return (
    <div className="relative w-16 h-16 rounded-full" style={{ perspective: '800px' }}>
      <div className="absolute w-full h-full rounded-full">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-b-4 border-violet-800 animate-rotate-one"></div>
        <div className="absolute top-0 right-0 w-full h-full rounded-full border-r-4 border-violet-800 animate-rotate-two"></div>
        <div className="absolute bottom-0 right-0 w-full h-full rounded-full border-t-4 border-violet-800 animate-rotate-three"></div>
      </div>
    </div>
  );
};

export default Loader;
