export interface Carrier {
  _id: string;
  name: string;
  email: string;
  logoUrl: string;
}

export interface NewCarrier {
  logo: File;
  name: string;
  password: string;
  email: string;
}
