# Database Setup and Seeding Instructions

## Overview

This project uses MongoDB with Mongoose for data management. The database includes schemas for users, admins, carriers, products, orders, and related entities.

## Prerequisites

- Node.js (v12.0.0 or higher)
- MongoDB (v4.0.0 or higher)
- npm or yarn package manager

## Installation

1. Install the required dependencies:

```bash
npm install mongoose
```

2. Make sure MongoDB is running locally on the default port (27017)

## Running the Seeding Script

1. Save the seeding script as `seed.js`

2. Run the script using Node.js:

```bash
node seed.js
```

The script will:

1. Connect to the MongoDB database
2. Clear existing data from all collections
3. Insert sample data into each collection
4. Disconnect from the database when complete

## Sample Data

The seeding script includes minimal sample data for each collection. You can modify the sample data in the `seedDatabase()` function to add more entries or customize the existing ones.

## Customization

To modify the connection settings, update the MongoDB connection string in:

```javascript
mongoose.connect("mongodb://localhost:27017/our_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```
