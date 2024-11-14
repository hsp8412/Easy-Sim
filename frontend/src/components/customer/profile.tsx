"use client";

import { UserContext } from "@/app/contexts/userContext";
import { useContext, useState } from "react";
import Card from "./card";

const Profile = () => {
  const { user, loading, userUpdateEmail, userUpdatePassword } =
    useContext(UserContext);

  const [formData, setFormData] = useState({
    currentEmail: "",
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    currentEmail: "",
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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

  const handleEmailUpdate = () => {
    // Reset errors
    const newErrors = {
      currentEmail: "",
      newEmail: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.currentEmail) {
      newErrors.currentEmail = "Current email is required";
    }
    if (!formData.newEmail) {
      newErrors.newEmail = "New email is required";
    }

    if (newErrors.currentEmail || newErrors.newEmail) {
      setErrors(newErrors);
      return;
    }

    userUpdateEmail(formData.currentEmail, formData.newEmail);
  };

  const handlePasswordUpdate = () => {
    const newErrors = {
      currentEmail: "",
      newEmail: "",
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

  return (
    <>
      <div className="container mx-auto text-center">
        <div className="flex flex-row justify-center gap-4">
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
                      className={`border rounded-lg border-gray-700 ${
                        errors.currentEmail ? "border-red-500" : ""
                      }`}
                      style={{ width: "100%" }}
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
                      className={`border rounded-lg border-gray-700 ${
                        errors.newEmail ? "border-red-500" : ""
                      }`}
                      style={{ width: "100%" }}
                      id="newEmail"
                      value={formData.newEmail}
                      onChange={handleInputChange}
                    />
                    {errors.newEmail && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.newEmail}
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
                  <button className="bg-transparent text-red-600 font-semibold py-1 px-4 rounded-full hover:bg-red-600 hover:text-white">
                    Delete Account
                  </button>,
                ],
              },
            ]}
          />
          <Card
            header="Current Data Plan"
            cdivs={[
              {
                content: [
                  "Country flag.",
                  "Country name - plan limit by",
                  "Carrier logo",
                ],
                buttonText: "Request for Refund",
                onClick: () => null,
              },
              {
                content: [
                  "Data Left (in GB)",
                  <div className="grid grid-cols-6 gap-2 pb-3">
                    <div className="content-center">0</div>
                    <div className="box-border h-9 w-100% p-4 border-2 border-black rounded-lg col-span-4"></div>
                    <div className="content-center">limit</div>
                  </div>,
                  "Days Left",
                  <div className="grid grid-cols-6 gap-2">
                    <div className="content-center">0</div>
                    <div className="box-border h-9 w-100% p-4 border-2 border-black rounded-lg col-span-4"></div>
                    <div className="content-center">limit</div>
                  </div>,
                ],
              },
            ]}
          />
          <Card
            header="Previous Purchases"
            cdivs={[
              {
                content: ["To have previous purchase plans."],
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
