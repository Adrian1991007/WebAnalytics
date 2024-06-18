import { Link } from 'react-router-dom';

import { Box, Button, Grid, Typography } from '@mui/material';

import AnimateButton from 'components/@extended/AnimateButton';
import AuthWrapper from 'sections/auth/AuthWrapper';
import { FormattedMessage } from 'react-intl';

const CheckMail = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">
              <FormattedMessage id="lbl.hi_check_mail" />
            </Typography>
            <Typography color="secondary" sx={{ mb: 0.5, mt: 1.25 }}>
              <FormattedMessage id="lbl.recover_sent" />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              component={Link}
              to={'/login'}
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              <FormattedMessage id="lbl.sign_in" />
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default CheckMail;
