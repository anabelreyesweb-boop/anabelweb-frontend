import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfile, getMySubscription } from '../services/authService';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
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
    async function loadProfileData() {
      const token = localStorage.getItem('token');

      if (!token) {
        setErrorMessage('You are not logged in');
        setLoading(false);
        return;
      }

      try {
        const profileData = await getProfile(token);
        setProfile(profileData.user);
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      try {
        const subscriptionData = await getMySubscription(token);
        setSubscription(subscriptionData);
      } catch (error) {
        setSubscriptionMessage('No subscription found');
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, []);

  if (loading) {
    return (
      <section className="profile-page-custom">
        <div className="profile-page-custom__container">
          <h1>Profile</h1>
          <p>Loading profile...</p>
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="profile-page-custom">
        <div className="profile-page-custom__container">
          <h1>Profile</h1>
          <p className="form-message error">{errorMessage}</p>
        </div>
      </section>
    );
  }

  const hasActiveSubscription = isSubscriptionActive(subscription);

  return (
    <section className="profile-page-custom">
      <div className="profile-page-custom__container">
        <h1>Profile</h1>
        <p className="profile-page-custom__intro">
          Review your account details and manage your subscription from here.
        </p>

        <div className="profile-card">
          <h2>Personal Information</h2>
          <p><strong>ID:</strong> {profile.id}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>

        {subscription && hasActiveSubscription ? (
          <div className="profile-card">
            <h2>Subscription</h2>
            <p><strong>Status:</strong> Active</p>
            <p><strong>Start date:</strong> {formatDate(subscription.start_date)}</p>
            <p><strong>End date:</strong> {formatDate(subscription.end_date)}</p>
            <p><strong>Price:</strong> {subscription.monthly_price} {subscription.currency}</p>
            <p><strong>Auto renewal:</strong> {subscription.auto_renewal ? 'Yes' : 'No'}</p>

            <div className="profile-actions">
              <Link to="/my-subscription" className="secondary-button">
                My Subscription
              </Link>

              <Link to="/premium" className="primary-button">
                View Premium Content
              </Link>
            </div>
          </div>
        ) : (
          <div className="profile-card">
            <h2>Subscription</h2>
            <p>
              {subscription
                ? 'Your previous subscription has expired.'
                : subscriptionMessage || 'No subscription found'}
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

              <Link to="/my-subscription" className="secondary-button">
                My Subscription
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;