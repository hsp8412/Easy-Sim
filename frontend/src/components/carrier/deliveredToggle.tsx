import {useState} from "react";
import Checkbox from "../common/checkbox";

type Props = {
  orderId: string;
  initialDelivered: boolean;
};

const DeliveredToggle = ({orderId, initialDelivered}: Props) => {
  const [delivered, setDelivered] = useState(false);
  const handleDeliveredToggle = (checked: boolean) => {
    setDelivered(checked);
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
