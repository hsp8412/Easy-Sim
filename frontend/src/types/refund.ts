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
  country: string; // from product
  size: number; // from product
  duration: number; // from product
  price: number; // from product
}
