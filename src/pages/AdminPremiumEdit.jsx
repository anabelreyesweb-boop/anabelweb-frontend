import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getAdminPremiumContentById,
  updatePremiumContent,
} from '../services/authService';

function AdminPremiumEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    support_text: '',
    video_url: '',
    cover_image: '',
    topic: '',
    display_order: 0,
    published: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [slugEditedManually, setSlugEditedManually] = useState(true);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const isValidUrl = (value) => {
    if (!value.trim()) return false;

    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required.';
    }

    if (!formData.slug.trim()) {
      errors.slug = 'Slug is required.';
    }

    if (!formData.video_url.trim()) {
      errors.video_url = 'Video URL is required.';
    } else if (!isValidUrl(formData.video_url)) {
      errors.video_url = 'Please enter a valid URL.';
    }

    if (formData.cover_image.trim() && !isValidUrl(formData.cover_image)) {
      errors.cover_image = 'Please enter a valid URL.';
    }

    if (
      formData.display_order !== '' &&
      Number.isNaN(Number(formData.display_order))
    ) {
      errors.display_order = 'Display order must be a number.';
    }

    return errors;
  };

  useEffect(() => {
    const fetchPremiumContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getAdminPremiumContentById(token, id);

        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          description: data.description || '',
          support_text: data.support_text || '',
          video_url: data.video_url || '',
          cover_image: data.cover_image || '',
          topic: data.topic || '',
          display_order: data.display_order || 0,
          published: !!data.published,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumContent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFieldErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    if (name === 'title') {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: slugEditedManually ? prev.slug : generateSlug(value),
      }));
      return;
    }

    if (name === 'slug') {
      setSlugEditedManually(true);
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const errors = validateForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      await updatePremiumContent(token, id, formData);
      navigate('/admin/premium');
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const showCoverPreview =
    formData.cover_image.trim() && isValidUrl(formData.cover_image);

  if (loading) {
    return (
      <section style={pageStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Edit Premium Content</h1>
          <p>Loading premium content...</p>
        </div>
      </section>
    );
  }

  return (
    <section style={pageStyle}>
      <div style={cardStyle}>
        <div style={topBarStyle}>
          <div>
            <h1 style={titleStyle}>Edit Premium Content</h1>
            <p style={subtitleStyle}>
              Update an existing premium video or protected resource.
            </p>
          </div>

          <Link to="/admin/premium" style={linkResetStyle}>
            <button style={secondaryButtonStyle}>← Back to admin list</button>
          </Link>
        </div>

        {error && <div style={errorBoxStyle}>{error}</div>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={fieldErrors.title ? inputErrorStyle : inputStyle}
            />
            {fieldErrors.title && (
              <p style={fieldErrorTextStyle}>{fieldErrors.title}</p>
            )}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              style={fieldErrors.slug ? inputErrorStyle : inputStyle}
            />
            {fieldErrors.slug && (
              <p style={fieldErrorTextStyle}>{fieldErrors.slug}</p>
            )}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              style={textareaStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Support text</label>
            <textarea
              name="support_text"
              value={formData.support_text}
              onChange={handleChange}
              rows="4"
              style={textareaStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Video URL</label>
            <input
              type="text"
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              required
              style={fieldErrors.video_url ? inputErrorStyle : inputStyle}
            />
            {fieldErrors.video_url && (
              <p style={fieldErrorTextStyle}>{fieldErrors.video_url}</p>
            )}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Cover image</label>
            <input
              type="text"
              name="cover_image"
              value={formData.cover_image}
              onChange={handleChange}
              style={fieldErrors.cover_image ? inputErrorStyle : inputStyle}
            />
            {fieldErrors.cover_image && (
              <p style={fieldErrorTextStyle}>{fieldErrors.cover_image}</p>
            )}
          </div>

          {showCoverPreview && (
            <div style={previewBoxStyle}>
              <p style={previewTitleStyle}>Cover preview</p>
              <img
                src={formData.cover_image}
                alt="Cover preview"
                style={previewImageStyle}
              />
            </div>
          )}

          <div style={twoColumnsStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Topic</label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Display order</label>
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleChange}
                style={fieldErrors.display_order ? inputErrorStyle : inputStyle}
              />
              {fieldErrors.display_order && (
                <p style={fieldErrorTextStyle}>{fieldErrors.display_order}</p>
              )}
            </div>
          </div>

          <div style={checkboxRowStyle}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
              />
              <span>Published</span>
            </label>
          </div>

          <div style={actionsStyle}>
            <Link to="/admin/premium" style={linkResetStyle}>
              <button type="button" style={secondaryButtonStyle}>
                Cancel
              </button>
            </Link>

            <button type="submit" disabled={saving} style={primaryButtonStyle}>
              {saving ? 'Saving...' : 'Update content'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const pageStyle = {
  padding: '30px 20px',
};

const cardStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
};

const topBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
  flexWrap: 'wrap',
  marginBottom: '24px',
};

const titleStyle = {
  margin: '0 0 8px 0',
};

const subtitleStyle = {
  margin: 0,
  color: '#666',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

const twoColumnsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '16px',
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  marginBottom: '8px',
  fontWeight: '600',
  color: '#111827',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid #d1d5db',
  borderRadius: '10px',
  boxSizing: 'border-box',
  fontSize: '14px',
};

const inputErrorStyle = {
  ...inputStyle,
  border: '1px solid #dc2626',
  backgroundColor: '#fef2f2',
};

const textareaStyle = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid #d1d5db',
  borderRadius: '10px',
  boxSizing: 'border-box',
  fontSize: '14px',
  resize: 'vertical',
};

const previewBoxStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  padding: '14px',
  backgroundColor: '#f9fafb',
};

const previewTitleStyle = {
  margin: '0 0 12px 0',
  fontWeight: '600',
};

const previewImageStyle = {
  width: '100%',
  maxWidth: '320px',
  height: 'auto',
  borderRadius: '10px',
  display: 'block',
  border: '1px solid #d1d5db',
};

const checkboxRowStyle = {
  paddingTop: '4px',
};

const checkboxLabelStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontWeight: '500',
};

const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  flexWrap: 'wrap',
  marginTop: '8px',
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
  padding: '10px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
};

const errorBoxStyle = {
  backgroundColor: '#fef2f2',
  color: '#991b1b',
  border: '1px solid #fecaca',
  padding: '12px 14px',
  borderRadius: '10px',
  marginBottom: '16px',
};

const fieldErrorTextStyle = {
  margin: '6px 0 0 0',
  fontSize: '13px',
  color: '#b91c1c',
};

const linkResetStyle = {
  textDecoration: 'none',
};

export default AdminPremiumEdit;