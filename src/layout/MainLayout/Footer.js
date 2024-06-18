import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link, Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const Footer = () => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
      <Typography variant="caption">
        &copy; <FormattedMessage id="lbl.all_rights_reserved" />
      </Typography>
      <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
        <Link component={RouterLink} to="#" target="_blank" variant="caption" color="textPrimary">
          <FormattedMessage id="lbl.privacy_policy" />
        </Link>
        <Link component={RouterLink} to="#" target="_blank" variant="caption" color="textPrimary">
          <FormattedMessage id="lbl.terms_of_service" />
        </Link>
      </Stack>
    </Stack>
  );
};

export default Footer;
