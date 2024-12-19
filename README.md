# Easy-SIM

Easy-SIM is a full-stack web application providing a platform for buying and selling eSIMs. The platform connects carriers offering eSIM services with users looking for convenient and affordable eSIM solutions. This project is organized into separate backend and frontend directories.

---

## Contributors

- [Sipeng He](https://github.com/hsp8412)
- [Andrew Musa](https://github.com/CyberPrudent)
- [Haofan Zhao](https://github.com/HaofanZhao)
- [Henry Pham](https://github.com/21henryp)
- [Joshua Tolentino](https://github.com/jtolentino1)
  
---

## Features

### Backend
- User authentication and authorization.
- Role-based access control for *Admin*, *Carrier*, and *User* roles.
- **RESTful APIs** for:
  - User management.
  - Carrier management.
  - Product listing and management.
  - Order processing.
  - Refund handling.
- **MongoDB** database integration with **Mongoose ORM**.
- Data validation using Joi.
- Secure password hashing with bcryptjs.

### Frontend
- Built with modern **React** architecture.
- **Context API** for global state management.
- Dynamic routing and nested layouts powered by **Next.js**.
- Fully responsive design with **Tailwind CSS**.
- Modular components for Admin, Carrier, and User roles.

---

## Highlighted Features

- **Google Login**: Seamless user authentication via Google OAuth.
- **Stripe.js Integration**: Secure and efficient payment processing for eSIM purchases.
- **Email Notifications**: Automated emails for order updates and user activities.
- **Google reCAPTCHA**: Enhanced security to prevent bot attacks.
- **Admin Dashboard**: Manage carriers, products, and user accounts.
- **Carrier Portal**: Submit and manage eSIM proposals and monitor sales.
- **User Portal**: Browse, purchase, and manage eSIMs.

---

## Directory Structure

### Backend
```
backend/
├── controllers/        # Contains all API logic.
├── middleware/         # Authentication and authorization middleware.
├── models/             # Mongoose models for MongoDB.
├── routes/             # Express.js route handlers.
├── schema/             # Database seeding scripts.
├── startup/            # Database and application configuration.
└── index.js            # Application entry point.
```

### Frontend
```
frontend/
├── src/
│   ├── app/            # Application-level routing and views.
│   ├── components/     # Reusable UI components.
│   ├── contexts/       # Context API implementations.
│   ├── services/       # API services for backend integration.
│   ├── types/          # TypeScript type definitions.
│   └── globals.css     # Global styles.
└── tailwind.config.ts  # Tailwind CSS configuration.
```

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Docker (optional for containerization)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Set up environment variables:  
Create a `.env` file in the root directory and configure variables like `JWT_PRIVATE_KEY`, `MONGO_URI`, `GOOGLE_CLIENT_ID`, and `STRIPE_SECRET_KEY`.

3. Start the development servers:  
To run in dev mode (nodemon for backend and nextjs dev server for frontend, changes to the code can be reflected in real-time):
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d`
To run in prod mode (“node index.js” to run the server for backend and nextjs standalone server for frontend):
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d`

4. Access the application at `http://localhost:3000`.

---

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Google OAuth for social login
- Stripe.js for payment processing

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Stripe.js for payment integration
- Google reCAPTCHA

---
