import HomeSearchBar from "./homeSearchBar";

const HomeHeader = () => {
  return (
    <div
      style={{
        background: "url('/triangles_home.png')",
      }}
      className="bg-center bg-cover bg-no-repeat py-8 md:py-10 px-4 rounded-2xl text-center text-white font-bold mx-4 sm:mx-8"
    >
      <div className="text-3xl lg:text-4xl xl:text-5xl mb-6">Easy SIM</div>
      <div className="text-xl lg:text-2xl xl:text-3xl font-light">
        Stay Connected While Travelling Abroad Like Never Before!
      </div>
      <HomeSearchBar />
    </div>
  );
};

export default HomeHeader;
