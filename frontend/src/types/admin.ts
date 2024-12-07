export interface Admin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface NewAdmin {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
