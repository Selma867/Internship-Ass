# Registration API

![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

A complete Node.js & TypeScript REST API for user registration with full CRUD operations. This API handles user registration with personal information, residential address, and postal address, storing data in PostgreSQL.

---

## 🚀 Features
- Full CRUD Operations - Create, Read, Update, Delete users  
- RESTful API built with Node.js, Express, and TypeScript  
- PostgreSQL database with JSONB storage  
- Input validation using Joi  
- CORS enabled for frontend integration  
- Error handling with proper HTTP status codes  
- TypeScript for type safety  
- Connection pooling for optimal performance  

---

## 📋 API Endpoints

| Method | Endpoint           | Description         | Request Body           |
|--------|------------------|-------------------|----------------------|
| GET    | /health           | Health check       | None                 |
| GET    | /api              | API information    | None                 |
| POST   | /api/register     | Register a new user| JSON with user data  |
| GET    | /api/users        | Get all users      | None                 |
| GET    | /api/users/:id    | Get user by ID     | None                 |
| PUT    | /api/users/:id    | Update user by ID  | Partial user data    |
| DELETE | /api/users/:id    | Delete user by ID  | None                 |

---

## 🗂️ Data Structure

### Personal Information
```typescript
{
  firstName: string;      // 2-50 characters
  lastName: string;       // 2-50 characters  
  email: string;          // Valid email format
  phone: string;          // 10-15 characters
  dateOfBirth: string;    // ISO date format (YYYY-MM-DD)
  nationality: string;    // 2-50 characters
}
Address Information
{
  street: string;         // 5-100 characters
  city: string;           // 2-50 characters
  state: string;          // 2-50 characters
  postalCode: string;     // 3-20 characters
  country: string;        // 2-50 characters
}
Complete User Registration
{
  personalInfo: PersonalInfo;
  residentialAddress: Address;
  postalAddress: Address;
}

🛠️ Installation & Setup
Prerequisites

Node.js 16+

PostgreSQL 12+

npm or yarn

1. Clone the Repository
git clone <your-repository-url>
cd registration-api

2. Install Dependencies
cd backend
npm install

3. Database Setup

Option A: Auto Setup (Recommended)

The API will automatically create tables when first started.

Option B: Manual PostgreSQL Setup

-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE registration_db;

-- Exit
\q

4. Environment Configuration

Create a .env file in the backend directory:

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=registration_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Server Configuration
PORT=3000
NODE_ENV=development

5. Run the Application

Development Mode

npm run dev


Production Mode

npm run build
npm start

🧪 API Testing
Using PowerShell

Health Endpoint

Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get


Register a New User

$body = '{
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "dateOfBirth": "1990-01-01",
    "nationality": "American"
  },
  "residentialAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  },
  "postalAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  }
}'

Invoke-RestMethod -Uri "http://localhost:3000/api/register" -Method Post -Body $body -ContentType "application/json"


Get All Users

Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method Get


Get User by ID

Invoke-RestMethod -Uri "http://localhost:3000/api/users/1" -Method Get


Update User

$body = '{
  "personalInfo": {
    "firstName": "Jonathan",
    "lastName": "Doe",
    "email": "jonathan.doe@example.com",
    "phone": "+1234567890",
    "dateOfBirth": "1990-01-01",
    "nationality": "American"
  }
}'

Invoke-RestMethod -Uri "http://localhost:3000/api/users/1" -Method Put -Body $body -ContentType "application/json"


Delete User

Invoke-RestMethod -Uri "http://localhost:3000/api/users/1" -Method Delete

Using curl

Register a New User

curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {
      "firstName": "Alice",
      "lastName": "Smith",
      "email": "alice.smith@example.com",
      "phone": "+441234567890",
      "dateOfBirth": "1985-05-15",
      "nationality": "British"
    },
    "residentialAddress": {
      "street": "456 Oak Avenue",
      "city": "London",
      "state": "Greater London",
      "postalCode": "SW1A 1AA",
      "country": "United Kingdom"
    },
    "postalAddress": {
      "street": "456 Oak Avenue",
      "city": "London",
      "state": "Greater London",
      "postalCode": "SW1A 1AA",
      "country": "United Kingdom"
    }
  }'

📊 Response Formats

Success Response

{
  "success": true,
  "data": {
    "id": 1,
    "personalInfo": { ... },
    "residentialAddress": { ... },
    "postalAddress": { ... },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "User registered successfully"
}


Error Response

{
  "success": false,
  "error": "Error description"
}

📝 License

This project is licensed under the MIT License.
