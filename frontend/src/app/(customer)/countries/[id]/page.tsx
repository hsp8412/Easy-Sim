import {ProductDisplayProvider} from "@/app/contexts/productListingContext";
import Filter from "@/components/customer/filter";
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
        <div id="filter-container" className="col-span-1">
          <Filter />
        </div>
        <div id="products-container" className="col-span-3">
          <div id="header">
            <div
              className="relative bg-cover bg-center bg-opacity-50"
              style={{backgroundImage: `url(${country.image})`}}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative z-10 text-white p-6">
                <h1 className="text-4xl font-bold">Your Content Here</h1>
                <p className="mt-4">
                  This is an example of using an image with opacity as a
                  background.
                </p>
              </div>
            </div>
          </div>
          <div id="products-list"></div>
        </div>
      </div>
    </ProductDisplayProvider>
  );
};

export default CountryPage;
