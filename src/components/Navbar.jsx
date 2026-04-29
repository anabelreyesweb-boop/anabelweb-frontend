import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/home/logo.png';

function Navbar() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem('token'));
      setUser(JSON.parse(localStorage.getItem('user')) || null);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('storage', syncAuth);
    window.addEventListener('authChanged', syncAuth);
    window.addEventListener('resize', handleResize);

    syncAuth();

    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('authChanged', syncAuth);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authChanged'));
    closeMenu();
    navigate('/login');
  }

  const isAdmin = user?.role === 'admin';

  return (
    <header className="site-navbar">
      <div className="site-navbar__inner">
        <Link to="/" className="site-navbar__brand" onClick={closeMenu}>
          <img src={logo} alt="AIRA logo" className="site-navbar__logo" />
        </Link>

        <button
          type="button"
          className={`site-navbar__burger ${isMenuOpen ? 'is-open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className="site-navbar__desktop">
          <NavLink to="/" className={({ isActive }) => `site-navbar__link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `site-navbar__link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `site-navbar__link ${isActive ? 'active' : ''}`}>
            Services
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `site-navbar__link ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>

          {!token ? (
            <>
              <NavLink to="/login" className={({ isActive }) => `site-navbar__link ${isActive ? 'active' : ''}`}>
                Login
              </NavLink>
              <NavLink to="/subscribe" className="site-navbar__link">
                Subscribe
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className={({ isActive }) => `site-navbar__link ${isActive ? 'active' : ''}`}>
                Profile
              </NavLink>
              <NavLink to="/my-subscription" className={({ isActive }) => `site-navbar__link ${isActive ? 'active' : ''}`}>
                My Subscription
              </NavLink>
              <NavLink to="/premium" className={({ isActive }) => `site-navbar__link ${isActive ? 'active' : ''}`}>
                Premium Content
              </NavLink>

              {isAdmin && (
                <NavLink to="/admin/premium" className={({ isActive }) => `site-navbar__link ${isActive ? 'active' : ''}`}>
                  Admin
                </NavLink>
              )}

              <button
                type="button"
                className="site-navbar__logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      <div
        className={`site-navbar__overlay ${isMenuOpen ? 'is-open' : ''}`}
        onClick={closeMenu}
      ></div>

      <nav
        id="mobile-navigation"
        className={`site-navbar__mobile ${isMenuOpen ? 'is-open' : ''}`}
      >
        <div className="site-navbar__mobile-inner">
          <NavLink
            to="/"
            className={({ isActive }) => `site-navbar__mobile-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `site-navbar__mobile-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) => `site-navbar__mobile-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Services
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `site-navbar__mobile-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          {!token ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => `site-navbar__mobile-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Login
              </NavLink>

              <NavLink
                to="/subscribe"
                className="site-navbar__mobile-link"
                onClick={closeMenu}
              >
                Subscribe
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) => `site-navbar__mobile-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Profile
              </NavLink>

              <NavLink
                to="/my-subscription"
                className={({ isActive }) => `site-navbar__mobile-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                My Subscription
              </NavLink>

              <NavLink
                to="/premium"
                className={({ isActive }) => `site-navbar__mobile-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Premium Content
              </NavLink>

              {isAdmin && (
                <NavLink
                  to="/admin/premium"
                  className={({ isActive }) => `site-navbar__mobile-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Admin
                </NavLink>
              )}

              <button
                type="button"
                className="site-navbar__mobile-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;