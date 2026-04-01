import { Link } from 'react-router-dom';

function Navbar() {
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
        <Link to="/login">Login</Link>
        <Link to="/register">Registro</Link>
        <Link to="/profile">Perfil</Link>
        <Link to="/premium">Premium</Link>
      </nav>
    </header>
  );
}

export default Navbar;