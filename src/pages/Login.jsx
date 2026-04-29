import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const data = await loginUser(formData.email, formData.password);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('authChanged'));

      setSuccessMessage('Login successful');

      setTimeout(() => {
        navigate('/profile');
      }, 800);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <h1>Login</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="auth-links">
          <Link to="/forgot-password" className="auth-link">
            Forgot your password?
          </Link>

          <Link to="/subscribe" className="auth-link">
            Need an account? Subscribe here
          </Link>
        </div>

        {errorMessage && <p className="form-message error">{errorMessage}</p>}
        {successMessage && <p className="form-message success">{successMessage}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Log in'}
        </button>
      </form>
    </section>
  );
}

export default Login;