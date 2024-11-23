"use client";
import {CountriesContext} from "@/app/contexts/countriesContext";
import SearchBar from "./searchBar";
import {useContext} from "react";

const CountriesSearchBar = () => {
  const {searchQuery, handleSearch, filteredCountries} =
    useContext(CountriesContext);
  return (
    <SearchBar
      searchQuery={searchQuery}
      handleSearch={handleSearch}
      filteredCountries={filteredCountries}
    />
  );
};

export default CountriesSearchBar;
