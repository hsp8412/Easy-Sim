"use client";

import { UserContext } from "@/app/contexts/userContext";
import { useContext, useEffect, useState } from "react";
import Card from "./card";
import { useRouter } from "next/navigation";
import { getCountryByID } from "@/services/countryService";
import OrderList from "./orderList";
import { OrderDisplayProvider } from "@/app/contexts/orderListingContext";
import FilterOffcanvas from "./filterOffcanvas";
import MyModal from "../common/myModal";
import {
  RefundDisplayContext,
  RefundDisplayProvider,
} from "@/app/contexts/refundContext";
import RefundCard from "./refundCard";

const Profile = () => {
  const {
    user,
    currOrder,
    prevOrders,
    loading,
    userUpdateEmail,
    userUpdatePassword,
    userDeleteAccount,
    userGetCurrentOrder,
    userGetPrevOrders,
  } = useContext(UserContext);
  const refund = useContext(RefundDisplayContext);

  const router = useRouter();

  const [formData, setFormData] = useState({
    currentEmail: "",
    updatedEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    currentEmail: "",
    updatedEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    userGetCurrentOrder();
    userGetPrevOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleEmailUpdate = async () => {
    // Reset errors
    const newErrors = {
      currentEmail: "",
      updatedEmail: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.currentEmail) {
      newErrors.currentEmail = "Current email is required";
    }
    if (!formData.updatedEmail) {
      newErrors.updatedEmail = "New email is required";
    }

    if (newErrors.currentEmail || newErrors.updatedEmail) {
      setErrors(newErrors);
      return;
    }

    userUpdateEmail(formData.currentEmail, formData.updatedEmail);
  };

  const handlePasswordUpdate = async () => {
    const newErrors = {
      currentEmail: "",
      updatedEmail: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (
      newErrors.currentPassword ||
      newErrors.newPassword ||
      newErrors.confirmPassword
    ) {
      setErrors(newErrors);
      return;
    }

    userUpdatePassword(formData.currentPassword, formData.newPassword);
  };

  const handleDeleteAccount = async () => {
    const del = await userDeleteAccount();
    if (del) {
      router.push("/");
    }
  };

  const handleRefundClick = () => {
    if (currOrder && currOrder[0]) {
      refund.setSelectedOrder(currOrder[0]);
      refund.setOpenModal(true);
    }
  };

  const handleCurrentOrder = () => {
    if (currOrder !== null) {
      if (currOrder[0] === undefined) {
        return (
          <Card
            header="Current Data Plan"
            cdivs={[
              {
                content: ["No purchase history."],
              },
            ]}
          />
        );
      } else {
        return (
          <Card
            header="Current Data Plan"
            cdivs={[
              {
                content: [
                  <div className="flex justify-center items-center">
                    <img
                      src={currOrder[0]?.flag}
                      alt="flag"
                      className="h-8 rounded-lg border-black border"
                    />
                  </div>,
                  <div className="mt-3">
                    <p className="flex font-bold justify-center text-md text-white-700">{`${currOrder[0]?.country} - ${currOrder[0]?.planSize} GB by`}</p>
                  </div>,
                  <div className="flex mt-3 justify-center items-center">
                    <img
                      src={currOrder[0]?.carrierLogo}
                      alt="logo"
                      className="h-8 rounded-sm"
                    />
                  </div>,
                ],
                buttonText: "Request for Refund",
                onClick: handleRefundClick,
              },
              {
                content: [
                  "Data Left (in GB)",
                  <div className="flex items-center space-x-2">
                    <div className="text-center w-10">0</div>
                    <div className="flex-grow h-9 border-2 border-black rounded-lg bg-[#00A2FF]"></div>
                    <div className="text-center w-10">{`${currOrder[0].planSize}`}</div>
                  </div>,
                  "Days Left",
                  <div className="flex items-center space-x-2">
                    <div className="text-center w-10">0</div>
                    <div className="flex-grow h-9 border-2 border-black rounded-lg bg-[#00A2FF]"></div>
                    <div className="text-center w-10">{`${currOrder[0].duration}`}</div>
                  </div>,
                ],
              },
            ]}
          />
        );
      }
    }
  };

  const handlePreviousOrders = () => {
    if (prevOrders !== null) {
      if (prevOrders[0] !== undefined) {
        return (
          <OrderDisplayProvider allOrders={prevOrders}>
            <Card
              header="Previous Data Plans"
              cdivs={[
                {
                  content: [
                    <div id="order-list" className="border-black border-2">
                      <OrderList orders={prevOrders} />
                    </div>,
                    <FilterOffcanvas />,
                  ],
                },
              ]}
            />
          </OrderDisplayProvider>
        );
      } else {
        return (
          <Card
            header="Previous Data Plans"
            cdivs={[{ content: ["No purchase history."] }]}
          />
        );
      }
    } else {
      return (
        <Card
          header="Previous Data Plans"
          cdivs={[{ content: ["No purchase history."] }]}
        />
      );
    }
  };

  return (
    <>
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-center gap-4">
          {/* Each card takes up 1/3 of the container width on medium screens and above */}
          <Card
            header={`Hi, ${user?.firstName} ${user?.lastName}`}
            cdivs={[
              {
                content: [
                  <h6 className="font-semibold text-sm text-left">
                    Current Email Address
                  </h6>,
                  <div className="flex flex-col">
                    <input
                      name="currentEmail"
                      className={`border rounded-lg border-gray-700 ${
                        errors.currentEmail ? "border-red-500" : ""
                      }`}
                      style={{ width: "100%" }}
                      type="email"
                      id="currentEmail"
                      value={formData.currentEmail}
                      onChange={handleInputChange}
                    />
                    {errors.currentEmail && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.currentEmail}
                      </span>
                    )}
                  </div>,
                  <h6 className="font-semibold text-sm text-left pt-3">
                    Update Email Address
                  </h6>,
                  <div className="flex flex-col">
                    <input
                      name="updatedEmail"
                      className={`border rounded-lg border-gray-700 ${
                        errors.updatedEmail ? "border-red-500" : ""
                      }`}
                      style={{ width: "100%" }}
                      type="email"
                      id="updatedEmail"
                      value={formData.updatedEmail}
                      onChange={handleInputChange}
                    />
                    {errors.updatedEmail && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.updatedEmail}
                      </span>
                    )}
                  </div>,
                ],
                buttonText: "Update Email",
                onClick: handleEmailUpdate,
              },
              {
                content: [
                  <h6 className="font-semibold text-sm text-left">
                    Current Password
                  </h6>,
                  <div className="flex flex-col">
                    <input
                      type="password"
                      className={`border rounded-lg border-gray-700 ${
                        errors.currentPassword ? "border-red-500" : ""
                      }`}
                      style={{ width: "100%" }}
                      id="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                    />
                    {errors.currentPassword && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.currentPassword}
                      </span>
                    )}
                  </div>,
                  <h6 className="font-semibold text-sm text-left pt-3">
                    New Password
                  </h6>,
                  <div className="flex flex-col">
                    <input
                      type="password"
                      className={`border rounded-lg border-gray-700 ${
                        errors.newPassword ? "border-red-500" : ""
                      }`}
                      style={{ width: "100%" }}
                      id="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                    {errors.newPassword && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.newPassword}
                      </span>
                    )}
                  </div>,
                  <h6 className="font-semibold text-sm text-left pt-3">
                    Confirm Password
                  </h6>,
                  <div className="flex flex-col">
                    <input
                      type="password"
                      className={`border rounded-lg border-gray-700 ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                      style={{ width: "100%" }}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>,
                ],
                buttonText: "Update Password",
                onClick: handlePasswordUpdate,
              },
              {
                content: [
                  <button
                    className="bg-transparent text-red-600 font-semibold py-1 px-4 rounded-full hover:bg-red-600 hover:text-white"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>,
                ],
              },
            ]}
          />
          {handleCurrentOrder()}
          {handlePreviousOrders()}
        </div>
      </div>
    </>
  );
};

export default Profile;
