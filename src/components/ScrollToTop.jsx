import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/services' && location.hash === '#online-courses') {
      return;
    }

    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

export default ScrollToTop;