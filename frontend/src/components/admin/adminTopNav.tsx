"use client";

import {adminLogout} from "@/services/authService";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "react-toastify";

const AdminTopNav = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleNameClicked = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    try {
      await adminLogout();
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (e: any) {
      toast.error(e.response.data || "An error occurred while logging out");
      console.log(e);
    }
  };
  return (
    <div className="sticky top-0 z-999 flex justify-end py-3 px-8 w-full bg-white shadow-xl">
      <div
        className="px-5 py-2 text-2xl text-primary hover:underline cursor-pointer relative"
        onClick={handleNameClicked}
      >
        Admin
        <FontAwesomeIcon icon={faCaretDown} size="sm" className="ms-2" />
        {showDropdown && (
          <div className="absolute lg:right-0 bg-white rounded-lg shadow-primary shadow-lg border-[1px] border-neutral-600 mt-2">
            <div
              className="px-5 py-2 text-xl text-red-600 hover:text-red-400 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopNav;
