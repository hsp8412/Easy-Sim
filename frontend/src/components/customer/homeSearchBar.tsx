"use client";
import {useContext} from "react";
import SearchBar from "./searchBar";
import {HomeContext} from "@/app/contexts/homeContext";

const HomeSearchBar = () => {
  const {searchQuery, handleSearch, filteredCountries} =
    useContext(HomeContext);
  return (
    <SearchBar
      searchQuery={searchQuery}
      handleSearch={handleSearch}
      filteredCountries={filteredCountries}
    />
  );
};

export default HomeSearchBar;
