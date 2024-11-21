"use client";
import {SelectDropDownItem} from "../common/selectDropdown";
import {useState} from "react";
import UserTypeSelection, {userTypeOptions} from "./userTypeSelection";
import CustomersTable from "./customersTable";
import CarriersTable from "./carriersTable";
import AdminsTable from "./adminsTable";
import MyButton from "../carrier/myButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";

const AdminUserCard = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<SelectDropDownItem>(
    userTypeOptions[0]
  );

  const handleNewUser = () => {
    router.push(`/admin/users/new`);
  };

  return (
    <div className="bg-white shadow-2xl w-full px-6 py-6 rounded-2xl">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <UserTypeSelection selected={selected} setSelected={setSelected} />
        </div>
        <div>
          <MyButton onClick={handleNewUser}>
            <FontAwesomeIcon icon={faUserPlus} />
            Add New Carrier/Admin
          </MyButton>
        </div>
      </div>
      {selected.value === "user" && <CustomersTable />}
      {selected.value === "carrier" && <CarriersTable />}
      {selected.value === "admin" && <AdminsTable />}
    </div>
  );
};

export default AdminUserCard;
