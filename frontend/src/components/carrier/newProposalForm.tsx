"use client";
import {useFormik} from "formik";
import * as Yup from "yup";
import SelectDropdown, {SelectDropDownItem} from "../common/selectDropdown";
import InputField from "../common/inputField";
import InputTextarea from "../common/inputTextarea";
import SubmitButton from "./submitButton";
import {useContext, useEffect, useState} from "react";
import {getAllCountries} from "@/services/countryService";
import {CarrierContext} from "@/app/contexts/carrierContext";
import {createProposal} from "@/services/proposalService";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const sizeInGBOptions: SelectDropDownItem[] = [
  {id: "1", label: "1 GB", value: 1},
  {id: "3", label: "3 GB", value: 3},
  {id: "5", label: "5 GB", value: 5},
  {id: "10", label: "10 GB", value: 10},
  {id: "15", label: "15 GB", value: 15},
  {id: "20", label: "20 GB", value: 20},
];

const durationInDaysOptions: SelectDropDownItem[] = [
  {id: "1", label: "1 Day", value: 1},
  {id: "3", label: "3 Days", value: 3},
  {id: "5", label: "5 Days", value: 5},
  {id: "7", label: "7 Days", value: 7},
  {id: "14", label: "14 Days", value: 14},
  {id: "30", label: "30 Days", value: 30},
];

const NewProposalForm = () => {
  const router = useRouter();
  const {carrier, loading: carrierLoading} = useContext(CarrierContext);
  const [selectedCountry, setSelectedCountry] = useState<SelectDropDownItem>({
    id: "1",
    label: "Select a country",
    value: "",
  });
  const [selectedSize, setSelectedSize] = useState<SelectDropDownItem>(
    sizeInGBOptions[0]
  );
  const [selectedDuration, setSelectedDuration] = useState<SelectDropDownItem>(
    durationInDaysOptions[0]
  );

  const [countryOptions, setCountryOptions] = useState<SelectDropDownItem[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const loadingOption = {id: "1", label: "Loading...", value: ""};

  useEffect(() => {
    const getCountries = async () => {
      const countries = await getAllCountries();
      const countryOptions: SelectDropDownItem[] = countries.map((country) => {
        return {
          id: country._id,
          label: country.name,
          value: country._id,
        };
      });
      setCountryOptions(countryOptions);
    };
    getCountries();
    setLoading(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      country: "",
      size: 1,
      duration: 1,
      price: 1,
      speed: "",
      extraInfo: "",
      identityVerification: false,
      topUp: false,
    },
    validationSchema: Yup.object({
      country: Yup.string()
        .min(1, "Country is required")
        .required("Country is required"),
      size: Yup.number().required("Size is required"),
      duration: Yup.number().required("Duration is required"),
      price: Yup.number()
        .min(1, "Price should be at least $1")
        .required("Price is required"),
      extraInfo: Yup.string(),
    }),
    onSubmit: async (values) => {
      if (carrierLoading) return;
      setSubmitted(true);
      try {
        await createProposal({
          carrierId: carrier?._id!,
          carrier: carrier?.name!,
          countryId: values.country,
          duration: values.duration,
          size: values.size,
          speed: values.speed,
          price: values.price,
          identityVerification: values.identityVerification,
          topUp: values.topUp,
          country: selectedCountry.label,
          extraInfo: values.extraInfo,
        });
      } catch (e: any) {
        console.log(e.response.data);
        toast.error(e.response.data);
        setSubmitted(false);
        return;
      }
      setSubmitted(false);
      toast.success("A new proposal has been created successfully.");
      router.push("/carrier/proposals");
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
            selected={loading ? loadingOption : selectedCountry}
            setSelected={(country: any) => {
              formik.setFieldValue("country", country.id);
              setSelectedCountry(country);
            }}
          />
          {touched.country && errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>
        <div className="">
          <p>Size</p>
          <SelectDropdown
            items={sizeInGBOptions}
            selected={selectedSize}
            setSelected={(size: any) => {
              formik.setFieldValue("size", size.value);
              setSelectedSize(size);
            }}
          />
          {touched.size && errors.size && (
            <p className="text-red-500 text-sm">{errors.size}</p>
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-2 mb-6">
        <div id="" className="">
          <p>Duration in days</p>
          <SelectDropdown
            items={durationInDaysOptions}
            selected={selectedDuration}
            setSelected={(duration: any) => {
              formik.setFieldValue("duration", duration.value);
              setSelectedDuration(duration);
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
      <div className="w-full grid grid-cols-2 mb-6">
        <div className="">
          <p>Speed</p>
          <InputField
            id={"speed"}
            width={"240px"}
            type={"text"}
            name={"speed"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.speed}
          />
          {touched.speed && errors.speed && (
            <p className="text-red-500 text-sm">{errors.speed}</p>
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-2 mb-6">
        <div className="flex items-center">
          <input
            id="identity-verification-checkbox"
            type="checkbox"
            value=""
            name="identityVerification"
            onChange={handleChange}
            onBlur={handleBlur}
            checked={values.identityVerification}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 "
          />
          <label
            htmlFor="identity-verification-checkbox"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            Identity Verification Required
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="top-up-checkbox"
            type="checkbox"
            value=""
            name="topUp"
            onChange={handleChange}
            onBlur={handleBlur}
            checked={values.topUp}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 "
          />
          <label
            htmlFor="top-up-checkbox"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            Top up
          </label>
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
        <SubmitButton submitted={submitted} />
      </div>
    </form>
  );
};

export default NewProposalForm;
