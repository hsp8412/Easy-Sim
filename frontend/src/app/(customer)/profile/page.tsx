import {OrdersProvider} from "@/app/contexts/ordersContext";
import Profile from "@/components/customer/profile";

export default async function ProfilePage() {
  return (
    <div className="flex justify-center text-center">
      <Profile />
    </div>
  );
}
