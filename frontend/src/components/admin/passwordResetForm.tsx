import {useFormik} from "formik";
import InputField from "../common/inputField";
import SubmitButton from "../carrier/submitButton";
import {useState} from "react";

type Props = {
  role: "user" | "carrier";
};

const PasswordResetForm = ({role}: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const {values, handleChange, handleSubmit, touched, errors, handleBlur} =
    formik;
  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div className="mt-2">
        <p className="font-bold text-neutral-700">Password</p>
        <InputField
          id={"password"}
          width={"450px"}
          type={"password"}
          name={"password"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.password}
        />
        {touched.password && errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>
      <div className="mt-2">
        <p className="font-bold text-neutral-700">Confirm Password</p>
        <InputField
          id={"confirmPassword"}
          width={"450px"}
          type={"password"}
          name={"confirmPassword"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.confirmPassword}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>
      <div className="mt-2">
        <SubmitButton submitted={submitted}>Update Password</SubmitButton>
      </div>
    </form>
  );
};

export default PasswordResetForm;
