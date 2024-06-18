import { useState } from 'react';

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { QuestionCircleOutlined, BulbOutlined, BulbFilled, TranslationOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import useConfig from 'hooks/useConfig';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
  const intl = useIntl();
  const { mode, onChangeMode, i18n, onChangeLocalization } = useConfig();
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
          onChangeLocalization(i18n === 'en' ? 'ro' : 'en');
        }}
      >
        <ListItemIcon>
          <TranslationOutlined />
        </ListItemIcon>
        <ListItemText primary={intl.formatMessage(i18n === 'en' ? { id: 'lbl.romanian' } : { id: 'lbl.english' })} />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => {
          handleListItemClick(event, 1);
          onChangeMode(mode === 'light' ? 'dark' : 'light');
        }}
      >
        <ListItemIcon>{mode === 'light' ? <BulbFilled /> : <BulbOutlined />}</ListItemIcon>
        <ListItemText
          primary={intl.formatMessage(mode === 'light' ? { id: 'lbl.change_theme_to_dark' } : { id: 'lbl.change_theme_to_white' })}
        />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <QuestionCircleOutlined />
        </ListItemIcon>
        <ListItemText primary={intl.formatMessage({ id: 'lbl.support' })} />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;
