/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project import
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
  const { isLoggedIn, website, isWebsiteInitiate } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn && !website && !isWebsiteInitiate) {
      console.log('e logat, nu are web si nu e initializat');
      navigate('website', {
        state: {
          from: ''
        },
        replace: true
      });
      navigate('website', { replace: true });
    }
    if (!isLoggedIn) {
      console.log('nu e logat');
      navigate('login', {
        state: {
          from: location.pathname
        },
        replace: true
      });
      navigate('login', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, navigate, location]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
