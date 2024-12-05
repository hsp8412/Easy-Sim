"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import * as Yup from "yup";
import {passwordResetRequets} from "@/services/authService";
import Spinner from "../common/Spinner";

const ForgotPassword = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

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
      setSubmitting(true);
      try {
        await passwordResetRequets(values.email);
        alert(
          "If the email exists in our system, a password reset link will be sent to your email."
        );
      } catch (error: any) {
        if (error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
      setSubmitting(false);
    },
  });

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
          <Spinner show={submitting} />
          Send Recovery Link
        </button>
      </section>
    </form>
  );
};

export default ForgotPassword;
