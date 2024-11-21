"use client";

import {HomeContext} from "@/app/contexts/homeContext";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useContext} from "react";

const HomeHeader = () => {
  const {searchQuery, filteredCountries, handleSearch} =
    useContext(HomeContext);
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #00bcd4, #4caf50)",
      }}
      className="py-8 md:py-10 px-4 rounded-2xl text-center text-white font-bold mx-4 sm:mx-8"
    >
      <div className="text-3xl lg:text-4xl xl:text-5xl mb-6">Easy SIM</div>
      <div className="text-xl lg:text-2xl xl:text-3xl font-light">
        Stay Connected While Travelling Abroad Like Never Before!
      </div>

      <div className="mt-8 relative max-w-lg w-full mx-auto">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-neutral-500"
        />
        <input
          type="text"
          placeholder="Search over 130 countries..."
          value={searchQuery}
          onChange={handleSearch}
          className="text-sm px-5 py-3 pl-10 sm:text-base rounded-full border-0 w-full mt-0 shadow-md text-black transition-all duration-300 ease-in-out"
        />
        {searchQuery && filteredCountries.length > 0 && (
          <div className="absolute top-14 left-0 right-0 w-full bg-white rounded-lg shadow-md max-h-52 overflow-y-auto z-10 border border-gray-300">
            {filteredCountries.map(({name, flag}, index) => (
              <div
                key={index}
                className="flex items-center px-2.5 py-2 cursor-pointer border-b border-gray-300 text-base text-black"
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = "#fff";
                }}
              >
                <div className="w-8 h-5 mr-2.5 rounded-md overflow-hidden">
                  <img
                    src={flag}
                    alt={`${name}-flag`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
