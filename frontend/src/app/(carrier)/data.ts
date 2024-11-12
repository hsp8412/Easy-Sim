import {Proposal} from "@/types/proposal";

export const proposals: Proposal[] = [
  {
    _id: "1",
    carrierId: "c123",
    duration: 30, // in days
    size: 5, // in GB
    speed: 50, // in Mbps
    price: 15.99, // in USD
    identityVerification: true,
    topUp: false,
    country: "Canada",
    status: "approved",
    created: new Date("2024-10-01T10:00:00Z"),
  },
  {
    _id: "2",
    carrierId: "c124",
    duration: 7, // in days
    size: 2, // in GB
    speed: 10, // in Mbps
    price: 5.99, // in USD
    identityVerification: false,
    topUp: true,
    country: "United States",
    status: "pending",
    created: new Date("2024-10-05T12:30:00Z"),
  },
  {
    _id: "3",
    carrierId: "c125",
    duration: 15, // in days
    size: 10, // in GB
    speed: 100, // in Mbps
    price: 25.99, // in USD
    identityVerification: true,
    topUp: false,
    country: "United Kingdom",
    status: "rejected",
    created: new Date("2024-10-10T08:45:00Z"),
  },
  {
    _id: "4",
    carrierId: "c126",
    duration: 60, // in days
    size: 20, // in GB
    speed: 200, // in Mbps
    price: 49.99, // in USD
    identityVerification: true,
    topUp: true,
    country: "Australia",
    status: "approved",
    created: new Date("2024-10-15T14:20:00Z"),
  },
  {
    _id: "5",
    carrierId: "c127",
    duration: 10, // in days
    size: 3, // in GB
    speed: 20, // in Mbps
    price: 10.99, // in USD
    identityVerification: false,
    topUp: false,
    country: "India",
    status: "pending",
    created: new Date("2024-10-20T09:10:00Z"),
  },
];
