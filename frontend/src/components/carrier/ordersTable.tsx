import {Order} from "@/types/order";
import DataTable from "../common/table/dataTable";
import {orders} from "@/app/(carrier)/data";
import DeliveredToggle from "./deliveredToggle";

const OrdersTable = () => {
  const columns = [
    {
      path: "_id",
      label: "Order ID",
      content: (order: Order) => order._id,
    },
    {
      path: "userName",
      label: "User Name",
      content: (order: Order) => order.userName,
    },
    {
      path: "price",
      label: "Price",
      content: (order: Order) => order.price,
    },
    {
      path: "createdDate",
      label: "Created Date",
      content: (order: Order) => order.createdDate.toLocaleDateString(),
    },
    {
      path: "paymentStatus",
      label: "Payment Status",
      content: (order: Order) => {
        switch (order.paymentStatus.toLowerCase()) {
          case "completed":
            return (
              <span className=" bg-secondary text-white p-2 rounded-lg font-bold text-sm">
                Completed
              </span>
            );
          case "pending":
            return (
              <span className=" bg-yellow-600 text-white p-2 rounded-lg font-bold text-sm">
                Pending
              </span>
            );
          default:
            return (
              <span className=" bg-red-600 text-white p-2 rounded-lg font-bold text-sm">
                Failed
              </span>
            );
        }
      },
    },
    {
      path: "delivered",
      label: "Delivered",
      content: (order: Order) => {
        return (
          <DeliveredToggle
            orderId={order._id}
            initialDelivered={order.delivered}
          />
        );
      },
    },
  ];
  return (
    <DataTable
      columns={columns}
      items={orders}
      keyPath={"_id"}
      itemsPerPage={4}
    />
  );
};

export default OrdersTable;
