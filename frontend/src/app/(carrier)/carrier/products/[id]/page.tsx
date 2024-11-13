import {products} from "@/app/(carrier)/data";
import MyButton from "@/components/carrier/myButton";
import ProductInfoCard from "@/components/carrier/productInfoCard";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  params: Promise<{id: string}>;
};

export default async function productDetailPage({params}: Props) {
  const {id} = await params;

  const product = products[0];

  return (
    <div className="h-[calc(100vh-80px)] w-full flex flex-col justify-start items-start bg-neutral-100 px-8 py-8">
      <h1 className="font-bold text-4xl text-neutral-600">Product Detail</h1>
      <Link href={"/carrier/products"} className="mt-5">
        <MyButton>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          Back
        </MyButton>
      </Link>
      <div className="mt-6">
        <ProductInfoCard product={product} />
      </div>
    </div>
  );
}
