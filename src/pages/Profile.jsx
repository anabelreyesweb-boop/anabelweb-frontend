import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfile, getMySubscription } from '../services/authService';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem('profilePhoto') || ''
  );
  const [photoMessage, setPhotoMessage] = useState('');

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordMessage, setPasswordMessage] = useState('');

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

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    setPhotoMessage('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoMessage('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;

      if (typeof result === 'string') {
        setProfilePhoto(result);
        localStorage.setItem('profilePhoto', result);
        setPhotoMessage('Profile photo updated successfully (simulated).');
      }
    };

    reader.readAsDataURL(file);
  }

  function handlePasswordChange(event) {
    const { name, value } = event.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validatePasswordForm() {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'New password must be at least 6 characters';
    }

    if (!passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }

    return newErrors;
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();

    const validationErrors = validatePasswordForm();
    setPasswordErrors(validationErrors);
    setPasswordMessage('');

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setPasswordMessage(
      'Password updated successfully (simulated for the educational version).'
    );

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  }

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

          <div className="profile-photo-block">
            <div className="profile-photo-block__preview">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile preview"
                  className="profile-photo-block__image"
                />
              ) : (
                <div className="profile-photo-block__placeholder">
                  No photo
                </div>
              )}
            </div>

            <div className="profile-photo-block__content">
              <p><strong>ID:</strong> {profile.id}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>

              <label className="profile-photo-block__label" htmlFor="profilePhoto">
                Change photo
              </label>
              <input
                id="profilePhoto"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />

              {photoMessage && (
                <p className="form-message success">{photoMessage}</p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h2>Change Password</h2>
          <p className="profile-card__note">
            This password update is currently simulated for the educational
            version of the project.
          </p>

          <form className="auth-form" onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your current password"
              />
              {passwordErrors.currentPassword && (
                <p className="form-message error">
                  {passwordErrors.currentPassword}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your new password"
              />
              {passwordErrors.newPassword && (
                <p className="form-message error">{passwordErrors.newPassword}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                placeholder="Repeat your new password"
              />
              {passwordErrors.confirmNewPassword && (
                <p className="form-message error">
                  {passwordErrors.confirmNewPassword}
                </p>
              )}
            </div>

            {passwordMessage && (
              <p className="form-message success">{passwordMessage}</p>
            )}

            <button type="submit" className="primary-button">
              Update Password
            </button>
          </form>
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