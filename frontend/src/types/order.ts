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

export interface CustomerOrder {
  _id: string;
  flag: string; // url string
  country: string; // from product
  planSize: string; // from product
  carrierLogo: string; // url string
  carrierName: string;
  duration: number; // from product
  createdDate: Date; // createdDate + duration >= today ? inactive : active
  active: boolean; // determines whether order goes current plan or previous plans
}
