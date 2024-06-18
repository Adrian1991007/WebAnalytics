import { Grid, Stack, Typography } from '@mui/material';

import AuthWrapper from 'sections/auth/AuthWrapper';
import { FormattedMessage } from 'react-intl';
import AuthWebsite from 'sections/auth/auth-forms/AuthWebsite';

const Website = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">
              <FormattedMessage id="lbl.website" />
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthWebsite />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Website;
