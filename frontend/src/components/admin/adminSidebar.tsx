"use client";
import {
  faFileSignature,
  faGears,
  faHome,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

const AdminSidebar = () => {
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
            href={"/admin"}
            className={`${
              pathname == "/admin" ? "bg-primaryDark" : "bg-primary"
            }  hover:bg-primaryDark w-full h-[60px] flex justify-start items-center text-white font-extrabold text-2xl px-4 gap-3 cursor-pointer`}
          >
            <FontAwesomeIcon icon={faHome} size="lg" />
            Home
          </Link>
          <Link
            href={"/admin/proposals"}
            className={`${
              pathname.startsWith("/admin/proposals")
                ? "bg-primaryDark"
                : "bg-primary"
            }  hover:bg-primaryDark w-full h-[60px] flex justify-start items-center text-white font-extrabold text-2xl px-4 gap-3 cursor-pointer`}
          >
            <FontAwesomeIcon icon={faFileSignature} size="lg" />
            Proposals
          </Link>
          <Link
            href={"/admin/users"}
            className={`${
              pathname.startsWith("/admin/users")
                ? "bg-primaryDark"
                : "bg-primary"
            }  hover:bg-primaryDark w-full h-[60px] flex justify-start items-center text-white font-extrabold text-2xl px-4 gap-3 cursor-pointer`}
          >
            <FontAwesomeIcon icon={faUserGroup} size="lg" />
            Users
          </Link>
          <Link
            href={"/admin/settings"}
            className={`${
              pathname == "/admin/settings" ? "bg-primaryDark" : "bg-primary"
            }  hover:bg-primaryDark w-full h-[60px] flex justify-start items-center text-white font-extrabold text-2xl px-4 gap-3 cursor-pointer`}
          >
            <FontAwesomeIcon icon={faGears} size="lg" />
            Settings
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
