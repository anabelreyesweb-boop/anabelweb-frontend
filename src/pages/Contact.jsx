import contactpic from '../assets/images/contact/contactpic.png';

function Contact() {
  return (
    <section className="contact-page-custom">
      <div className="contact-page-custom__hero">
        <img
          src={contactpic}
          alt="Contact section"
          className="contact-page-custom__image"
        />
      </div>

      <div className="contact-page-custom__content">
        <h1>Contact</h1>

        <p>
          If you would like to work with me, ask a question, or talk about your
          project, I would be happy to hear from you.
        </p>

        <p>
          Whether you need a professional website, want to improve your online
          presence, or are interested in the learning platform, we can discuss
          the best option for your goals.
        </p>

        <p>
          I believe every project deserves clear communication, attention to
          detail, and solutions adapted to real needs. Getting in touch is the
          first step.
        </p>

        <div className="contact-page-custom__info">
          <div className="contact-page-custom__info-item">
            <h2>Email</h2>
            <p>
              <a href="mailto:contact@aira.com">contact@aira.com</a>
            </p>
          </div>

          <div className="contact-page-custom__info-item">
            <h2>Phone</h2>
            <p>
              <a href="tel:+34111111111">+34 111 111 111</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;