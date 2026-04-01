import { useEffect, useState } from 'react';
import { getProfile, getMySubscription } from '../services/authService';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [loading, setLoading] = useState(true);

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
      <section>
        <h1>Perfil</h1>
        <p>Loading profile...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section>
        <h1>Perfil</h1>
        <p className="form-message error">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Perfil</h1>

      <div className="profile-card">
        <h2>User information</h2>
        <p><strong>ID:</strong> {profile.id}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
      </div>

      {subscription ? (
        <div className="profile-card">
          <h2>Subscription</h2>
          <p><strong>Status:</strong> {subscription.status}</p>
          <p><strong>Start date:</strong> {subscription.start_date}</p>
          <p><strong>End date:</strong> {subscription.end_date}</p>
          <p><strong>Price:</strong> {subscription.monthly_price} {subscription.currency}</p>
          <p><strong>Auto renewal:</strong> {subscription.auto_renewal ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <div className="profile-card">
          <h2>Subscription</h2>
          <p>{subscriptionMessage || 'No subscription found'}</p>
        </div>
      )}
    </section>
  );
}

export default Profile;