import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { FormattedMessage } from 'react-intl';
import chart from 'assets/images/landing/bg_default.png';

const Welcome = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={2} sx={{ pt: { md: 0, xs: 8 }, pb: { md: 0, xs: 5 } }}>
        <Grid item xs={12} lg={5} md={6}>
          <Grid container spacing={2} sx={{ pr: 10, [theme.breakpoints.down('md')]: { pr: 0, textAlign: 'center' } }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Typography
                  variant="h1"
                  color="white"
                  sx={{
                    fontSize: { xs: '1.825rem', sm: '2rem', md: '2.5rem' },
                    fontWeight: 700,
                    lineHeight: { xs: 1.3, sm: 1.3, md: 1.3 }
                  }}
                >
                  <FormattedMessage id="lbl.welcome_header" />
                  <Box component="span" sx={{ color: theme.palette.primary.main }}>
                    <span>
                      <FormattedMessage id="lbl.analytics" />{' '}
                    </span>
                  </Box>
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  color="white"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    fontWeight: 400,
                    lineHeight: { xs: 1.4, md: 1.4 },
                    mb: 2
                  }}
                >
                  <FormattedMessage id="lbl.welcome_ph1" />
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  color="white"
                  sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    fontWeight: 400,
                    lineHeight: { xs: 1.4, md: 1.4 },
                    mb: 2
                  }}
                >
                  <FormattedMessage id="lbl.welcome_ph4" />
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6} md={6} mr="4rem" mt="2rem" sx={{ display: matchDownMd ? 'none' : 'initial' }}>
          <motion.div
            initial={{ opacity: 0, translateY: 550 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 30,
              delay: 0.4
            }}
          >
            <img src={chart} alt="Welcome" height="800" />
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Welcome;
