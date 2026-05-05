# AURUMPILL Frontend

This is the frontend of AURUMPILL, a full-stack web application built with React, React Router, JavaScript, and Sass.

The project includes a public website, authentication system, subscription flow, private user area, premium content area, and an admin panel for premium content management.

## Version

1.0.0

## Project Overview

AURUMPILL is connected to a Node.js + Express backend and a MySQL database.

The frontend includes:

### Public Pages

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
* Cookies Policy
* Terms of Use

### Private Pages

* Profile
* My Subscription
* Premium Content List
* Premium Content Detail

### Admin Pages

* Premium Content List
* Create Premium Content
* Edit Premium Content

## Tech Stack

* React
* React Router
* JavaScript
* Sass
* Fetch API

## Frontend Port

The frontend runs on:

PORT=3001

## Getting Started

### 1. Clone the repository

git clone https://github.com/anabelreyesweb-boop/anabelweb-frontend.git
cd anabelweb-frontend

### 2. Install dependencies

npm install

### 3. Create the environment file

Create a `.env` file in the root of the project and add:

PORT=3001
REACT_APP_API_URL=http://localhost:3000

### 4. Start the development server

npm start

The application will run at:

http://localhost:3001

## Backend Connection

This frontend is designed to work with the backend running at:

http://localhost:3000

If you use the environment variable, make sure it matches the backend URL:

REACT_APP_API_URL=http://localhost:3000

Make sure the backend server is running before using authentication, subscription, premium, or admin features.

## Main Features

### Authentication

* User login
* JWT token storage in localStorage
* Automatic login after successful subscription
* Logout
* Protected routes for authenticated users
* Admin-only protected routes
* Forgot password flow

### Subscription Flow

The application includes one premium plan:

* €10/month
* Access to all premium content while the subscription is active

Flow:

1. The user enters personal details on the Subscribe page
2. The user continues to the Checkout page
3. The user completes a simulated payment
4. The account is created
5. The subscription is activated
6. A confirmation flow is triggered
7. The user is automatically logged in

### User Area

* Profile page
* Real profile photo update
* Real password change
* My Subscription page
* Premium content list
* Premium content detail page

### Admin Area

Admins can manage premium content through a full CRUD interface:

* View all premium content
* Create new premium content
* Edit existing premium content
* Delete premium content

## API Integration

The frontend communicates with the backend through a REST API.

Main API areas used by the frontend include:

* Authentication
* Profile
* Subscription
* Premium content
* Admin premium content management

Base API URL:

http://localhost:3000

Or through the environment variable:

REACT_APP_API_URL=http://localhost:3000

## Project Structure

src/
  components/
    Navbar.jsx
    Footer.jsx
    PrivateRoute.jsx
    AdminRoute.jsx
    ScrollToTop.jsx

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
    CookiesPolicy.jsx
    TermsOfUse.jsx

  services/
    authService.js

  styles/
    main.scss

## Available Scripts

### npm start

Runs the app in development mode.

### npm run build

Builds the app for production.

### npm test

Launches the test runner.

## Access Control

The frontend uses route protection based on authentication and user role:

* PrivateRoute protects pages that require login
* AdminRoute protects pages that require admin access

## Notes

* Premium content access is restricted to users with an active subscription
* Admin users can also access protected premium content
* Payment flow is simulated for academic purposes
* The application is designed as part of a full-stack web development final project

## License

This project is licensed under the MIT License.

## Author

Anabel Reyes  
GitHub: https://github.com/anabelreyesweb-boop