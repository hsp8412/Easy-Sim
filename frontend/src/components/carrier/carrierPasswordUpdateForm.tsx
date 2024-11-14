import {Carrier} from "@/types/carrier";
import {useFormik} from "formik";
import InputField from "../common/inputField";
import SubmitButton from "./submitButton";
import {useState} from "react";

type Props = {
  carrier: Carrier;
};

const CarrierPasswordUpdateForm = ({carrier}: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const {handleSubmit, handleChange, values, errors, handleBlur, touched} =
    formik;
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="currentPassword"
          className="block mb-2 text-lg font-bold text-neutral-600"
        >
          Current password
        </label>
        <InputField
          id={"current-password"}
          width={"500px"}
          type={"password"}
          name={"currentPassword"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.currentPassword}
        />
        {touched.currentPassword && errors.currentPassword && (
          <p className="text-red-500 text-sm">{errors.currentPassword}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="currentPassword"
          className="block mb-2 text-lg font-bold text-neutral-600"
        >
          New Password
        </label>
        <InputField
          id={"new-password"}
          width={"500px"}
          type={"password"}
          name={"newPassword"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.newPassword}
        />
        {touched.newPassword && errors.newPassword && (
          <p className="text-red-500 text-sm">{errors.newPassword}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-lg font-bold text-neutral-600"
        >
          Confirm Password
        </label>
        <InputField
          id={"confirm-password"}
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
      <div className="mb-6">
        <SubmitButton submitted={submitted}>Update Password</SubmitButton>
      </div>
    </form>
  );
};

export default CarrierPasswordUpdateForm;
