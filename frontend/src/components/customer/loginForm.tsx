"use client";
import { UserContext } from "@/app/contexts/userContext";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const LoginForm = () => {
  const router = useRouter();
  const { userLogin } = useContext(UserContext);

  const [submitted, setSubmitted] = useState(false);
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().max(255).required(),
      password: Yup.string().max(255).required(),
    }),
    onSubmit: async (values) => {
      setSubmitted(true);
      try {
        await userLogin({
          email: values.email,
          password: values.password,
        });
        router.push("/profile");
      } catch (error: any) {
        console.log(error);
        toast.error(error.response?.data || "An unexpected error occurred.");
      }
      setSubmitted(false);
    },
  });
  const { touched, errors, handleSubmit, handleChange, handleBlur, values } =
    form;

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {/*Email*/}
      <section className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-lg font-bold text-neutral-600"
        >
          Email address
        </label>
        <input
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {touched.email && errors.email && (
          <p className="text-red-600">{errors.email}</p>
        )}
      </section>
      {/*Password*/}
      <section className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-lg font-bold text-neutral-600"
        >
          Password
        </label>
        <input
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
        {touched.password && errors.password && (
          <p className="text-red-600">{errors.password}</p>
        )}
      </section>
      {/*Sign in button and forgot password link*/}
      <section className="flex flex-col items-center">
        {/*Forgot password link*/}
        <div className="mb-4 text-center">
          <a
            href="/forgotPassword"
            className="underline text-primary hover:text-primary-hover"
          >
            Forgot Password
          </a>
        </div>
        {/*Submit button*/}
        <button
          type="submit"
          disabled={submitted}
          className="flex items-center gap-2 text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center"
        >
          <div
            className={`${
              !submitted && "hidden"
            } animate-spin inline-block w-6 h-6 border-[4px] border-current border-t-transparent text-white rounded-full`}
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
          Sign in
        </button>
      </section>
    </form>
  );
};

export default LoginForm;
