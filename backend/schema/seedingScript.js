const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
});

const userSchema = new mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
});

const carrierSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  passwordHash: String,
});

const productSchema = new mongoose.Schema({
  _id: String,
  carrier_id: String,
  duration: Number,
  speed: Number,
  price: Number,
  identityVerification: Boolean,
  topUp: Boolean,
  country: String,
});

const countrySchema = new mongoose.Schema({
  _id: String,
  name: String,
  ISO: String,
  image: String,
  flag: String,
});

const orderSchema = new mongoose.Schema({
  orderId: String,
  carrierId: String,
  userId: String,
  productId: String,
  createdDate: String,
  paymentStatus: String,
  delivered: Boolean,
});

const proposalSchema = new mongoose.Schema({
  _id: String,
  carrierId: String,
  duration: Number,
  speed: Number,
  price: Number,
  identityVerification: Boolean,
  topUp: Boolean,
  country: String,
  status: String,
});

const refundSchema = new mongoose.Schema({
  refundId: String,
  orderId: String,
  carrierId: String,
  userId: String,
  productId: String,
  createdDate: String,
  status: String,
  requestInformation: String,
});

// Create models
const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);
const Carrier = mongoose.model('Carrier', carrierSchema);
const Product = mongoose.model('Product', productSchema);
const Country = mongoose.model('Country', countrySchema);
const Order = mongoose.model('Order', orderSchema);
const Proposal = mongoose.model('Proposal', proposalSchema);
const Refund = mongoose.model('Refund', refundSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/our_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Database connected');
  seedDatabase();
})
.catch(err => {
  console.error('Database connection error:', err);
});

// Seed function
async function seedDatabase() {
  // Clear existing data
  await Promise.all([
    Admin.deleteMany({}),
    User.deleteMany({}),
    Carrier.deleteMany({}),
    Product.deleteMany({}),
    Country.deleteMany({}),
    Order.deleteMany({}),
    Proposal.deleteMany({}),
    Refund.deleteMany({}),
  ]);

  // Sample data
  const admins = [
    { _id: 'admin1', firstName: 'Admin', lastName: 'User', email: 'admin@example.com', passwordHash: 'hashedpassword1' },
  ];

  const users = [
    { _id: 'user1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', passwordHash: 'hashedpassword2' },
  ];

  const carriers = [
    { _id: 'carrier1', name: 'Carrier One', email: 'carrier@example.com', passwordHash: 'hashedpassword3' },
  ];

  const products = [
    { _id: 'product1', carrier_id: 'carrier1', duration: 30, speed: 100, price: 29.99, identityVerification: true, topUp: false, country: 'Country A' },
  ];

  const countries = [
    { _id: 'country1', name: 'Country A', ISO: 'CA', image: 'image_url', flag: 'flag_url' },
  ];

  const orders = [
    { orderId: 'order1', carrierId: 'carrier1', userId: 'user1', productId: 'product1', createdDate: new Date().toISOString(), paymentStatus: 'Completed', delivered: false },
  ];

  const proposals = [
    { _id: 'proposal1', carrierId: 'carrier1', duration: 30, speed: 100, price: 29.99, identityVerification: true, topUp: false, country: 'Country A', status: 'Pending' },
  ];

  const refunds = [
    { refundId: 'refund1', orderId: 'order1', carrierId: 'carrier1', userId: 'user1', productId: 'product1', createdDate: new Date().toISOString(), status: 'Requested', requestInformation: 'Reason for refund' },
  ];

  // Insert data
  await Promise.all([
    Admin.insertMany(admins),
    User.insertMany(users),
    Carrier.insertMany(carriers),
    Product.insertMany(products),
    Country.insertMany(countries),
    Order.insertMany(orders),
    Proposal.insertMany(proposals),
    Refund.insertMany(refunds),
  ]);

  console.log('Database seeded!');
  mongoose.disconnect();
}
