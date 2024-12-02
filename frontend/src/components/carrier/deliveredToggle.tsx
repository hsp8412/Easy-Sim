import {useState} from "react";
import Checkbox from "../common/checkbox";
import {updateOrderDelivered} from "@/services/orderService";
import {toast} from "react-toastify";

type Props = {
  orderId: string;
  initialDelivered: boolean;
};

const DeliveredToggle = ({orderId, initialDelivered}: Props) => {
  const [delivered, setDelivered] = useState(initialDelivered);
  const handleDeliveredToggle = async (checked: boolean) => {
    try {
      await updateOrderDelivered(orderId, checked);
      setDelivered(checked);
      toast.success("Order updated successfully");
    } catch (e: any) {
      toast.error(e.response.data);
    }
  };

  return (
    <Checkbox
      label={delivered ? "Yes" : "No"}
      id={`{orderId}-delivered`}
      checked={delivered}
      setChecked={handleDeliveredToggle}
    />
  );
};

export default DeliveredToggle;
