import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMySubscription } from '../services/authService';

function MySubscription() {
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  function formatDate(dateString) {
    if (!dateString) return '—';

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString();
  }

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
        setMessage('You are not logged in');
        setLoading(false);
        return;
      }

      try {
        const subscriptionData = await getMySubscription(token);
        setSubscription(subscriptionData);
      } catch (error) {
        setMessage('No active subscription found');
      } finally {
        setLoading(false);
      }
    }

    loadSubscription();
  }, []);

  if (loading) {
    return (
      <section>
        <h1>My Subscription</h1>
        <p>Loading subscription...</p>
      </section>
    );
  }

  const hasActiveSubscription = isSubscriptionActive(subscription);

  return (
    <section>
      <h1>My Subscription</h1>

      {subscription && hasActiveSubscription ? (
        <div className="profile-card">
          <h2>Subscription details</h2>
          <p><strong>Status:</strong> Active</p>
          <p><strong>Start date:</strong> {formatDate(subscription.start_date)}</p>
          <p><strong>End date:</strong> {formatDate(subscription.end_date)}</p>
          <p><strong>Price:</strong> {subscription.monthly_price} {subscription.currency}</p>
          <p><strong>Auto renewal:</strong> {subscription.auto_renewal ? 'Yes' : 'No'}</p>

          <div className="profile-actions">
            <Link to="/premium" className="primary-button">
              View Premium Content
            </Link>
          </div>
        </div>
      ) : (
        <div className="profile-card">
          <h2>No active subscription</h2>
          <p>
            {subscription
              ? 'Your previous subscription has expired.'
              : message || 'No active subscription found'}
          </p>

          {subscription && (
            <>
              <p><strong>Previous status:</strong> {subscription.status}</p>
              <p><strong>Start date:</strong> {formatDate(subscription.start_date)}</p>
              <p><strong>End date:</strong> {formatDate(subscription.end_date)}</p>
            </>
          )}

          <div className="profile-actions">
            <Link to="/subscribe" className="primary-button">
              Become a Subscriber
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default MySubscription;