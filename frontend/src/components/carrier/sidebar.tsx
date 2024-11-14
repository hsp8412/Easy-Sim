"use client";
import {
  faFileSignature,
  faHome,
  faSackDollar,
  faSimCard,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-[280px] h-screen bg-primary shadow-lg py-6 font-lexend">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={40}
          className="rounded-xl"
        />
        <div className="h-1 w-[80%] bg-white mt-6" />
        <ul className="list-none w-full mt-4">
          <Link
            href={"/carrier"}
            className={`${
              pathname == "/carrier" ? "bg-primaryDark" : "bg-primary"
            }  hover:bg-primaryDark w-full h-[60px] flex justify-start items-center text-white font-extrabold text-2xl px-4 gap-3 cursor-pointer`}
          >
            <FontAwesomeIcon icon={faHome} size="lg" />
            Home
          </Link>
          <Link
            href={"/carrier/proposals"}
            className={`${
              pathname.startsWith("/carrier/proposals")
                ? "bg-primaryDark"
                : "bg-primary"
            }  hover:bg-primaryDark w-full h-[60px] flex justify-start items-center text-white font-extrabold text-2xl px-4 gap-3 cursor-pointer`}
          >
            <FontAwesomeIcon icon={faFileSignature} size="lg" />
            Proposals
          </Link>
          <Link
            href={"/carrier/products"}
            className={`${
              pathname.startsWith("/carrier/products")
                ? "bg-primaryDark"
                : "bg-primary"
            }  hover:bg-primaryDark w-full h-[60px] flex justify-start items-center text-white font-extrabold text-2xl px-4 gap-[18px] cursor-pointer`}
          >
            <FontAwesomeIcon icon={faSimCard} size="xl" />
            Products
          </Link>
          <Link
            href={"/carrier/refunds"}
            className={`${
              pathname == "/carrier/refunds" ? "bg-primaryDark" : "bg-primary"
            }  hover:bg-primaryDark w-full h-[60px] flex justify-start items-center text-white font-extrabold text-2xl px-4 gap-3.5 cursor-pointer`}
          >
            <FontAwesomeIcon icon={faSackDollar} size="lg" />
            Refunds
          </Link>
          <Link
            href={"/carrier/profile"}
            className={`${
              pathname == "/carrier/profile" ? "bg-primaryDark" : "bg-primary"
            }  hover:bg-primaryDark w-full h-[60px] flex justify-start items-center text-white font-extrabold text-2xl px-4 gap-4 cursor-pointer`}
          >
            <FontAwesomeIcon icon={faUserTie} size="lg" />
            My Profile
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
