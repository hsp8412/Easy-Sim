export interface Product {
  _id: string;
  carrierId: string;
  countryId: string;
  duration: number;
  size: number;
  speed: string; // should this be number or string?
  price: number;
  identityVerification: boolean;
  topUp: boolean;
  country: string;
  active: boolean; // this is not included in the schema
  createdDate: string; // this is not included in the schema
  status: string;
}

export interface ProductFromServer {
  _id: string;
  carrierId: string;
  countryId: string;
  duration: number;
  speed: string;
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
