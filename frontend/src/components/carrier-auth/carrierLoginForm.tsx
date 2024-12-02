import {useFormik} from "formik";
import * as Yup from "yup";
import {useState} from "react";
import {adminLogin, carrierLogin} from "@/services/authService";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const CarrierLoginForm = () => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      loginAsAdmin: false,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().max(255).required(),
      password: Yup.string().max(255).required(),
    }),
    onSubmit: async ({email, password, loginAsAdmin}) => {
      console.log({email, password, loginAsAdmin});
      if (loginAsAdmin) {
        setSubmitted(true);
        try {
          await adminLogin({email, password});
          router.push("/admin");
        } catch (error) {
          toast.error("Invalid email or password");
        }
        setSubmitted(false);
      } else {
        setSubmitted(true);
        try {
          await carrierLogin({email, password});
          router.push("/carrier");
        } catch (error) {
          toast.error("Invalid email or password");
        }
        setSubmitted(false);
      }
    },
  });

  const {touched, errors, handleSubmit, handleChange, handleBlur, values} =
    form;

  return (
    <form onSubmit={handleSubmit} className="z-10 w-full px-32">
      <h1 className="text-4xl text-neutral-600 font-bold text-center mb-10">
        Login
      </h1>
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
      <section>
        <div className="flex items-center mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            name="loginAsAdmin"
            onChange={handleChange}
            onBlur={handleBlur}
            checked={values.loginAsAdmin}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 "
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            Login as admin
          </label>
        </div>
      </section>
      <div className="flex flex-col justify-center items-center">
        <button
          type="submit"
          className="bg-neutral-600 hover:bg-neutral-500 py-2.5 px-4 rounded-lg text-white text-xl cursor-pointer flex items-center gap-2"
        >
          <div
            className={`${
              !submitted && "hidden"
            } animate-spin inline-block w-5 h-5 border-[4px] border-current border-t-transparent text-white rounded-full`}
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
          Login
        </button>
      </div>
    </form>
  );
};

export default CarrierLoginForm;
