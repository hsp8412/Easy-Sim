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
