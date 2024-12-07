"use client";

import {useFormik} from "formik";
import * as Yup from "yup";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {toast} from "react-toastify";
import {sendContactEmail} from "@/services/contactService";
import {useState} from "react";
import Spinner from "../common/Spinner";

const ContactForm = () => {
  const {executeRecaptcha} = useGoogleReCaptcha();
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      helpRequest: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please enter your first name"),
      lastName: Yup.string().required("Please enter your last name"),
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Please enter a valid email address"),
      helpRequest: Yup.string().required("Please leave a message"),
    }),
    validateOnBlur: true,
    onSubmit: async ({firstName, lastName, email, helpRequest}) => {
      setSubmitted(true);
      if (!executeRecaptcha) {
        toast.error("Recaptcha not yet available. Please try again later.");
        setSubmitted(false);
        return;
      }

      let token;
      try {
        token = await executeRecaptcha("contact_form");
      } catch (e: any) {
        toast.error("Recaptcha error. Please try again later.");
        setSubmitted(false);
        return;
      }

      if (!token) {
        console.log("No token received");
        toast.error("Recaptcha error. Please try again later.");
        setSubmitted(false);
        return;
      }
      console.log(token);

      // Send the form data to the server
      try {
        await sendContactEmail({
          firstName,
          lastName,
          email,
          helpRequest,
          token,
        });
        toast.success("Message sent successfully. We will be in touch soon.");
      } catch (e: any) {
        if (e.response.data) {
          toast.error(`Error: ${e.response.data.message}`);
        } else {
          toast.error("Error sending message. Please try again later.");
        }
      }
      setSubmitted(false);
    },
  });

  const {handleSubmit, handleChange, handleBlur, values, errors, touched} =
    formik;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName" className="block text-lg font-bold mb-1">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
          onBlur={handleBlur}
          placeholder="Enter your first name..."
          className="w-full p-2 text-lg rounded-md border border-gray-300"
          required
        />
        {touched.firstName && errors.firstName && (
          <p className="text-red-600 mt-1">{errors.firstName}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="block text-lg font-bold mb-1">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
          onBlur={handleBlur}
          placeholder="Enter your last name..."
          className="w-full p-2 text-lg rounded-md border border-gray-300"
          required
        />
        {touched.lastName && errors.lastName && (
          <p className="text-red-600 mt-1">{errors.lastName}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-lg font-bold mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email}
          onBlur={handleBlur}
          placeholder="Enter your email..."
          className="w-full p-2 text-lg rounded-md border border-gray-300"
          required
        />
        {touched.email && errors.email && (
          <p className="text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="helpRequest" className="block text-lg font-bold mb-1">
          What Can We Help You With?
        </label>
        <textarea
          id="helpRequest"
          name="helpRequest"
          onChange={handleChange}
          value={values.helpRequest}
          onBlur={handleBlur}
          placeholder="Enter your help request..."
          className="w-full p-2 text-lg rounded-md border border-gray-300 h-36"
          required
        />
        {touched.helpRequest && errors.helpRequest && (
          <p className="text-red-600 mt-1">{errors.helpRequest}</p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={submitted}
          className="bg-primary text-white px-5 py-2 flex justify-center items-center gap-2 rounded-full text-lg hover:bg-primaryDark focus:outline-none"
        >
          <Spinner show={submitted} />
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
