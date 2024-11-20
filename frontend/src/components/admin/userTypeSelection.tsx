import {useState} from "react";
import SelectDropdown, {SelectDropDownItem} from "../common/selectDropdown";

export const userTypeOptions: SelectDropDownItem[] = [
  {
    id: "0",
    label: "User",
    value: "user",
  },
  {
    id: "1",
    label: "Carrier",
    value: "carrier",
  },
  {
    id: "2",
    label: "Admin",
    value: "admin",
  },
];

type Props = {
  selected: SelectDropDownItem;
  setSelected: React.Dispatch<React.SetStateAction<SelectDropDownItem>>;
};

const UserTypeSelection = ({selected, setSelected}: Props) => {
  return (
    <>
      <h1 className="font-bold text-md text-neutral-600 mb-1">User Type</h1>
      <SelectDropdown
        items={userTypeOptions}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export default UserTypeSelection;
