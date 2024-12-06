import Spinner from "@/components/common/Spinner";
import {updateMyPassword} from "@/services/authService";
import {useFormik} from "formik";
import {useState} from "react";
import {toast} from "react-toastify";
import * as Yup from "yup";

const UpdatePasswordForm = () => {
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
        .required("Please enter your password again"),
    }),
    onSubmit: async ({currentPassword, newPassword}) => {
      setSubmitted(true);
      try {
        await updateMyPassword({currentPassword, newPassword});
        toast.success("Password updated successfully");
      } catch (e: any) {
        toast.error(e.response.data || "Error updating password");
      }
      setSubmitted(false);
    },
  });
  const {errors, touched, values, handleChange, handleBlur, handleSubmit} =
    formik;
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <h6 className="font-semibold text-sm text-left">Current Password</h6>
        <input
          type="password"
          className={`border rounded-lg border-gray-700 px-2 py-1 ${
            errors.currentPassword ? "border-red-500" : ""
          }`}
          id="currentPassword"
          value={values.currentPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.currentPassword && errors.currentPassword && (
          <span className="text-red-500 text-xs text-left mt-1">
            {errors.currentPassword}
          </span>
        )}
      </div>
      <div className="flex flex-col mt-2">
        <h6 className="font-semibold text-sm text-left">New Password</h6>
        <input
          type="password"
          className={`border rounded-lg border-gray-700 px-2 py-1 ${
            errors.newPassword ? "border-red-500" : ""
          }`}
          id="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.newPassword && errors.newPassword && (
          <span className="text-red-500 text-xs text-left mt-1">
            {errors.newPassword}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-2">
        <h6 className="font-semibold text-sm text-left">Confirm Password</h6>
        <input
          type="password"
          className={`border rounded-lg border-gray-700 px-2 py-1 ${
            errors.confirmPassword ? "border-red-500" : ""
          }`}
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <span className="text-red-500 text-xs text-left mt-1">
            {errors.confirmPassword}
          </span>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="flex justify-center items-center gap-2 mt-2 bg-primary hover:bg-primaryDark transition-all duration-300 ease-in text-white font-semibold py-1 px-4 rounded-full"
        >
          <Spinner show={submitted} />
          Update Password
        </button>
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
