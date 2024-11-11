"use client";

import {UserContext} from "@/app/contexts/userContext";
import {useContext} from "react";

const Profile = () => {
  const {user, loading} = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Hi, {`${user?.firstName} ${user?.lastName}`}</div>;
};

export default Profile;
