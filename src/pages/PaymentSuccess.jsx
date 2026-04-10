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
          <Link to="/login" className="primary-button">
            Go to Login
          </Link>

          <Link to="/my-subscription" className="secondary-button">
            My Subscription
          </Link>

          <Link to="/premium" className="secondary-button">
            View Premium Content
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PaymentSuccess;