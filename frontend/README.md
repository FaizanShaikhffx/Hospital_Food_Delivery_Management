# Hospital Food Management System

Welcome to the Hospital Food Management System, a comprehensive solution designed to streamline the management of patient diets, meal deliveries, and pantry staff operations in a hospital setting.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The Hospital Food Management System is a web-based application that facilitates the efficient management of hospital food services. It allows administrators to manage patient dietary needs, track meal deliveries, and coordinate with pantry staff to ensure timely and accurate meal service.

## Features

- **Patient Management**: Create, update, and manage patient information, including dietary restrictions and meal preferences.
- **Food Chart Management**: Design and manage personalized food charts for patients.
- **Meal Delivery Tracking**: Track the status of meal deliveries and ensure timely service.
- **Pantry Staff Coordination**: Manage pantry staff details and assign delivery tasks.
- **User Authentication**: Secure login and registration for admin and staff roles.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/hospital-food-management.git
   cd hospital-food-management
   ```

2. **Install dependencies**:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `backend` directory and add the following:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the servers**:
   ```bash
   cd backend
   npm start
   ```
   In a new terminal:
   ```bash
   cd frontend
   npm run dev
   ```

## Usage

1. Access the application at `http://localhost:3000` (or the port specified in your environment).
2. Use the login page to authenticate as an admin or staff member.
3. Navigate through the dashboard to manage patients, food charts, and meal deliveries.

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login a user.

### Patients
- `GET /api/patients/get`: Retrieve all patients.
- `POST /api/patients/create`: Create a new patient.
- `PUT /api/patients/:id`: Update patient details.
- `DELETE /api/patients/:id`: Delete a patient.

### Food Charts
- `GET /api/foodcharts/get`: Retrieve food charts for a patient.
- `POST /api/foodcharts/create`: Create a new food chart.
- `PUT /api/foodcharts/:id`: Update a food chart.
- `DELETE /api/foodcharts/:id`: Delete a food chart.

### Meal Deliveries
- `GET /api/mealdeliveries/`: Retrieve all meal deliveries.
- `POST /api/mealdeliveries/create`: Create a new meal delivery.
- `POST /api/mealdeliveries/:id/complete`: Mark a meal as delivered.
- `DELETE /api/mealdeliveries/:id`: Delete a meal delivery.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, Vite, Tailwind CSS
- **Authentication**: JWT, bcryptjs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For any inquiries or support, please contact iamfaizzan@gmail.com.