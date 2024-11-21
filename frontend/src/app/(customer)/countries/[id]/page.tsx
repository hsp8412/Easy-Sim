import {ProductDisplayProvider} from "@/app/contexts/productListingContext";
import Filter from "@/components/customer/filter";
import FilterOffcanvas from "@/components/customer/filterOffcanvas";
import ProductList from "@/components/customer/productList";
import ProductsSorting from "@/components/customer/productsSorting";
import {Country} from "@/types/country";
import {ProductFromServer} from "@/types/product";

type Props = {
  params: Promise<{id: string}>;
};

const CountryPage = async ({params}: Props) => {
  const {id} = await params;

  const country: Country = await fetch(
    `${process.env.API_URL_SERVER}/api/country/get-countries-by-id/${id}`
  ).then((res) => res.json());

  const products: ProductFromServer[] = await fetch(
    `${process.env.API_URL_SERVER}/api/product/get-products-by-country-id/${id}`
  ).then((res) => res.json());

  return (
    <ProductDisplayProvider allProducts={products} country={country}>
      <div className="grid grid-cols-4 mx-8 gap-x-5">
        <div id="filter-container" className="hidden xl:block col-span-1">
          <Filter />
        </div>
        <div id="products-container" className="col-span-4 xl:col-span-3">
          <div id="header" className="mb-5">
            <div
              className="relative bg-cover bg-center bg-opacity-50 rounded-2xl"
              style={{backgroundImage: `url(${country.image})`}}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
              <div className="relative z-10 text-white text-center p-6">
                <img className="mx-auto w-28" src={country.flag} alt="" />
                <p className="mt-4 text-3xl font-bold">{country.name}</p>
              </div>
            </div>
          </div>
          <div className="my-3 flex justify-center xl:justify-end">
            <ProductsSorting />
          </div>
          <div id="products-list" className="">
            <ProductList />
          </div>
        </div>
      </div>
      <FilterOffcanvas />
    </ProductDisplayProvider>
  );
};

export default CountryPage;
