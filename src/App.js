import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import MySubscription from './pages/MySubscription';
import Premium from './pages/Premium';
import PremiumDetail from './pages/PremiumDetail';
import AdminPremiumList from './pages/AdminPremiumList';
import AdminPremiumCreate from './pages/AdminPremiumCreate';
import AdminPremiumEdit from './pages/AdminPremiumEdit';
import SubscriptionPlans from './pages/SubscriptionPlans';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="subscribe" element={<SubscriptionPlans />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="payment-failed" element={<PaymentFailed />} />

          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="my-subscription"
            element={
              <PrivateRoute>
                <MySubscription />
              </PrivateRoute>
            }
          />

          <Route
            path="premium"
            element={
              <PrivateRoute>
                <Premium />
              </PrivateRoute>
            }
          />

          <Route
            path="premium/:slug"
            element={
              <PrivateRoute>
                <PremiumDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="admin/premium"
            element={
              <AdminRoute>
                <AdminPremiumList />
              </AdminRoute>
            }
          />

          <Route
            path="admin/premium/new"
            element={
              <AdminRoute>
                <AdminPremiumCreate />
              </AdminRoute>
            }
          />

          <Route
            path="admin/premium/edit/:id"
            element={
              <AdminRoute>
                <AdminPremiumEdit />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;