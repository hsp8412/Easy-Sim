"use client";

import {UserContext} from "@/app/contexts/userContext";
import {useContext} from "react";
import ProfileCard from "./profile/profileCard";
import CurrentOrderCard from "./profile/currentOrderCard";
import PrevOrdersCard from "./profile/prevOrdersCard";
import {OrdersProvider} from "@/app/contexts/ordersContext";

const Profile = () => {
  const {loading} = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <OrdersProvider>
          <div className="flex justify-center">
            <ProfileCard />
          </div>
          <div className="flex justify-center">
            <CurrentOrderCard />
          </div>
          <div className="flex justify-center">
            <PrevOrdersCard />
          </div>
        </OrdersProvider>
      </div>
    </div>
  );
};

export default Profile;
