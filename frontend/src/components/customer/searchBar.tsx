import {Country} from "@/types/country";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/navigation";
import Image from "next/image";

type Props = {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredCountries: Country[];
};

const SearchBar = ({searchQuery, handleSearch, filteredCountries}: Props) => {
  const router = useRouter();
  const handleClickCountry = (_id: string) => {
    router.push(`/countries/${_id}`);
  };
  return (
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
          {filteredCountries.map(({name, flag, _id}, index) => (
            <div
              key={index}
              className="flex items-center px-2.5 py-2 cursor-pointer border-b border-gray-300 text-base text-black"
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "#fff";
              }}
              onClick={() => handleClickCountry(_id)}
            >
              <div className="w-8 h-5 mr-2.5 rounded-md overflow-hidden">
                <Image
                  src={flag}
                  alt={`${name}-flag`}
                  className="w-full h-full object-cover"
                  width={1920}
                  height={1080}
                />
              </div>
              <span>{name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
