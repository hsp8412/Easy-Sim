"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RefundsTable from "./refundsTable";
import MyButton from "./myButton";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {Refund} from "@/types/refund";
import {getMyRefunds, reviewRefund} from "@/services/refundService";
import {toast} from "react-toastify";

const RefundsCard = () => {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDecision = async (approve: boolean, refund: Refund) => {
    if (approve) {
      try {
        await reviewRefund("Approved", refund);
        toast.success(`Refund ${refund._id} approved`);
      } catch (error: any) {
        toast.error("Failed to approve refund");
      }
    } else {
      try {
        await reviewRefund("Rejected", refund);
        toast.success(`Refund ${refund._id} rejected`);
      } catch (error: any) {
        toast.error("Failed to reject refund");
      }
    }
    const updatedRefunds = refunds.map((r) => {
      if (r._id === refund._id) {
        return {...r, status: approve ? "Approved" : "Rejected"};
      }
      return r;
    });
    setRefunds(updatedRefunds);
  };

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
      <RefundsTable refunds={refunds} handleDecision={handleDecision} />
    </div>
  );
};

export default RefundsCard;
