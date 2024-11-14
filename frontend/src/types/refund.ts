export interface Refund {
  _id: string;
  orderId: string;
  carrierId: string;
  userId: string;
  productId: string;
  createdDate: Date;
  status: string;
  requestInformation: string;
  userName: string; // from user
  userEmail: string; // from user
}
