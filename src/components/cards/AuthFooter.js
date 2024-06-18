import { Container, Link, Stack, Typography, useMediaQuery } from '@mui/material';

import { useIntl } from 'react-intl';

const AuthFooter = () => {
  const intl = useIntl();
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        spacing={2}
        textAlign={matchDownSM ? 'center' : 'inherit'}
      >
        <Typography variant="subtitle2" color="secondary" component="span">
          {intl.formatMessage({ id: 'lbl.protected_by' })}
          <Typography component={Link} variant="subtitle2" href="" underline="hover">
            {intl.formatMessage({ id: 'lbl.privacy_policy' })}
          </Typography>
        </Typography>

        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={matchDownSM ? 1 : 3} textAlign={matchDownSM ? 'center' : 'inherit'}>
          <Typography variant="subtitle2" color="secondary" component={Link} href="" underline="hover">
            {intl.formatMessage({ id: 'lbl.terms_of_service' })}
          </Typography>
          <Typography variant="subtitle2" color="secondary" component={Link} href="" underline="hover">
            {intl.formatMessage({ id: 'lbl.privacy_policy' })}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
