import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
      <section className="premium-detail-page-custom">
        <div className="premium-detail-page-custom__container">
          <h1>Premium Content Detail</h1>
          <p>Loading premium content...</p>
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="premium-detail-page-custom">
        <div className="premium-detail-page-custom__container">
          <h1>Premium Content Detail</h1>
          <p className="form-message error">{errorMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="premium-detail-page-custom">
      <div className="premium-detail-page-custom__container">
        <h1>{item.title}</h1>
        <p className="premium-detail-page-custom__intro">
          View the full premium resource and all its details below.
        </p>

        <div className="premium-detail-card">
          <p><strong>Slug:</strong> {item.slug}</p>

          {item.description && (
            <p><strong>Description:</strong> {item.description}</p>
          )}

          {item.support_text && (
            <p><strong>Support text:</strong> {item.support_text}</p>
          )}

          {item.topic && (
            <p><strong>Topic:</strong> {item.topic}</p>
          )}

          {item.video_url && (
            <p>
              <strong>Video URL:</strong>{' '}
              <a href={item.video_url} target="_blank" rel="noreferrer">
                {item.video_url}
              </a>
            </p>
          )}

          {item.cover_image && (
            <p>
              <strong>Cover image:</strong>{' '}
              <a href={item.cover_image} target="_blank" rel="noreferrer">
                {item.cover_image}
              </a>
            </p>
          )}
        </div>

        <div className="premium-detail-page-custom__actions">
          <Link to="/premium" className="secondary-button">
            Back to Premium Content
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PremiumDetail;