![nimbus-logo-ss](https://github.com/user-attachments/assets/9847318f-0ac9-4556-b037-f288a0bd3b7e)

# Nimbus Cloud Inventory Manager

Nimbus Cloud Inventory Manager is a full-stack application designed to help businesses manage their product inventory with secure authentication and a user-friendly interface. The project uses a React frontend, Node.js/Express backend, PostgreSQL (with Sequelize) for data storage, and Material UI for styling.

# Prerequisites

Before running the application locally, ensure you have the following installed on your machine:

- **Node.js** (v14 or above)
- **npm** (v6 or above)
- **PostgreSQL** (version 16.2 is recommended for this project)

# Project Structure

The project is divided into three parts:

- **Root Folder**: Contains the overall project configuration and scripts.
- **Backend Folder**: Contains the Node.js/Express server, Sequelize configuration, migrations, and other backend code.
- **Frontend Folder**: Contains the React application with Material UI.

# Setup Instructions

## 1. Clone the Repository

```bash
git clone <repository-url>
cd nimbus
```
## 2. Set Up the Backend

### 1. Navigate to the backend folder:
```bash
cd backend
```
### 2. Install backend dependencies
```bash
npm install
```
### 3. Create a .env file
  - Create a .env file in the backend folder (refer to .env.example located in the backend folder for the required variables)
  - At a minimum, you should include:
```bash
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_DATABASE=nimbus_dev
DB_HOST=127.0.0.1
DB_DIALECT=postgres
JWT_SECRET=your_jwt_secret
```
### Generating a JWT Secret
  - You can generate a secure random string using Node.js. Run the following command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the generated string and paste it as your JWT_SECRET in your .env file.
### 4. Run Database Setup Scripts:
  - This command creates a database and runs all migrations (**Make sure PostgreSQL is running**):
```bash
npm run setup:dev
```

## 3. Set Up the Frontend

### 1. Navigate to the frontend folder:
  - From the backend folder, go back to the root and then into the frontend:
```bash
cd ..
cd frontend
```
### 2. Install frontend dependencies:
```bash
npm install
```
### 3. (Optional) If there are any additional packages you need to install globally (like Material UI icons), ensure they are installed per the package.json.

## 4. Install Root Dependencies:
  - From the root folder (if not already there):
  ```bash
npm install
```

## 5. Running the Application:
  - This project uses concurrently to run the backend and frontend together. From the root folder, run:
```bash
npm run dev
```
This command starts both the backend server (from the backend folder) and the frontend (from the frontend folder) concurrently.

# Additional Notes:
## - PostgreSQL:
  Ensure that PostgreSQL is running locally and that your credentials in the .env file are correct.
## - Environment Variables:
  The .env file is critical for configuration. Do not commit your .env file to version control; use .env.example as a reference.
## - Development vs. Production:
  The project includes different setup scripts for development, testing, and production environments. For local database development, use:
  ```bash
  npm run setup: dev
```

# Troubleshooting:
## - Database Connection Issues:
  Double-check your .env values (especially DB_USERNAME, DB_PASSWORD, DB_DATABASE, and DB_HOST).
## - Port conflicts:
  Ensure that the backend and frontend are not trying to both run on the same port. 
## - JWT Authentication:
  Ensure you have set a proper JWT_SECRET in your .env.

### Screenshots:
# Home Page
![nim-ss-home-desktop](https://github.com/user-attachments/assets/106d989a-e1e3-43a4-a166-388c3fb15652)

#Signup Page
![nim-ss-signup-desktop](https://github.com/user-attachments/assets/3c1d7187-878c-4db8-bde0-0d5abe1914b9)

# Login Page
![nim-ss-loginpage-desktop](https://github.com/user-attachments/assets/5f9e892f-f128-4256-92d6-d5cba5dd1d1e)

# Products Page
![nim-ss-products-desktop](https://github.com/user-attachments/assets/ea087974-0cd6-4c7a-97a5-7c0bb4f608ed)

# Add Product Page
![nim-ss-addproduct-desktop](https://github.com/user-attachments/assets/6f26abd6-1240-4e6a-83be-0714cd886090)

# Edit Product Page
![nim-ss-editproduct-desktop](https://github.com/user-attachments/assets/c365753c-c6db-4d6a-a519-d9cbcfd9b18d)

