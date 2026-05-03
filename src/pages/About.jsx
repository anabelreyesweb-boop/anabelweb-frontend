import { Link } from 'react-router-dom';
import mepic from '../assets/images/about/mepic.png';

function About() {
  return (
    <section className="about-page-custom">
      <div className="about-page-custom__hero">
        <img
          src={mepic}
          alt="Woman working on a laptop"
          className="about-page-custom__image"
        />
      </div>

      <div className="about-page-custom__content">
        <h1>About us</h1>

        <p>
          Turn your vision into reality, your online presence into a sales
          machine, and your target audience into loyal customers by working with
          me as your digital partner.
        </p>

        <p>
          We create websites that not only communicate your brand clearly and
          professionally, but also connect with your audience through a smooth
          and user-friendly experience.
        </p>

        <p>
          We are passionate about building modern digital
          solutions that combine design, clarity, and functionality to help
          businesses strengthen their online identity.
        </p>

        <h2>Transform your website with us!</h2>

        <p>
          We work to help transform your brand into something strong, clear, and
          memorable. We aim to offer high-quality solutions at affordable prices,
          always focusing on both visual impact and real usefulness.
        </p>

        <p>
          We place great importance on quality, and in order to keep improving, we
          continue learning new skills and technologies so we can meet your
          expectations and deliver the best possible results.
        </p>

        <p>
          A well-designed website should reflect the value of a business and
          support its growth. That is why we focus on creating professional web
          design and development solutions that help brands stand out online.
        </p>

        <div className="about-page-custom__action">
          <Link to="/contact" className="home-custom__cta-button">
            Contact now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default About;