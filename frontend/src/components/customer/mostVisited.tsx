import {Country} from "@/types/country";
import Link from "next/link";

type Props = {
  countries: Country[];
};
const MostVisited = ({countries}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {countries.map(({name, flag, _id}) => (
        <div key={_id} className="flex items-center justify-center">
          <Link href={`/countries/${_id}`}>
            <div className="flex flex-row sm:flex-col justify-start sm:justify-center items-center gap-5 bg-white w-[300px] h-[70px] sm:h-[155px] rounded shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in pl-5 sm:px-0">
              <img
                src={flag}
                alt={`${name}-flag`}
                className="shadow w-20 sm:h-10 sm:w-auto"
              />
              <div className="font-semibold text-xl sm:text-2xl md:text-3xl text-neutral-600">
                {name}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MostVisited;
