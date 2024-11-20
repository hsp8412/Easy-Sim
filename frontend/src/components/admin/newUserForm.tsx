"use client";

import {useState} from "react";
import SelectDropdown from "../common/selectDropdown";
import {useFormik} from "formik";
import * as Yup from "yup";
import InputField from "../common/inputField";
import SubmitButton from "../carrier/submitButton";

const UserTypeOptions = [
  {
    id: "0",
    label: "Carrier",
    value: "carrier",
  },
  {
    id: "1",
    label: "Admin",
    value: "admin",
  },
];

const NewUserForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [userType, setUserType] = useState(UserTypeOptions[0]);
  const formik = useFormik({
    initialValues: {
      carrierName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const {values, handleChange, handleSubmit, touched, errors, handleBlur} =
    formik;
  return (
    <form onSubmit={handleSubmit}>
      <p className="font-bold text-neutral-700">User Type</p>
      <SelectDropdown
        items={UserTypeOptions}
        selected={userType}
        setSelected={setUserType}
      />
      {userType.value === "carrier" && (
        <div className="mt-5">
          <p className="font-bold text-neutral-700">Carrier Name</p>
          <InputField
            id={"carrierName"}
            width={"500px"}
            type={"text"}
            name={"carrierName"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.carrierName}
          />
          {touched.carrierName && errors.carrierName && (
            <p className="text-red-500 text-sm">{errors.carrierName}</p>
          )}
        </div>
      )}
      {userType.value === "admin" && (
        <div className="flex justify-between mt-5">
          <div className="">
            <p className="font-bold text-neutral-700">First Name</p>
            <InputField
              id={"firstName"}
              width={"500px"}
              type={"text"}
              name={"firstName"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div className="">
            <p className="font-bold text-neutral-700">Last Name</p>
            <InputField
              id={"lastName"}
              width={"500px"}
              type={"text"}
              name={"lastName"}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>
      )}
      <div className="mt-5">
        <p className="font-bold text-neutral-700">Email</p>
        <InputField
          id={"email"}
          width={"500px"}
          type={"email"}
          name={"email"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.email}
        />
        {touched.email && errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>
      <div className="mt-5">
        <p className="font-bold text-neutral-700">Password</p>
        <InputField
          id={"password"}
          width={"500px"}
          type={"password"}
          name={"password"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.password}
        />
        {touched.password && errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>
      <div className="mt-5">
        <p className="font-bold text-neutral-700">Confirm Password</p>
        <InputField
          id={"confirmPassword"}
          width={"500px"}
          type={"password"}
          name={"confirmPassword"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.confirmPassword}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>
      <div className="mt-5">
        <SubmitButton submitted={submitted} />
      </div>
    </form>
  );
};

export default NewUserForm;
