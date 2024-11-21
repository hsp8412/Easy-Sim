import HomeHeader from "@/components/customer/homeHeader";
import HomeContextProvider from "../contexts/homeContext";
import {Country} from "@/types/country";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire} from "@fortawesome/free-solid-svg-icons";
import MostVisited from "@/components/customer/mostVisited";

export default async function Home() {
  const countries: Country[] = await fetch(
    `${process.env.API_URL_SERVER}/api/country/get-all-countries`
  ).then((res) => res.json());

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
        <MostVisited countries={countries} />
      </div>
      {/* New Section with Curved Divs */}
    </HomeContextProvider>
  );
}
