
# Simple Authentication System and Dashboard

### Screenshots
##Signup
![Screenshot_29-8-2024_233823_localhost](https://github.com/user-attachments/assets/1210c44e-8b03-493e-8c75-aac1d7b642b1)
##Login
![Screenshot_29-8-2024_233530_localhost](https://github.com/user-attachments/assets/2b9d69ea-08d9-4200-8bb8-455da8e41666)
##Dashboard
![Screenshot_29-8-2024_232944_localhost](https://github.com/user-attachments/assets/34642885-ed15-41ff-91a9-4411b838747f)

## Overview

This project is a basic authentication system with a dashboard interface that allows users to sign up, log in, and view various data presented on a dashboard. The frontend is built with React and Tailwind CSS, while the backend is powered by Node.js and Express, with PostgreSQL as the database.

## Features

- **User Authentication:** Sign up and login functionality using JWT tokens.
- **Protected Routes:** Users must be logged in to access the dashboard.
- **Responsive Design:** The UI is fully responsive and designed using Tailwind CSS.
- **Data Visualization:** The dashboard includes charts and tables displaying dummy data related to tyre inventory, pending actions, and financial summaries.
- **Tabbed Navigation:** Switch between different sections like Pending Actions, Completed Actions, and Financial Summary within the dashboard.

## Technologies Used

### Frontend
- React
- React Router
- Tailwind CSS
- Chart.js
- Axios

### Backend
- Node.js
- Express
- PostgreSQL
- Bcrypt.js
- JWT (jsonwebtoken)
- dotenv

## Project Setup

### Prerequisites

Ensure you have the following installed:

- Node.js
- PostgreSQL

### Database Setup

1. Create a PostgreSQL database for the project.
2. Set up a table named `users` with the following schema:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

### Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/simple-auth-dashboard.git
   cd simple-auth-dashboard
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

#### Backend

1. Start the PostgreSQL server.
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Run the server:
   ```bash
   npm start
   ```
   The backend server will start on the port specified in the `.env` file (default is 5000).

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Run the React application:
   ```bash
   npm start
   ```
   The frontend development server will start, and you can view the application at `http://localhost:3000`.

### Project Structure

```bash
├── backend
│   ├── controllers
│   │   └── userController.js  # Handles user authentication and data retrieval
│   ├── db.js                  # PostgreSQL connection setup
│   ├── routes
│   │   └── userRoutes.js      # Defines API endpoints
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Main server file
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Sidebar.js     # Sidebar component
│   │   │   ├── Dashboard.js   # Dashboard page component
│   │   │   └── Login.js       # Login page component
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...                # Other components and utilities
│   ├── public
│   ├── .env
│   ├── package.json
│   └── tailwind.config.js     # Tailwind CSS configuration
└── README.md
```

## API Endpoints

### Authentication

- **POST /api/signup**: Creates a new user account.
- **POST /api/login**: Authenticates a user and returns a JWT token.

### Dashboard Data

- **GET /api/userdata**: Returns dummy data for the dashboard, including user information, tyre inventory, pending actions, completed actions, and financial summary.

## Future Improvements

- Implement password recovery functionality.
- Add user profile management.
- Replace dummy data with actual database queries for real-world use.
