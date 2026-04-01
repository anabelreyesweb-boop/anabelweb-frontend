import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPremiumContentBySlug } from '../services/authService';

function PremiumDetail() {
  const { slug } = useParams();

  const [item, setItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPremiumDetail() {
      const token = localStorage.getItem('token');

      if (!token) {
        setErrorMessage('You are not logged in');
        setLoading(false);
        return;
      }

      try {
        const data = await getPremiumContentBySlug(token, slug);
        setItem(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPremiumDetail();
  }, [slug]);

  if (loading) {
    return (
      <section>
        <h1>Detalle Premium</h1>
        <p>Loading premium content...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section>
        <h1>Detalle Premium</h1>
        <p className="form-message error">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>{item.title}</h1>
      <div className="premium-detail-card">
        <p><strong>Slug:</strong> {item.slug}</p>
        {item.excerpt && <p><strong>Excerpt:</strong> {item.excerpt}</p>}
        {item.content && <p><strong>Content:</strong> {item.content}</p>}
      </div>
    </section>
  );
}

export default PremiumDetail;