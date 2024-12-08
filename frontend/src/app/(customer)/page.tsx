import HomeHeader from "@/components/customer/homeHeader";
import HomeContextProvider from "../contexts/homeContext";
import {Country} from "@/types/country";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faFire,
  faLightbulb,
  faScroll,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import CountriesList from "@/components/customer/countriesList";
import HomeCards from "@/components/customer/homeCards";

export default async function Home() {
  let countries: Country[] = [];

  try {
    const response = await fetch(
      `${process.env.API_URL_SERVER}/api/country/get-all-countries`
    );

    if (!response.ok) {
      return <div>Error</div>;
    }

    countries = await response.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
  }

  return (
    <HomeContextProvider countries={countries}>
      <HomeHeader />
      {/* "Most Visited" Section Below the Gradient */}
      <div className="mt-0 text-center pt-[20px] px-4 sm:px-8">
        <div className="text-lg font-bold flex items-center justify-center md:justify-start gap-2">
          <FontAwesomeIcon icon={faFire} className="text-3xl text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Most Visited
          </span>
        </div>

        {/* Horizontal Black Line */}
        <hr className="mt-2 border-0 border-t-2 border-neutral-400 mx-auto my-5" />
      </div>
      <div className="px-4 sm:px-8">
        <CountriesList countries={countries} />
      </div>

      <div className="mt-5 text-center pt-[20px] px-4 sm:px-8">
        <div className="text-lg font-bold flex items-center justify-center md:justify-start gap-2">
          <FontAwesomeIcon
            icon={faLightbulb}
            className="text-3xl text-primary"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            How It Works
          </span>
        </div>
        <hr className="mt-2 border-0 border-t-2 border-neutral-400 mx-auto my-5" />
        <HomeCards />
      </div>
    </HomeContextProvider>
  );
}
