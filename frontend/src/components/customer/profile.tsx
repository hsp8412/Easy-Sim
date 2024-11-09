"use client";

import {getMe} from "@/services/authService";
import {User} from "@/types/user";
import {useEffect, useState} from "react";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMe();
      setUser(user);
      setLoading(false);
    };
    fetchUser();
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>Hi, {user?._id}</div>;
};

export default Profile;
