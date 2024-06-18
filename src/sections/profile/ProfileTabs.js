import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormLabel, Grid, TextField, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import ProfileTab from './ProfileTab';
import { facebookColor, linkedInColor, twitterColor } from 'config';
import useAuth from 'hooks/useAuth';
import defaultAvatar from 'assets/images/users/avatar-1.png';

// assets
import { FacebookFilled, LinkedinFilled, TwitterSquareFilled, CameraOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileTabs = () => {
  const theme = useTheme();
  const { user, isProfileUpdated, updatePhotoURL } = useAuth();

  const [avatar, setAvatar] = useState(user?.photoURL ?? defaultAvatar);

  useEffect(() => {
    if (user) {
      setAvatar(user?.photoURL ?? defaultAvatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.photoURL]);

  useEffect(() => {}, [isProfileUpdated]);

  return (
    <MainCard>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Stack spacing={1.5} alignItems="center">
            <FormLabel
              htmlFor="change-avtar"
              sx={{
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                '&:hover .MuiBox-root': { opacity: 1 },
                cursor: 'pointer'
              }}
            >
              <Avatar alt="Avatar 1" src={avatar} sx={{ width: 124, height: 124, border: '1px dashed' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                  <Typography sx={{ color: 'secondary.lighter' }}>
                    <FormattedMessage id="lbl.upload" />
                  </Typography>
                </Stack>
              </Box>
            </FormLabel>
            <TextField
              type="file"
              id="change-avtar"
              placeholder="Outlined"
              variant="outlined"
              sx={{ display: 'none' }}
              onChange={updatePhotoURL}
            />
            <Typography variant="h5">{user?.displayName ?? 'Default username'}</Typography>
            <Stack direction="row" spacing={3} sx={{ '& svg': { fontSize: '1.15rem', cursor: 'pointer' } }}>
              <TwitterSquareFilled style={{ color: twitterColor }} />
              <FacebookFilled style={{ color: facebookColor }} />
              <LinkedinFilled style={{ color: linkedInColor }} />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ProfileTab />
        </Grid>
      </Grid>
    </MainCard>
  );
};

ProfileTabs.propTypes = {
  focusInput: PropTypes.func
};

export default ProfileTabs;
