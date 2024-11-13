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
                content:
                  "With supporting text below as a natural lead-in to additional content.",
                buttonText: "Go somewhere",
              },
              {
                content:
                  "With supporting text below as a natural lead-in to additional content.",
                buttonText: "Go somewhere",
              },
            ]}
          />
          <Card
            cdivs={[
              {
                title: "Another special title",
                content: "Additional text here for another card.",
                buttonText: "Learn more",
              },
            ]}
          />
          <Card
            cdivs={[
              {
                title: "More treatments",
                content: "This card has different supporting text.",
                buttonText: "Discover",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
