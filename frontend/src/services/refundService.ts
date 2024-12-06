import {Refund} from "@/types/refund";
import httpService from "./httpService";

export const getMyRefunds = async () => {
  try {
    const res = await httpService.get<Refund[]>("api/refund/get-my-refunds");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const refundRequest = async ({
  orderId,
  reason,
}: {
  orderId: string;
  reason: string;
}) => {
  try {
    await httpService.post("api/refund", {orderId, reason});
  } catch (error) {
    throw error;
  }
};

export const reviewRefund = async (
  status: "Approved" | "Rejected",
  refund: Refund
) => {
  try {
    await httpService.post("api/refund/review-refund", {
      status,
      refundId: refund._id,
    });
  } catch (error) {
    throw error;
  }
};
