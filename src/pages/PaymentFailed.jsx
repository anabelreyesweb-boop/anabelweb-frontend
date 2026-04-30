import { Link } from 'react-router-dom';

function PaymentFailed() {
  return (
    <section className="payment-result payment-result--failed">
      <div className="payment-result__container">
        <h1>Payment Cancelled</h1>

        <p className="payment-result__intro">
          Your subscription process was not completed.
        </p>

        <div className="payment-result__card">
          <p>
            No problem. You can go back and try again whenever you are ready.
          </p>

          <p>
            Your premium subscription has not been activated yet. If you still
            want access to all premium content, you can return to the
            subscription page and continue the process.
          </p>

          <div className="payment-result__actions">
            <Link to="/subscribe" className="secondary-button">
              Back to Subscribe
            </Link>

            <Link to="/checkout" className="primary-button">
              Return to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentFailed;