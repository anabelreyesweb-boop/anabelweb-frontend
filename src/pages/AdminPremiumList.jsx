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
      <section style={pageStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Admin Premium Content</h1>
          <p>Loading admin premium content...</p>
        </div>
      </section>
    );
  }

  return (
    <section style={pageStyle}>
      <div style={cardStyle}>
        <div style={headerRowStyle}>
          <div>
            <h1 style={titleStyle}>Admin Premium Content</h1>
            <p style={subtitleStyle}>
              Manage premium videos and protected content.
            </p>
          </div>

          <Link to="/admin/premium/new" style={linkResetStyle}>
            <button style={primaryButtonStyle}>+ New content</button>
          </Link>
        </div>

        {successMessage && (
          <div style={successBoxStyle}>{successMessage}</div>
        )}

        {error && <div style={errorBoxStyle}>{error}</div>}

        {contents.length === 0 ? (
          <div style={emptyBoxStyle}>
            <p style={{ margin: 0 }}>No premium content found.</p>
          </div>
        ) : (
          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>ID</th>
                  <th style={tableHeaderStyle}>Title</th>
                  <th style={tableHeaderStyle}>Slug</th>
                  <th style={tableHeaderStyle}>Topic</th>
                  <th style={tableHeaderStyle}>Published</th>
                  <th style={tableHeaderStyle}>Order</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((item) => (
                  <tr key={item.id}>
                    <td style={tableCellStyle}>{item.id}</td>
                    <td style={tableCellStyle}>{item.title}</td>
                    <td style={tableCellStyle}>{item.slug}</td>
                    <td style={tableCellStyle}>{item.topic || '-'}</td>
                    <td style={tableCellStyle}>
                      {item.published ? 'Yes' : 'No'}
                    </td>
                    <td style={tableCellStyle}>{item.display_order}</td>
                    <td style={tableCellStyle}>
                      <div style={actionsStyle}>
                        <Link
                          to={`/admin/premium/edit/${item.id}`}
                          style={linkResetStyle}
                        >
                          <button style={secondaryButtonStyle}>Edit</button>
                        </Link>

                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          style={dangerButtonStyle}
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

const pageStyle = {
  padding: '30px 20px',
};

const cardStyle = {
  maxWidth: '1100px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
};

const headerRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap',
  marginBottom: '20px',
};

const titleStyle = {
  margin: '0 0 8px 0',
};

const subtitleStyle = {
  margin: 0,
  color: '#666',
};

const tableWrapperStyle = {
  overflowX: 'auto',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const tableHeaderStyle = {
  textAlign: 'left',
  padding: '14px 12px',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#f8f9fb',
  fontSize: '14px',
};

const tableCellStyle = {
  padding: '14px 12px',
  borderBottom: '1px solid #eee',
  verticalAlign: 'top',
};

const actionsStyle = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
};

const primaryButtonStyle = {
  backgroundColor: '#111827',
  color: '#fff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
};

const secondaryButtonStyle = {
  backgroundColor: '#e5e7eb',
  color: '#111827',
  border: 'none',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer',
};

const dangerButtonStyle = {
  backgroundColor: '#dc2626',
  color: '#fff',
  border: 'none',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer',
};

const successBoxStyle = {
  backgroundColor: '#ecfdf5',
  color: '#065f46',
  border: '1px solid #a7f3d0',
  padding: '12px 14px',
  borderRadius: '10px',
  marginBottom: '16px',
};

const errorBoxStyle = {
  backgroundColor: '#fef2f2',
  color: '#991b1b',
  border: '1px solid #fecaca',
  padding: '12px 14px',
  borderRadius: '10px',
  marginBottom: '16px',
};

const emptyBoxStyle = {
  backgroundColor: '#f9fafb',
  border: '1px dashed #d1d5db',
  padding: '20px',
  borderRadius: '12px',
};

const linkResetStyle = {
  textDecoration: 'none',
};

export default AdminPremiumList;