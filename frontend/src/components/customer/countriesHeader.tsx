import CountriesSearchBar from "./countriesSearchBar";

const CountriesHeader = () => {
  return (
    <div
      style={{
        background: "url('/triangles_countries.png')",
      }}
      className="bg-center bg-cover bg-no-repeat py-8 md:py-10 px-4 rounded-2xl text-center text-white font-bold mx-4 sm:mx-8"
    >
      <div className="text-3xl lg:text-4xl xl:text-5xl mb-6">
        Your Next Destination
      </div>
      <div className="text-xl lg:text-2xl xl:text-3xl font-light">
        Any Country That Comes to Mind, We&apos;re Probably There Waiting For
        You!
      </div>
      <CountriesSearchBar />
    </div>
  );
};

export default CountriesHeader;
