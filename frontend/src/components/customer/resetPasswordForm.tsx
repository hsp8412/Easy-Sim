"use client";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import * as Yup from "yup";
import Spinner from "../common/Spinner";
import {useState} from "react";
import {resetPasswordWithToken} from "@/services/authService";

type Props = {
  token: string;
};

const ResetPasswordForm = ({token}: Props) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const passwordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await resetPasswordWithToken(token, values.password);
        toast.success("Password reset successfully!");
        router.push("/login");
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  return (
    <form className="w-full" onSubmit={passwordForm.handleSubmit}>
      <section className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-lg font-bold text-neutral-600"
        >
          New Password
        </label>
        <input
          name="password"
          onChange={passwordForm.handleChange}
          onBlur={passwordForm.handleBlur}
          value={passwordForm.values.password}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {passwordForm.touched.password && passwordForm.errors.password && (
          <p className="text-red-600">{passwordForm.errors.password}</p>
        )}
      </section>
      <section className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-lg font-bold text-neutral-600"
        >
          Confirm Password
        </label>
        <input
          name="confirmPassword"
          onChange={passwordForm.handleChange}
          onBlur={passwordForm.handleBlur}
          value={passwordForm.values.confirmPassword}
          type="password"
          id="confirmPassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {passwordForm.touched.confirmPassword &&
          passwordForm.errors.confirmPassword && (
            <p className="text-red-600">
              {passwordForm.errors.confirmPassword}
            </p>
          )}
      </section>
      <section className="flex flex-col items-center">
        <button
          type="submit"
          disabled={passwordForm.isSubmitting}
          className="flex items-center gap-2 text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center"
        >
          <Spinner show={submitting} />
          Reset Password
        </button>
      </section>
    </form>
  );
};

export default ResetPasswordForm;
