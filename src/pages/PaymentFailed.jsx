import { Link } from 'react-router-dom';

function PaymentFailed() {
  return (
    <section className="payment-result payment-result--failed">
      <div className="payment-result__container">
        <h1>Subscription Cancelled</h1>
        <p>
          Your simulated payment was not completed, so your account and subscription were not created.
        </p>
        <p>
          You can return to the subscription page and try again whenever you want.
        </p>

        <div className="payment-result__actions">
          <Link to="/subscribe" className="primary-button">
            Try Again
          </Link>

          <Link to="/login" className="secondary-button">
            Go to Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PaymentFailed;