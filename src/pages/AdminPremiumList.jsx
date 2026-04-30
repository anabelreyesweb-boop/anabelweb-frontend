import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAdminPremiumContent,
  deletePremiumContent,
} from '../services/authService';

function AdminPremiumList() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadPremiumContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getAdminPremiumContent(token);
        setContents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPremiumContent();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await deletePremiumContent(token, id);

      setContents((prevContents) =>
        prevContents.filter((item) => item.id !== id)
      );
      setSuccessMessage('Content deleted successfully.');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccessMessage('');
    }
  };

  if (loading) {
    return (
      <section className="admin-page-custom">
        <div className="admin-page-custom__container">
          <h1>Admin Premium Content</h1>
          <p>Loading admin premium content...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page-custom">
      <div className="admin-page-custom__container">
        <div className="admin-page-custom__header">
          <div>
            <h1>Admin Premium Content</h1>
            <p className="admin-page-custom__intro">
              Manage premium videos and protected content.
            </p>
          </div>

          <Link to="/admin/premium/new" className="primary-button">
            + New Content
          </Link>
        </div>

        {successMessage && (
          <div className="admin-message admin-message--success">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="admin-message admin-message--error">
            {error}
          </div>
        )}

        {contents.length === 0 ? (
          <div className="admin-empty-box">
            <p>No premium content found.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Topic</th>
                  <th>Published</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.slug}</td>
                    <td>{item.topic || '-'}</td>
                    <td>{item.published ? 'Yes' : 'No'}</td>
                    <td>{item.display_order}</td>
                    <td>
                      <div className="admin-table__actions">
                        <Link
                          to={`/admin/premium/edit/${item.id}`}
                          className="secondary-button"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          className="admin-danger-button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminPremiumList;