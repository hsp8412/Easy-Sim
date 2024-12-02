import MyButton from "@/components/carrier/myButton";
import ProductInfoCard from "@/components/carrier/productInfoCard";
import ProductOrdersCard from "@/components/carrier/productOrdersCard";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  params: Promise<{id: string}>;
};

export default async function productDetailPage({params}: Props) {
  const {id} = await params;

  return (
    <div className="h-full w-full flex flex-col justify-start items-start px-8 py-8 pb-[100px] mb-10">
      <h1 className="font-bold text-4xl text-neutral-600">Product Detail</h1>
      <Link href={"/carrier/products"} className="mt-5">
        <MyButton>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          Back
        </MyButton>
      </Link>
      <div className="mt-6 w-full">
        <ProductInfoCard productId={id} />
      </div>
      <div className="mt-6 w-full">
        <ProductOrdersCard productId={id} />
      </div>
    </div>
  );
}
