import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <Link to="/">Anabel Web</Link>
      </div>

      <nav className="navbar__nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/subscribe">Subscribe</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/my-subscription">My Subscription</Link>
            <Link to="/premium">Premium</Link>
            <button type="button" className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;