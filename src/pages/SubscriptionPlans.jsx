import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getMySubscription } from '../services/authService';

function SubscriptionPlans() {
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  function isSubscriptionActive(subscriptionData) {
    if (!subscriptionData) return false;
    if (subscriptionData.status !== 'active') return false;
    if (!subscriptionData.end_date) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date(subscriptionData.end_date);
    endDate.setHours(0, 0, 0, 0);

    return endDate >= today;
  }

  useEffect(() => {
    async function loadSubscription() {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const subscriptionData = await getMySubscription(token);
        setSubscription(subscriptionData);
      } catch (error) {
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    }

    loadSubscription();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  }

  function handleContinueToCheckout(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    sessionStorage.setItem(
      'subscription_form_data',
      JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      })
    );

    navigate('/checkout');
  }

  const hasActiveSubscription = isSubscriptionActive(subscription);
  const token = localStorage.getItem('token');

  if (loading) {
    return (
      <section className="subscription-page">
        <div className="subscription-page__container">
          <h1>Become a Subscriber</h1>
          <p>Loading subscription information...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="subscription-page">
      <div className="subscription-page__container">
        <h1>Become a Subscriber</h1>
        <p className="subscription-page__intro">
          Unlock all premium content with one simple monthly plan.
        </p>

        <div className="subscription-card">
          <h2>Premium Subscription</h2>
          <p className="subscription-card__price">€10 / month</p>

          <ul className="subscription-card__features">
            <li>Access to all premium content</li>
            <li>Subscriber-only resources</li>
            <li>Unlimited access while your subscription is active</li>
          </ul>

          {token && hasActiveSubscription ? (
            <div className="checkout-message-box">
              <p className="form-message success">
                You already have an active subscription.
              </p>

              <div className="checkout-card__actions">
                <Link to="/my-subscription" className="secondary-button">
                  My Subscription
                </Link>

                <Link to="/premium" className="primary-button">
                  Go to Premium
                </Link>
              </div>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleContinueToCheckout}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="form-message error">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="form-message error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="form-message error">{errors.password}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                />
                {errors.confirmPassword && (
                  <p className="form-message error">{errors.confirmPassword}</p>
                )}
              </div>

              <button type="submit" className="primary-button">
                Continue to Checkout
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default SubscriptionPlans;