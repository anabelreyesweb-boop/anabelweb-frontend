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
        <Link to="/about">Sobre mí</Link>
        <Link to="/services">Servicios</Link>
        <Link to="/contact">Contacto</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Perfil</Link>
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