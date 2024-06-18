import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout, onCloseIfRedirect }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => {
          handleListItemClick(event, 0);
          navigate('/profile');
          onCloseIfRedirect();
        }}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary={intl.formatMessage({ id: 'lbl.view_profile' })} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => {
          handleListItemClick(event, 1);
          navigate('/profile/password');
          onCloseIfRedirect();
        }}
      >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary={intl.formatMessage({ id: 'lbl.change_password' })} />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary={intl.formatMessage({ id: 'lbl.logout' })} />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func,
  onCloseIfRedirect: PropTypes.func
};

export default ProfileTab;
