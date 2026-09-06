# Restaurant Booking Management Application

This application allows customers to submit restaurant reservation requests and view their reservation status. Staff can review requests and approve or reject bookings.

## Table of Contents
1. Features 
2. Workflow 1: Customer Submits a Reservation
3. Workflow 2: Staff Reviews a Reservation
4. Technology Stack
5. Architecture Summary
6. Prerequisites
7. Setup Instructions
8. Deployment
9. Limitations
10. Submitted Release
11. Author

## Features
### Account Management
- Customer signup
- Customer and staff login
- Customer and staff logout

### Customer Features
- View and select an available date and time.
- View and select an available table.
- Submit a reservation request.
- View reservation status.

### Staff Features
- View customer reservation requests.
- Review reservation details.
- Approve or reject reservations.

## Workflow 1: Customer Submits a Reservation
1. The customer signs up or logs in.
2. The customer find a table selecting a preferred date, time, and seats capacity.
3. The customer views and selects an available table.
4. The customer submits a reservation request.
5. The reservation is marked as pending staff approval.

## Workflow 2: Staff Reviews a Reservation
1. The staff member logs in.
2. The staff member views pending reservation requests.
3. The staff member reviews the reservation details.
4. The staff member approves or rejects the reservation.
5. The reservation status is updated.

## Technology Stack
- Frontend: React
- Backend: Node.js and Express 
- Database: MongoDB
- Authentication: JSON Web Token (JWT)
- Version Control: Git and Github
- Project Management: Jira
- Prototype: Figma
- Diagram: Draw.io 

## Architecture Summary
The frontend: displays the customer and staff dashboard and send requests to Express backend API.
The backend: deals user authentication, reservation request and staff approval/rejection. It uses Mongoose to read and update data in MongoDB Atlas.
MongoDB: stores application data - user accounts, tables, and reservations.

## Prerequisite: 

Please install/setup the following software and create account in following web tools, before running the application:

- Nodejs [https://nodejs.org/en]
- Git [https://git-scm.com/]
- VS Code Editor [https://code.visualstudio.com/]
- MongoDB Atlas Account and Database [https://account.mongodb.com/account/login]

## Setup Instructions
### 1. Clone the Repository
```
git clone https://github.com/kanon-inoue/Restaurant-Booking-Management-Application.git
cd Restaurant-Booking-Management-Application
```

### 2. Install Backend Dependencies
Locate to the backend folder and install npm
```
cd backend
npm install
```

### 3. Configure Environment Variables
Create a .env file in the backend folder. 
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

### 4. Start the Backend
From the backend folder and run:
```
node src/app.js
```
This backend runs on port 5001.
Make sure the server starts and connect to MongoDB.

### 5. Install and Start the Frontend
Navigate to the frontend folder:
```
cd frontend
npm install
npm start
```
This frontend runs on port 3000.

### 6. Use the Application
Customer user: Create an account from the signup page and login with the account to manage and create reservations. 
Staff users: For now, create an account on MongoDB and use the credential to login. You can use the email: ____ and password: ____ to test.

## Deployment
This application is deployed on AWS EC2 Ubuntu instance.
Application URL: http://[EC2 Public IPv4 Address]:3000

## Limitations
- Users cannot reset for forggoten passwords
- This application does not send any notification when the reservation request is approved or rejected by a restaurant
- Staff account needs to be created on MongoDB manually

## Submitted Release
Released tag: _____

This tag is the version submitted for this assignment.

## Author
Kanon Inoue 
QUT Master of IT 
