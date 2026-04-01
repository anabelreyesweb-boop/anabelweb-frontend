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
      <section>
        <h1>Zona Premium</h1>
        <p>Loading premium content...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section>
        <h1>Zona Premium</h1>
        <p className="form-message error">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Zona Premium</h1>

      {items.length === 0 ? (
        <p>No premium content available.</p>
      ) : (
        <div className="premium-grid">
          {items.map((item) => (
            <article key={item.id} className="premium-card">
              <h2>{item.title}</h2>
              <p>{item.excerpt || 'No excerpt available.'}</p>
              <Link to={`/premium/${item.slug}`} className="premium-link">
                View details
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Premium;