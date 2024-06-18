import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import useAuth from 'hooks/useAuth';

function getPathIndex(pathname) {
  let selectedTab = 0;
  switch (pathname) {
    case '/profile/password':
      selectedTab = 1;
      break;
    case '/profile':
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

// ==============================|| USER PROFILE - TAB ||============================== //

const ProfileTab = () => {
  const intl = useIntl();
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();

  console.log('user', user);

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0, '/profile')}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary={intl.formatMessage({ id: 'lbl.personal_information' })} />
      </ListItemButton>
      {user && user.providerData && user.providerData[0].providerId === 'password' && (
        <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1, '/profile/password')}>
          <ListItemIcon>
            <LockOutlined />
          </ListItemIcon>
          <ListItemText primary={intl.formatMessage({ id: 'lbl.change_password' })} />
        </ListItemButton>
      )}
    </List>
  );
};

export default ProfileTab;
