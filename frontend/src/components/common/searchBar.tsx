import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
  searchText: string;
  handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const SearchBar = ({searchText, handleSearchTextChange}: Props) => {
  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-neutral-500"
      />
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchTextChange}
        className="text-sm px-5 py-3 pl-10 sm:text-base rounded-xl border-0 w-72 mt-0 shadow-md text-black transition-all duration-300 ease-in-out"
      />
    </div>
  );
};

export default SearchBar;
