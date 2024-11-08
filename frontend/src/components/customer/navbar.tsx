"use client";
import Image from "next/image";
import PrimaryButton from "./buttons/primaryButton";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import SecondaryButton from "./buttons/secondaryButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

const Navbar = () => {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleMediaChange = () => {
      if (mediaQuery.matches) {
        setExpand(false);
      }
    };

    handleMediaChange();
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const handleToggleNavbarItems = () => {
    setExpand(!expand);
  };

  const router = useRouter();
  const handleRedirect = (path: string) => {
    router.push(path);
  };

  const handleRedirectToLogin = () => {
    handleRedirect("/login");
  };

  const handleRedirectToSignUp = () => {
    handleRedirect("/sign-up");
  };

  return (
    <div className="bg-white h-[80px] w-full rounded-full shadow-xl px-6 lg:px-10 flex justify-between items-center font-lexend">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={130}
          height={60}
          className="cursor-pointer"
          onClick={() => handleRedirect("/")}
        />
      </div>
      <div
        className={`${
          expand ? "" : "hidden"
        } absolute top-28 left-0 lg:block lg:static px-6 lg:px-0 w-full lg:w-auto`}
      >
        <div className="grid bg-white lg:flex lg:justify-center lg:items-center rounded-2xl shadow-md lg:shadow-none py-3 lg:py-0">
          <Link
            href="/"
            className={`px-5 py-2 text-2xl ${
              usePathname() === "/" ? "font-bold text-primary" : ""
            } hover:text-primaryDark`}
          >
            Home
          </Link>
          <Link
            href="/countries"
            className={`px-5 py-2 text-2xl ${
              usePathname() === "/countries" ? "font-bold text-primary" : ""
            } hover:text-primaryDark`}
          >
            Countries
          </Link>
          <Link
            href="/contact"
            className={`px-5 py-2 text-2xl ${
              usePathname() === "/contact" ? "font-bold text-primary" : ""
            } hover:text-primaryDark`}
          >
            Contact Us
          </Link>
          <div className="px-5 py-2">
            <PrimaryButton
              onClick={handleRedirectToLogin}
              disabled={false}
              type="button"
            >
              Login
            </PrimaryButton>
          </div>
          <div className="px-5 py-2">
            <SecondaryButton
              onClick={handleRedirectToSignUp}
              disabled={false}
              type="button"
            >
              Register
            </SecondaryButton>
          </div>
        </div>
      </div>
      <div
        className="lg:hidden cursor-pointer text-neutral-600"
        onClick={handleToggleNavbarItems}
      >
        <FontAwesomeIcon icon={faBars} size="2xl" />
      </div>
    </div>
  );
};

export default Navbar;
