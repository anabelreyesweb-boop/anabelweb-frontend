import { useState } from 'react';
import { forgotPassword } from '../services/authService';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const data = await forgotPassword(email);
      setSuccessMessage(data.message);
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <h1>Forgot Password</h1>
      <p>
        Enter your email address and we will send you simulated password reset instructions.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="forgot-email">Email</label>
          <input
            id="forgot-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        {errorMessage && <p className="form-message error">{errorMessage}</p>}
        {successMessage && <p className="form-message success">{successMessage}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send reset instructions'}
        </button>
      </form>
    </section>
  );
}

export default ForgotPassword;