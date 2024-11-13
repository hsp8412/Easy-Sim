"use client";

import { UserContext } from "@/app/contexts/userContext";
import { useContext } from "react";
import Card from "./card";

const Profile = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

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
                  <input
                    className="border rounded-lg border-gray-700"
                    style={{ width: "100%" }}
                  />,
                  <h6 className="font-semibold text-sm text-left pt-3">
                    Update Email Address
                  </h6>,
                  <input
                    className="border rounded-lg border-gray-700"
                    style={{ width: "100%" }}
                  />,
                ],
                buttonText: "Update Email",
                onClick: () => {
                  alert("hi");
                },
              },
              {
                content: [
                  <h6 className="font-semibold text-sm text-left">
                    Current Password
                  </h6>,
                  <input
                    className="border rounded-lg border-gray-700"
                    style={{ width: "100%" }}
                  />,
                  <h6 className="font-semibold text-sm text-left pt-3">
                    New Password
                  </h6>,
                  <input
                    className="border rounded-lg border-gray-700"
                    style={{ width: "100%" }}
                  />,
                  <h6 className="font-semibold text-sm text-left pt-3">
                    Confirm Password
                  </h6>,
                  <input
                    className="border rounded-lg border-gray-700"
                    style={{ width: "100%" }}
                  />,
                ],
                buttonText: "Update Password",
                onClick: () => {
                  alert("hi");
                },
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
                title: "Another special title",
                content: ["Current plan here."],
                buttonText: "Request for Refund",
              },
              {
                content: ["Data statistics"],
              },
            ]}
          />
          <Card
            header="Previous Purchases"
            cdivs={[
              {
                title: "More treatments",
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
