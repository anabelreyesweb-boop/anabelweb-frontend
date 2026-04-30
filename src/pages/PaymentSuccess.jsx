import { Link } from 'react-router-dom';

function PaymentSuccess() {
  return (
    <section className="payment-result payment-result--success">
      <div className="payment-result__container">
        <h1>Payment Successful</h1>

        <p className="payment-result__intro">
          Your premium subscription has been activated successfully.
        </p>

        <div className="payment-result__card">
          <p>
            Thank you for subscribing. You now have access to all premium
            content available on the platform while your subscription remains
            active.
          </p>

          <p>
            You are already logged in, so you can go directly to your account,
            review your subscription details, or start exploring the premium
            content.
          </p>

          <div className="payment-result__actions">
            <Link to="/my-subscription" className="secondary-button">
              My Subscription
            </Link>

            <Link to="/premium" className="primary-button">
              View Premium Content
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentSuccess;