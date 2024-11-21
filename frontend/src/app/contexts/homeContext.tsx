"use client";
import {Country} from "@/types/country";
import {createContext, useState} from "react";

type Props = {
  children: React.ReactNode;
  countries: Country[];
};

type HomeContext = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  countries: Country[];
  filteredCountries: Country[];
  setFilteredCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const HomeContext = createContext<HomeContext>({
  searchQuery: "",
  setSearchQuery: () => {},
  countries: [],
  filteredCountries: [],
  setFilteredCountries: () => {},
  handleSearch: () => {},
});

export const HomeContextProvider = ({countries, children}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <HomeContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        countries,
        filteredCountries,
        setFilteredCountries,
        handleSearch,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
