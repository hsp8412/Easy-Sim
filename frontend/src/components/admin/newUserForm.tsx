"use client";

import {useState} from "react";
import SelectDropdown from "../common/selectDropdown";
import {useFormik} from "formik";
import * as Yup from "yup";
import InputField from "../common/inputField";
import SubmitButton from "../carrier/submitButton";
import ImageUpload from "../common/imageUpload";
import {carrier} from "@/app/(carrier)/data";
import {set} from "lodash";
import {createNewCarrier} from "@/services/carrierService";
import {toast} from "react-toastify";
import {createNewAdmin} from "@/services/adminService";

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
  const [logo, setLogo] = useState<string | undefined>(undefined);
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const [logoError, setLogoError] = useState<string>();
  const formik = useFormik({
    initialValues: {
      carrierName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm Password is required"),
      carrierName: Yup.string().when("userType", (userType: any, schema) => {
        return userType.value === "carrier"
          ? schema
              .min(3, "Carrier name must be at least 3 characters")
              .max(50, "Carrier name must be at most 50 characters")
              .required("Carrier name is required")
          : schema.notRequired();
      }),
      firstName: Yup.string().when("userType", (userType: any, schema) => {
        return userType.value === "admin"
          ? schema
              .min(2, "First name must be at least 2 characters")
              .max(30, "First name must be at most 30 characters")
              .required("First name is required")
          : schema.notRequired();
      }),
      lastName: Yup.string().when("userType", (userType: any, schema) => {
        return userType.value === "admin"
          ? schema
              .min(2, "Last name must be at least 2 characters")
              .max(30, "Last name must be at most 30 characters")
              .required("Last name is required")
          : schema.notRequired();
      }),
    }),
    onSubmit: async (values) => {
      setSubmitted(true);
      if (userType.value === "carrier") {
        if (!logoFile) {
          setLogoError("Please upload a logo");
          setSubmitted(false);
          return;
        }
        try {
          await createNewCarrier({
            logo: logoFile,
            name: values.carrierName,
            email: values.email,
            password: values.password,
          });
          toast.success("Carrier created successfully");
          setSubmitted(false);
        } catch (e) {
          console.log(e);
          toast.error("Failed to create carrier");
        }
      } else {
        try {
          await createNewAdmin({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          });
          toast.success("Admin created successfully");
          setSubmitted(false);
        } catch (e) {
          console.log(e);
          toast.error("Failed to create admin");
        }
      }
    },
  });
  const {values, handleChange, handleSubmit, touched, errors, handleBlur} =
    formik;

  const handleImageUpload = (image: File | undefined) => {
    if (image) {
      setLogo(URL.createObjectURL(image));
      setLogoFile(image);
    }
  };

  const handleImageRemove = () => {
    setLogo(undefined);
    setLogoFile(undefined);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-start items-start gap-10"
    >
      <div>
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
          <div className="flex justify-between gap-5 mt-5">
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
      </div>
      {userType.value === "carrier" && (
        <div className="border rounded-lg shadow p-7">
          <ImageUpload
            buttonText={"Upload Logo"}
            errorText={logoError}
            loading={submitted}
            defaultUrl={logo}
            handleImageChange={handleImageUpload}
            handleImageRemove={handleImageRemove}
          />
        </div>
      )}
    </form>
  );
};

export default NewUserForm;
