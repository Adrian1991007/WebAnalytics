/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';

// project import
import { APP_DEFAULT_PATH } from 'config';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import Logo from 'components/logo';

// assets
import { MenuOutlined, LineOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';

// ==============================|| COMPONENTS - APP BAR ||============================== //

const Header = ({ handleDrawerOpen, layout = 'landing' }) => {
  const intl = useIntl();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState(false);

  /** Method called on multiple components with different event types */
  const drawerToggler = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };

  return (
    <AppBar sx={{ bgcolor: 'transparent', color: theme.palette.text.primary, boxShadow: 'none' }}>
      <Container disableGutters={matchDownMd}>
        <Toolbar sx={{ px: { xs: 1.5, md: 0, lg: 0 }, py: 2 }}>
          <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} alignItems="center">
            <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
              <Logo reverse to="/" />
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{
              '& .header-link': { px: 1, '&:hover': { color: theme.palette.primary.main } },
              display: { xs: 'none', md: 'block' }
            }}
            spacing={2}
          >
            <Box sx={{ display: 'inline-block' }}>
              <AnimateButton>
                <Button component={RouterLink} to="/login" disableElevation color="secondary" variant="contained">
                  <FormattedMessage id="lbl.login" />
                </Button>
              </AnimateButton>
            </Box>

            <Box sx={{ display: 'inline-block' }}>
              <AnimateButton>
                <Button component={RouterLink} to="/register" disableElevation variant="contained">
                  <FormattedMessage id="lbl.register_now" />
                </Button>
              </AnimateButton>
            </Box>
          </Stack>
          <Box
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <Typography component="div" sx={{ textAlign: 'left', display: 'inline-block' }}>
              <Logo reverse to="/" />
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton
                color="secondary"
                {...(layout === 'component' ? { onClick: handleDrawerOpen } : { onClick: drawerToggler(true) })}
                sx={{
                  '&:hover': { bgcolor: theme.palette.mode === 'dark' ? 'secondary.lighter' : 'secondary.dark' }
                }}
              >
                <MenuOutlined style={{ color: theme.palette.mode === 'dark' ? 'inherit' : theme.palette.grey[100] }} />
              </IconButton>
            </Stack>
            <Drawer
              anchor="top"
              open={drawerToggle}
              onClose={drawerToggler(false)}
              sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}
            >
              <Box
                sx={{
                  width: 'auto',
                  '& .MuiListItemIcon-root': {
                    fontSize: '1rem',
                    minWidth: 28
                  }
                }}
                role="presentation"
                onClick={drawerToggler(false)}
                onKeyDown={drawerToggler(false)}
              >
                <List>
                  <Link style={{ textDecoration: 'none' }} href="/login">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText
                        primary={intl.formatMessage({ id: 'lbl.login' })}
                        primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }}
                      />
                    </ListItemButton>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} href="/register">
                    <ListItemButton component="span">
                      <ListItemIcon>
                        <LineOutlined />
                      </ListItemIcon>
                      <ListItemText
                        primary={intl.formatMessage({ id: 'lbl.register_now' })}
                        primaryTypographyProps={{ variant: 'h6', color: 'text.primary' }}
                      />
                    </ListItemButton>
                  </Link>
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Header.propTypes = {
  handleDrawerOpen: PropTypes.func,
  layout: PropTypes.string
};

export default Header;
