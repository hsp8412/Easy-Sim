"use client";

import {carriers} from "@/app/(carrier)/data";
import {Carrier} from "@/types/carrier";
import {useState} from "react";
import InputField from "../common/inputField";
import EditEmailForm from "./editEmailForm";
import PasswordResetForm from "./passwordResetForm";
import MyButton from "../carrier/myButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

type Props = {
  id: string;
};

const EditCarrierForm = ({id}: Props) => {
  const [carrier, setCarrier] = useState<Carrier | null>(carriers[0]);
  return (
    <div className="w-full">
      <div className="grid grid-cols-2">
        <div>
          <p className="font-bold text-neutral-700">Name</p>
          <InputField
            id={"name"}
            width={"200px"}
            type={"text"}
            name={"name"}
            handleChange={() => {}}
            handleBlur={() => {}}
            value={carrier?.name || ""}
            disabled
          />
        </div>
        <div>
          <p className="font-bold text-neutral-700">Role</p>
          <InputField
            id={"role"}
            width={"200px"}
            type={"text"}
            name={"role"}
            handleChange={() => {}}
            handleBlur={() => {}}
            value={"Carrier"}
            disabled
          />
        </div>
      </div>
      <EditEmailForm role={"carrier"} initialValue={carrier?.email} />
      <PasswordResetForm role={"carrier"} />
      <div className="mt-5">
        <MyButton red>
          <FontAwesomeIcon icon={faTrash} />
          Delete Carrier
        </MyButton>
      </div>
    </div>
  );
};

export default EditCarrierForm;
