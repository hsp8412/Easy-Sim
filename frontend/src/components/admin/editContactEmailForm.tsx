"use client";
import {useFormik} from "formik";
import * as Yup from "yup";
import InputField from "../common/inputField";
import SubmitButton from "../carrier/submitButton";
import {useState} from "react";

const EditContactEmailForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "easy-sim@gmail.com",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });
  const {values, handleChange, handleSubmit, touched, errors, handleBlur} =
    formik;
  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div>
        <p className="font-bold text-neutral-700">Contact Email</p>
        <InputField
          id={"email"}
          width={"450px"}
          type={"email"}
          name={"email"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.email}
        />
        <p className="text-gray-400 font-light text-sm">
          This is the email address where the messages from the contact page
          will be sent.
        </p>
        {touched.email && errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>
      <div className="mt-2">
        <SubmitButton submitted={submitted}>Update Contact Email</SubmitButton>
      </div>
    </form>
  );
};

export default EditContactEmailForm;
