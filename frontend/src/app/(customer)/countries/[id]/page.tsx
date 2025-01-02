import {ProductDisplayProvider} from "@/app/contexts/productListingContext";
import Filter from "@/components/customer/filter";
import FilterOffcanvas from "@/components/customer/filterOffcanvas";
import ProductList from "@/components/customer/productList";
import ProductsSorting from "@/components/customer/productsSorting";
import dbConnect from "@/lib/mongodb";
import carrier from "@/models/carrier";
import country, {CountryDocument} from "@/models/country";
import product, {ProductDocument} from "@/models/product";
import {Country} from "@/types/country";
import {ProductFromServer} from "@/types/product";
import Image from "next/image";
import {redirect} from "next/navigation";
import "../../../../models/carrier";

type Props = {
  params: Promise<{id: string}>;
};

const CountryPage = async ({params}: Props) => {
  const {id} = await params;
  let currentCountry = {} as Country;
  let products = [] as ProductFromServer[];

  try {
    await dbConnect();
    const countryData = await country.findById(id).lean<CountryDocument>();
    if (!countryData) {
      redirect("/countries");
    }
    currentCountry = {
      _id: countryData._id.toString(),
      name: countryData.name,
      iso: countryData.ISO,
      image: countryData.image,
      flag: countryData.flag,
    };

    const productsData = await product
      .find({
        countryId: id,
      })
      .populate({path: "carrierId", select: "-password"})
      .lean<any>();
    console.log(productsData);
    console.log(123);
    products = productsData.map((product: any) => {
      return {
        _id: product._id.toString(),
        carrierId:
          "_id" in product.carrierId ? product.carrierId._id.toString() : "",
        carrierEmail:
          "email" in product.carrierId ? product.carrierId.email : "",
        carrierLogo:
          "logoUrl" in product.carrierId ? product.carrierId.logoUrl : "",
        carrierName: "name" in product.carrierId ? product.carrierId.name : "",
        countryId: product.countryId.toString(),
        duration: product.duration,
        speed: product.speed,
        size: product.size,
        price: product.price,
        identityVerification: product.identityVerification,
        topUp: product.topUp,
        country: product.country,
        createdDate: product.createdDate,
        status: product.status,
      };
    });
  } catch (e: any) {
    console.error("Error fetching country:", e);
  }

  return (
    <ProductDisplayProvider allProducts={products} country={currentCountry}>
      <div className="grid grid-cols-4 mx-4 sm:mx-8 gap-x-5">
        <div id="filter-container" className="hidden xl:block col-span-1">
          <Filter allProducts={products} />
        </div>
        <div id="products-container" className="col-span-4 xl:col-span-3">
          <div id="header" className="mb-5">
            <div
              className="relative bg-cover bg-center bg-opacity-50 rounded-2xl"
              style={{backgroundImage: `url(${currentCountry.image})`}}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
              <div className="relative z-[1] text-white text-center p-6">
                <Image
                  className="mx-auto w-28"
                  src={currentCountry.flag}
                  alt=""
                  width={1920}
                  height={1080}
                />
                <p className="mt-4 text-3xl font-bold">{currentCountry.name}</p>
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
      <FilterOffcanvas allProducts={products} />
    </ProductDisplayProvider>
  );
};

export default CountryPage;
