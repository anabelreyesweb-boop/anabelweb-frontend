import { useLayoutEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import uxPageImage from '../assets/images/services/uxpage.png';
import coursesPageImage from '../assets/images/services/curpage.png';

function Services() {
  const location = useLocation();

  useLayoutEffect(() => {
    const headerOffset = 78;

    if (location.hash === '#online-courses') {
      const element = document.getElementById('online-courses');

      if (element) {
        const top =
          element.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo(0, top);
      }

      return;
    }

    window.scrollTo(0, 0);
  }, [location]);

  const courseBenefits = [
    'Available 24/7',
    'Flat-rate access',
    'Two new classes every day',
    'Includes support and plugins',
  ];

  const relatedCourses = [
    {
      title: 'HTML and CSS Course',
      description:
        'Learn how to build the structure and visual style of a professional website from scratch.',
    },
    {
      title: 'JavaScript Course',
      description:
        'Master the fundamentals of programming to add interaction and dynamic features to your pages.',
    },
    {
      title: 'React Course',
      description:
        'Build modern and scalable user interfaces for current web projects.',
    },
    {
      title: 'Node.js Course',
      description:
        'Discover how to create the backend side of your web applications.',
    },
    {
      title: 'UX/UI Course',
      description:
        'Learn how to design intuitive and attractive digital experiences for your users.',
    },
    {
      title: 'Responsive Design Course',
      description:
        'Make your websites work perfectly on mobile, tablet, and desktop devices.',
    },
    {
      title: 'Git and GitHub Course',
      description:
        'Learn version control and organize your work efficiently across your projects.',
    },
    {
      title: 'REST API Course',
      description:
        'Connect frontend and backend to create complete web applications.',
    },
    {
      title: 'AI for Web Development Course',
      description:
        'Use artificial intelligence to create, improve, and speed up your web projects.',
    },
    {
      title: 'WordPress Course',
      description:
        'Build professional and manageable websites with one of the most widely used platforms.',
    },
    {
      title: 'SEO for Websites Course',
      description:
        'Improve your site visibility to attract more visits and potential clients.',
    },
    {
      title: 'Automation Course',
      description:
        'Learn how to save time by integrating tools, workflows, and automated processes.',
    },
  ];

  return (
    <section className="services-page-custom">
      <div className="services-page-custom__block">
        <img
          src={uxPageImage}
          alt="Web Design and Development"
          className="services-page-custom__image"
        />

        <div className="services-page-custom__content">
          <h1>Web Design and Development</h1>
          <p>
            I help you create modern, attractive, and functional websites
            adapted to the needs of your project or business.
          </p>
          <p>
            We can work on anything from a simple business website to a more
            complete project with frontend, backend, databases, forms,
            authentication, and custom content.
          </p>
          <p>
            The goal is to give you a professional and clear website prepared to
            support your brand, attract clients, and help your project grow.
          </p>

          <div className="services-page-custom__action">
            <Link to="/contact" className="home-custom__cta-button">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div id="online-courses" className="services-page-custom__block">
        <img
          src={coursesPageImage}
          alt="Online courses"
          className="services-page-custom__image"
        />

        <div className="services-page-custom__content">
          <h2>Online Courses</h2>
          <p>
            Access practical courses to learn web development, web design,
            artificial intelligence, and useful tools that help you build and
            improve your project step by step.
          </p>
          <p>
            The subscription gives you access to constantly growing content,
            designed so you can learn at your own pace with practical, clear,
            and results-oriented training.
          </p>

          <div className="services-page-custom__courses-extra">
            <div className="services-page-custom__benefits">
              {courseBenefits.map((benefit) => (
                <div key={benefit} className="services-page-custom__benefit">
                  {benefit}
                </div>
              ))}
            </div>

            <div className="services-page-custom__courses-grid">
              {relatedCourses.map((course) => (
                <article
                  key={course.title}
                  className="services-page-custom__course-card"
                >
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </article>
              ))}
            </div>

            <p className="services-page-custom__more">And many more...</p>
          </div>

          <div className="services-page-custom__action">
            <Link to="/subscribe" className="home-custom__cta-button">
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;