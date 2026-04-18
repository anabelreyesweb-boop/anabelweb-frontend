import { Link } from 'react-router-dom';

function PaymentSuccess() {
  return (
    <section className="payment-result payment-result--success">
      <div className="payment-result__container">
        <h1>Subscription Successful</h1>
        <p>
          Your account has been created successfully and your premium subscription is now active.
        </p>
        <p>
          A confirmation email has been sent as part of this simulated educational payment flow.
        </p>

        <div className="payment-result__actions">
          <Link to="/my-subscription" className="primary-button">
            My Subscription
          </Link>

          <Link to="/premium" className="secondary-button">
            View Premium Content
          </Link>

          <Link to="/profile" className="secondary-button">
            Go to Profile
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PaymentSuccess;