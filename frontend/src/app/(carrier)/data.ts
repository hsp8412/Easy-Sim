import {Admin} from "@/types/admin";
import {Carrier} from "@/types/carrier";
import {Country} from "@/types/country";
import {Order} from "@/types/order";
import {Product} from "@/types/product";
import {Proposal} from "@/types/proposal";
import {Refund} from "@/types/refund";
import {User} from "@/types/user";

export const proposals: Proposal[] = [
  {
    _id: "1",
    carrierId: "c123",
    countryId: "1",
    duration: 30, // in days
    size: 5, // in GB
    speed: 50, // in Mbps
    price: 15.99, // in USD
    identityVerification: true,
    topUp: false,
    country: "Canada",
    carrier: "Bell",
    status: "approved",
    createdDate: new Date("2024-10-01T10:00:00Z"),
  },
  {
    _id: "2",
    carrierId: "c124",
    countryId: "1",
    duration: 7, // in days
    size: 2, // in GB
    speed: 10, // in Mbps
    price: 5.99, // in USD
    identityVerification: false,
    topUp: true,
    country: "United States",
    status: "pending",
    carrier: "AT&T",
    createdDate: new Date("2024-10-05T12:30:00Z"),
  },
  {
    _id: "3",
    carrierId: "c125",
    countryId: "1",
    duration: 15, // in days
    size: 10, // in GB
    speed: 100, // in Mbps
    price: 25.99, // in USD
    identityVerification: true,
    topUp: false,
    country: "United Kingdom",
    carrier: "Vodafone",
    status: "rejected",
    createdDate: new Date("2024-10-10T08:45:00Z"),
  },
  {
    _id: "4",
    carrierId: "c126",
    countryId: "1",
    duration: 60, // in days
    size: 20, // in GB
    speed: 200, // in Mbps
    price: 49.99, // in USD
    identityVerification: true,
    topUp: true,
    country: "Australia",
    carrier: "Telstra",
    status: "approved",
    createdDate: new Date("2024-10-15T14:20:00Z"),
  },
  {
    _id: "5",
    carrierId: "c127",
    countryId: "1",
    duration: 10, // in days
    size: 3, // in GB
    speed: 20, // in Mbps
    price: 10.99, // in USD
    identityVerification: false,
    topUp: false,
    country: "India",
    carrier: "Airtel",
    status: "pending",
    createdDate: new Date("2024-10-20T09:10:00Z"),
  },
];

export const countries: Country[] = [
  {
    _id: "1",
    name: "Canada",
    iso: "CA",
    image: "https://example.com/images/canada-bg.jpg",
    flag: "https://example.com/flags/canada.png",
  },
  {
    _id: "2",
    name: "United States",
    iso: "US",
    image: "https://example.com/images/usa-bg.jpg",
    flag: "https://example.com/flags/usa.png",
  },
  {
    _id: "3",
    name: "Germany",
    iso: "DE",
    image: "https://example.com/images/germany-bg.jpg",
    flag: "https://example.com/flags/germany.png",
  },
  {
    _id: "4",
    name: "France",
    iso: "FR",
    image: "https://example.com/images/france-bg.jpg",
    flag: "https://example.com/flags/france.png",
  },
  {
    _id: "5",
    name: "Japan",
    iso: "JP",
    image: "https://example.com/images/japan-bg.jpg",
    flag: "https://example.com/flags/japan.png",
  },
  {
    _id: "6",
    name: "Australia",
    iso: "AU",
    image: "https://example.com/images/australia-bg.jpg",
    flag: "https://example.com/flags/australia.png",
  },
  {
    _id: "7",
    name: "India",
    iso: "IN",
    image: "https://example.com/images/india-bg.jpg",
    flag: "https://example.com/flags/india.png",
  },
  {
    _id: "8",
    name: "Brazil",
    iso: "BR",
    image: "https://example.com/images/brazil-bg.jpg",
    flag: "https://example.com/flags/brazil.png",
  },
  {
    _id: "9",
    name: "United Kingdom",
    iso: "GB",
    image: "https://example.com/images/uk-bg.jpg",
    flag: "https://example.com/flags/uk.png",
  },
  {
    _id: "10",
    name: "South Korea",
    iso: "KR",
    image: "https://example.com/images/south-korea-bg.jpg",
    flag: "https://example.com/flags/south-korea.png",
  },
];

export const products: Product[] = [
  {
    _id: "fb4e07e9-5f6a-4cca-9158-e2e4ecd8f05a",
    carrierId: "c123",
    countryId: "1",
    duration: 30, // in days
    size: 5, // in GB
    speed: 50, // in Mbps
    price: 15.99, // in USD
    identityVerification: true,
    topUp: false,
    country: "Canada",
    active: true,
    created: new Date("2024-10-01T10:00:00Z"),
  },
  {
    _id: "2",
    carrierId: "c124",
    countryId: "1",
    duration: 7, // in days
    size: 2, // in GB
    speed: 10, // in Mbps
    price: 5.99, // in USD
    identityVerification: false,
    topUp: true,
    country: "United States",
    active: true,
    created: new Date("2024-10-05T12:30:00Z"),
  },
  {
    _id: "3",
    carrierId: "c125",
    countryId: "1",
    duration: 15, // in days
    size: 10, // in GB
    speed: 100, // in Mbps
    price: 25.99, // in USD
    identityVerification: true,
    topUp: false,
    country: "United Kingdom",
    active: false,
    created: new Date("2024-10-10T08:45:00Z"),
  },
  {
    _id: "4",
    carrierId: "c126",
    countryId: "1",
    duration: 60, // in days
    size: 20, // in GB
    speed: 200, // in Mbps
    price: 49.99, // in USD
    identityVerification: true,
    topUp: true,
    country: "Australia",
    active: false,
    created: new Date("2024-10-15T14:20:00Z"),
  },
  {
    _id: "5",
    carrierId: "c127",
    countryId: "1",
    duration: 10, // in days
    size: 3, // in GB
    speed: 20, // in Mbps
    price: 10.99, // in USD
    identityVerification: false,
    topUp: false,
    country: "India",
    active: false,
    created: new Date("2024-10-20T09:10:00Z"),
  },
];

export const orders: Order[] = [
  {
    _id: "ORD001",
    carrierId: "CARR123",
    userId: "USER001",
    userName: "John Doe", // from user
    price: 15.99, // from product
    productId: "PROD001",
    createdDate: new Date("2024-11-01T10:00:00Z"),
    paymentStatus: "Completed",
    delivered: true,
    usage: 500, // not included
  },
  {
    _id: "ORD002",
    carrierId: "CARR123",
    userId: "USER002",
    userName: "Jane Doe",
    price: 5.99,
    productId: "PROD002",
    createdDate: new Date("2024-11-02T12:00:00Z"),
    paymentStatus: "Pending",
    delivered: false,
    usage: 200,
  },
  {
    _id: "ORD003",
    carrierId: "CARR123",
    userId: "USER003",
    userName: "John Doe",
    price: 25.99,
    productId: "PROD001",
    createdDate: new Date("2024-11-03T14:00:00Z"),
    paymentStatus: "Completed",
    delivered: true,
    usage: 800,
  },
  {
    _id: "ORD004",
    carrierId: "CARR123",
    userId: "USER004",
    userName: "Jane Doe",
    price: 49.99,
    productId: "PROD003",
    createdDate: new Date("2024-11-04T16:00:00Z"),
    paymentStatus: "Failed",
    delivered: false,
    usage: 0,
  },
  {
    _id: "ORD005",
    carrierId: "CARR123",
    userId: "USER005",
    userName: "John Doe",
    price: 10.99,
    productId: "PROD004",
    createdDate: new Date("2024-11-05T18:00:00Z"),
    paymentStatus: "Completed",
    delivered: true,
    usage: 300,
  },
];

export const refunds: Refund[] = [
  {
    _id: "R123456",
    orderId: "O987654",
    carrierId: "C001",
    userId: "U1001",
    productId: "fb4e07e9-5f6a-4cca-9158-e2e4ecd8f05a",
    createdDate: new Date("2024-11-01T10:15:00Z"),
    status: "Pending",
    requestInformation: "Incorrect item received",
    userName: "John Doe",
    userEmail: "johndoe@example.com",
  },
  {
    _id: "R123457",
    orderId: "O987655",
    carrierId: "C002",
    userId: "U1002",
    productId: "P5002",
    createdDate: new Date("2024-11-02T12:00:00Z"),
    status: "Approved",
    requestInformation: "Product damaged during delivery",
    userName: "Jane Smith",
    userEmail: "janesmith@example.com",
  },
  {
    _id: "R123458",
    orderId: "O987656",
    carrierId: "C003",
    userId: "U1003",
    productId: "P5003",
    createdDate: new Date("2024-11-03T14:30:00Z"),
    status: "Rejected",
    requestInformation: "Changed mind after purchase",
    userName: "Mike Brown",
    userEmail: "mikebrown@example.com",
  },
  {
    _id: "R123459",
    orderId: "O987657",
    carrierId: "C004",
    userId: "U1004",
    productId: "P5004",
    createdDate: new Date("2024-11-04T09:45:00Z"),
    status: "Pending",
    requestInformation: "Wrong size delivered",
    userName: "Emily White",
    userEmail: "emilywhite@example.com",
  },
  {
    _id: "R123460",
    orderId: "O987658",
    carrierId: "C005",
    userId: "U1005",
    productId: "P5005",
    createdDate: new Date("2024-11-05T11:20:00Z"),
    status: "Approved",
    requestInformation: "Missing accessories",
    userName: "Chris Green",
    userEmail: "chrisgreen@example.com",
  },
  {
    _id: "R123461",
    orderId: "O987659",
    carrierId: "C006",
    userId: "U1006",
    productId: "P5006",
    createdDate: new Date("2024-11-06T15:10:00Z"),
    status: "Pending",
    requestInformation: "Product not as described",
    userName: "Laura Black",
    userEmail: "laurablack@example.com",
  },
];

export const carrier: Carrier = {
  _id: "123",
  name: "Bell",
  email: "bell.agent@test.com",
  logoUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Bell_logo.svg/1200px-Bell_logo.svg.png",
};

export const users: User[] = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
  },
  {
    _id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
  },
  {
    _id: "3",
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@example.com",
  },
  {
    _id: "4",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
  },
  {
    _id: "5",
    firstName: "Chris",
    lastName: "Taylor",
    email: "chris.taylor@example.com",
  },
  {
    _id: "6",
    firstName: "Sarah",
    lastName: "Davis",
    email: "sarah.davis@example.com",
  },
];

export const carriers: Carrier[] = [
  {
    _id: "c123",
    name: "Global Telco",
    email: "contact@globaltelco.com",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Bell_logo.svg/1200px-Bell_logo.svg.png",
  },
  {
    _id: "c124",
    name: "Skyline Networks",
    email: "info@skylinenetworks.com",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Bell_logo.svg/1200px-Bell_logo.svg.png",
  },
  {
    _id: "c125",
    name: "Oceanic Mobile",
    email: "support@oceanicmobile.com",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Bell_logo.svg/1200px-Bell_logo.svg.png",
  },
  {
    _id: "c126",
    name: "Mountain Communications",
    email: "service@mountaincomms.com",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Bell_logo.svg/1200px-Bell_logo.svg.png",
  },
  {
    _id: "c127",
    name: "NextGen Carriers",
    email: "hello@nextgencarriers.com",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Bell_logo.svg/1200px-Bell_logo.svg.png",
  },
  {
    _id: "c128",
    name: "Pioneer Wireless",
    email: "admin@pioneerwireless.com",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Bell_logo.svg/1200px-Bell_logo.svg.png",
  },
];

export const admins: Admin[] = [
  {
    _id: "1",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
  },
  {
    _id: "2",
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
  },
  {
    _id: "3",
    firstName: "Catherine",
    lastName: "Davis",
    email: "catherine.davis@example.com",
  },
  {
    _id: "4",
    firstName: "Daniel",
    lastName: "Martinez",
    email: "daniel.martinez@example.com",
  },
  {
    _id: "5",
    firstName: "Evelyn",
    lastName: "Garcia",
    email: "evelyn.garcia@example.com",
  },
  {
    _id: "6",
    firstName: "Frank",
    lastName: "Williams",
    email: "frank.williams@example.com",
  },
];
