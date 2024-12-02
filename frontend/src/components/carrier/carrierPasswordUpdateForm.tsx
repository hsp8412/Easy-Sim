import {useFormik} from "formik";
import InputField from "../common/inputField";
import SubmitButton from "./submitButton";
import {useContext, useState} from "react";
import {CarrierContext} from "@/app/contexts/carrierContext";
import * as Yup from "yup";
import {updateMyPassword} from "@/services/carrierService";
import {toast} from "react-toastify";

const CarrierPasswordUpdateForm = () => {
  const {carrier} = useContext(CarrierContext);
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string().required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async ({currentPassword, newPassword}, {resetForm}) => {
      setSubmitted(true);
      try {
        await updateMyPassword(currentPassword, newPassword);
        toast.success("Password updated successfully");
      } catch (e: any) {
        toast.error(e.response.data);
      }
      resetForm();
      setSubmitted(false);
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
