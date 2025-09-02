Full-Stack Note-Taking Web Application
A modern, secure, and responsive note-taking application built with a React frontend and a Node.js/Express/MongoDB backend. This application features a clean, mobile-first design and robust authentication using both OTP and Google Sign-In.

✨ Features
Frontend (React):

Secure Authentication:

Email + OTP (One-Time Password) signup and login flow.

Seamless one-click "Sign In with Google" (OAuth 2.0).

Full CRUD for Notes: Create, read, and delete notes in real-time.

Modern UI/UX:

Clean, card-based layout for notes.

Responsive, mobile-first design.

Loading spinners and user-friendly toast notifications for all actions.

Protected Routes: Client-side routing that protects the dashboard from unauthenticated access.

Backend (Node.js & Express):

RESTful API: A well-structured API for handling users and notes.

JWT Authentication: Secure API endpoints using JSON Web Tokens.

Google OAuth Verification: Securely verifies Google ID tokens on the server-side.

Data Validation: Sanitizes and validates all incoming API requests.

Mongoose Modeling: Elegant data models for Users and Notes in MongoDB.

🛠️ Tech Stack
Frontend:

React.js (v18+)

Vite (Frontend Tooling)

React Router (Client-Side Routing)

TailwindCSS (Styling)

Axios (API Requests)

@react-oauth/google (Google Sign-In)

react-hot-toast (Notifications)

Backend:

Node.js

Express.js

MongoDB (Database)

Mongoose (Object Data Modeling)

JSON Web Tokens (JWT) (Authentication)

google-auth-library (Google Token Verification)

express-validator (Input Validation)

bcryptjs (Password Hashing - optional, as we use OTP)

🚀 Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Node.js (v18 or higher): Download Node.js

MongoDB: You can either:

(Recommended) Use a free cloud database from MongoDB Atlas.

Install MongoDB Community Server locally on your machine.

1. Backend Setup
First, set up and run the backend server.

# 1. Clone the  repository (or navigate into the backend folder)
git clone https://github.com/LaxmanPrajapat3/Main-Notes-making-app.git
cd note-app-backend

# 2. Install all required dependencies for both frontend and backend
npm install

# 3. Create a .env file in the root of the backend folder and frotend folder
touch .env

Configure Backend Environment Variables (note-app-backend/.env):

You need to add the following variables to your .env file. See the section below on how to get these values.

# Get this from MongoDB Atlas or your local setup
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/noteapp?retryWrites=true&w=majority

# Get this from the Google Cloud Console
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com

# Create a long, random, and secret string for JWT
JWT_SECRET=THIS_IS_A_VERY_LONG_AND_SUPER_SECRET_RANDOM_STRING_123!@#

Run the Backend Server:

# Start the server in development mode (with nodemon)
nodemon server.js

The backend should now be running on http://localhost:5000.


Configure Frontend Environment Variables (note-app-frontend/.env):

Add the following variables to your .env file.

# The URL of your running backend server
VITE_API_BASE_URL=http://localhost:5000/api

# The SAME Google Client ID you used in the backend
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com

Run the Frontend Development Server:

# Start the Vite development server
npm run dev

The frontend application should now be running on http://localhost:5173 (or the port specified in your terminal).

🔑 Environment Variable Guide
MONGO_URI: Your MongoDB connection string. For MongoDB Atlas, get this by clicking "Connect" > "Connect your application" on your cluster dashboard.

GOOGLE_CLIENT_ID:

Go to the Google Cloud Console.

Create a new project.

Navigate to "APIs & Services" > "Credentials".

Click "+ CREATE CREDENTIALS" > "OAuth client ID".

Select "Web application" as the type.

Add http://localhost:5173 (your frontend URL) to the "Authorized JavaScript origins".

Copy the generated Client ID.

JWT_SECRET: A long, random string you create yourself. It's used to sign and verify tokens.

📂 Project Structure
Backend
/note-app-backend
├── /config
├── /controllers
├── /middleware
├── /models
├── /routes
├── .env
├── package.json
└── server.js

Frontend
/note-app-frontend
├── /src
│   ├── /assets
│   ├── /components
│   ├── /context
│   ├── /hooks
│   ├── /pages
│   ├── App.jsx
│   └── main.jsx
├── .env
└── package.json
