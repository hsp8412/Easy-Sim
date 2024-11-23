import CountriesContextProvider from "@/app/contexts/countriesContext";
import CountriesHeader from "@/components/customer/countriesHeader";
import CountriesList from "@/components/customer/countriesList";
import {Country} from "@/types/country";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default async function Home() {
  const countries: Country[] = await fetch(
    `${process.env.API_URL_SERVER}/api/country/get-all-countries`
  ).then((res) => res.json());
  return (
    <CountriesContextProvider countries={countries}>
      <CountriesHeader />
      <div className="mt-0 text-center pt-[20px] px-4 sm:px-8">
        <div className="text-lg font-bold flex items-center justify-center md:justify-start gap-2">
          <FontAwesomeIcon icon={faGlobe} className="text-3xl text-red-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
            All Countries
          </span>
        </div>

        {/* Horizontal Black Line */}
        <hr className="mt-2 border-0 border-t-2 border-neutral-400 mx-auto my-5" />
      </div>
      <div className="px-4 sm:px-8">
        <CountriesList countries={countries} sortByName />
      </div>
    </CountriesContextProvider>
  );
}
