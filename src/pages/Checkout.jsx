import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeUser, loginUser } from '../services/authService';

function Checkout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [subscriptionData, setSubscriptionData] = useState(null);

  const [cardData, setCardData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    const storedData = sessionStorage.getItem('subscription_form_data');

    if (!storedData) {
      navigate('/subscribe');
      return;
    }

    try {
      const parsedData = JSON.parse(storedData);
      setSubscriptionData(parsedData);
    } catch (error) {
      navigate('/subscribe');
    }
  }, [navigate]);

  async function handlePayment(event) {
    event.preventDefault();

    if (!subscriptionData) {
      navigate('/subscribe');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      await subscribeUser(
        subscriptionData.name,
        subscriptionData.email,
        subscriptionData.password
      );

      const loginData = await loginUser(
        subscriptionData.email,
        subscriptionData.password
      );

      localStorage.setItem('token', loginData.token);
      localStorage.setItem('user', JSON.stringify(loginData.user));
      window.dispatchEvent(new Event('authChanged'));

      sessionStorage.removeItem('subscription_form_data');
      navigate('/payment-success');
    } catch (error) {
      setErrorMessage(error.message || 'Payment could not be processed');
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    sessionStorage.removeItem('subscription_form_data');
    navigate('/payment-failed');
  }

  if (!subscriptionData) {
    return (
      <section className="checkout-page">
        <div className="checkout-page__container">
          <h1>Checkout</h1>
          <p>Loading checkout information...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-page__container">
        <h1>Checkout</h1>
        <p className="checkout-page__intro">
          Complete your simulated payment to activate your premium subscription.
        </p>

        <div className="checkout-card">
          <h2>Order Summary</h2>

          <div className="checkout-card__row">
            <span>Plan</span>
            <span>Premium Subscription</span>
          </div>

          <div className="checkout-card__row">
            <span>Billing</span>
            <span>Monthly</span>
          </div>

          <div className="checkout-card__row">
            <span>Email</span>
            <span>{subscriptionData.email}</span>
          </div>

          <div className="checkout-card__row checkout-card__row--total">
            <span>Total</span>
            <span>€10</span>
          </div>

          <form className="auth-form" onSubmit={handlePayment}>
            <div className="form-group">
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                id="cardName"
                name="cardName"
                type="text"
                value={cardData.cardName}
                onChange={handleChange}
                placeholder="Enter cardholder name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={cardData.cardNumber}
                onChange={handleChange}
                placeholder="1111 2222 3333 4444"
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                id="expiryDate"
                name="expiryDate"
                type="text"
                value={cardData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                name="cvv"
                type="text"
                value={cardData.cvv}
                onChange={handleChange}
                placeholder="123"
              />
            </div>

            <p className="checkout-note">
              This is a simulated payment form for educational purposes. Any card
              details entered here will be accepted.
            </p>

            {errorMessage && (
              <div className="checkout-message-box">
                <p className="form-message error">{errorMessage}</p>
              </div>
            )}

            <div className="checkout-card__actions">
              <button
                type="submit"
                className="primary-button"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Checkout;