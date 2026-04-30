import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPremiumContent } from '../services/authService';

function AdminPremiumCreate() {
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

  const [slugEditedManually, setSlugEditedManually] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const errors = validateForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await createPremiumContent(token, formData);
      navigate('/admin/premium');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const showCoverPreview =
    formData.cover_image.trim() && isValidUrl(formData.cover_image);

  return (
    <section className="admin-page-custom">
      <div className="admin-form-page-custom__container">
        <div className="admin-page-custom__header">
          <div>
            <h1>Create Premium Content</h1>
            <p className="admin-page-custom__intro">
              Add a new premium video or protected resource.
            </p>
          </div>

          <Link to="/admin/premium" className="secondary-button">
            Back to Admin List
          </Link>
        </div>

        {error && (
          <div className="admin-message admin-message--error">
            {error}
          </div>
        )}

        <div className="admin-form-card">
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={fieldErrors.title ? 'admin-input-error' : ''}
              />
              {fieldErrors.title && (
                <p className="form-message error">{fieldErrors.title}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="slug">Slug</label>
              <input
                id="slug"
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className={fieldErrors.slug ? 'admin-input-error' : ''}
              />
              {fieldErrors.slug && (
                <p className="form-message error">{fieldErrors.slug}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="admin-textarea"
              />
            </div>

            <div className="form-group">
              <label htmlFor="support_text">Support text</label>
              <textarea
                id="support_text"
                name="support_text"
                value={formData.support_text}
                onChange={handleChange}
                rows="4"
                className="admin-textarea"
              />
            </div>

            <div className="form-group">
              <label htmlFor="video_url">Video URL</label>
              <input
                id="video_url"
                type="text"
                name="video_url"
                value={formData.video_url}
                onChange={handleChange}
                required
                className={fieldErrors.video_url ? 'admin-input-error' : ''}
              />
              {fieldErrors.video_url && (
                <p className="form-message error">{fieldErrors.video_url}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cover_image">Cover image</label>
              <input
                id="cover_image"
                type="text"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleChange}
                className={fieldErrors.cover_image ? 'admin-input-error' : ''}
              />
              {fieldErrors.cover_image && (
                <p className="form-message error">{fieldErrors.cover_image}</p>
              )}
            </div>

            {showCoverPreview && (
              <div className="admin-preview-box">
                <p className="admin-preview-box__title">Cover preview</p>
                <img
                  src={formData.cover_image}
                  alt="Cover preview"
                  className="admin-preview-box__image"
                />
              </div>
            )}

            <div className="admin-form__two-columns">
              <div className="form-group">
                <label htmlFor="topic">Topic</label>
                <input
                  id="topic"
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="display_order">Display order</label>
                <input
                  id="display_order"
                  type="number"
                  name="display_order"
                  value={formData.display_order}
                  onChange={handleChange}
                  className={fieldErrors.display_order ? 'admin-input-error' : ''}
                />
                {fieldErrors.display_order && (
                  <p className="form-message error">
                    {fieldErrors.display_order}
                  </p>
                )}
              </div>
            </div>

            <div className="admin-checkbox-row">
              <label className="admin-checkbox-label" htmlFor="published">
                <input
                  id="published"
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                />
                <span>Published</span>
              </label>
            </div>

            <div className="admin-form__actions">
              <Link to="/admin/premium" className="secondary-button">
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="primary-button"
              >
                {loading ? 'Creating...' : 'Create Content'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AdminPremiumCreate;