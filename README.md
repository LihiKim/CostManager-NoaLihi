# Expense Tracker API

A robust RESTful API service for personal expense tracking, developed using Node.js, Express, and MongoDB. This service enables comprehensive management of users, tracking expenses, and generating detailed financial reports.

## 🚀 Features

- **User Management**
  - Create and manage user profiles
  - Validate user information (ID, name, birthday, marital status)
  - Retrieve user details

- **Expense Tracking**
  - Add and categorize expenses
  - Support for multiple expense categories (food, health, housing, sport, education, other)
  - Validate expense data (amount, description, date)

- **Financial Reporting**
  - Generate monthly expense reports
  - Group expenses by category
  - Filter reports by user and time period

## 🛠️ Technology Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Testing:** Jest with Supertest

## 📁 Project Structure

```plaintext
expense-tracker/
├── models/              # Database schemas and models
│   ├── cost.js         # Expense schema definition
│   └── user.js         # User schema definition
├── routes/             # API route handlers
│   ├── about.js        # Team information endpoints
│   ├── costs.js        # Expense management endpoints
│   ├── report.js       # Report generation endpoints
│   └── users.js        # User management endpoints
├── tests/              # Test suites
│   ├── setup.js        # Test environment configuration
│   ├── costs.test.js   # Expense endpoints tests
│   ├── report.test.js  # Report endpoints tests
│   └── users.test.js   # User endpoints tests
├── app.js              # Application entry point
├── .env                # Environment variables
├── package.json        # Project configuration
└── README.md           # Project documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file with:
   ```env
   MONGO_URI=mongodb+srv://lihi311:Stam5@cluster0.eilr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=9001
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm start
   ```

## 📡 API Endpoints

### Users API
- **POST /api/users**
  - Create a new user
  - Required fields: id, first_name, last_name, birthday, marital_status
  - ID must be at least 5 digits

- **GET /api/users/:id**
  - Retrieve user details
  - Returns 404 if user not found

### Expenses API
- **POST /api/costs/add**
  - Add a new expense
  - Required fields: description, category, userid, sum
  - Optional: date (defaults to current date)

- **GET /api/costs**
  - Retrieve all expenses
  - Returns an array of expense objects

### Reports API
- **GET /api/report**
  - Generate a monthly expense report
  - Query parameters: id (user), year, month
  - Returns categorized expenses with totals

### About API
- **GET /api/about**
  - Retrieve team member information
  - Returns developers' details

## 🌐 Base URL and Test Endpoints

- **Base URL:**
  ```
https://costmanager-noalihi.onrender.com
  ```
- **Test Endpoints:**
  ```
  GET  https://costmanager-noalihi.onrender.com/api/about
  POST ttps://costmanager-noalihi.onrender.com/api/costs/add
  GET  https://costmanager-noalihi.onrender.com/api/report?id=123123&year=2025&month=2
  GET  https://costmanager-noalihi.onrender.com/api/users/123123
  ```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## 👥 Team

- Lihi Kimhazi
- Noa Gerbi

---

Made with ❤️ by the Expense Tracker Team

