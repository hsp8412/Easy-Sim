import {useContext} from "react";
import UpdateEmailForm from "./updateEmailForm";
import UpdatePasswordForm from "./updatePasswordForm";
import {UserContext} from "@/app/contexts/userContext";

const ProfileCard = () => {
  const {user} = useContext(UserContext);
  return (
    <div className="bg-white rounded-2xl p-4 w-full shadow-lg max-w-[555px]">
      <div className="text-2xl font-bold text-neutral-700">{`Hi, ${user?.firstName} ${user?.lastName}`}</div>
      <div className="w-full h-[0.4px] bg-neutral-500 my-3" />
      <UpdateEmailForm />
      <div className="w-full h-[0.4px] bg-neutral-500 my-3" />
      <UpdatePasswordForm />
      <div className="w-full h-[0.4px] bg-neutral-500 my-3" />
      <button
        className="border-2 border-red-600 bg-transparent text-red-600 font-semibold py-1 px-4 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 ease-in"
        onClick={() => {}}
      >
        Delete Account
      </button>
    </div>
  );
};

export default ProfileCard;
