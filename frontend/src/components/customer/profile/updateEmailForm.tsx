import SubmitButton from "@/components/carrier/submitButton";
import {useFormik} from "formik";
import * as Yup from "yup";

const UpdateEmailForm = () => {
  const formik = useFormik({
    initialValues: {
      currentEmail: "",
      updatedEmail: "",
    },
    validationSchema: Yup.object({
      currentEmail: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      updatedEmail: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const {errors, touched, values, handleChange, handleSubmit, handleBlur} =
    formik;
  return (
    <form>
      <div className="flex flex-col">
        <h6 className="font-semibold text-md text-left text-neutral-700">
          Current Email
        </h6>
        <input
          name="currentEmail"
          className={`border rounded-lg border-gray-700 py-1 px-2 ${
            errors.currentEmail ? "border-red-500" : ""
          }`}
          type="email"
          id="currentEmail"
          value={values.currentEmail}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.currentEmail && errors.currentEmail && (
          <span className="text-red-500 text-xs mt-1 text-left">
            {errors.currentEmail}
          </span>
        )}
      </div>
      <div className="flex flex-col mt-2">
        <h6 className="font-semibold text-md text-left">New Email</h6>
        <input
          name="updatedEmail"
          className={`border rounded-lg border-gray-700 py-1 px-2 ${
            errors.updatedEmail ? "border-red-500" : ""
          }`}
          type="email"
          id="updatedEmail"
          value={values.updatedEmail}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.updatedEmail && errors.updatedEmail && (
          <span className="text-red-500 text-xs text-start mt-1">
            {errors.updatedEmail}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="mt-2 bg-primary hover:bg-primaryDark transition-all duration-300 ease-in text-white font-semibold py-1 px-4 rounded-full"
      >
        Update Email
      </button>
    </form>
  );
};

export default UpdateEmailForm;
