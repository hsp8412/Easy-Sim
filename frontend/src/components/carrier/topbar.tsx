"use client";

import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {useState} from "react";

const TopNav = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleNameClicked = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="sticky top-0 z-999 flex justify-end py-3 px-8 w-full bg-white shadow-xl">
      <div
        className="px-5 py-2 text-2xl text-primary hover:underline cursor-pointer relative"
        onClick={handleNameClicked}
      >
        Bell
        <FontAwesomeIcon icon={faCaretDown} size="sm" className="ms-2" />
        {showDropdown && (
          <div className="absolute lg:right-0 bg-white rounded-lg shadow-primary shadow-lg border-[1px] border-neutral-600 mt-2">
            <Link
              href="/carrier/profile"
              className="px-5 py-2 text-xl text-primary hover:text-primaryDark cursor-pointer"
            >
              Profile
            </Link>
            <div className="border-t border-neutral-300 mx-2 mt-1"></div>
            <div
              className="px-5 py-2 text-xl text-red-600 hover:text-red-400 cursor-pointer"
              onClick={() => {}}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
