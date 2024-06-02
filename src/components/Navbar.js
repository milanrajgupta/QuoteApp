import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4  flex justify-between items-center">
      <div className="text-xl font-bold">
        <a href="/">Logo</a>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
        >
          <img
            src="https://via.placeholder.com/40"
            alt="User Profile"
            className="rounded-full w-10 h-10"
          />
          <IoIosArrowDown className="ml-2" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
            <a
              href="/dashboard"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Dashboard
            </a>
            <a
              href="/logout"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
