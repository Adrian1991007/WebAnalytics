import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

// material-ui
import { Box, Container, Toolbar } from '@mui/material';

// project import
import { openComponentDrawer } from 'store/reducers/menu';

// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

const Header = lazy(() => import('./Header'));

// ==============================|| Loader ||============================== //

const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2)
  }
}));

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

// ==============================|| MINIMAL LAYOUT ||============================== //

const CommonLayout = ({ layout = 'blank' }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const menu = useSelector((state) => state.menu);
  const { componentDrawerOpen } = menu;

  const handleDrawerOpen = () => {
    dispatch(openComponentDrawer({ componentDrawerOpen: !componentDrawerOpen }));
  };

  return (
    <>
      {layout === 'welcome' && (
        <Suspense fallback={<Loader />}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              bgcolor: theme.palette.mode === 'dark' ? 'grey.1' : 'grey.800',
              overflow: 'hidden',
              '&:before': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                zIndex: 2,
                background: 'linear-gradient(329.36deg, rgb(0, 0, 0) 14.79%, rgba(67, 67, 67, 0.28) 24.86%)'
              }
            }}
          >
            <Header layout={layout} />
            <Outlet />
          </Box>
        </Suspense>
      )}
      {layout === 'component' && (
        <Suspense fallback={<Loader />}>
          <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
            <Header handleDrawerOpen={handleDrawerOpen} layout="component" />
            <Toolbar sx={{ my: 2 }} />
          </Container>
        </Suspense>
      )}
      {layout === 'blank' && <Outlet />}
    </>
  );
};

CommonLayout.propTypes = {
  layout: PropTypes.string
};

export default CommonLayout;
