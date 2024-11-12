export interface Proposal {
  _id: string;
  carrierId: string;
  duration: number;
  size: number; // this is not included in the schema
  speed: number; // should this be number or string?
  price: number;
  identityVerification: boolean;
  topUp: boolean;
  country: string;
  status: string;
  created: Date; // this is not included in the schema
}
