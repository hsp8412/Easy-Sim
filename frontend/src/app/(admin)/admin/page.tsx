import {
  faFileSignature,
  faGear,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="h-full w-full flex justify-center items-center bg-neutral-100">
      <div className="h-[500px] flex flex-col justify-center items-center gap-10">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="rounded-xl"
        />
        <h1 className="text-4xl font-bold text-neutral-600">
          Easy Sim Admin Console
        </h1>
        <div className="flex justify-center items-center gap-10">
          <Link
            href="/admin/proposals"
            className="w-[250px] h-[220px] flex flex-col justify-center items-center shadow-lg hover:shadow-2xl bg-white rounded-xl gap-5 cursor-pointer transition-shadow duration-300 ease-in"
          >
            <FontAwesomeIcon
              icon={faFileSignature}
              size="5x"
              className="text-primary"
            />
            <h2 className="text-2xl font-bold text-neutral-600">Proposals</h2>
          </Link>
          <Link
            href={"/admin/users"}
            className="w-[250px] h-[220px] flex flex-col justify-center items-center shadow-lg hover:shadow-2xl bg-white rounded-xl gap-5 cursor-pointer transition-shadow duration-300 ease-in"
          >
            <FontAwesomeIcon
              icon={faUserGroup}
              size="5x"
              className="text-primary"
            />
            <h2 className="text-2xl font-bold text-neutral-600">
              Users Management
            </h2>
          </Link>
          <Link
            href={"/admin/settings"}
            className="w-[250px] h-[220px] flex flex-col justify-center items-center shadow-lg hover:shadow-2xl bg-white rounded-xl gap-5 cursor-pointer transition-shadow duration-300 ease-in"
          >
            <FontAwesomeIcon icon={faGear} size="5x" className="text-primary" />
            <h2 className="text-2xl font-bold text-neutral-600">Settings</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
