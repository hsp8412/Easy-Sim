import {Carrier} from "@/types/carrier";
import {useFormik} from "formik";
import InputField from "../common/inputField";
import {useContext, useState} from "react";
import SubmitButton from "./submitButton";
import * as Yup from "yup";
import {CarrierContext} from "@/app/contexts/carrierContext";
import {updateMyEmail} from "@/services/carrierService";
import {toast} from "react-toastify";
import {set} from "lodash";

const CarrierEmailUpdateForm = () => {
  const {carrier, setCarrier} = useContext(CarrierContext);
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: carrier?.email || "Loading...",
      name: carrier?.name || "Loading...",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      if (!carrier) return;
      setSubmitted(true);
      try {
        await updateMyEmail(carrier.email, values.email);
        toast.success("Email updated successfully");
        const updatedCarrier: Carrier = {...carrier, email: values.email};
        setCarrier(updatedCarrier);
      } catch (e: any) {
        toast.error(e.response.data);
      }
      setSubmitted(false);
    },
    enableReinitialize: true,
  });
  const {handleSubmit, values, errors, touched, handleChange, handleBlur} =
    formik;

  if (!carrier) return <div>Loading...</div>;
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-lg font-bold text-neutral-600"
        >
          Name
        </label>
        <InputField
          id={"name"}
          width={"500px"}
          type={"text"}
          name={"name"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.name}
          disabled={true}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-lg font-bold text-neutral-600"
        >
          Email address
        </label>
        <InputField
          id={"email"}
          width={"500px"}
          type={"email"}
          name={"email"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.email}
        />
        {touched.email && errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>
      <div className="mb-6">
        <SubmitButton submitted={submitted}>Update Email</SubmitButton>
      </div>
    </form>
  );
};

export default CarrierEmailUpdateForm;
