# User Registration API

![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-9.0-green)
![C#](https://img.shields.io/badge/C%23-10-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue)
![Entity Framework](https://img.shields.io/badge/EF_Core-7.0-lightgrey)
![License](https://img.shields.io/badge/License-MIT-yellow)

A robust C# MVC REST API for user registration with PostgreSQL database, featuring personal information, residential address, and postal address management.

---

## 📋 Table of Contents
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Installation](#-installation)
- [🗄 Database Setup](#-database-setup)
- [🌐 API Endpoints](#-api-endpoints)
- [📝 Usage Examples](#-usage-examples)
- [🛠 Development](#-development)
- [🔧 Configuration](#-configuration)
- [🐛 Troubleshooting](#-troubleshooting)
- [📊 API Response Examples](#-api-response-examples)

---

## ✨ Features
- User Registration with comprehensive data validation  
- Personal Information management  
- Dual Address System (Residential & Postal)  
- RESTful API design with proper HTTP status codes  
- PostgreSQL Integration with Entity Framework Core  
- Data Validation using Data Annotations  
- Error Handling and Logging  
- Unique Constraints on email and phone number  

---

## 🛠 Tech Stack
- Framework: ASP.NET Core 9.0  
- Database: PostgreSQL  
- ORM: Entity Framework Core  
- Architecture: MVC Pattern  
- Validation: Data Annotations  

---

## 📁 Project Structure
MyRegistrationAPI/
├── Controllers/
│ └── UsersController.cs
├── Models/
│ ├── User.cs
│ ├── ResidentialAddress.cs
│ └── PostalAddress.cs
├── Data/
│ └── ApplicationDbContext.cs
├── DTOs/
│ ├── UserRegistrationDto.cs
│ └── UserResponseDto.cs
├── Program.cs
├── appsettings.json
└── MyRegistrationAPI.csproj

yaml
Copy code

---

## 🚀 Installation

### Prerequisites
- .NET 9.0 SDK  
- PostgreSQL  
- Entity Framework Core Tools  

### Step-by-Step Setup

1. **Create or clone the project**
```bash
mkdir MyRegistrationAPI
cd MyRegistrationAPI
dotnet new webapi -controllers
Install required packages

bash
Copy code
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Tools
Configure database connection
Update appsettings.json:

json
Copy code
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=RegistrationDB;Username=postgres;Password=your_password"
  }
}
Create and run database migrations

bash
Copy code
dotnet ef migrations add InitialCreate
dotnet ef database update
Run the application

bash
Copy code
dotnet run
The API will be available at: http://localhost:5113

🗄 Database Setup
The API automatically creates these tables:

Users – Personal information

ResidentialAddresses – Residential address data

PostalAddresses – Postal address data

Database Schema:

Users: Id, FirstName, LastName, Email, PhoneNumber, DateOfBirth, CreatedAt, UpdatedAt

Addresses: Id, Street, City, State, PostalCode, Country, UserId

🌐 API Endpoints
Method	Endpoint	Description
POST	/api/users/register	Register a new user
GET	/api/users	Get all users
GET	/api/users/{id}	Get user by ID
PUT	/api/users/{id}	Update user info
DELETE	/api/users/{id}	Delete user

📝 Usage Examples
Register a New User
bash
Copy code
POST /api/users/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1990-01-01T00:00:00",
  "residentialAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  },
  "postalAddress": {
    "street": "PO Box 456",
    "city": "New York",
    "state": "NY",
    "postalCode": "10002",
    "country": "USA"
  }
}
Get All Users
bash
Copy code
GET /api/users
Get User by ID
bash
Copy code
GET /api/users/1
Update User
bash
Copy code
PUT /api/users/1
Content-Type: application/json
{
  // Updated user data
}
Delete User
bash
Copy code
DELETE /api/users/1
🛠 Development
Run the application

bash
Copy code
dotnet run
Build the project

bash
Copy code
dotnet build
Creating Migrations

bash
Copy code
dotnet ef migrations add MigrationName
dotnet ef database update
Testing with PowerShell

powershell
Copy code
$body = @{
    firstName = "John"
    lastName = "Doe"
    email = "john.doe@example.com"
    phoneNumber = "+1234567890"
    dateOfBirth = "1990-01-01T00:00:00"
    residentialAddress = @{
        street = "123 Main St"
        city = "New York"
        state = "NY"
        postalCode = "10001"
        country = "USA"
    }
    postalAddress = @{
        street = "PO Box 456"
        city = "New York"
        state = "NY"
        postalCode = "10002"
        country = "USA"
    }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "http://localhost:5113/api/users/register" -Method Post -Body $body -ContentType "application/json"
🔧 Configuration
appsettings.json

json
Copy code
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=RegistrationDB;Username=postgres;Password=Orlando@2025"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
🐛 Troubleshooting
Database Connection Failed

Verify PostgreSQL is running

Check connection string in appsettings.json

Ensure database exists

Migration Errors

bash
Copy code
dotnet ef migrations remove
dotnet ef migrations add InitialCreate
dotnet ef database update
Port Already in Use

Check Properties/launchSettings.json

Or run:

bash
Copy code
dotnet run --urls="http://localhost:5000"
📊 API Response Examples
Success Response

json
Copy code
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1990-01-01T00:00:00",
  "residentialAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  },
  "postalAddress": {
    "street": "PO Box 456",
    "city": "New York",
    "state": "NY",
    "postalCode": "10002",
    "country": "USA"
  },
  "createdAt": "2024-01-01T12:00:00Z"
}
Error Response

json
Copy code
{
  "message": "Email already exists"
}
