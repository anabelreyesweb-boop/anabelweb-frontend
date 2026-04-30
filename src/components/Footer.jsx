import { Link } from 'react-router-dom';
import logo from '../assets/images/home/logo.png';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container site-footer__grid">
        <div className="site-footer__column">
          <h3>Contact</h3>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:contact@aira.com">contact@aira.com</a>
          </p>
          <p>
            <strong>Phone:</strong>{' '}
            <a href="tel:+34111111111">+34 111111111</a>
          </p>
        </div>

        <div className="site-footer__column">
          <h3>Legal</h3>
          <p>
            <Link to="/cookies-policy">Cookies policy</Link>
          </p>
          <p>
            <Link to="/terms-of-use">Terms of use</Link>
          </p>
        </div>

        <div className="site-footer__column site-footer__logo-column">
          <img src={logo} alt="AIRA logo" className="site-footer__logo" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;