import React, { useState } from 'react';
import BasicMenu from './tempComps/Menus';

const ProfileCard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative w-11/12 mx-auto bg-[#6E39CB] text-white p-2 rounded-lg">
      <div className="flex items-center">
        <img src={require('../assets/img_1.png')} alt="User profile picture" className="rounded-full w-8 h-8" />
        <div className="ml-2">
          <div className="text-[12px]">Demo user</div>
          <div className="text-[10px]">user@demo.com</div>
        </div>
        <BasicMenu />
        {/*<button className="ml-auto relative bottom-3 focus:outline-none" onClick={toggleMenu}>*/}
        {/*  <ThreeDot />*/}
        {/*</button>*/}
      </div>
      {/*{isMenuOpen && (*/}
      {/*  <div className="absolute right-2 top-10 bg-red-900 text-gray-700 rounded-lg shadow-lg z-50 w-36">*/}
      {/*    <ul className="py-2">*/}
      {/*      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => alert('Edit Profile clicked')}>*/}
      {/*        Edit Profile*/}
      {/*      </li>*/}
      {/*      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => alert('Settings clicked')}>*/}
      {/*        Settings*/}
      {/*      </li>*/}
      {/*      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => alert('Logout clicked')}>*/}
      {/*        Logout*/}
      {/*      </li>*/}
      {/*    </ul>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default ProfileCard;
