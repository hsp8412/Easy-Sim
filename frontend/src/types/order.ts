export interface Order {
  _id: string;
  carrierId: string;
  userId: string;
  userName: string; // from user
  price: number; // from product
  productId: string;
  createdDate: string;
  paymentStatus: string;
  delivered: boolean;
  usage: number; // not in schema
}

export interface CustomerOrder {
  _id: string;
  createdDate: string; // createdDate + duration >= today ? inactive : active
  paymentStatus: string;
  delivered: boolean;
  usage: number;
  sessionId: string;

  carrierLogo: string; // url string
  carrierName: string;

  country: string; // from product
  flag: string; // url string

  planSize: string; // from product
  duration: number; // from product
  speed: string;

  active: boolean; // determines whether order goes current plan or previous plans
  remainingDays: number; // currentDate - createdDate
}
