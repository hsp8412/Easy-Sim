import {useFormik} from "formik";
import InputField from "../common/inputField";
import SubmitButton from "../carrier/submitButton";
import {useState} from "react";
import * as Yup from "yup";
import {toast} from "react-toastify";

type Props = {
  initialValue?: string;
  role: "user" | "carrier";
  onSubmit?: (currentEmail: string, newEmail: string) => Promise<void>;
};

const EditEmailForm = ({initialValue, role, onSubmit}: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      currentEmail: initialValue || "",
      newEmail: "",
    },
    validationSchema: Yup.object({
      currentEmail: Yup.string().email("Invalid email").required("Required"),
      newEmail: Yup.string()
        .email("Invalid email")
        .required("Required")
        .notOneOf([Yup.ref("currentEmail")], "New email must be different"),
    }),
    onSubmit: async (values) => {
      try {
        setSubmitted(true);
        setError(null);
        if (onSubmit) {
          await onSubmit(values.currentEmail, values.newEmail);
          toast.success("Email updated successfully");
          formik.resetForm({
            values: {
              currentEmail: values.newEmail,
              newEmail: "",
            },
          });
        }
        setSubmitted(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update email");
        toast.error("Failed to update email");
        setSubmitted(false);
      }
    },
    enableReinitialize: true,
  });

  const {values, handleChange, handleSubmit, touched, errors, handleBlur} =
    formik;

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      <div>
        <p className="font-bold text-neutral-700">Current Email</p>
        <InputField
          id={"currentEmail"}
          width={"450px"}
          type={"email"}
          name={"currentEmail"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.currentEmail}
          disabled
        />
        {touched.currentEmail && errors.currentEmail && (
          <p className="text-red-500 text-sm">{errors.currentEmail}</p>
        )}
      </div>
      <div className="mt-2">
        <p className="font-bold text-neutral-700">New Email</p>
        <InputField
          id={"newEmail"}
          width={"450px"}
          type={"email"}
          name={"newEmail"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.newEmail}
        />
        {touched.newEmail && errors.newEmail && (
          <p className="text-red-500 text-sm">{errors.newEmail}</p>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <div className="mt-2">
        <SubmitButton submitted={submitted}>Update Email</SubmitButton>
      </div>
    </form>
  );
};

export default EditEmailForm;
