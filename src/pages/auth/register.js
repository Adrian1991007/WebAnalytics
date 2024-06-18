import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import FirebaseRegister from 'sections/auth/auth-forms/AuthRegister';
import { useIntl } from 'react-intl';

// ================================|| REGISTER ||================================ //

const Register = () => {
  const intl = useIntl();
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">{intl.formatMessage({ id: 'lbl.sign_up' })}</Typography>
            <Typography component={Link} to={'/login'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              {intl.formatMessage({ id: 'lbl.already_have_account' })}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <FirebaseRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Register;
