"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RefundsTable from "./refundsTable";
import MyButton from "./myButton";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {Refund} from "@/types/refund";
import {getMyRefunds} from "@/services/refundService";
import {toast} from "react-toastify";

const RefundsCard = () => {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const data = await getMyRefunds();
        setRefunds(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch refunds");
      }
    };
    fetchRefunds();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white w-full shadow-xl px-6 py-6">
      <div className="mb-4">
        <MyButton>
          <FontAwesomeIcon icon={faFilter} size="lg" />
          Filter
        </MyButton>
      </div>
      <RefundsTable refunds={refunds} />
    </div>
  );
};

export default RefundsCard;
