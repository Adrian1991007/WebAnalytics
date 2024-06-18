import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project import
import LogoIcon from './LogoIcon';
import { APP_DEFAULT_PATH } from 'config';

import useAuth from 'hooks/useAuth';

const LogoSection = ({ sx }) => {
  const { isLoggedIn } = useAuth();

  return (
    <ButtonBase disableRipple component={Link} to={isLoggedIn ? APP_DEFAULT_PATH : '/'} sx={sx}>
      <LogoIcon />
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  reverse: PropTypes.bool,
  isIcon: PropTypes.bool,
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
