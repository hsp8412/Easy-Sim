"use client";
import {carriers, users} from "@/app/(carrier)/data";
import {Carrier} from "@/types/carrier";
import {User} from "@/types/user";
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

const EditUserInfoForm = ({id}: Props) => {
  const [user, setUser] = useState<User | null>(users[0]);

  return (
    <div className="">
      <div className="grid grid-cols-2">
        <div>
          <p className="font-bold text-neutral-700">Name</p>
          <InputField
            id={"name"}
            width={"450px"}
            type={"text"}
            name={"name"}
            handleChange={() => {}}
            handleBlur={() => {}}
            value={user?.firstName + " " + user?.lastName}
            disabled
          />
        </div>
        <div>
          <p className="font-bold text-neutral-700">Role</p>
          <InputField
            id={"role"}
            width={"450px"}
            type={"text"}
            name={"role"}
            handleChange={() => {}}
            handleBlur={() => {}}
            value={"User"}
            disabled
          />
        </div>
      </div>
      <EditEmailForm role={"user"} initialValue={user?.email} />
      <PasswordResetForm role={"user"} />
      <div className="mt-5">
        <MyButton red>
          <FontAwesomeIcon icon={faTrash} />
          Delete User
        </MyButton>
      </div>
    </div>
  );
};

export default EditUserInfoForm;
