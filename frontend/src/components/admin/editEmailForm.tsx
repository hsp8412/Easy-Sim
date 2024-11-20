import {useFormik} from "formik";
import InputField from "../common/inputField";
import SubmitButton from "../carrier/submitButton";
import {useState} from "react";

type Props = {
  initialValue?: string;
  role: "user" | "carrier";
};

const EditEmailForm = ({initialValue, role}: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: initialValue || "",
    },
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
        <p className="font-bold text-neutral-700">Email</p>
        <InputField
          id={"email"}
          width={"450px"}
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
      <div className="mt-2">
        <SubmitButton submitted={submitted}>Update Email</SubmitButton>
      </div>
    </form>
  );
};

export default EditEmailForm;
