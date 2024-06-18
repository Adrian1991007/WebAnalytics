// material-ui
import { Grid } from '@mui/material';
import { Outlet } from 'react-router';

// project import
import ProfileCard from 'sections/profile/ProfileCard';
import ProfileTabs from 'sections/profile/ProfileTabs';

// ==============================|| PROFILE - USER ||============================== //

const UserProfile = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ProfileCard />
      </Grid>
      <Grid item xs={12} md={3}>
        <ProfileTabs />
      </Grid>
      <Grid item xs={12} md={9}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
