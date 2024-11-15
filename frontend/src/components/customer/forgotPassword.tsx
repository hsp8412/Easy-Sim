"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  // Step 1 - Email form
  const emailForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Placeholder for email submission logic (e.g., send recovery email)
        setEmail(values.email);
        setStep(2);
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  // Step 2 - Password reset form
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
        // Placeholder for password reset logic
        toast.success("Password reset successfully!");
        router.push("/login");
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  if (step === 1) {
    return (
      <form className="w-full" onSubmit={emailForm.handleSubmit}>
        <section className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-bold text-neutral-600"
          >
            Enter your email address
          </label>
          <input
            name="email"
            onChange={emailForm.handleChange}
            onBlur={emailForm.handleBlur}
            value={emailForm.values.email}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          {emailForm.touched.email && emailForm.errors.email && (
            <p className="text-red-600">{emailForm.errors.email}</p>
          )}
        </section>
        <section className="flex flex-col items-center">
          <button
            type="submit"
            disabled={emailForm.isSubmitting}
            className="flex items-center gap-2 text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center"
          >
            <div
              className={`${
                emailForm.isSubmitting && "animate-spin"
              } inline-block w-6 h-6 border-[4px] border-current border-t-transparent text-white rounded-full`}
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
            Send Recovery Link
          </button>
        </section>
      </form>
    );
  }

  if (step === 2) {
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
            <div
              className={`${
                passwordForm.isSubmitting && "animate-spin"
              } inline-block w-6 h-6 border-[4px] border-current border-t-transparent text-white rounded-full`}
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
            Reset Password
          </button>
        </section>
      </form>
    );
  }

  return null; // In case something goes wrong, fallback.
};

export default ForgotPassword;
