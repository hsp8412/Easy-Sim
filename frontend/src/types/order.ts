export interface Order {
  _id: string;
  carrierId: string;
  userId: string;
  userName: string; // from user
  price: number; // from product
  productId: string;
  createdDate: Date;
  paymentStatus: string;
  delivered: boolean;
  usage: number; // not in schema
}
