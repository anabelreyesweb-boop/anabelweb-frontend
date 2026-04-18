# Anabel Web Frontend

This is the frontend of the **Anabel Web** project, built with **React** and **React Router**.

It includes a public area, authentication pages, a subscription flow, private user pages, and an admin panel for managing premium content.

# Project Overview

The frontend is connected to a Node.js + Express backend and a MySQL database.

The application includes:

# Public pages

* Home
* About
* Services
* Contact
* Login
* Subscribe
* Forgot Password
* Checkout
* Payment Success
* Payment Failed

# Private pages

* Profile
* My Subscription
* Premium content list
* Premium content detail

# Admin pages

* Premium content list
* Create premium content
* Edit premium content

# Tech Stack

* React
* React Router
* JavaScript
* Sass
* Fetch API

# Port

The frontend runs on:

PORT=3001

# Getting Started

# 1. Clone the repository

git clone https://github.com/anabelreyesweb-boop/anabelweb-frontend
cd anabelweb-frontend

# 2. Install dependencies

npm install

# 3. Create the environment file

Create a `.env` file in the root of the frontend project and add:

PORT=3001

# 4. Start the development server

npm start

The app will run at:

http://localhost:3001

# Backend Connection

This frontend is designed to work with the backend running at:

http://localhost:3000

Make sure the backend server is running before using authenticated, subscription, or admin features.

# Main Features

# Authentication

* User login
* JWT token storage in `localStorage`
* Automatic login after successful subscription
* Logout
* Protected routes for authenticated users
* Admin-only protected routes
* Forgot password page with simulated recovery flow

# Subscription Flow

The project includes one premium plan:

* **€10/month**
* Access to all premium content while the subscription is active

The subscription flow works as follows:

1. The user enters their personal details on the **Subscribe** page
2. The user continues to the **Checkout** page
3. The user completes a simulated credit card payment
4. The account is created
5. The subscription is activated
6. A simulated confirmation email is sent
7. The user is automatically logged in

# Payment Simulation

Payment processing is simulated for educational purposes.

The checkout form accepts any card details entered by the user. No real payment gateway, bank, or card processor is used.

# User Area

* Profile page
* My Subscription page
* Premium content list
* Premium content detail page

# Admin Area

Admins can manage premium content through a full CRUD interface:

* View all premium content
* Create new premium content
* Edit existing premium content
* Delete premium content

# UX Improvements

* Basic form validation
* Slug auto-generation from title
* Manual slug editing support
* Cover image preview
* Responsive admin table with improved layout
* Clear subscription flow with simulated checkout
* Automatic login after subscription

# Project Structure

src/
components/
Navbar.jsx
PrivateRoute.jsx
AdminRoute.jsx
layouts/
MainLayout.jsx
pages/
Home.jsx
About.jsx
Services.jsx
Contact.jsx
Login.jsx
ForgotPassword.jsx
Profile.jsx
MySubscription.jsx
Premium.jsx
PremiumDetail.jsx
SubscriptionPlans.jsx
Checkout.jsx
PaymentSuccess.jsx
PaymentFailed.jsx
AdminPremiumList.jsx
AdminPremiumCreate.jsx
AdminPremiumEdit.jsx
services/
authService.js
styles/
main.scss

# Available Scripts

# npm start

Runs the app in development mode.

# npm run build

Builds the app for production.

# npm test

Launches the test runner.

# Access Control

The frontend uses route protection based on authentication and user role:

* `PrivateRoute` protects pages that require login
* `AdminRoute` protects pages that require admin access

# Notes

* The portfolio section was removed from the project and is no longer part of the frontend.
* Premium content access is restricted to users with an active subscription.
* Admin users can access the premium content management panel.
* The payment flow is simulated as part of the academic scope of the project.
* The confirmation email is simulated as part of the subscription flow.
* The old standalone Register flow was removed from the main user journey.

# Future Improvements

Some project tasks are still pending, such as:

* More advanced responsive design
* Improved visual polish
* Profile image update
* Password change feature
* Final documentation and presentation materials

# Author

Developed as part of a full-stack web project by Anabel Reyes.