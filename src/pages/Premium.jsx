import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPremiumContent } from '../services/authService';

function Premium() {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPremiumContent() {
      const token = localStorage.getItem('token');

      if (!token) {
        setErrorMessage('You are not logged in');
        setLoading(false);
        return;
      }

      try {
        const data = await getPremiumContent(token);
        setItems(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPremiumContent();
  }, []);

  if (loading) {
    return (
      <section className="premium-page-custom">
        <div className="premium-page-custom__container">
          <h1>Premium Content</h1>
          <p>Loading premium content...</p>
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="premium-page-custom">
        <div className="premium-page-custom__container">
          <h1>Premium Content</h1>
          <p className="form-message error">{errorMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="premium-page-custom">
      <div className="premium-page-custom__container">
        <h1>Premium Content</h1>
        <p className="premium-page-custom__intro">
          Explore all the premium resources available with your active subscription.
        </p>

        {items.length === 0 ? (
          <div className="premium-page-custom__empty">
            <p>No premium content available.</p>
          </div>
        ) : (
          <div className="premium-grid">
            {items.map((item) => (
              <article key={item.id} className="premium-card">
                <h2>{item.title}</h2>
                <p>{item.excerpt || item.description || 'No description available.'}</p>
                <Link to={`/premium/${item.slug}`} className="premium-link">
                  View details
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Premium;