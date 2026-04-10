# Anabel Web Frontend

This is the frontend of the Anabel Web project, built with React and React Router.

It includes a public area, authentication pages, private user pages, an admin panel for managing premium content, and a subscription flow for premium access.

# Project Overview

The frontend is connected to a Node.js + Express backend and a MySQL database.

The application includes:

# Public pages

* Home
* About
* Services
* Contact
* Login
* Register

# Private pages

* Profile
* My Subscription
* Premium content list
* Premium content detail
* Subscription Plans / Become a Subscriber
* Checkout
* Payment Success
* Payment Failed

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

Make sure the backend server is running before using authenticated or admin features.

# Main Features

# Authentication

* User registration
* User login
* JWT token storage in `localStorage`
* Logout
* Protected routes for authenticated users
* Admin-only protected routes

# User Area

* Profile page
* Subscription status page
* Premium content list
* Premium content detail page
* Subscription plan page
* Checkout page
* Payment success page
* Payment failed page

# Admin Area

Admins can manage premium content through a full CRUD interface:

* View all premium content
* Create new premium content
* Edit existing premium content
* Delete premium content

# Subscription and Payment Flow

The project includes a subscription flow with one premium plan:

* €10/month
* Access to all premium content while the subscription is active

Payment processing is simulated for educational purposes.

The frontend does not connect to a real bank or payment gateway. Instead, it provides the user interface for a subscription checkout flow that is handled by the backend as a simulated payment process.

# UX Improvements

* Slug auto-generation from title
* Manual slug editing support
* Basic form validation
* Cover image preview
* Responsive admin table with improved layout

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
Register.jsx
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

# Future Improvements

Some project tasks are still pending, such as:

* More advanced responsive design
* Improved visual polish
* Profile image update
* Password change feature
* Final documentation and presentation materials

# Author

Developed as part of a full-stack web project by Anabel Reyes.