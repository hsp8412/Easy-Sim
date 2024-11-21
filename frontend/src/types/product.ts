export interface Product {
  _id: string;
  carrierId: string;
  countryId: string;
  duration: number;
  size: number;
  speed: number; // should this be number or string?
  price: number;
  identityVerification: boolean;
  topUp: boolean;
  country: string;
  active: boolean; // this is not included in the schema
  created: Date; // this is not included in the schema
}

export interface ProductFromServer {
  _id: string;
  carrierId: string;
  countryId: string;
  duration: number;
  speed: number;
  price: number;
  identityVerification: boolean;
  topUp: boolean;
  country: string;
  createdDate: Date;
  status: string;
  size: number;
  carrierName: string;
  carrierEmail: string;
  carrierLogo: string;
}
