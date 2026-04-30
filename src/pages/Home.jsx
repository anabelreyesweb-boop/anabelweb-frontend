import { Link } from 'react-router-dom';
import heroImage from '../assets/images/home/home1pic.png';
import devImage from '../assets/images/home/devsm.png';
import coursesImage from '../assets/images/home/cousm.png';
import fullStackImage from '../assets/images/home/home2pic.png';
import onlineCoursesImage from '../assets/images/home/home3pic.png';

function Home() {
  return (
    <section className="home-custom">
      <div className="home-custom__hero">
        <img
          src={heroImage}
          alt="Laptop showing mobile design examples"
          className="home-custom__hero-image"
        />
      </div>

      <div className="home-custom__intro">
        <div className="page-container">
          <h1>I help you stand out and generate more leads and sales.</h1>
        </div>
      </div>

      <div className="home-custom__services">
        <div className="page-container">
          <div className="home-custom__service-grid">
            <Link to="/services" className="home-custom__service-card-link">
              <article className="home-custom__service-card">
                <img
                  src={devImage}
                  alt="Web design and development"
                  className="home-custom__service-image"
                />
                <h2>Web Design and Development</h2>
              </article>
            </Link>

            <Link
              to="/services#online-courses"
              className="home-custom__service-card-link"
            >
              <article className="home-custom__service-card">
                <img
                  src={coursesImage}
                  alt="Online courses"
                  className="home-custom__service-image"
                />
                <h2>Online courses</h2>
              </article>
            </Link>
          </div>
        </div>
      </div>

      <div className="home-custom__feature">
        <div className="page-container">
          <h2 className="home-custom__feature-title">
            Full Stack Web Design &amp; Development
          </h2>

          <img
            src={fullStackImage}
            alt="Full stack web design and development showcase"
            className="home-custom__feature-image"
          />

          <p className="home-custom__feature-text">
            My passion is helping my clients solve problems and grow their
            businesses by offering cutting-edge solutions tailored to their
            specific needs.
          </p>

          <div className="home-custom__feature-action">
            <Link to="/services" className="home-custom__cta-button">
              Read more
            </Link>
          </div>
        </div>
      </div>

      <div className="home-custom__courses">
        <div className="page-container">
          <h2 className="home-custom__courses-title">Online Courses</h2>

          <img
            src={onlineCoursesImage}
            alt="Online courses section"
            className="home-custom__courses-image"
          />

          <p className="home-custom__courses-text">
            Access all the courses you need to improve your project on a single
            platform for just €10 per month
          </p>

          <div className="home-custom__courses-action">
            <Link
              to="/services#online-courses"
              className="home-custom__cta-button"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;