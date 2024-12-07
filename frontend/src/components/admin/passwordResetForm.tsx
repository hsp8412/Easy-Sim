import {useFormik} from "formik";
import InputField from "../common/inputField";
import SubmitButton from "../carrier/submitButton";
import {useState} from "react";
import * as Yup from "yup";
import {toast} from "react-toastify";

type Props = {
  role: "user" | "carrier";
  onSubmit?: (currentPassword: string, newPassword: string) => Promise<void>;
};

const PasswordResetForm = ({role, onSubmit}: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(5, "Must be at least 5 characters")
        .required("New password is required")
        .notOneOf(
          [Yup.ref("currentPassword")],
          "New password must be different"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setSubmitted(true);
        setError(null);
        if (onSubmit) {
          await onSubmit(values.currentPassword, values.newPassword);
          toast.success("Password updated successfully");
          formik.resetForm();
        }
        setSubmitted(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update password"
        );
        toast.error("Failed to update password");
        setSubmitted(false);
      }
    },
  });

  const {values, handleChange, handleSubmit, touched, errors, handleBlur} =
    formik;

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="mt-2">
        <p className="font-bold text-neutral-700">Current Password</p>
        <InputField
          id={"currentPassword"}
          width={"450px"}
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
      <div className="mt-2">
        <p className="font-bold text-neutral-700">New Password</p>
        <InputField
          id={"newPassword"}
          width={"450px"}
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
      <div className="mt-2">
        <p className="font-bold text-neutral-700">Confirm New Password</p>
        <InputField
          id={"confirmPassword"}
          width={"450px"}
          type={"password"}
          name={"confirmPassword"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.confirmPassword}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <div className="mt-2">
        <SubmitButton submitted={submitted}>Update Password</SubmitButton>
      </div>
    </form>
  );
};

export default PasswordResetForm;
