"use client";
import {useFormik} from "formik";
import * as Yup from "yup";
import {countries} from "@/app/(carrier)/data";
import SelectDropdown, {SelectDropDownItem} from "../common/selectDropdown";
import InputField from "../common/inputField";
import InputTextarea from "../common/inputTextarea";
import SubmitButton from "./submitButton";
import {useState} from "react";

const countryOptions: SelectDropDownItem[] = countries.map((country) => {
  return {
    id: country._id,
    label: country.name,
    value: country._id,
  };
});

const sizeInGBOptions: SelectDropDownItem[] = [
  {id: "1", label: "1 GB", value: 1},
  {id: "2", label: "2 GB", value: 2},
  {id: "3", label: "3 GB", value: 3},
  {id: "4", label: "4 GB", value: 4},
  {id: "5", label: "5 GB", value: 5},
];

const durationInDaysOptions: SelectDropDownItem[] = [
  {id: "1", label: "1 Day", value: 1},
  {id: "2", label: "2 Days", value: 2},
  {id: "3", label: "3 Days", value: 3},
  {id: "4", label: "4 Days", value: 4},
  {id: "5", label: "5 Days", value: 5},
];

const NewProposalForm = () => {
  const [selectedCountry, setSelectedCountry] = useState<SelectDropDownItem>(
    countryOptions[0]
  );
  const [selectedSize, setSelectedSize] = useState<SelectDropDownItem>(
    sizeInGBOptions[0]
  );
  const [selectedDuration, setSelectedDuration] = useState<SelectDropDownItem>(
    durationInDaysOptions[0]
  );
  const formik = useFormik({
    initialValues: {
      country: "",
      size: 1,
      duration: 1,
      price: 1,
      extraInfo: "",
    },
    validationSchema: Yup.object({
      country: Yup.string().required("Country is required"),
      size: Yup.number().required("Size is required"),
      duration: Yup.number().required("Duration is required"),
      price: Yup.number()
        .min(1, "Price should be at least $1")
        .required("Price is required"),
      extraInfo: Yup.string(),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const {values, errors, touched, handleChange, handleBlur, handleSubmit} =
    formik;

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="w-full grid grid-cols-2 mb-6">
        <div id="" className="">
          <p>Country</p>
          <SelectDropdown
            items={countryOptions}
            selected={selectedCountry}
            setSelected={setSelectedCountry}
            sideEffect={() => {
              formik.setFieldValue("country", selectedCountry.value);
            }}
          />
        </div>
        <div className="">
          <p>Size</p>
          <SelectDropdown
            items={sizeInGBOptions}
            selected={selectedSize}
            setSelected={setSelectedSize}
            sideEffect={() => {
              formik.setFieldValue("size", selectedSize.value);
            }}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 mb-6">
        <div id="" className="">
          <p>Duration in days</p>
          <SelectDropdown
            items={durationInDaysOptions}
            selected={selectedDuration}
            setSelected={setSelectedDuration}
            sideEffect={() => {
              formik.setFieldValue("duration", selectedDuration.value);
            }}
          />
        </div>
        <div className="">
          <p>Price</p>
          <InputField
            id={"price"}
            width={"240px"}
            type={"number"}
            name={"price"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.price}
          />
          {touched.price && errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Extra Information</p>
        <InputTextarea
          id={"extraInfo"}
          width={"800px"}
          height={"100px"}
          name={"extraInfo"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.extraInfo}
        />
      </div>
      <div className="mt-6">
        <SubmitButton submitted={false} />
      </div>
    </form>
  );
};

export default NewProposalForm;
