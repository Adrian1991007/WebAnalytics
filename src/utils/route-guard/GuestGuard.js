/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project import
import { APP_DEFAULT_PATH } from 'config';
import useAuth from 'hooks/useAuth';

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }) => {
  const { isLoggedIn, website, isWebsiteInitiate, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      if (!website && !isWebsiteInitiate) {
        console.log('GuestGuard - logat - nu are website');
        navigate('website', {
          state: {
            from: ''
          },
          replace: true
        });
        navigate('website', { replace: true });
      } else {
        console.log('GuestGuard - logat - are website');
        navigate(location?.state?.from ? location?.state?.from : APP_DEFAULT_PATH, {
          state: {
            from: ''
          },
          replace: true
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, website]);

  return children;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
