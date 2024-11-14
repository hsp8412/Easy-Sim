import {Carrier} from "@/types/carrier";
import {useFormik} from "formik";
import InputField from "../common/inputField";
import {useState} from "react";
import SubmitButton from "./submitButton";

type Props = {
  carrier: Carrier;
};

const CarrierEmailUpdateForm = ({carrier}: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: carrier.email,
      name: carrier.name,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    enableReinitialize: true,
  });
  const {handleSubmit, values, errors, touched, handleChange, handleBlur} =
    formik;
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
